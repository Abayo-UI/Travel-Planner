import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import Link from "next/link";
;
import TripsClient from "./TripsClient";

export default async function TripsPage() {   
   const session = await auth();

   if(!session?.user?.id){
     return null
   }
   
   if(!session){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-10 max-w-md w-full flex flex-col items-center gap-4 animate-fade-in">
          <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m10.5 0v10.5A2.25 2.25 0 0116.5 21h-9A2.25 2.25 0 015.25 19.5V9m13.5 0H5.25m13.5 0a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 005.25 9" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Sign In Required</h1>
          <p className="text-gray-600 text-center">Please sign in to access your trips and enjoy personalized features.</p>
          <Link href="/api/auth/signin" className="mt-4 w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">Sign In</button>
           </Link>
      </div>
      </div>
     );
   }
   
  return(
    <div>
      <TripsClient userId={ session?.user?.id}/>
    </div>
  ) 
}
