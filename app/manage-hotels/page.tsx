"use client"
import { auth } from "@/auth";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import useAuthFetch  from "@/hooks/useAuthFetch";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManageHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const { fetchWithAuth, loading } = useAuthFetch("/api/hotels");
   const { data: session } = useSession();

  useEffect(() => {
    fetchWithAuth().then((data) => {
      if (data && data.hotels) {
        setHotels(data.hotels);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Hotels</h1>
          <Link href="/manage-hotels/create">
            <Button>Create Hotel</Button>
          </Link>
        </div>
        {/* List of Hotels */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {hotels.map((hotel: any) => (
            <PropertyCard key={hotel.id} {...hotel} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}