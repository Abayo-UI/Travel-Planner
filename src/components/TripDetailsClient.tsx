"use client"

import type { Trip } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Calendar, Plus } from "lucide-react";
import Link from 'next/link';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TripDetailClientProps {
    trip: Trip
}

const TripDetailsClient = ({ trip }: TripDetailClientProps) => {
    const [ activeTab, setActiveTab ] = useState("overview")
    return (
        <div className="container mx-auto px-16 py-8 space-y-8">
            {" "}
            {trip.imageUrl && (
                <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                    {" "}
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        className="object-cover"
                        fill
                        priority
                    />
                </div>
            )} 
            <div className="bg-white p-6 shadow-2xl rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                 <h1 className="text-3xl font-extrabold text-gray-900"> {trip.title} </h1>
                 <div className="flex items-center text-gray-500 mt-2"> 
                   < Calendar className="h-5 w-5 mr-5"/>
                   <span className="text-lg">
                       {trip.startDate.toLocaleDateString()} - 
                       {" "}
                       {trip.endDate.toLocaleDateString()} 
                   </span>
                 </div>
              </div>

              <div className="mt-4 md:mt-6"> 
               <Link href={`/trip/${trip.id}/itinerary/new`}>
                 <Button> <Plus className="mr-2 h-5 w-5" /> Add Location </Button>
               </Link>
              </div>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-lg">
               <Tabs value={activeTab} onValueChange={setActiveTab}>
                 <TabsList className="mb-5">
                    <TabsTrigger  className="text-lg" value="overview">Overview</TabsTrigger>
                    <TabsTrigger  className="text-lg" value="itinerary">itinerary</TabsTrigger>
                    <TabsTrigger  className="text-lg" value="map">Map</TabsTrigger>
                 </TabsList>

                 <TabsContent className="space-y " value="overview">
                    <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                              <Calendar className="w-6 h-6 mr-3 text-gray-500 "/>
                              <div>
                                <p className="font-medium text-gray-700">Dates</p>
                                <p className="text-sm text-gray-500">
                                    {trip.startDate.toLocaleDateString()} - 
                                    {trip.endDate.toLocaleDateString()} 
                                     <br/>
                                    {`${Math.round(
                                        (trip.endDate.getTime() - trip.startDate.getTime()) 
                                        /  (1000 * 60 * 60 * 24)
                                    )} day(s)`} 
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">

                            </div>
                        </div>
                     </div>
                    </div>
                 </TabsContent>

                 <TabsContent className="space-y " value="itinerary">
                    <div>
                         <p>itinerary</p>
                    </div>
                 </TabsContent>

                 <TabsContent className="space-y " value="map">
                    <div>
                       <p>maps</p> 
                    </div>
                 </TabsContent>
               </Tabs>
            </div>
        </div>
    )
}

export default TripDetailsClient