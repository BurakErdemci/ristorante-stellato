export type TableShape = "round" | "square" | "long";
export type TableZone = "salon" | "pencere" | "teras" | "sef";

export interface DiningTable {
  id: number;
  seats: number;
  zone: TableZone;
  shape: TableShape;
  /** 3D salon zemin koordinatları */
  x: number;
  z: number;
}

export const TIME_SLOTS = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
] as const;

export const MAX_GUESTS = 8;

export const DINING_TABLES: DiningTable[] = [
  { id: 1, seats: 2, zone: "pencere", shape: "round", x: -50, z: -38 },
  { id: 2, seats: 2, zone: "pencere", shape: "round", x: 0, z: -38 },
  { id: 3, seats: 2, zone: "pencere", shape: "round", x: 50, z: -38 },
  { id: 4, seats: 4, zone: "salon", shape: "square", x: -62, z: -10 },
  { id: 5, seats: 4, zone: "salon", shape: "square", x: -22, z: -10 },
  { id: 6, seats: 2, zone: "salon", shape: "round", x: 18, z: -10 },
  { id: 7, seats: 4, zone: "salon", shape: "square", x: -62, z: 16 },
  { id: 8, seats: 2, zone: "salon", shape: "round", x: -22, z: 16 },
  { id: 9, seats: 4, zone: "salon", shape: "square", x: 18, z: 16 },
  { id: 10, seats: 6, zone: "salon", shape: "long", x: 58, z: -12 },
  { id: 11, seats: 8, zone: "sef", shape: "long", x: 58, z: 18 },
  { id: 12, seats: 4, zone: "teras", shape: "round", x: -45, z: 44 },
  { id: 13, seats: 4, zone: "teras", shape: "round", x: 0, z: 44 },
  { id: 14, seats: 2, zone: "teras", shape: "round", x: 45, z: 44 },
];
