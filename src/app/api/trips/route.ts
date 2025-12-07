// src/app/api/trips/route.ts
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  console.log('POST /api/trips: incoming data:', data);

  // Basic validation
  if (!data.title || !data.description || !data.startDate || !data.endDate) {
    return new Response("Missing fields", { status: 400 });
  }

  const trip = await prisma.trip.create({
    data: {
      title: data.title,
      description: data.description || "",
      userId: data.userId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      imageUrl: data.imageUrl || null,
    },
  });
  console.log('POST /api/trips: created trip:', trip);

  return new Response(JSON.stringify(trip), { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
  return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
}

  console.log('GET /api/trips: userId param:', userId);
  try {
    const trips = await prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    console.log('GET /api/trips: found trips:', trips);
    return new Response(JSON.stringify(trips, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch trips" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
