"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Trips {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export default function TripsClient({ userId }: { userId: string }) {
  const [trip, setTrip] = useState<Trips[]>([]);

  async function fetchTrips() {
    const res = await fetch(`/api/trips?userId=${userId}`);
    const data = await res.json();
    setTrip(data);
  }

  useEffect(() => {
    if (userId) fetchTrips();
  }, [userId]);

  return (
    <div className="space-y-2 container mx-auto px-4 py-8">
      <h1>Dashboard</h1>
      <Link href="/trips/new">
        <Button variant={"default"} className="cursor-pointer">Add New Trip</Button>
      </Link>
      <div>
        <h2>My trips</h2>
        {trip.length > 0 ? (
          trip.map((t, idx) => 
            <div key={idx}>
              <p>{t.title}</p>
              <p>{t.description}</p>
            </div>
          )
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </div>
  );
}
