import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const NewTripPage = () => {
  return (
    <div className="flex flex-col items-center  my-10 mx-10"> 
       <Card className="w-full max-w-md">
        <CardHeader className="text-2xl font-semibold">Add New Trip</CardHeader>
        <CardContent>
            <form className="space-y-6" action="">
              <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> Title </label>
                <input 
                 type="text"
                 name="title"
                 placeholder="Zanzibar Trip" 
                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                 required/>
              </div>

              <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> Description </label>
                <textarea
                 name="description"
                 rows={4}
                 placeholder="Enjoyed the stunning white sand beaches, world-class snorkeling, lush national parks, and many fascinating historical sights in A tropical archipelago" 
                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                 required>
                </textarea>
              </div>

               <div className="flex md:flex-row gap-2 lg:justify-between flex-col">
                <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> Start Date </label>
                <input 
                 type="date"
                 name="startDate" 
                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "/>
              </div>

              <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> End Date </label>
                <input 
                 type="date"
                 name="endDate"
                 className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "/>
              </div>

               </div>
               <Button type="submit" className="w-full mt-1">
                 Create Trip
                </Button>
            </form>
        </CardContent>
       </Card>
    </div>
  )
}

export default NewTripPage