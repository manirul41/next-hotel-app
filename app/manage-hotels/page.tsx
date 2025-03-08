"use client"
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import useAuthFetch from "@/hooks/useAuthFetch";
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const onDelete = () => {
    console.log("deleted");
  }

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
            <PropertyCard key={hotel.id} {...hotel} session={session} onDelete={onDelete}/>
          ))}
        </div>
      </div>
    </div>
  );
}