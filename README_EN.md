# 🍝 Ristorante Stellato

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-v5-blueviolet?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

**Modern Full-Stack Reservation Management System**

A professional reservation platform designed for a Michelin-starred Italian restaurant, featuring interactive table selection and an advanced management dashboard.

[🌐 Live Demo](https://ristorante-stellato-puum.vercel.app) • [📸 Screenshots](./screenshots.md) • [🚀 Installation](#-installation)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**Ristorante Stellato** is a full-stack reservation management system developed with Next.js 16 and Server Actions, designed for real-world needs. The project brings together modern web development practices and a premium user experience, providing a seamless experience for both customers and restaurant management.

### ⭐ What Makes This Project Special?

- 🎨 **Interactive Table Selection**: Visual table selection on floor plans with automatic capacity control
- 📱 **Modern UX**: Smooth reservation process with a multi-step form
- 🔄 **Real-time Validation**: Smart system that blocks booked time slots and past dates
- 📧 **Automatic Notifications**: Reservation confirmation via email and a personalized tracking link for the customer
- 📊 **Powerful Dashboard**: Statistics, filtering, and live search features
- 🔐 **Secure Auth**: Admin panel protected with NextAuth v5, hidden URL routing
- 🌍 **Multi-language**: Full support for Turkish, English, and Italian (i18n)
- 🎨 **Dark/Light Theme**: Eye-friendly warm cream tones for light theme and a premium dark theme
- 📱 **PWA Support**: Offline access, add to home screen, service worker
- 🛡️ **Rate Limiting**: Spam protection with IP-based request throttling
- 🚀 **Production Ready**: Live on Vercel, secure data management with MongoDB Atlas

---

## ✨ Features

### 🎫 Customer Side

#### 1️⃣ Interactive Table Selection
```
✅ Visual selection on the restaurant floor plan
✅ Capacity control (a 2-person table cannot be selected for 4 guests)
✅ Automatic marking of occupied tables
✅ Detail preview with hover effects
```

#### 2️⃣ Multi-Step Reservation Form
- **Step 1**: Date and time selection
- **Step 2**: Table selection (interactive floor plan)
- **Step 3**: Contact information
- **Step 4**: Reservation summary and confirmation

#### 3️⃣ Smart Calendar System
```javascript
✅ Blocking past dates
✅ Automatically closing fully booked time slots
✅ Restaurant operating hours control
✅ Special day and holiday management
```

#### 4️⃣ Email Notification
- Instant reservation confirmation email
- Personalized reservation tracking link for the customer
- Reservation details (date, time, table, number of guests)
- Self-service cancellation option

#### 5️⃣ Multi-language Support (i18n)
- **3 Languages**: Turkish (default), English, Italian
- **Language selector in Navbar**: Dropdown menu with flag and name
- **Persistent via LocalStorage**: Selected language is remembered
- **Full coverage**: All UI texts, menu descriptions, form labels, error messages
- **Locale-aware date format**: Date/time display based on selected language

#### 6️⃣ Dark/Light Theme
- **Theme toggle in Navbar**: Switch with a single click
- **Warm tones**: Light theme in eye-friendly cream/beige shades
- **Photo pages preserved**: Reservation and login pages always remain dark (`force-dark`)
- **Persistent via LocalStorage**: Preference is remembered

#### 7️⃣ PWA (Progressive Web App)
- **Add to home screen**: Native app feel on mobile
- **Service Worker**: Static assets and pages cached offline
- **Web App Manifest**: Icon, theme color, and splash screen configuration

#### 8️⃣ Rate Limiting
- **IP-based**: Request throttling with sliding window algorithm
- **Reservation protection**: Prevents spam form submissions
- **Cancellation protection**: Blocks malicious bulk cancellation attempts
- **Independent**: No external dependencies required (in-memory Map)

### 🎛️ Admin Side

#### 🔐 Secure Access
- **NextAuth v5** with Credentials-based authentication
- **Hidden URL**: Admin panel is accessed via an unpredictable slug instead of `/admin`
- **Middleware protection**: Direct access to `/admin` is redirected to the home page
- **Session management**: Login/logout, automatic redirection

#### 📊 Dashboard Statistics
```
📈 Total daily reservations
📊 Occupancy rate (%)
⏳ Pending approvals
💰 Revenue estimate
```

#### 🔍 Advanced Management
- **Filtering**: Pending | Confirmed | Cancelled
- **Live Search**: By name, email, or table number
- **Bulk Actions**: Confirm/cancel selected reservations
- **Safe Delete**: Confirmation modal to prevent accidental deletion

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React Compiler)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4 (theme system with CSS custom properties)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod 4
- **i18n**: Custom React Context (TR/EN/IT — no extra dependencies)
- **PWA**: Service Worker + Web App Manifest

### Backend
- **API**: Next.js Server Actions
- **Auth**: NextAuth v5 (Auth.js) — Credentials Provider
- **Database**: MongoDB + Mongoose
- **Validation**: Zod Schema
- **Email**: Nodemailer (Gmail SMTP)

