export interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  tableId: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface TableData {
  id: number;
  seats: number;
  x: number;
  y: number;
  type: 'round' | 'square' | 'rect' | 'booth' | 'rounSd';
  zone: string;
}

export interface Dish {
  id: number;
  name: string;
  desc: string;
  image: string;
  price?: string;
  isChefChoice?: boolean;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  reservationId?: string;
  data?: Reservation[];
  error?: string;
  occupiedTableIds?: number[];
}
