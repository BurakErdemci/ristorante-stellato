"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { DINING_TABLES, TIME_SLOTS, type DiningTable } from "@/data/tables";

export interface DiningRoomTexts {
  zones: Record<DiningTable["zone"], string>;
  seats: string;
  tipAvailable: string;
  tipFull: string;
  /** "{n}" misafir sayısıyla değiştirilir */
  tipTooSmall: string;
  tableLabel: (table: DiningTable) => string;
}

interface DiningRoomProps {
  step: number;
  occupied: number[];
  selectedId: number | null;
  guests: number;
  timeIdx: number | null;
  /** her artışta seçili masadan altın tozu yükselir */
  celebrateSignal: number;
  onSelect: (id: number | null) => void;
  texts: DiningRoomTexts;
}

interface SceneApi {
  applyStates: () => void;
  applyCam: (n: number) => void;
  setMood: (timeIdx: number) => void;
  celebrate: () => void;
}

const GOLD = 0xc9a36a;
const GOLDB = 0xe8cfa3;
const DARK = 0x131c26;

/** Rezervasyon sahnesi: 3D salon planı. SSR'da yüklenmemeli (next/dynamic, ssr:false). */
export default function DiningRoom(props: DiningRoomProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const propsRef = useRef(props);

  // event handler'lar ve sahne API'si her zaman güncel prop'ları görsün
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    if (!canvas || !tip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isMobile = window.matchMedia("(max-width: 920px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 1, 1500);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);

    // Masaüstünde sol paneli telafi et: sahneyi panelin sağındaki alanın ortasına kaydır.
    // Panel ≈ 24px sol boşluk + 440px genişlik → görünür alanın merkezi ~232px sağda.
    function applyViewOffset() {
      const isMobileLocal = window.matchMedia("(max-width: 920px)").matches;
      if (!isMobileLocal) {
        const shift = Math.min(232, innerWidth * 0.18);
        camera.setViewOffset(innerWidth, innerHeight, -shift, 0, innerWidth, innerHeight);
      } else {
        const currentStep = propsRef.current.step;
        let yShift = 0;
        if (currentStep === 2) {
          yShift = innerHeight * 0.18; // Push tables up by 18% of screen height
        } else {
          yShift = innerHeight * 0.25; // Push even more on other steps
        }
        camera.setViewOffset(innerWidth, innerHeight, 0, yShift, innerWidth, innerHeight);
      }
      camera.updateProjectionMatrix();
    }
    applyViewOffset();

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(d: T): T => {
      disposables.push(d);
      return d;
    };

    function gsapSafe(target: object, vars: gsap.TweenVars) {
      if (!reduced) {
        gsap.to(target, { ...vars, ease: "power3.out" });
      } else {
        Object.entries(vars).forEach(([k, v]) => {
          if (k !== "duration") (target as Record<string, unknown>)[k] = v;
        });
      }
    }

    /* ---- ışıklar ---- */
    const amb = new THREE.AmbientLight(0x8fa3c0, 0.5);
    const moon = new THREE.DirectionalLight(0xbcd0ee, 0.55);
    moon.position.set(-60, 140, -80);
    const warm = new THREE.PointLight(0xe8cfa3, 0.8, 320, 1.6);
    warm.position.set(0, 60, 0);
    scene.add(amb, moon, warm);

    /* ---- zemin ---- */
    const floor = new THREE.Mesh(
      track(new THREE.PlaneGeometry(190, 130)),
      track(new THREE.MeshStandardMaterial({ color: 0x0d141c, roughness: 0.85, metalness: 0.15 }))
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const grid = new THREE.GridHelper(190, 19, 0x1c2836, 0x141e2a);
    grid.position.y = 0.02;
    scene.add(grid);
    disposables.push(grid);

    function rectLine(w: number, d: number, x: number, z: number, opacity: number) {
      const pts = [
        new THREE.Vector3(-w / 2, 0, -d / 2),
        new THREE.Vector3(w / 2, 0, -d / 2),
        new THREE.Vector3(w / 2, 0, d / 2),
        new THREE.Vector3(-w / 2, 0, d / 2),
        new THREE.Vector3(-w / 2, 0, -d / 2),
      ];
      const line = new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints(pts)),
        track(new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity }))
      );
      line.position.set(x, 0.06, z);
      scene.add(line);
    }
    rectLine(176, 116, 0, 0, 0.35);

    // teras ayracı (ortada kapı boşluğu)
    function divider(x1: number, x2: number, z: number) {
      const g = track(new THREE.BoxGeometry(x2 - x1, 2.6, 0.8));
      const m = new THREE.Mesh(
        g,
        track(new THREE.MeshStandardMaterial({ color: DARK, roughness: 0.6, metalness: 0.3 }))
      );
      m.position.set((x1 + x2) / 2, 1.3, z);
      const e = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(g)),
        track(new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 }))
      );
      e.position.copy(m.position);
      scene.add(m, e);
    }
    divider(-88, -14, 30);
    divider(14, 88, 30);

    // pencere şeridi (soğuk parıltı)
    const win = new THREE.Mesh(
      track(new THREE.PlaneGeometry(176, 9)),
      track(new THREE.MeshBasicMaterial({ color: 0x16243c, transparent: true, opacity: 0.9 }))
    );
    win.position.set(0, 4.5, -58);
    const winGlow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(176, 9)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0x3a5e9c,
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
        })
      )
    );
    winGlow.position.set(0, 4.5, -57.8);
    scene.add(win, winGlow);

    /* ---- yıldızlar ---- */
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
      return track(new THREE.CanvasTexture(c));
    }
    const starTex = makeSprite("rgba(255,245,225,1)", "rgba(201,163,106,.4)");
    const starGeo = track(new THREE.BufferGeometry());
    const sN = 500;
    const sPos = new Float32Array(sN * 3);
    for (let i = 0; i < sN; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 900;
      sPos[i * 3 + 1] = 90 + Math.random() * 260;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 900;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const starMat = track(
      new THREE.PointsMaterial({
        size: 3.4,
        map: starTex,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xe8cfa3,
      })
    );
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ---- bölge etiketleri ---- */
    function addLabel(text: string, x: number, z: number) {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 96;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "rgba(201,163,106,.9)";
      ctx.font = "500 38px Jost, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.split("").join("  "), 256, 48);
      const tex = track(new THREE.CanvasTexture(c));
      const m = new THREE.Mesh(
        track(new THREE.PlaneGeometry(40, 7.5)),
        track(new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.55, depthWrite: false }))
      );
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.1, z);
      scene.add(m);
    }
    const zoneTexts = propsRef.current.texts.zones;
    addLabel(zoneTexts.pencere.toUpperCase(), 0, -50);
    addLabel(zoneTexts.salon.toUpperCase(), -22, 2);
    addLabel(zoneTexts.teras.toUpperCase(), 0, 54);
    addLabel("CUCINA", 58, -42);
    rectLine(48, 22, 58, -44, 0.25);

    /* ---- masalar ---- */
    const glowTex = makeSprite("rgba(255,235,200,1)", "rgba(232,180,90,.5)");
    const pickMeshes: THREE.Mesh[] = [];
    const tableObjs = new Map<
      number,
      { group: THREE.Group; candle: THREE.Sprite; ring: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial> }
    >();

    const matTop = () =>
      track(new THREE.MeshStandardMaterial({ color: 0x1a2430, roughness: 0.4, metalness: 0.5 }));
    const matCloth = () =>
      track(new THREE.MeshStandardMaterial({ color: 0x202b38, roughness: 0.9, metalness: 0.05 }));
    const edges = (geo: THREE.BufferGeometry, opacity: number) =>
      new THREE.LineSegments(
        track(new THREE.EdgesGeometry(geo)),
        track(new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity }))
      );

    DINING_TABLES.forEach((t) => {
      const g = new THREE.Group();
      g.position.set(t.x, 0, t.z);

      let topGeo: THREE.BufferGeometry;
      let hitR: number;
      if (t.shape === "round") {
        const r = t.seats > 2 ? 7 : 5.4;
        topGeo = new THREE.CylinderGeometry(r, r, 1.1, 28);
        hitR = t.seats > 2 ? 10 : 8.5;
      } else if (t.shape === "square") {
        topGeo = new THREE.BoxGeometry(11, 1.1, 11);
        hitR = 10.5;
      } else {
        topGeo = new THREE.BoxGeometry(24, 1.1, 10);
        hitR = 15;
      }
      track(topGeo);
      const top = new THREE.Mesh(topGeo, matCloth());
      top.position.y = 5.4;
      const topEdges = edges(topGeo, 0.7);
      topEdges.position.y = 5.4;
      g.add(top, topEdges);

      const leg = new THREE.Mesh(track(new THREE.CylinderGeometry(0.7, 0.9, 5, 10)), matTop());
      leg.position.y = 2.5;
      g.add(leg);

      const chairGeo = track(new THREE.CylinderGeometry(1.7, 1.7, 3, 12));
      const rad = t.shape === "long" ? 0 : t.shape === "square" ? 9.4 : t.seats > 2 ? 10.6 : 8.6;
      for (let i = 0; i < t.seats; i++) {
        const ch = new THREE.Mesh(chairGeo, matTop());
        if (t.shape === "long") {
          const side = i % 2 === 0 ? 1 : -1;
          const k = Math.floor(i / 2) - (Math.ceil(t.seats / 2) - 1) / 2;
          ch.position.set(k * (t.seats > 6 ? 7.5 : 9), 1.5, side * 8.4);
        } else {
          const a = (i / t.seats) * Math.PI * 2 + Math.PI / 4;
          ch.position.set(Math.cos(a) * rad, 1.5, Math.sin(a) * rad);
        }
        g.add(ch);
      }

      // mum parıltısı
      const candle = new THREE.Sprite(
        track(
          new THREE.SpriteMaterial({
            map: glowTex,
            color: 0xffd9a0,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );
      candle.scale.set(7, 7, 1);
      candle.position.y = 7.6;
      candle.userData.phase = Math.random() * Math.PI * 2;
      g.add(candle);

      // seçim halkası
      const ring = new THREE.Mesh(
        track(new THREE.RingGeometry(hitR + 1.4, hitR + 2.2, 40)),
        track(
          new THREE.MeshBasicMaterial({
            color: GOLDB,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.12;
      g.add(ring);

      // tıklama hedefi
      const hit = new THREE.Mesh(
        track(new THREE.CylinderGeometry(hitR, hitR, 14, 12)),
        track(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
      );
      hit.position.y = 6;
      hit.userData.table = t;
      g.add(hit);
      pickMeshes.push(hit);

      scene.add(g);
      tableObjs.set(t.id, { group: g, candle, ring });
    });

    /* ---- durum görselleri ---- */
    function applyStates() {
      const { occupied, selectedId, guests } = propsRef.current;
      const occupiedSet = new Set(occupied);
      DINING_TABLES.forEach((t) => {
        const o = tableObjs.get(t.id)!;
        const isOccupied = occupiedSet.has(t.id);
        const tooSmall = t.seats < guests;
        const selected = selectedId === t.id;

        o.candle.visible = !isOccupied;
        o.candle.material.color.setHex(selected ? 0xffffff : 0xffd9a0);
        o.group.traverse((obj) => {
          if (obj instanceof THREE.LineSegments) {
            const mat = obj.material as THREE.LineBasicMaterial;
            mat.opacity = isOccupied ? 0.18 : selected ? 1 : tooSmall ? 0.3 : 0.7;
            mat.color.setHex(selected ? GOLDB : GOLD);
          }
          if (obj instanceof THREE.Mesh && (obj.material as THREE.Material).type === "MeshStandardMaterial") {
            (obj.material as THREE.MeshStandardMaterial).color.setHex(
              isOccupied ? 0x16202b : tooSmall ? 0x18222e : 0x202b38
            );
          }
        });
        gsapSafe(o.ring.material, { opacity: selected ? 0.9 : 0, duration: 0.5 });
        gsapSafe(o.group.position, { y: selected ? 1.2 : 0, duration: 0.6 });
      });
    }
    /* ---- pan & zoom offsets ---- */
    let panOffset = { x: 0, z: 0 };
    let zoomScale = 1.0;

    let initialPinchDistance = 0;
    let startZoomScale = 1.0;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let startPanOffset = { x: 0, z: 0 };

    const onTouchStart = (e: TouchEvent) => {
      const { step } = propsRef.current;
      if (step !== 2) return;
      
      if (e.touches.length === 1) {
        isDragging = true;
        dragStart.x = e.touches[0].clientX;
        dragStart.y = e.touches[0].clientY;
        startPanOffset.x = panOffset.x;
        startPanOffset.z = panOffset.z;
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.hypot(dx, dy);
        startZoomScale = zoomScale;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const { step } = propsRef.current;
      if (step !== 2) return;
      
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStart.x;
        const dy = e.touches[0].clientY - dragStart.y;
        
        // Panning sensitivity speed scale
        const scale = 0.45;
        panOffset.x = startPanOffset.x - dx * scale;
        panOffset.z = startPanOffset.z - dy * scale;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (initialPinchDistance > 0) {
          const ratio = initialPinchDistance / dist;
          // Zoom scale: clamp between 0.4 (close) and 2.0 (far)
          zoomScale = Math.min(2.0, Math.max(0.4, startZoomScale * ratio));
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isDragging = false;
        initialPinchDistance = 0;
      } else if (e.touches.length === 1) {
        isDragging = true;
        dragStart.x = e.touches[0].clientX;
        dragStart.y = e.touches[0].clientY;
        startPanOffset.x = panOffset.x;
        startPanOffset.z = panOffset.z;
        initialPinchDistance = 0;
      }
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    /* ---- raycast: hover + seçim ---- */
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hovered: DiningTable | null = null;

    function castAt(cx: number, cy: number): DiningTable | null {
      ndc.x = (cx / innerWidth) * 2 - 1;
      ndc.y = -(cy / innerHeight) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hits = ray.intersectObjects(pickMeshes);
      return hits.length ? (hits[0].object.userData.table as DiningTable) : null;
    }

    function tableState(t: DiningTable) {
      const { occupied, guests, texts } = propsRef.current;
      if (occupied.includes(t.id)) return { ok: false, txt: texts.tipFull };
      if (t.seats < guests) return { ok: false, txt: texts.tipTooSmall.replace("{n}", String(guests)) };
      return { ok: true, txt: texts.tipAvailable };
    }

    const tName = tip.querySelector(".tname") as HTMLElement;
    const tMeta = tip.querySelector(".tmeta") as HTMLElement;
    const tState = tip.querySelector(".tstate") as HTMLElement;

    const onPointerMove = (e: PointerEvent) => {
      const { step, texts } = propsRef.current;
      if (step !== 2) {
        if (hovered) {
          hovered = null;
          tip.style.opacity = "0";
          document.body.style.cursor = "";
        }
        return;
      }
      const t = castAt(e.clientX, e.clientY);
      hovered = t;
      if (t) {
        const st = tableState(t);
        tName.textContent = texts.tableLabel(t);
        tMeta.textContent = `${texts.zones[t.zone]} · ${t.seats} ${texts.seats}`;
        tState.textContent = st.txt;
        tState.className = `tstate text-[10px] tracking-[.26em] uppercase mt-2 pt-2 border-t border-line ${
          st.ok ? "text-[#9BC49A]" : "text-[#C97B7B]"
        }`;
        tip.style.left = `${e.clientX}px`;
        tip.style.top = `${e.clientY - 14}px`;
        tip.style.opacity = "1";
        document.body.style.cursor = st.ok ? "pointer" : "not-allowed";
      } else {
        tip.style.opacity = "0";
        document.body.style.cursor = "";
      }
    };
    if (finePointer) canvas.addEventListener("pointermove", onPointerMove, { passive: true });

    let pointerDownStart = { x: 0, y: 0 };
    let pointerDownTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      const { step } = propsRef.current;
      if (step !== 2) return;
      pointerDownStart.x = e.clientX;
      pointerDownStart.y = e.clientY;
      pointerDownTime = Date.now();
    };

    const onPointerUp = (e: PointerEvent) => {
      const { step, selectedId, onSelect } = propsRef.current;
      if (step !== 2) return;

      const dragDist = Math.hypot(e.clientX - pointerDownStart.x, e.clientY - pointerDownStart.y);
      const dragDuration = Date.now() - pointerDownTime;

      // If they dragged more than 8 pixels or held for more than 280ms, it's a drag gesture, not a selection tap
      if (dragDist > 8 || dragDuration > 280) return;

      const t = castAt(e.clientX, e.clientY);
      if (!t) return;
      const st = tableState(t);
      if (!st.ok) {
        // sarsıntı geri bildirimi
        const o = tableObjs.get(t.id)!;
        if (!reduced) {
          gsap.fromTo(o.group.position, { x: t.x - 1.2 }, { x: t.x, duration: 0.4, ease: "elastic.out(1,.3)" });
        }
        return;
      }
      onSelect(t.id === selectedId ? null : t.id);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);

    /* ---- saat ruh hali ---- */
    function setMood(timeIdx: number) {
      const k = timeIdx / (TIME_SLOTS.length - 1);
      gsapSafe(amb, { intensity: 0.62 - k * 0.34, duration: 1.6 });
      gsapSafe(moon, { intensity: 0.65 - k * 0.25, duration: 1.6 });
      gsapSafe(starMat, { opacity: 0.45 + k * 0.5, duration: 1.6 });
    }

    /* ---- kamera koreografisi ---- */
    const camTarget = new THREE.Vector3(0, 0, 4);
    const camPos = { x: 0, y: 260, z: 30 };
    const CAM: Record<number, { x: number; y: number; z: number; look: { x: number; y: number; z: number } }> = {
      1: { x: 0, y: 150, z: 150, look: { x: 0, y: 0, z: 4 } },
      2: { x: 0, y: 100, z: 118, look: { x: 0, y: 0, z: 0 } },
      3: { x: -34, y: 74, z: 96, look: { x: 0, y: 0, z: 0 } },
      4: { x: -34, y: 74, z: 96, look: { x: 0, y: 0, z: 0 } },
    };
    function applyCam(n: number) {
      const { selectedId } = propsRef.current;
      let c = { ...CAM[n] };
      if (n >= 3 && selectedId) {
        const t = DINING_TABLES.find((x) => x.id === selectedId)!;
        c = { x: t.x * 0.55, y: 46, z: t.z + 62, look: { x: t.x, y: 4, z: t.z } };
      }
      if (isMobile) {
        c.y *= 1.25;
        c.z *= 1.2;
      }
      panOffset.x = 0;
      panOffset.z = 0;
      zoomScale = 1.0;
      applyViewOffset();
      if (!reduced) {
        gsap.to(camPos, { x: c.x, y: c.y, z: c.z, duration: 1.8, ease: "power3.inOut" });
        gsap.to(camTarget, { x: c.look.x, y: c.look.y, z: c.look.z, duration: 1.8, ease: "power3.inOut" });
      } else {
        Object.assign(camPos, { x: c.x, y: c.y, z: c.z });
        camTarget.set(c.look.x, c.look.y, c.look.z);
      }
    }
    // giriş uçuşu
    applyCam(1);

    /* ---- fare eğimi ---- */
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    if (finePointer) window.addEventListener("mousemove", onMouse, { passive: true });

    /* ---- onay kutlaması: altın tozları ---- */
    let burst: { points: THREE.Points; vel: { x: number; y: number; z: number }[]; life: number } | null = null;
    function celebrate() {
      const { selectedId } = propsRef.current;
      if (!selectedId) return;
      const t = DINING_TABLES.find((x) => x.id === selectedId)!;
      const N = 70;
      const geo = track(new THREE.BufferGeometry());
      const pos = new Float32Array(N * 3);
      const vel: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < N; i++) {
        pos[i * 3] = t.x + (Math.random() - 0.5) * 8;
        pos[i * 3 + 1] = 7 + Math.random() * 2;
        pos[i * 3 + 2] = t.z + (Math.random() - 0.5) * 8;
        vel.push({
          x: (Math.random() - 0.5) * 0.18,
          y: 0.22 + Math.random() * 0.3,
          z: (Math.random() - 0.5) * 0.18,
        });
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = track(
        new THREE.PointsMaterial({
          size: 2.6,
          map: starTex,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          color: 0xe8cfa3,
        })
      );
      if (burst) scene.remove(burst.points);
      burst = { points: new THREE.Points(geo, mat), vel, life: 0 };
      scene.add(burst.points);
    }

    apiRef.current = { applyStates, applyCam, setMood, celebrate };

    /* ---- döngü ---- */
    const clock = new THREE.Clock();
    let elapsed = 0;
    let rafId: number;
    function tick() {
      const dt = Math.min(clock.getDelta() || 0.016, 0.05);
      elapsed += dt;
      const t = elapsed;

      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;

      const targetCamX = camPos.x + panOffset.x + tx * 26;
      const targetCamY = camPos.y * zoomScale - ty * 14;
      const targetCamZ = camPos.z * zoomScale + panOffset.z;
      camera.position.set(targetCamX, targetCamY, targetCamZ);

      const targetLookX = camTarget.x + panOffset.x;
      const targetLookY = camTarget.y;
      const targetLookZ = camTarget.z + panOffset.z;
      camera.lookAt(targetLookX, targetLookY, targetLookZ);

      const hasSelection = propsRef.current.selectedId !== null;
      tableObjs.forEach((o) => {
        if (o.candle.visible) {
          const f =
            1 +
            Math.sin(t * 7 + o.candle.userData.phase) * 0.1 +
            Math.sin(t * 13.7 + o.candle.userData.phase) * 0.05;
          const base = hasSelection && o.ring.material.opacity > 0.5 ? 9 : 7;
          o.candle.scale.set(base * f, base * f, 1);
        }
        if (o.ring.material.opacity > 0.1) {
          const s = 1 + Math.sin(t * 2.4) * 0.06;
          o.ring.scale.set(s, s, 1);
        }
      });

      stars.rotation.y = t * 0.004;

      if (burst) {
        burst.life += dt;
        const p = burst.points.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < burst.vel.length; i++) {
          p.array[i * 3] += burst.vel[i].x;
          p.array[i * 3 + 1] += burst.vel[i].y;
          p.array[i * 3 + 2] += burst.vel[i].z;
          burst.vel[i].y -= 0.004;
        }
        p.needsUpdate = true;
        (burst.points.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - burst.life / 2.4);
        if (burst.life > 2.6) {
          scene.remove(burst.points);
          burst = null;
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // giriş uçuşu: yukarıdan süzülerek masa başı görünüme
    if (!reduced) {
      const c = CAM[1];
      gsap.to(camPos, {
        x: c.x,
        y: isMobile ? c.y * 1.25 : c.y,
        z: isMobile ? c.z * 1.2 : c.z,
        duration: 2.6,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      applyViewOffset();
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", onResize);

    applyStates();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.body.style.cursor = "";
      gsap.killTweensOf([camPos, camTarget, amb, moon, starMat]);
      tableObjs.forEach((o) => gsap.killTweensOf([o.ring.material, o.group.position]));
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      apiRef.current = null;
    };
  }, []);

  // prop değişimlerini sahneye uygula
  const { step, occupied, selectedId, guests, timeIdx, celebrateSignal } = props;

  useEffect(() => {
    apiRef.current?.applyStates();
  }, [occupied, selectedId, guests]);

  useEffect(() => {
    apiRef.current?.applyCam(step);
  }, [step]);

  useEffect(() => {
    if (timeIdx !== null) apiRef.current?.setMood(timeIdx);
  }, [timeIdx]);

  useEffect(() => {
    if (celebrateSignal > 0) apiRef.current?.celebrate();
  }, [celebrateSignal]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-1 touch-none" />
      {/* masa tooltip'i */}
      <div
        ref={tipRef}
        aria-hidden="true"
        className="fixed z-50 pointer-events-none bg-ink/90 border border-line py-3 px-4 min-w-[170px] opacity-0 -translate-x-1/2 -translate-y-[120%] transition-opacity duration-200 backdrop-blur-md"
      >
        <div className="tname font-serif text-lg text-gold-bright" />
        <div className="tmeta text-[10px] tracking-[.26em] uppercase text-bone/60 mt-1" />
        <div className="tstate text-[10px] tracking-[.26em] uppercase mt-2 pt-2 border-t border-line" />
      </div>
    </>
  );
}
