"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

interface NewTripFormProps {
  userId: string;
}

const NewTripForm: React.FC<NewTripFormProps> = ({ userId }) => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      userId,
    };

    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast.error("Failed to create trip");
      console.error("Failed to create trip");
    } else {
      toast.success("Trip created successfully!");
      console.log("Trip created successfully");
      // Redirect to /trips?userId=... after successful creation
      redirect(`/trips?userId=${userId}`);
    }
  }

  return (
    <div className="flex flex-col items-center  my-10 mx-10"> 
      <Card className="w-full max-w-md">
        <CardHeader className="text-2xl font-semibold">Add New Trip</CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div> 
              <label className="block mb-1 text-sm font-medium text-gray-700"> Title </label>
              <input 
                type="text"
                name="title"
                placeholder="Zanzibar Trip" 
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
              />
            </div>

            <div> 
              <label className="block mb-1 text-sm font-medium text-gray-700"> Description </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Enjoyed the stunning white sand beaches, world-class snorkeling, lush national parks, and many fascinating historical sites in A tropical archipelago" 
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
              ></textarea>
            </div>

            <div className="flex md:flex-row gap-2 lg:justify-between flex-col">
              <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> Start Date </label>
                <input 
                  type="date"
                  name="startDate" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>

              <div> 
                <label className="block mb-1 text-sm font-medium text-gray-700"> End Date </label>
                <input 
                  type="date"
                  name="endDate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-1">
              Create Trip
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTripForm;
