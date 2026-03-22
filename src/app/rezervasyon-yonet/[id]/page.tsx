export const dynamic = 'force-dynamic';

import { getReservationById } from '@/actions/reservationActions';
import { redirect } from 'next/navigation';
import ReservationManageClient from './client';

export default async function ManageReservationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reservation = await getReservationById(id);

  if (!reservation) {
    redirect('/');
  }

  return <ReservationManageClient reservation={JSON.parse(JSON.stringify(reservation))} id={id} />;
}
