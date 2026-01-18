"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadButton } from '../../../../lib/upload-thing';
import Image from 'next/image';

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
      image: imageUrl,
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
   
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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

            <div className="flex flex-col items-center mt-4">
  <label className="text-sm font-medium text-gray-700 mb-2">Trip Image</label>

  {imageUrl && (
    <Image
      src={imageUrl}
      alt="Trip preview"
      width={300}
      height={100}
      className="mb-4 rounded-md object-cover max-h-48"
    />
  )}

  <div className="flex flex-col items-center gap-2">

    <UploadButton
  endpoint="imageUploader"
  content={{ button: "Upload" }}
  className="
    ut-button:w-36 ut-button:h-10 ut-button:text-sm ut-button:px-3 ut-button:py-1
    ut-button:bg-blue-500 ut-button:text-white ut-button:rounded-md ut-button:hover:bg-blue-600
    ut-container:flex ut-container:justify-center
  "
  onClientUploadComplete={(res) => {
    console.log("Upload complete (client):", res);
    const maybeUrl =
      res?.[0]?.ufsUrl ?? res?.[0]?.url ?? res?.[0]?.appUrl ?? res?.[0]?.serverData?.ufsUrl ?? null;
    if (maybeUrl) setImageUrl(maybeUrl);
  }}
  onUploadError={(e) => {
  console.error("UploadThing error:", e);
  toast.error("Error uploading image"); 
}}

/
>




    <p className="text-xs text-gray-500">
      Max file size: 4MB — JPG, PNG, WebP
    </p>
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
