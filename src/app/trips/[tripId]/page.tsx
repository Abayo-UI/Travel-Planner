import React from 'react'
import { auth } from '../../../../auth';
import { prisma } from '../../../../lib/prisma';

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
    if (trip ){
  return (
    <div> 
        { trip.title}
    </div>
  )
}
}
export default tripDetailPage
