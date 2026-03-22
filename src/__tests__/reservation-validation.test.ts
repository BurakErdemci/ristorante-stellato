import { describe, it, expect } from "vitest";
import { z } from "zod";

// Server action içindeki validasyon şemasının aynısı
const reservationSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Telefon numarası eksik veya hatalı."),
  date: z.string(),
  guests: z.coerce.number().min(1, "Kişi sayısı en az 1 olmalıdır."),
  tableId: z.coerce.number().min(1, "Lütfen bir masa seçiniz."),
  notes: z.string().optional().or(z.literal("")),
});

describe("Rezervasyon Validasyonu", () => {
  const validData = {
    name: "Marco Rossi",
    email: "marco@email.com",
    phone: "+90 532 111 2233",
    date: "2026-04-01T19:00",
    guests: 4,
    tableId: 7,
    notes: "Pencere kenarı",
  };

  it("geçerli veriyi kabul etmeli", () => {
    const result = reservationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("not olmadan da kabul etmeli", () => {
    const { notes, ...withoutNotes } = validData;
    const result = reservationSchema.safeParse(withoutNotes);
    expect(result.success).toBe(true);
  });

  it("boş not ile kabul etmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, notes: "" });
    expect(result.success).toBe(true);
  });

  // İsim validasyonu
  it("1 karakterli ismi reddetmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "İsim en az 2 karakter olmalıdır."
    );
  });

  it("boş ismi reddetmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  // Email validasyonu
  it("geçersiz emaili reddetmeli", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      email: "gecersiz-email",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Geçerli bir e-posta adresi giriniz."
    );
  });

  it("@ eksik emaili reddetmeli", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      email: "marco.com",
    });
    expect(result.success).toBe(false);
  });

  // Telefon validasyonu
  it("kısa telefon numarasını reddetmeli", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      phone: "123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Telefon numarası eksik veya hatalı."
    );
  });

  // Kişi sayısı validasyonu
  it("0 kişiyi reddetmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, guests: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Kişi sayısı en az 1 olmalıdır."
    );
  });

  it("negatif kişi sayısını reddetmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, guests: -2 });
    expect(result.success).toBe(false);
  });

  it("string kişi sayısını coerce ile kabul etmeli", () => {
    const result = reservationSchema.safeParse({ ...validData, guests: "3" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.guests).toBe(3);
    }
  });

  // Masa seçimi validasyonu
  it("masa seçilmemişse reddetmeli (tableId: 0)", () => {
    const result = reservationSchema.safeParse({ ...validData, tableId: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Lütfen bir masa seçiniz."
    );
  });

  it("string tableId'yi coerce ile kabul etmeli", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      tableId: "10",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tableId).toBe(10);
    }
  });
});
