"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface Trips {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  image?: string;
}

export default function TripsClient({ userId }: { userId: string }) {
  const [trip, setTrip] = useState<Trips[]>([]);
  const {data: session} = useSession(); 

  async function fetchTrips() {
    const res = await fetch(`/api/trips?userId=${userId}`);
    const data = await res.json();
    setTrip(data);
  }

  useEffect(() => {
    if (userId) fetchTrips();
  }, [userId]);

  const sortedTrips = [...trip]
  sortedTrips.sort( (a,b) =>  new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  const today = new Date();
  today.setHours(0,0,0,0);
  const upcomingTrips = sortedTrips.filter( trip => new Date(trip.startDate) >= today)

  return (
    <div className="space-y-2 container mx-auto px-4 py-8">
      <div className="flex items-center justify-between tracking-tight">
      <h1>Dashboard</h1>
      <Link href="/trips/new">
        <Button variant={"default"} className="cursor-pointer">Add New Trip</Button>
      </Link>
      </div>
      <div>
         <Card className="text-center text-2xl font-semibold">
          <CardHeader>
             <CardTitle>Welcome back, { session?.user?.name } ! </CardTitle>
          </CardHeader>
          <CardContent>
             { trip.length === 0  
              ? "You have no trips planned. Start by adding a new trip!" 
              :`Your have ${trip.length} ${trip.length === 1 ? 'trip' : 'trips'} planned.`
             }
             {`Upcoming trips ${ upcomingTrips.length }`}
          </CardContent>
         </Card>
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