### Testing
- **Framework**: Vitest 4
- **DOM**: jsdom
- **Utilities**: React Testing Library
- **Coverage**: Reservation validation, table selection logic, admin filtering

### DevOps
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub
- **CI/CD**: Vercel Auto Deploy

---

## 🚀 Installation

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB account (MongoDB Atlas)
Gmail account (with App Password)
```

### 1. Clone the Project

```bash
git clone https://github.com/BurakErdemci/ristorante-stellato.git
cd ristorante-stellato
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file and fill in the values:

```bash
cp .env.example .env.local
```

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NextAuth (to generate a secret: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Hidden admin panel path (choose an unpredictable slug)
NEXT_PUBLIC_ADMIN_ROUTE=your-secret-slug
```

> 💡 **How to Get a Gmail App Password?**
> 1. Google Account > Security
> 2. Enable 2-Step Verification
> 3. Go to App Passwords
> 4. Select Mail > Other and get your 16-digit password

### 4. Load Demo Data (Optional)

```bash
npm run seed
```

This command adds 8 sample reservations to MongoDB (with different statuses, dates, and notes).

### 5. Start the Development Server

```bash
npm run dev
```

Open in your browser: [http://localhost:3000](http://localhost:3000)

### 6. Production Build (Optional)

```bash
npm run build
npm start
```

---

## 📖 Usage

### Customer Reservation Flow

1. Click the **"Make a Reservation"** button on the home page
2. Select a date and time (past dates are disabled)
3. Choose an available table on the interactive floor plan
4. Enter your contact information
5. Review the summary and confirm
6. Check your email for the confirmation message
7. Track your reservation via the link in the email

### Admin Panel Management

1. Navigate to the hidden admin URL: `/{NEXT_PUBLIC_ADMIN_ROUTE}` (defined in `.env.local`)
2. Log in with the admin email and password
3. View pending reservations
4. Find the desired reservation using filters and search
5. Approve/reject/cancel the reservation
6. Click "Sign Out" in the top right to end the session

> ⚠️ Users who navigate to `/admin` are automatically redirected to the home page. The admin panel is only accessible via the hidden URL.

---

## 📁 Project Structure

```
ristorante-stellato/
├── public/
│   ├── icons/                       # PWA icons (192x192, 512x512)
│   ├── manifest.json                # PWA Web App Manifest
│   └── sw.js                        # Service Worker (cache strategy)
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx               # Root layout (ThemeProvider + LanguageProvider)
│   │   ├── globals.css              # Theme variables (dark/light/force-dark)
│   │   ├── rezervasyon/
│   │   │   └── page.tsx             # Reservation form (force-dark)
│   │   ├── rezervasyon-yonet/
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # Server: data fetching
│   │   │       └── client.tsx       # Client: i18n-supported UI
│   │   ├── admin/
│   │   │   ├── page.tsx             # Server: data fetching
│   │   │   ├── client.tsx           # Client: i18n-supported dashboard
│   │   │   └── login/page.tsx       # Admin login page (force-dark)
│   │   └── api/
│   │       └── auth/[...nextauth]/  # NextAuth API routes
│   ├── components/
│   │   ├── Navbar.tsx               # Navigation + language selector + theme toggle
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── MenuSection.tsx          # Menu gallery (translatable dish names)
│   │   ├── TableSelection.tsx       # Interactive table selection
│   │   ├── ReservationForm.tsx      # Multi-step form
│   │   ├── AdminReservations.tsx    # Admin table management
│   │   ├── AdminHeader.tsx          # Sign out button
│   │   ├── LanguageProvider.tsx     # i18n context (TR/EN/IT)
│   │   ├── ThemeProvider.tsx        # Dark/Light theme context
│   │   ├── ServiceWorkerRegister.tsx # PWA service worker registration
│   │   └── ...                      # Other components
│   ├── i18n/
│   │   ├── tr.ts                    # Turkish translations (base type)
│   │   ├── en.ts                    # English translations
│   │   ├── it.ts                    # Italian translations
│   │   └── index.ts                 # Locale definitions and exports
│   ├── actions/
│   │   └── reservationActions.ts    # Server Actions (CRUD + rate limit)
│   ├── models/
│   │   └── Reservation.ts           # Mongoose schema
│   ├── lib/
│   │   ├── db.ts                    # MongoDB connection
│   │   ├── mail.ts                  # Email service
│   │   └── rate-limit.ts            # IP-based rate limiter
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── auth.ts                      # NextAuth v5 configuration
│   └── middleware.ts                # Route protection & hidden URL rewrite
├── scripts/
│   └── seed.ts                      # Demo data loading script
├── .env.example                     # Sample environment variables
├── tsconfig.json                    # TypeScript configuration
├── vitest.config.ts                 # Vitest configuration
└── package.json
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `EMAIL_USER` | Gmail account address | `example@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 digits) | `abcd efgh ijkl mnop` |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | `http://localhost:3000` |
| `AUTH_SECRET` | NextAuth session encryption key | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin login password | `SecurePass123!` |
| `NEXT_PUBLIC_ADMIN_ROUTE` | Hidden admin panel URL slug | `gestione-x8k2m` |

---

## 🔌 API Endpoints

### Server Actions (Next.js 16)

```typescript
// Create Reservation (with FormData)
createReservation(prevState, formData) → ActionResult

// Get All Reservations (Admin)
getReservations() → { success, data: Reservation[] }

// Update Reservation Status
updateReservationStatus(id, newStatus) → ActionResult

// Delete Reservation
deleteReservation(id) → ActionResult

// Query Occupied Tables
getReservedTables(dateStr, timeStr) → { success, occupiedTableIds }

// View Reservation (Customer Side)
getReservationById(id) → Reservation | null

// Cancel Reservation (Customer Side)
cancelReservationByUser(id) → ActionResult
```

### Auth API (NextAuth v5)

```
GET/POST  /api/auth/[...nextauth]   # NextAuth handler (session, csrf, signin, signout)
```

---

## 🗄️ Database Schema

### Reservation Model

```typescript
interface IReservation {
  name: string;          // Customer name
  email: string;         // Email address
  phone: string;         // Phone number
  date: Date;            // Reservation date and time
  guests: number;        // Number of guests (1-10)
  tableId: number;       // Table number
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;        // Special notes
  createdAt: Date;       // Creation date
}
```

---

## 🔐 Authentication

The admin panel is protected with **NextAuth v5 (Auth.js)**.

### Architecture

- **Provider**: Credentials (email + password, `.env`-based)
- **Middleware**: All admin routes are protected at the middleware level
- **Hidden URL**: The admin panel is accessed via an unpredictable slug (`NEXT_PUBLIC_ADMIN_ROUTE`)
- **Direct block**: Access to the `/admin` URL is automatically redirected to the home page
- **Internal rewrite**: The hidden URL is rewritten by middleware to the physical `/admin` pages

### Security Flow

```
User /{hidden-slug} → Middleware → Logged in?
                                    ├─ Yes → Rewrite → /admin (internal)
                                    └─ No  → Redirect → /{hidden-slug}/login

User /admin → Middleware → Redirect → / (home page)
```

---

## 🧪 Testing

The project is tested with **Vitest**. There are **53 tests** across 4 test files.

### Test Files

| File | Test Count | Coverage |
|------|-----------|----------|
| `reservation-validation.test.ts` | 12 | Zod schema validation (name, email, phone, guest count, table selection) |
| `table-selection.test.ts` | 20 | Table data, capacity filtering, occupancy check, clickability, zone distribution |
| `admin-filter.test.ts` | 16 | Status filters, search (name/email/table), combined filter+search, status transitions |
| `rate-limit.test.ts` | 5 | Rate limiter sliding window, IP-based throttling, reset after time window |

### Running Tests

```bash
npm test              # Single run
npm run test:watch    # Watch mode
```

---

## 🗺️ Roadmap

### ✅ Completed Features
- [x] Interactive table selection
- [x] Multi-step reservation form
- [x] Email notification system
- [x] Admin dashboard
- [x] MongoDB integration
- [x] Vercel deployment
- [x] TypeScript migration (strict mode)
- [x] Admin authentication (NextAuth v5)
- [x] Hidden admin URL routing
- [x] Seed script (demo data)
- [x] Unit tests (Vitest — 53 tests)
- [x] Rate limiting middleware (IP-based sliding window)
- [x] Dark/Light theme toggle (CSS custom properties + ThemeProvider)
- [x] PWA support (Service Worker, Web App Manifest, offline cache)
- [x] Multi-language support (i18n — Turkish/English/Italian)

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run seed` | Load demo data into MongoDB |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint check |

### 🎯 Known Issues
- Email notifications use Resend. On the free tier, Resend only delivers emails to the address associated with your own API key.

---

## 🤝 Contributing

Contributions are welcome! 🎉

### How to Contribute

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Conventions

```
feat: New feature
fix: Bug fix
docs: Documentation change
style: Code formatting change
refactor: Code improvement
test: Adding/fixing tests
chore: Build/config changes
```

---

## 📄 License

This project is licensed under the [MIT](LICENSE) license.

---

## 📞 Contact

**Burak Emre Erdemci**

- GitHub: [@BurakErdemci](https://github.com/BurakErdemci)
- LinkedIn: [Burak Erdemci](https://www.linkedin.com/in/burak-erdemci-a3994833b)
- Email: erdemciburakemre@gmail.com

**Project Link**: [https://github.com/BurakErdemci/ristorante-stellato](https://github.com/BurakErdemci/ristorante-stellato)

---

## 🙏 Acknowledgements

This project was developed to learn modern web development practices and simulate real-world scenarios.

**Special thanks:**
- Open source community
- [Vercel](https://vercel.com) - Great deployment platform
- [MongoDB](https://mongodb.com) - Reliable database hosting
- [Lucide](https://lucide.dev) - Minimal icon set



<div align="center">

**⭐ If you like this project, don't forget to give it a star!**

[![Star History Chart](https://api.star-history.com/svg?repos=BurakErdemci/ristorante-stellato&type=Date)](https://star-history.com/#BurakErdemci/ristorante-stellato&Date)

Made with ❤️ by [Burak Erdemci](https://github.com/BurakErdemci)

</div>