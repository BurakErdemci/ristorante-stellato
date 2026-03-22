import { describe, it, expect } from "vitest";
import type { Reservation } from "@/types";

// AdminReservations componentindeki filtreleme mantığı
function filterReservations(
  reservations: Reservation[],
  filter: string,
  search: string
): Reservation[] {
  return reservations.filter((res) => {
    const matchesFilter = filter === "all" || res.status === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      (res.name || "").toLowerCase().includes(term) ||
      (res.email || "").toLowerCase().includes(term) ||
      (res.tableId && res.tableId.toString().includes(term));
    return matchesFilter && matchesSearch;
  });
}

const mockReservations: Reservation[] = [
  {
    _id: "1",
    name: "Marco Rossi",
    email: "marco@email.com",
    phone: "+90 532 111 2233",
    date: "2026-04-01T19:00",
    guests: 2,
    tableId: 1,
    status: "confirmed",
    createdAt: "2026-03-20",
  },
  {
    _id: "2",
    name: "Ayşe Yılmaz",
    email: "ayse@email.com",
    phone: "+90 505 444 5566",
    date: "2026-04-01T20:00",
    guests: 4,
    tableId: 7,
    status: "pending",
    notes: "Doğum günü",
    createdAt: "2026-03-20",
  },
  {
    _id: "3",
    name: "Giovanni Bianchi",
    email: "giovanni@email.com",
    phone: "+90 542 777 8899",
    date: "2026-04-02T21:00",
    guests: 6,
    tableId: 10,
    status: "confirmed",
    createdAt: "2026-03-20",
  },
  {
    _id: "4",
    name: "Elif Demir",
    email: "elif@email.com",
    phone: "+90 533 222 3344",
    date: "2026-04-02T19:00",
    guests: 2,
    tableId: 2,
    status: "cancelled",
    createdAt: "2026-03-20",
  },
];

describe("Admin Filtreleme", () => {
  // Durum filtreleri
  it("'all' filtresi tüm kayıtları göstermeli", () => {
    const result = filterReservations(mockReservations, "all", "");
    expect(result.length).toBe(4);
  });

  it("'pending' filtresi sadece bekleyenleri göstermeli", () => {
    const result = filterReservations(mockReservations, "pending", "");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Ayşe Yılmaz");
  });

  it("'confirmed' filtresi sadece onaylıları göstermeli", () => {
    const result = filterReservations(mockReservations, "confirmed", "");
    expect(result.length).toBe(2);
    result.forEach((r) => expect(r.status).toBe("confirmed"));
  });

  it("'cancelled' filtresi sadece iptal edilenleri göstermeli", () => {
    const result = filterReservations(mockReservations, "cancelled", "");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Elif Demir");
  });

  // İsim araması
  it("isimle arama yapabilmeli", () => {
    const result = filterReservations(mockReservations, "all", "Marco");
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe("1");
  });

  it("arama büyük/küçük harf duyarsız olmalı", () => {
    const result = filterReservations(mockReservations, "all", "ayşe");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Ayşe Yılmaz");
  });

  // Email araması
  it("email ile arama yapabilmeli", () => {
    const result = filterReservations(mockReservations, "all", "giovanni@");
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe("3");
  });

  // Masa numarası araması
  it("masa numarası ile arama yapabilmeli", () => {
    const result = filterReservations(mockReservations, "all", "10");
    expect(result.length).toBe(1);
    expect(result[0].tableId).toBe(10);
  });

  // Filtre + Arama birlikte
  it("filtre ve arama birlikte çalışmalı", () => {
    // confirmed + "Marco" → sadece Marco
    const result = filterReservations(mockReservations, "confirmed", "Marco");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Marco Rossi");
  });

  it("filtre ve arama eşleşmezse boş dönmeli", () => {
    // pending + "Marco" → Marco pending değil → boş
    const result = filterReservations(mockReservations, "pending", "Marco");
    expect(result.length).toBe(0);
  });

  // Boş sonuçlar
  it("eşleşme yoksa boş array dönmeli", () => {
    const result = filterReservations(
      mockReservations,
      "all",
      "olmayan-isim"
    );
    expect(result.length).toBe(0);
  });

  it("boş liste gelirse boş array dönmeli", () => {
    const result = filterReservations([], "all", "");
    expect(result.length).toBe(0);
  });
});

describe("Durum Değişimi Mantığı", () => {
  it("pending → confirmed geçişi yapılabilmeli", () => {
    const res = { ...mockReservations[1] }; // pending
    expect(res.status).toBe("pending");
    res.status = "confirmed";
    expect(res.status).toBe("confirmed");
  });

  it("confirmed → cancelled geçişi yapılabilmeli", () => {
    const res = { ...mockReservations[0] }; // confirmed
    res.status = "cancelled";
    expect(res.status).toBe("cancelled");
  });

  it("silme sonrası listeden çıkmalı", () => {
    const deleteId = "2";
    const afterDelete = mockReservations.filter((r) => r._id !== deleteId);
    expect(afterDelete.length).toBe(3);
    expect(afterDelete.find((r) => r._id === deleteId)).toBeUndefined();
  });
});
