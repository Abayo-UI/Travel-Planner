import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import Link from "next/link";

export default async function TripsPage() {
   const session = await auth();

   if(!session){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-semibold">You must be signed in to view this page.</h1>
            <p>Please sign in to access your trips.</p>
        </div>
    );
   }
    return (
    <div className="space-y-2 container mx-auto px-4 py-8">
      <h1> Dashboard</h1>
       {/* We used Link from next/Link because using onClick would have forced me to make this component a client component but i want it to remain a server component */}
       <Link href="/trips/new">
        <Button variant={"default"} className="cursor-pointer">Add New Trip</Button>
       </Link>
    </div>
  );
}
