import type { Translations } from "@/i18n";

export type MenuItemKey = keyof Translations["menu"]["items"];

export interface MenuItem {
  /** i18n anahtarı: t.menu.items[key].name / .desc */
  key: MenuItemKey;
  price: string;
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
      { key: "carpaccio", price: "₺980", image: img("1544025162-d76694265947") },
      { key: "burrata", price: "₺640", image: img("1608897013039-887f21d8c804") },
      { key: "octopus", price: "₺860", image: img("1599487488170-d11ec9c172f0") },
      { key: "risotto", price: "₺1.150", image: img("1476124369491-e7addf5db371") },
    ],
  },
  {
    key: "pasta",
    items: [
      { key: "truffle", price: "₺1.380", image: img("1473093295043-cdd812d0e601") },
      { key: "lobster", price: "₺1.450", image: img("1587740908075-9e245070dfaa") },
      { key: "pappardelle", price: "₺920", image: img("1551183053-bf91a1d81141") },
    ],
  },
  {
    key: "pizza",
    items: [
      { key: "tartufata", price: "₺780", image: img("1604382354936-07c5d9983bd3") },
      { key: "bresaola", price: "₺720", image: img("1513104890138-7c749659a591") },
      { key: "caprese", price: "₺560", image: img("1574071318508-1cdbab80d002") },
      { key: "frutti", price: "₺840", image: img("1565299624946-b28f40a0ae38") },
    ],
  },
  {
    key: "mainCourses",
    items: [
      { key: "filetto", price: "₺2.450", image: img("1546964124-0cce460f38ef") },
      { key: "branzino", price: "₺1.280", image: img("1519708227418-c8fd9a32b7a2") },
      { key: "lamb", price: "₺1.420", image: img("1546833999-b9f581a1996d") },
    ],
  },
  {
    key: "desserts",
    items: [
      { key: "tiramisu", price: "₺420", image: img("1571877227200-a0d98ea607e9") },
      { key: "cannoli", price: "₺360", image: img("1551024601-bec78aea704b") },
    ],
  },
];
