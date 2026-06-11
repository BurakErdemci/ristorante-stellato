"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StarfieldProps {
  /** true olduğunda takımyıldız çizimi oynatılır (preloader bitişine senkron). */
  play: boolean;
}

/** Hero arka planı: katmanlı yıldız alanı + takımyıldız. SSR'da yüklenmemeli (next/dynamic, ssr:false). */
export default function Starfield({ play }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<{ drawConstellation: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2000);
    camera.position.z = 420;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);

    const disposables: { dispose: () => void }[] = [];

    function makeSprite(inner: string, outer: string) {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, inner);
      g.addColorStop(0.35, outer);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      disposables.push(tex);
      return tex;
    }
    const starTex = makeSprite("rgba(255,245,225,1)", "rgba(201,163,106,.45)");

    const layers: THREE.Points[] = [];
    const layerCfg = [
      { count: 850, spread: 1400, size: 2.4, depth: [-900, -250], speed: 0.012 },
      { count: 450, spread: 1000, size: 4.2, depth: [-350, 80], speed: 0.022 },
    ];
    layerCfg.forEach((cfg) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(cfg.count * 3);
      const col = new Float32Array(cfg.count * 3);
      const gold = new THREE.Color(0xc9a36a);
      const warm = new THREE.Color(0xe8cfa3);
      const cool = new THREE.Color(0xafc2e8);
      for (let i = 0; i < cfg.count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * cfg.spread * 2;
        pos[i * 3 + 1] = (Math.random() - 0.5) * cfg.spread * 1.2;
        pos[i * 3 + 2] = cfg.depth[0] + Math.random() * (cfg.depth[1] - cfg.depth[0]);
        const r = Math.random();
        const c = r < 0.65 ? gold : r < 0.9 ? warm : cool;
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: cfg.size,
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      pts.userData.speed = cfg.speed;
      scene.add(pts);
      layers.push(pts);
      disposables.push(geo, mat);
    });

    // takımyıldız
    const constPts = [
      [-160, 90, 0],
      [-90, 150, -20],
      [0, 120, -10],
      [80, 160, -30],
      [170, 100, 0],
      [110, 20, -15],
      [-30, 40, -10],
    ].map((p) => new THREE.Vector3(p[0] * 1.4, p[1] * 1.1 + 40, p[2] - 60));

    const nodeTex = makeSprite("rgba(255,250,235,1)", "rgba(232,207,163,.6)");
    const nodeMat = new THREE.PointsMaterial({
      size: 14,
      map: nodeTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xe8cfa3,
    });
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(constPts);
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([...constPts, constPts[0]]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc9a36a, transparent: true, opacity: 0.35 });
    const constLine = new THREE.Line(lineGeo, lineMat);
    constLine.geometry.setDrawRange(0, 0);
    scene.add(constLine);
    disposables.push(nodeGeo, nodeMat, lineGeo, lineMat);

    const drawProgress = { v: 0 };
    apiRef.current = {
      drawConstellation() {
        gsap.to(nodeMat, { opacity: 0.95, duration: 1.4, ease: "power2.out" });
        gsap.to(drawProgress, {
          v: constPts.length + 1,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => constLine.geometry.setDrawRange(0, Math.floor(drawProgress.v)),
        });
      },
    };

    // fare paralaksı
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // scroll'da kameranın yıldızlara dalışı
    const heroEl = canvas.closest("section") ?? canvas.parentElement!;
    const dive = { z: 420 };
    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        dive.z = 420 - self.progress * 240;
      },
    });

    // sadece hero görünürken render et
    let heroVisible = true;
    let rafId: number | null = null;
    const clock = new THREE.Clock();
    function tick() {
      rafId = null;
      if (!heroVisible) return;
      const t = clock.getElapsedTime();
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      camera.position.x = tx * 55;
      camera.position.y = -ty * 38;
      camera.position.z += (dive.z - camera.position.z) * 0.07;
      camera.lookAt(0, 20, -100);
      layers.forEach((l, i) => {
        l.rotation.y = t * l.userData.speed * 0.35;
        l.rotation.x = Math.sin(t * 0.05 + i) * 0.015;
      });
      nodeMat.size = 14 + Math.sin(t * 1.6) * 2.5;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }
    const io = new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible && rafId === null) rafId = requestAnimationFrame(tick);
    });
    io.observe(heroEl);
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      st.kill();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf([nodeMat, drawProgress]);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (play) apiRef.current?.drawConstellation();
  }, [play]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
