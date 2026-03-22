import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("MONGO_URI bulunamadı. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

// Schema'yı burada tanımlıyoruz (model import Next.js context dışında çalışmaz)
const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1, max: 10 },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  notes: { type: String, trim: true },
  tableId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);

// Önümüzdeki 7 gün içinden rastgele tarih
function futureDate(daysAhead: number, hour: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, 0, 0, 0);
  return d;
}

const SEED_DATA = [
  {
    name: "Marco Rossi",
    email: "marco.rossi@email.com",
    phone: "+90 532 111 2233",
    date: futureDate(1, 19),
    guests: 2,
    status: "confirmed",
    notes: "Pencere kenarı tercih ediyor",
    tableId: 1,
  },
  {
    name: "Ayşe Yılmaz",
    email: "ayse.yilmaz@email.com",
    phone: "+90 505 444 5566",
    date: futureDate(1, 20),
    guests: 4,
    status: "pending",
    notes: "Doğum günü kutlaması",
    tableId: 7,
  },
  {
    name: "Giovanni Bianchi",
    email: "giovanni.b@email.com",
    phone: "+90 542 777 8899",
    date: futureDate(2, 21),
    guests: 6,
    status: "confirmed",
    notes: "Gluten alerjisi var",
    tableId: 10,
  },
  {
    name: "Elif Demir",
    email: "elif.demir@email.com",
    phone: "+90 533 222 3344",
    date: futureDate(2, 19),
    guests: 2,
    status: "pending",
    tableId: 2,
  },
  {
    name: "Mehmet Kaya",
    email: "mehmet.kaya@email.com",
    phone: "+90 544 666 7788",
    date: futureDate(3, 20),
    guests: 4,
    status: "confirmed",
    notes: "İş yemeği — sessiz köşe lütfen",
    tableId: 8,
  },
  {
    name: "Sofia Colombo",
    email: "sofia.colombo@email.com",
    phone: "+90 535 999 0011",
    date: futureDate(3, 21),
    guests: 2,
    status: "cancelled",
    notes: "İptal — seyahat planı değişti",
    tableId: 5,
  },
  {
    name: "Burak Çelik",
    email: "burak.celik@email.com",
    phone: "+90 506 333 4455",
    date: futureDate(4, 19),
    guests: 5,
    status: "pending",
    notes: "Yıldönümü yemeği, sürpriz pasta",
    tableId: 12,
  },
  {
    name: "Luca Moretti",
    email: "luca.moretti@email.com",
    phone: "+90 537 888 9900",
    date: futureDate(5, 20),
    guests: 6,
    status: "confirmed",
    notes: "VIP misafir — özel menü",
    tableId: 11,
  },
];

async function seed() {
  console.log("MongoDB'ye bağlanılıyor...");
  await mongoose.connect(MONGO_URI);
  console.log("Bağlantı başarılı.");

  // Mevcut verileri temizle
  const existing = await Reservation.countDocuments();
  if (existing > 0) {
    console.log(`${existing} mevcut kayıt siliniyor...`);
    await Reservation.deleteMany({});
  }

  // Seed verilerini ekle
  const result = await Reservation.insertMany(SEED_DATA);
  console.log(`${result.length} demo rezervasyon eklendi.`);

  await mongoose.disconnect();
  console.log("Seed tamamlandı.");
}

seed().catch((err) => {
  console.error("Seed hatası:", err);
  process.exit(1);
});
