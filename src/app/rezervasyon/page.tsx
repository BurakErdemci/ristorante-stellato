import type { Metadata } from "next";
import ReservationExperience from "@/components/reservation/ReservationExperience";

export const metadata: Metadata = {
  title: "Rezervasyon — Stellato",
  description: "Yıldızların altında masanızı seçin. Ristorante Stellato rezervasyon.",
};

export default function ReservationPage() {
  return <ReservationExperience />;
}
