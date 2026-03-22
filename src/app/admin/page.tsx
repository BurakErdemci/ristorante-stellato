import { getReservations } from '@/actions/reservationActions';
import AdminClient from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Paneli | Ristorante Stellato',
};

export default async function AdminPage() {
  const { data: reservations = [] } = await getReservations();

  return <AdminClient reservations={reservations} />;
}
