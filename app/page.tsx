"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ScrollOverlay from "@/components/ScrollOverlay";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <main className="bg-black min-h-screen text-white">
      <Hero onOpenBooking={openBooking} />
      <ScrollOverlay onOpenBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </main>
  );
}
