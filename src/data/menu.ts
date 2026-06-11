import type { Translations } from "@/i18n";

export type MenuItemKey = keyof Translations["menu"]["items"];

export interface MenuItem {
  /** i18n anahtarı: t.menu.items[key].name / .desc */
  key: MenuItemKey;
  image: string;
}

export interface MenuCategory {
  key: keyof Translations["menu"]["categories"];
  items: MenuItem[];
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`;

export const MENU: MenuCategory[] = [
  {
    key: "starters",
    items: [
      { key: "carpaccio", image: img("1544025162-d76694265947") },
      { key: "burrata", image: img("1608897013039-887f21d8c804") },
      { key: "octopus", image: img("1599487488170-d11ec9c172f0") },
      { key: "risotto", image: img("1476124369491-e7addf5db371") },
    ],
  },
  {
    key: "pasta",
    items: [
      { key: "truffle", image: img("1473093295043-cdd812d0e601") },
      { key: "lobster", image: img("1587740908075-9e245070dfaa") },
      { key: "pappardelle", image: img("1551183053-bf91a1d81141") },
    ],
  },
  {
    key: "pizza",
    items: [
      { key: "tartufata", image: img("1604382354936-07c5d9983bd3") },
      { key: "bresaola", image: img("1513104890138-7c749659a591") },
      { key: "caprese", image: img("1574071318508-1cdbab80d002") },
      { key: "frutti", image: img("1565299624946-b28f40a0ae38") },
    ],
  },
  {
    key: "mainCourses",
    items: [
      { key: "filetto", image: img("1546964124-0cce460f38ef") },
      { key: "branzino", image: img("1519708227418-c8fd9a32b7a2") },
      { key: "lamb", image: img("1546833999-b9f581a1996d") },
    ],
  },
  {
    key: "desserts",
    items: [
      { key: "tiramisu", image: img("1571877227200-a0d98ea607e9") },
      { key: "cannoli", image: img("1551024601-bec78aea704b") },
    ],
  },
];
