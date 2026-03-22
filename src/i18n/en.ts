import type { Translations } from "./tr";

const en: Translations = {
  // Navbar
  nav: {
    home: "Home",
    story: "Our Story",
    menu: "Menu",
    gallery: "Gallery",
    contact: "Contact",
    reservation: "Reservation",
    reservationCta: "Book a Table",
    themeToggle: "Toggle theme",
    langToggle: "Language",
  },

  // Hero
  hero: {
    badge: "Michelin Guide 2025",
    badgeSub: "Exceptional Cuisine",
    title1: "L'Arte Della",
    title2: "Cucina Italiana",
    description:
      "A unique culinary journey where traditional Italian recipes are reimagined with modern gastronomy, appealing to all your senses.",
    cta: "Explore Menu",
  },

  // About
  about: {
    subtitle: "Our Story",
    title1: "The Italian Touch",
    title2: "of Excellence",
    paragraph1:
      "Ristorante Stellato draws its roots from the fertile lands of Tuscany. Since 1985, we have been reinterpreting traditional recipes with modern techniques, using only the freshest seasonal ingredients.",
    paragraph2:
      "For us, the kitchen is not a chemistry lab but an art studio. Every dish is a reflection of our respect for the land and our passion for our guests.",
    badge1: "Michelin Guide",
    badge2: "2025 Selection",
    quote:
      "Cooking is an act of love; you should follow your heart, not the recipes.",
    quoteAuthor: "Ristorante Stellato Philosophy",
  },

  // Gallery
  gallery: {
    subtitle: "Atmosphere",
    title: "The Stellato Experience",
    followCta: "Follow on Instagram",
    items: {
      cocktails: "Signature Cocktails",
      mainHall: "Main Hall",
      chefsTouch: "Chef's Touch",
      familyAtmosphere: "Family Atmosphere",
      specialEvents: "Special Events",
      brand: "Ristorante Stellato",
    },
  },

  // Menu
  menu: {
    subtitle: "Gastronomic Journey",
    title: "Menu Selection",
    chefSignature: "Chef's Signature Dish",
    scrollHint: "← Scroll →",
    categories: {
      starters: "Starters",
      mainCourses: "Main Courses",
      pasta: "Pasta & Risotto",
      pizza: "Pizza",
      desserts: "Desserts",
    },
    items: {
      carpaccio: {
        name: "Wagyu Carpaccio",
        desc: "Thinly sliced Wagyu beef, arugula, 24-month aged parmesan, truffle oil.",
      },
      burrata: {
        name: "Burrata Fresca",
        desc: "Fresh burrata from Puglia, organic tomato confit, basil pesto.",
      },
      octopus: {
        name: "Polpo alla Griglia",
        desc: "Grilled octopus tentacle, potato cream, sautéed spinach, lemon olive oil.",
      },
      risotto: {
        name: "Risotto allo Zafferano",
        desc: "Acquerello rice, Iranian saffron, edible 24K gold leaf, bone broth.",
      },
      truffle: {
        name: "Tagliolini al Tartufo",
        desc: "Chef's handmade fresh pasta, Umbrian black truffle shavings, butter emulsion.",
      },
      lobster: {
        name: "Ravioli di Astice",
        desc: "Blue lobster filled ravioli, shrimp bisque sauce, leek and caviar touch.",
      },
      pappardelle: {
        name: "Pappardelle al Cinghiale",
        desc: "Wide ribbon pasta, 12-hour slow-cooked wild boar ragù, juniper berry aroma.",
      },
      tartufata: {
        name: "Pizza Tartufata",
        desc: "Black truffle cream base, fior di latte, post-bake fresh burrata and truffle slices.",
      },
      bresaola: {
        name: "Pizza Bresaola e Fichi",
        desc: "Mozzarella, thinly sliced Bresaola, caramelized figs, gorgonzola, walnuts.",
      },
      caprese: {
        name: "Caprese Deconstructed",
        desc: "Deconstructed classic: yellow and red cherry tomato confit, buffalo mozzarella.",
      },
      frutti: {
        name: "Frutti di Mare",
        desc: "San Marzano tomato sauce, shrimp, calamari, mussels, garlic parsley oil.",
      },
      filetto: {
        name: "Filetto di Manzo",
        desc: "Beef tenderloin, pan-seared foie gras, black truffle, Madeira wine sauce.",
      },
      branzino: {
        name: "Branzino in Crosta di Sale",
        desc: "Salt-crusted sea bass, seasonal vegetables, lemon sauce.",
      },
      lamb: {
        name: "Costolette d'Agnello",
        desc: "Thyme and garlic marinated lamb chops, eggplant purée.",
      },
      tiramisu: {
        name: "Tiramisù Classico",
        desc: "Traditional recipe, mascarpone, espresso, savoiardi, Valrhona cocoa.",
      },
      cannoli: {
        name: "Cannoli Siciliani",
        desc: "Crispy pastry, sweet ricotta filling, pistachios and candied orange peel.",
      },
    },
  },

  // Contact
  contact: {
    description:
      "Where modern gastronomy meets traditional Italian cuisine. A story in every dish, centuries of heritage in every sip.",
    title: "Contact",
    address: "Bağdat Caddesi No: 123, Suadiye, İstanbul",
    hours: "Hours",
    monThu: "Monday - Thursday",
    monThuTime: "12:00 - 23:00",
    friSun: "Friday - Sunday",
    friSunTime: "12:00 - 01:00",
    followUs: "Follow Us",
    copyright: "© 2025 Ristorante Stellato. All rights reserved.",
    scrollTop: "Back to Top",
  },

  // Reservation Page
  reservationPage: {
    subtitle: "Online Reservation",
    title: "Book Your Table",
    policyTitle: "Reservation Policy",
    dressCode: "Dress Code",
    dressCodeDesc:
      "Smart Casual. Shorts, flip-flops and sportswear are not accepted.",
    tableTime: "Table Duration",
    tableTimeDesc: "Our tables are reserved for 2.5 hours.",
    cancelPolicy: "Cancellation Policy",
    cancelPolicyDesc:
      "Reservation cancellations must be notified at least 24 hours in advance.",
    specialEvents: "Special Events?",
    specialEventsDesc:
      "For large groups and private events, please contact us directly.",
  },

  // Reservation Form
  reservationForm: {
    whenTitle: "When will you be our guest?",
    date: "Date",
    guests: "Number of Guests",
    guestSuffix: "Guest",
    groupOption: "7+ (Group)",
    pastDateError: "You cannot select a past date.",
    selectTimeError: "Please select a time.",
    selectTableError: "Please select a table.",
    selectTime: "Select Your Time",
    availableSlots: "available slots for:",
    selectTable: "Select Your Table",
    checkingTables: "Checking table availability...",
    completeInfo: "Complete Your Information",
    name: "Full Name",
    phone: "Phone",
    email: "Email",
    notes: "Special Notes",
    thankYou: "Thank You!",
    successMessage:
      "Your reservation request has been received. We will contact you shortly for confirmation.",
    backToHome: "Back to Home",
    back: "Back",
    processing: "Processing...",
    complete: "Complete",
    continue: "Continue",
    groupTitle: "Group Reservation",
    groupMessage:
      "For groups of 7 or more, please contact us directly so we can make special arrangements.",
    callNow: "Call Now",
    close: "Close",
  },

  // Table Selection
  tableSelection: {
    floorPlan: "Floor Plan",
    available: "Available",
    selected: "Selected",
    small: "Small",
    full: "Occupied",
    capacity: "Seats",
    insufficient: "(Insufficient)",
  },

  // Admin
  admin: {
    panel: "Admin Panel",
    panelDesc: "Restaurant occupancy and reservation status.",
    today: "Today",
    totalReservations: "Total Reservations",
    pendingApproval: "Pending Approval",
    confirmedTables: "Confirmed Tables",
    totalGuests: "Total Guests",
    logout: "Logout",
    all: "All",
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    search: "Search...",
    statusConfirmed: "Confirmed",
    statusCancelled: "Cancelled",
    statusPending: "Pending",
    table: "Table",
    customer: "Customer",
    dateCol: "Date",
    note: "Note",
    status: "Status",
    action: "Action",
    deleteConfirm: "Delete Record?",
    deleteWarning: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
  },

  // Admin Login
  adminLogin: {
    brand: "Ristorante",
    title: "Admin Panel",
    subtitle: "Login",
    authRequired: "Authorized access required",
    invalidCredentials: "Invalid email or password.",
    emailLabel: "Email",
    passwordLabel: "Password",
    emailPlaceholder: "admin@stellato.com",
    loginButton: "Login",
    loggingIn: "Logging in...",
    staffOnly: "This area is for authorized staff only",
  },

  // Reservation Management
  reservationManage: {
    title: "Reservation Details",
    greeting: "Dear",
    statusConfirmed: "Confirmed",
    statusPending: "Pending",
    statusCancelled: "Cancelled",
    date: "Date",
    time: "Time",
    guests: "Guests",
    cancelInfo:
      "Plans changed? You can cancel your reservation by clicking the button below. This action cannot be undone.",
    cancelButton: "Cancel Reservation",
    cancelledMessage:
      "This reservation has been cancelled. We hope to host you another time.",
    newReservation: "Make New Reservation",
  },

  // Server Action Messages
  actions: {
    nameMinLength: "Name must be at least 2 characters.",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Phone number is missing or invalid.",
    minGuests: "Number of guests must be at least 1.",
    selectTable: "Please select a table.",
    rateLimited: "Too many requests. Please wait a minute.",
    reservationSuccess: "Reservation received successfully!",
    serverError: "A server error occurred.",
    cancelFailed: "Cancellation failed.",
  },
} as const;

export default en;
