"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Header from "@/components/layout/Header";
import CustomCursor from "@/components/layout/CustomCursor";
import { useTranslation } from "@/components/LanguageProvider";
import { createReservation } from "@/actions/reservationActions";
import { getAvailability } from "@/lib/availability";
import { DINING_TABLES, TIME_SLOTS, MAX_GUESTS, type DiningTable } from "@/data/tables";
import type { DiningRoomTexts } from "@/components/three/DiningRoom";

// THREE.js SSR'da çalışmaz; yalnızca istemcide yükle
const DiningRoom = dynamic(() => import("@/components/three/DiningRoom"), { ssr: false });

const DATE_LOCALE: Record<string, string> = { tr: "tr-TR", en: "en-US", it: "it-IT" };

// yerel saat dilimine göre YYYY-MM-DD (toISOString UTC kayması yapar)
const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function ReservationExperience() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const panelBodyRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [timeIdx, setTimeIdx] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [tableId, setTableId] = useState<number | null>(null);
  const [occupied, setOccupied] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [stepError, setStepError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resCode, setResCode] = useState("ST-0000");
  const [celebrateSignal, setCelebrateSignal] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const dateLocale = DATE_LOCALE[locale] ?? "tr-TR";

  // Reset collapse state on step changes
  useEffect(() => {
    if (step !== 2) {
      setIsCollapsed(false);
    }
  }, [step]);

  const mobileHeightClass =
    step === 1 ? "max-md:max-h-[70vh]" :
    step === 2 ? (isCollapsed ? "max-md:max-h-[64px]" : "max-md:max-h-[38vh]") :
    step === 3 ? "max-md:max-h-[78vh]" :
    "max-md:max-h-[68vh]";

  // önümüzdeki 3 ay
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 3 }, (_, i) => new Date(now.getFullYear(), now.getMonth() + i, 1));
  }, []);

  // seçili ayın günleri (içinde bulunulan ayda bugünden itibaren)
  const days = useMemo(() => {
    const month = months[monthOffset];
    const first = monthOffset === 0 ? new Date().getDate() : 1;
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from(
      { length: last - first + 1 },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), first + i)
    );
  }, [months, monthOffset]);

  const todayISO = toISODate(new Date());
  const selectedISO = selectedDate ? toISODate(selectedDate) : null;

  // tarih+saat değişince doluluğu yenile (arayüz: lib/availability.ts)
  useEffect(() => {
    if (selectedDate === null || timeIdx === null) {
      setOccupied([]);
      return;
    }
    let stale = false;
    getAvailability(toISODate(selectedDate), TIME_SLOTS[timeIdx]).then((ids) => {
      if (stale) return;
      setOccupied(ids);
      setTableId((prev) => (prev !== null && ids.includes(prev) ? null : prev));
    });
    return () => {
      stale = true;
    };
  }, [selectedDate, timeIdx]);

  // seçili masa misafir sayısına küçük gelirse bırak
  useEffect(() => {
    setTableId((prev) => {
      if (prev === null) return prev;
      const table = DINING_TABLES.find((x) => x.id === prev);
      return table && table.seats < guests ? null : prev;
    });
  }, [guests]);

  // adım geçiş animasyonu
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!panelBodyRef.current) return;
    const tween = gsap.fromTo(
      panelBodyRef.current.children,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [step]);

  const texts: DiningRoomTexts = useMemo(
    () => ({
      zones: t.reservation3d.zones,
      seats: t.reservation3d.seats,
      tipAvailable: t.reservation3d.tipAvailable,
      tipFull: t.reservation3d.tipFull,
      tipTooSmall: t.reservation3d.tipTooSmall,
      tableLabel: (table: DiningTable) =>
        table.zone === "sef"
          ? t.reservation3d.zones.sef
          : `${t.reservation3d.stepTable} ${String(table.id).padStart(2, "0")}`,
    }),
    [t]
  );

  const selectedTable = tableId !== null ? DINING_TABLES.find((x) => x.id === tableId) : undefined;

  const goStep = (n: number) => {
    setStepError(false);
    setServerError("");
    setStep(n);
  };

  const handleSubmit = async () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (name.trim().length < 2 || phone.trim().length < 7 || !emailOk) {
      setStepError(true);
      return;
    }
    setSubmitting(true);
    setServerError("");

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("email", email.trim());
    fd.append("phone", phone.trim());
    fd.append("date", `${toISODate(selectedDate!)}T${TIME_SLOTS[timeIdx!]}`);
    fd.append("guests", String(guests));
    fd.append("notes", notes);
    fd.append("tableId", String(tableId));

    try {
      const result = await createReservation(null, fd);
      if (result.success) {
        setResCode(
          result.reservationId
            ? `ST-${result.reservationId.slice(-4).toUpperCase()}`
            : `ST-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
        );
        goStep(4);
        setCelebrateSignal((s) => s + 1);
      } else {
        setServerError(result.message || t.actions.serverError);
      }
    } catch {
      setServerError(t.actions.serverError);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step === 1) {
      if (selectedDate === null || timeIdx === null) return setStepError(true);
      goStep(2);
    } else if (step === 2) {
      if (tableId === null) return setStepError(true);
      goStep(3);
    } else if (step === 3) {
      handleSubmit();
    } else {
      router.push("/");
    }
  };

  const capLine =
    step === 1
      ? t.reservation3d.capLive
      : step === 2
        ? t.reservation3d.capPick
        : step === 3
          ? t.reservation3d.capLast
          : t.reservation3d.capWait;

  const stepLabels = [
    t.reservation3d.stepDate,
    t.reservation3d.stepTable,
    t.reservation3d.stepDetails,
    t.reservation3d.stepConfirm,
  ];

  const flabel = "text-[10px] tracking-[.34em] uppercase text-gold mt-[22px] mb-3 first:mt-0";
  const errClass = "mt-[14px] text-xs tracking-[.04em] text-[#C97B7B]";
  const fieldInput =
    "w-full bg-bone/4 border border-line text-bone py-[13px] px-[15px] font-light transition-[border-color,background-color] duration-300 focus:border-gold focus:bg-bone/7 placeholder:text-bone/30";

  return (
    <main className="h-[100svh] w-full overflow-hidden relative">
      <CustomCursor />
      <Header variant="back" />

      {/* --- 3D sahne --- */}
      <div className="fixed inset-0 z-1">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,#101c2c,var(--ink)_72%)]" />
        <DiningRoom
          step={step}
          occupied={occupied}
          selectedId={tableId}
          guests={guests}
          timeIdx={timeIdx}
          celebrateSignal={celebrateSignal}
          onSelect={(id) => {
            setTableId(id);
            if (id !== null) {
              setStepError(false);
              setIsCollapsed(false);
            }
          }}
          texts={texts}
        />
        <div className="absolute inset-0 z-2 pointer-events-none bg-[linear-gradient(to_right,rgba(8,16,22,.85),transparent_42%),linear-gradient(to_top,rgba(8,16,22,.6),transparent_25%)] max-md:bg-[linear-gradient(to_top,rgba(8,16,22,.92)_0%,rgba(8,16,22,.4)_45%,transparent_65%)]" />
      </div>

      {/* --- sahne köşe bilgisi --- */}
      <div className="fixed right-[max(24px,3vw)] bottom-[26px] max-md:top-[84px] max-md:bottom-auto max-md:right-[18px] z-55 text-right text-[10px] tracking-[.34em] uppercase text-bone/40 pointer-events-none">
        <div className="font-serif italic text-xl tracking-[.04em] text-gold-bright/75 normal-case mb-1">
          {t.reservation3d.hall}
        </div>
        <div>{capLine}</div>
      </div>

      <aside className={`fixed z-60 top-24 left-[max(24px,3vw)] bottom-7 w-[min(440px,92vw)] flex flex-col bg-[rgba(10,18,26,.78)] border border-line backdrop-blur-2xl transition-[max-height] duration-500 ease-(--ease-stellato) max-md:top-auto max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:w-full max-md:border-x-0 max-md:border-b-0 max-md:border-t max-md:border-line ${mobileHeightClass} ${step === 2 && isCollapsed ? "max-md:overflow-hidden" : ""}`}>
        {/* Mobile drag handle & collapse toggle */}
        <div className="hidden max-md:flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
          <div className="w-[80px]" />
          <div className="w-12 h-1 bg-bone/20 rounded-full" />
          <div className="w-[80px] text-right">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-[9px] tracking-[.18em] uppercase text-gold hover:text-gold-bright transition-colors py-[3px] px-2 bg-ink/40 border border-line rounded select-none cursor-pointer"
              >
                {isCollapsed ? t.reservation3d.showPanel : t.reservation3d.hidePanel}
              </button>
            )}
          </div>
        </div>

        <div className="pt-[26px] px-[30px] max-md:pt-3 max-md:px-5">
          <span className="inline-flex items-center gap-3 text-[10px] tracking-[.42em] uppercase text-gold before:content-[''] before:w-[30px] before:h-px before:bg-gold before:opacity-70">
            {t.reservation3d.eyebrow}
          </span>
          <h1 className="text-[clamp(26px,3vw,34px)] leading-[1.1] mt-3">
            {t.riserva.title1}{" "}
            <span className="italic font-normal text-gold">{t.riserva.title2}</span>
          </h1>
        </div>

        {/* adım çubuğu */}
        <div className="flex mx-[30px] mt-[22px] border-b border-line max-md:mx-5 max-md:mt-3">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const state = n === step ? "now" : n < step ? "done" : "todo";
            return (
              <div
                key={label}
                className={`flex-1 pt-[10px] pb-3 text-center relative text-[9px] tracking-[.3em] uppercase transition-colors duration-[400ms] after:content-[''] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gold after:transition-transform after:duration-500 after:ease-(--ease-stellato) ${
                  state === "now"
                    ? "text-gold-bright after:scale-x-100"
                    : state === "done"
                      ? "text-gold/70 after:scale-x-100"
                      : "text-bone/35 after:scale-x-0"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        <div
          ref={panelBodyRef}
          className="flex-1 overflow-y-auto pt-6 px-[30px] pb-5 max-md:pt-4 max-md:px-5 max-md:pb-4 [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent]"
        >
          {/* ADIM 1: tarih + saat + kişi */}
          {step === 1 && (
            <section>
              <div className={flabel}>{t.reservation3d.stepDate}</div>
              <div className="flex gap-2 mb-3 w-full">
                {months.map((m, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMonthOffset(i)}
                    className={`flex-1 py-2 px-3 max-md:px-1 text-[10px] max-md:text-[9px] tracking-[.26em] max-md:tracking-[.12em] text-center uppercase border transition-colors duration-300 ${
                      monthOffset === i
                        ? "border-gold text-gold-bright"
                        : "border-line text-bone/45 hover:border-gold/55 hover:text-bone"
                    }`}
                  >
                    {m.toLocaleDateString(dateLocale, { month: "long" })}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent]">
                {days.map((d) => {
                  const iso = toISODate(d);
                  const sel = selectedISO === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`shrink-0 min-w-16 py-[10px] px-2 text-center border transition-colors duration-300 ${
                        sel ? "bg-gold border-gold" : "border-line hover:border-gold/55"
                      }`}
                    >
                      <div className={`text-[9px] tracking-[.2em] uppercase ${sel ? "text-ink" : "text-bone/50"}`}>
                        {iso === todayISO
                          ? t.reservation3d.today
                          : d.toLocaleDateString(dateLocale, { weekday: "short" })}
                      </div>
                      <div className={`font-serif text-[21px] my-[2px] ${sel ? "text-ink" : "text-bone"}`}>
                        {d.getDate()}
                      </div>
                      <div className={`text-[9px] tracking-[.2em] uppercase ${sel ? "text-ink" : "text-bone/50"}`}>
                        {d.toLocaleDateString(dateLocale, { month: "short" })}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={flabel}>{t.reservation3d.timeLabel}</div>
              <div className="grid grid-cols-5 max-md:grid-cols-4 gap-2">
                {TIME_SLOTS.map((time, i) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setTimeIdx(i)}
                    className={`py-[10px] text-center border text-[13px] tracking-[.06em] transition-colors duration-300 ${
                      timeIdx === i
                        ? "bg-gold border-gold text-ink font-normal"
                        : "border-line hover:border-gold/55"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className={flabel}>{t.reservationForm.guests}</div>
              <div className="flex items-center gap-[22px] border border-line py-[10px] px-[18px] w-max">
                <button
                  type="button"
                  aria-label="−"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-[34px] h-[34px] border border-line text-lg leading-none hover:border-gold hover:text-gold-bright transition-colors duration-300"
                >
                  −
                </button>
                <span className="font-serif text-[26px] min-w-[34px] text-center">{guests}</span>
                <button
                  type="button"
                  aria-label="+"
                  onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                  className="w-[34px] h-[34px] border border-line text-lg leading-none hover:border-gold hover:text-gold-bright transition-colors duration-300"
                >
                  +
                </button>
                <span className="text-[10px] tracking-[.26em] uppercase text-bone/50">
                  {t.reservation3d.guestCap}
                </span>
              </div>

              {stepError && <p className={errClass}>{t.reservation3d.err1}</p>}
            </section>
          )}

          {/* ADIM 2: masa seçimi (3D sahnede) */}
          {step === 2 && (
            <section>
              <div className={flabel}>{t.reservation3d.pickTitle}</div>
              <div className="flex gap-[18px] flex-wrap mb-[6px]">
                <span className="flex items-center gap-[9px] text-[10px] tracking-[.24em] uppercase text-bone/60">
                  <i className="w-[11px] h-[11px] rounded-full inline-block bg-gold-bright shadow-[0_0_8px_rgba(232,207,163,.8)]" />
                  {t.tableSelection.available}
                </span>
                <span className="flex items-center gap-[9px] text-[10px] tracking-[.24em] uppercase text-bone/60">
                  <i className="w-[11px] h-[11px] rounded-full inline-block bg-[#5b2c39]" />
                  {t.tableSelection.full}
                </span>
                <span className="flex items-center gap-[9px] text-[10px] tracking-[.24em] uppercase text-bone/60">
                  <i className="w-[11px] h-[11px] rounded-full inline-block bg-white shadow-[0_0_10px_var(--gold-bright)]" />
                  {t.tableSelection.selected}
                </span>
              </div>
              <p className="text-[13px] text-bone/55 mt-[14px] leading-[1.7]">
                {t.reservation3d.pickHint}
              </p>

              {selectedTable && (
                <div className="mt-[18px] border border-line py-[18px] px-5">
                  <div className="font-serif text-2xl text-gold-bright">
                    {texts.tableLabel(selectedTable)}
                  </div>
                  <div className="text-[10px] tracking-[.26em] uppercase text-bone/55 mt-[6px]">
                    {texts.zones[selectedTable.zone]} · {selectedTable.seats} {t.reservation3d.seats}
                  </div>
                </div>
              )}

              {stepError && <p className={errClass}>{t.reservationForm.selectTableError}</p>}
            </section>
          )}

          {/* ADIM 3: iletişim bilgileri */}
          {step === 3 && (
            <section>
              <div className={flabel}>{t.reservationForm.completeInfo}</div>
              <div className="mb-4">
                <label htmlFor="fName" className="block text-[10px] tracking-[.3em] uppercase text-gold mb-2">
                  {t.reservationForm.name}
                </label>
                <input
                  id="fName"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fPhone" className="block text-[10px] tracking-[.3em] uppercase text-gold mb-2">
                  {t.reservationForm.phone}
                </label>
                <input
                  id="fPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+90 5xx xxx xx xx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fMail" className="block text-[10px] tracking-[.3em] uppercase text-gold mb-2">
                  {t.reservationForm.email}
                </label>
                <input
                  id="fMail"
                  type="email"
                  autoComplete="email"
                  placeholder="ornek@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fNote" className="block text-[10px] tracking-[.3em] uppercase text-gold mb-2">
                  {t.reservationForm.notes}{" "}
                  <span className="opacity-50 tracking-[.1em]">{t.reservation3d.optional}</span>
                </label>
                <textarea
                  id="fNote"
                  placeholder={t.reservation3d.notePlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${fieldInput} resize-none h-[74px]`}
                />
              </div>
              {stepError && <p className={errClass}>{t.reservation3d.err3}</p>}
              {serverError && <p className={errClass}>{serverError}</p>}
            </section>
          )}

          {/* ADIM 4: onay */}
          {step === 4 && (
            <section>
              <div className="text-center mt-[6px] mb-[14px]">
                <span className="text-[34px] text-gold inline-block">✦</span>
              </div>
              <div className="border border-line">
                {[
                  { k: t.reservation3d.sumGuest, v: name },
                  {
                    k: t.reservationManage.date,
                    v: selectedDate
                      ? selectedDate.toLocaleDateString(dateLocale, {
                          day: "numeric",
                          month: "short",
                          weekday: "short",
                        })
                      : "",
                  },
                  { k: t.reservationManage.time, v: timeIdx !== null ? TIME_SLOTS[timeIdx] : "" },
                  { k: t.reservationManage.guests, v: `${guests} ${t.reservation3d.guestCap}` },
                  {
                    k: t.reservation3d.stepTable,
                    v: selectedTable
                      ? `${texts.tableLabel(selectedTable)} · ${texts.zones[selectedTable.zone]}`
                      : "",
                  },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between gap-4 py-[14px] px-5 border-b border-line last:border-b-0"
                  >
                    <span className="text-[10px] tracking-[.28em] uppercase text-bone/50 pt-1">
                      {row.k}
                    </span>
                    <span className="font-serif text-[17px] text-right">{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-[18px] p-4 border border-dashed border-gold/50">
                <div className="font-serif text-[26px] tracking-[.2em] text-gold-bright">{resCode}</div>
                <div className="text-[9px] tracking-[.34em] uppercase text-bone/50 mt-1">
                  {t.reservation3d.codeLabel}
                </div>
              </div>
              <p className="text-[12.5px] text-bone/55 text-center mt-4 leading-[1.7]">
                {t.reservation3d.confirmNote}
                <br />A presto! ✦
              </p>
            </section>
          )}
        </div>

        <div className="flex gap-3 pt-[18px] px-[30px] pb-6 border-t border-line max-md:px-5 max-md:py-4">
          {step > 1 && step < 4 && (
            <button
              type="button"
              data-hover
              onClick={() => goStep(step - 1)}
              className="flex-1 py-4 px-[10px] max-md:py-3 text-center text-[11px] tracking-[.3em] uppercase border border-line text-bone/70 hover:border-gold hover:text-gold-bright transition-colors duration-[350ms]"
            >
              {t.reservationForm.back}
            </button>
          )}
          <button
            type="button"
            data-hover
            disabled={submitting}
            onClick={next}
            className="flex-1 py-4 px-[10px] max-md:py-3 text-center text-[11px] tracking-[.3em] uppercase bg-gold text-ink hover:bg-gold-bright transition-colors duration-[350ms] disabled:opacity-35 disabled:pointer-events-none"
          >
            {submitting
              ? t.reservationForm.processing
              : step === 3
                ? t.reservation3d.confirm
                : step === 4
                  ? t.reservationForm.backToHome
                  : t.reservationForm.continue}
          </button>
        </div>
      </aside>
    </main>
  );
}
