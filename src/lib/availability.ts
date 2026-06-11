import { DINING_TABLES, TIME_SLOTS } from "@/data/tables";

/**
 * Seçilen tarih+saat için dolu masa id'lerini döndürür.
 *
 * ŞİMDİLİK MOCK: tarih+saat tohumlu deterministik doluluk üretir
 * (aynı tarih/saat her zaman aynı sonucu verir, akşam ilerledikçe doluluk artar).
 *
 * Gerçek backend'e bağlamak için bu fonksiyonun gövdesini
 * `getReservedTables(dateISO, time)` server action'ı ile değiştirmek yeterli
 * (src/actions/reservationActions.ts) — imza aynı kalır.
 */
export async function getAvailability(dateISO: string, time: string): Promise<number[]> {
  const dayIdx = Math.floor(new Date(`${dateISO}T00:00:00`).getTime() / 86_400_000);
  const timeIdx = Math.max(0, (TIME_SLOTS as readonly string[]).indexOf(time));
  const rnd = mulberry32(dayIdx * 101 + timeIdx * 13 + 7);
  const fillRate = 0.22 + timeIdx * 0.035;
  return DINING_TABLES.filter(() => rnd() < fillRate).map((t) => t.id);
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
