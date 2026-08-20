# Server actions, data model and authentication

Server action signatures, the MongoDB schema, environment variables and the
auth flow.

---

## 🔌 API Endpoints

### Server Actions (Next.js 16)

```typescript
// Rezervasyon Oluşturma (FormData ile)
createReservation(prevState, formData) → ActionResult

// Tüm Rezervasyonları Getirme (Admin)
getReservations() → { success, data: Reservation[] }

// Rezervasyon Durum Güncelleme
updateReservationStatus(id, newStatus) → ActionResult

// Rezervasyon Silme
deleteReservation(id) → ActionResult

// Dolu Masaları Sorgulama
getReservedTables(dateStr, timeStr) → { success, occupiedTableIds }

// Müşteri Tarafı Rezervasyon Görüntüleme
getReservationById(id) → Reservation | null

// Müşteri Tarafı Rezervasyon İptali
cancelReservationByUser(id) → ActionResult
```

### Auth API (NextAuth v5)

```
GET/POST  /api/auth/[...nextauth]   # NextAuth handler (session, csrf, signin, signout)
```

---

## 🗄️ Veritabanı Şeması

### Reservation Model

```typescript
interface IReservation {
  name: string;          // Müşteri adı
  email: string;         // E-posta
  phone: string;         // Telefon
  date: Date;            // Rezervasyon tarihi ve saati
  guests: number;        // Kişi sayısı (1-10)
  tableId: number;       // Masa numarası
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;        // Özel notlar
  createdAt: Date;       // Oluşturulma tarihi
}
```


---

## 🔐 Environment Variables

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `MONGO_URI` | MongoDB bağlantı string'i | `mongodb+srv://...` |
| `EMAIL_USER` | Gmail hesap adresi | `example@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 haneli) | `abcd efgh ijkl mnop` |
| `NEXT_PUBLIC_BASE_URL` | Uygulama base URL | `http://localhost:3000` |
| `AUTH_SECRET` | NextAuth oturum şifreleme anahtarı | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin giriş e-postası | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin giriş şifresi | `SecurePass123!` |
| `NEXT_PUBLIC_ADMIN_ROUTE` | Gizli admin panel URL slug'ı | `gestione-x8k2m` |

---

## 🔐 Authentication

Admin paneli **NextAuth v5 (Auth.js)** ile korunmaktadır.

### Mimari

- **Provider**: Credentials (e-posta + şifre, `.env` tabanlı)
- **Middleware**: Tüm admin rotaları middleware seviyesinde korunur
- **Gizli URL**: Admin paneli tahmin edilemez bir slug ile erişilir (`NEXT_PUBLIC_ADMIN_ROUTE`)
- **Doğrudan engel**: `/admin` URL'ine erişim otomatik olarak ana sayfaya yönlendirir
- **Internal rewrite**: Gizli URL, middleware tarafından fiziksel `/admin` sayfalarına rewrite edilir

### Güvenlik Akışı

```
Kullanıcı /{gizli-slug} → Middleware → Giriş yapmış mı?
                                          ├─ Evet → Rewrite → /admin (internal)
                                          └─ Hayır → Redirect → /{gizli-slug}/login

Kullanıcı /admin → Middleware → Redirect → / (ana sayfa)
```

---

---

[← Back to the README](../README.md)
