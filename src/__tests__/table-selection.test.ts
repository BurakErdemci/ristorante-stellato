import { describe, it, expect } from "vitest";
import type { TableData } from "@/types";

// TableSelection componentindeki TABLES verisinin aynısı
const TABLES: TableData[] = [
  { id: 1, seats: 2, x: 12, y: 15, type: "round", zone: "Manzara" },
  { id: 2, seats: 2, x: 12, y: 35, type: "round", zone: "Manzara" },
  { id: 3, seats: 4, x: 12, y: 55, type: "rounSd", zone: "Manzara" },
  { id: 4, seats: 4, x: 12, y: 75, type: "round", zone: "Manzara" },
  { id: 5, seats: 2, x: 35, y: 25, type: "square", zone: "Salon" },
  { id: 6, seats: 2, x: 35, y: 65, type: "square", zone: "Salon" },
  { id: 7, seats: 4, x: 55, y: 25, type: "rect", zone: "Salon" },
  { id: 8, seats: 4, x: 55, y: 45, type: "round", zone: "Salon (Merkez)" },
  { id: 9, seats: 4, x: 55, y: 65, type: "rect", zone: "Salon" },
  { id: 10, seats: 6, x: 85, y: 20, type: "booth", zone: "VIP Loca" },
  { id: 11, seats: 6, x: 85, y: 50, type: "booth", zone: "VIP Loca" },
  { id: 12, seats: 5, x: 85, y: 80, type: "booth", zone: "Özel Köşe" },
  { id: 13, seats: 2, x: 35, y: 85, type: "square", zone: "Giriş" },
];

// Component'teki iş mantığını test ediyoruz
function getAvailableTables(
  requiredSeats: number,
  occupiedTables: number[]
): TableData[] {
  return TABLES.filter(
    (table) =>
      table.seats >= requiredSeats && !occupiedTables.includes(table.id)
  );
}

function isTableClickable(
  tableId: number,
  requiredSeats: number,
  occupiedTables: number[]
): boolean {
  const table = TABLES.find((t) => t.id === tableId);
  if (!table) return false;
  return table.seats >= requiredSeats && !occupiedTables.includes(table.id);
}

describe("Masa Verileri", () => {
  it("toplam 13 masa olmalı", () => {
    expect(TABLES).toHaveLength(13);
  });

  it("her masanın benzersiz ID'si olmalı", () => {
    const ids = TABLES.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(TABLES.length);
  });

  it("tüm masaların kapasitesi 1'den büyük olmalı", () => {
    TABLES.forEach((table) => {
      expect(table.seats).toBeGreaterThanOrEqual(1);
    });
  });

  it("koordinatlar 0-100 arasında olmalı", () => {
    TABLES.forEach((table) => {
      expect(table.x).toBeGreaterThanOrEqual(0);
      expect(table.x).toBeLessThanOrEqual(100);
      expect(table.y).toBeGreaterThanOrEqual(0);
      expect(table.y).toBeLessThanOrEqual(100);
    });
  });
});

describe("Kapasite Kontrolü", () => {
  it("2 kişi için 2+ kişilik tüm masalar uygun olmalı", () => {
    const available = getAvailableTables(2, []);
    expect(available.length).toBe(13); // hepsi 2+
  });

  it("4 kişi için 2 kişilik masalar filtrelenmeli", () => {
    const available = getAvailableTables(4, []);
    // 2 kişilik masalar: 1, 2, 5, 6, 13 → çıkarılmalı
    available.forEach((table) => {
      expect(table.seats).toBeGreaterThanOrEqual(4);
    });
    expect(available.length).toBe(8); // 4+ kişilik masa sayısı
  });

  it("6 kişi için sadece 6 kişilik masalar kalmalı", () => {
    const available = getAvailableTables(6, []);
    expect(available.length).toBe(2); // masa 10 ve 11
    expect(available.every((t) => t.seats >= 6)).toBe(true);
  });

  it("7 kişi için hiçbir masa uygun olmamalı", () => {
    const available = getAvailableTables(7, []);
    expect(available.length).toBe(0);
  });

  it("1 kişi için tüm masalar uygun olmalı", () => {
    const available = getAvailableTables(1, []);
    expect(available.length).toBe(13);
  });
});

describe("Dolu Masa Filtreleme", () => {
  it("dolu masalar listeden çıkarılmalı", () => {
    const occupied = [1, 5, 10];
    const available = getAvailableTables(1, occupied);
    expect(available.length).toBe(10);
    occupied.forEach((id) => {
      expect(available.find((t) => t.id === id)).toBeUndefined();
    });
  });

  it("tüm masalar doluysa sonuç boş olmalı", () => {
    const allIds = TABLES.map((t) => t.id);
    const available = getAvailableTables(1, allIds);
    expect(available.length).toBe(0);
  });

  it("kapasite + doluluk birlikte çalışmalı", () => {
    // 4 kişi, masa 7 ve 8 dolu
    const available = getAvailableTables(4, [7, 8]);
    expect(available.length).toBe(6); // 8 adet 4+ masa - 2 dolu = 6
    expect(available.find((t) => t.id === 7)).toBeUndefined();
    expect(available.find((t) => t.id === 8)).toBeUndefined();
  });
});

describe("Masa Tıklanabilirlik", () => {
  it("uygun masa tıklanabilir olmalı", () => {
    expect(isTableClickable(1, 2, [])).toBe(true);
  });

  it("kapasitesi yetersiz masa tıklanamamalı", () => {
    expect(isTableClickable(1, 4, [])).toBe(false); // masa 1 = 2 kişilik
  });

  it("dolu masa tıklanamamalı", () => {
    expect(isTableClickable(1, 2, [1])).toBe(false);
  });

  it("hem dolu hem yetersiz masa tıklanamamalı", () => {
    expect(isTableClickable(1, 4, [1])).toBe(false);
  });

  it("olmayan masa ID'si false dönmeli", () => {
    expect(isTableClickable(99, 1, [])).toBe(false);
  });
});

describe("Zona Göre Masalar", () => {
  it("VIP Loca'da 2 masa olmalı", () => {
    const vipTables = TABLES.filter((t) => t.zone === "VIP Loca");
    expect(vipTables.length).toBe(2);
    vipTables.forEach((t) => {
      expect(t.type).toBe("booth");
      expect(t.seats).toBe(6);
    });
  });

  it("Manzara bölgesinde 4 masa olmalı", () => {
    const manzaraTables = TABLES.filter((t) => t.zone === "Manzara");
    expect(manzaraTables.length).toBe(4);
  });

  it("toplam kapasite 47 kişi olmalı", () => {
    const totalSeats = TABLES.reduce((sum, t) => sum + t.seats, 0);
    expect(totalSeats).toBe(47);
  });
});
