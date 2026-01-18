import React from 'react'
import { auth } from '../../../../auth';
import { prisma } from '../../../../lib/prisma';
import TripDetailsClient from '@/components/TripDetailsClient';

const tripDetailPage = async ({params}: {params: {tripId: string}}) => {

    const { tripId } = await params;
    const session = await auth();
    
    if(!session){
      return(
        <p> Please Sign In.</p>
      )
    }

    const trip = await prisma.trip.findFirst({
        where: {
             id: tripId, 
             userId: session?.user?.id}
    })

    if(!trip){
      return(
      <div className=" text-xl font-bold flex justify-center items-center h-screen">
        Trip Not Found!
      </div>
    )}
    if (trip ){
  return (
    <div> 
        <TripDetailsClient  trip={trip}/>
    </div>
  )
}
}
export default tripDetailPage
