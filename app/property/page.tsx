"use client";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Sample data for hotel properties
// const hotels = [
//     {
//       id: 1,
//       name: "Luxury Resort & Spa",
//       address: "123 Beachfront Ave, Miami, FL",
//       costPerNight: 250,
//       availableRooms: 10,
//       image: "https://dummyimage.com/400x250",
//       rating: 3.5,
//     },
//     {
//       id: 2,
//       name: "Mountain View Lodge",
//       address: "456 Mountain Rd, Aspen, CO",
//       costPerNight: 180,
//       availableRooms: 5,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.2,
//     },
//     {
//       id: 3,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//     {
//       id: 4,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//     {
//       id: 5,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//     {
//       id: 6,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//     {
//       id: 7,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//     {
//       id: 8,
//       name: "City Central Hotel",
//       address: "789 Downtown St, New York, NY",
//       costPerNight: 300,
//       availableRooms: 8,
//       image: "https://dummyimage.com/400x250",
//       rating: 4.7,
//     },
//   ];

export default function HotelsPage() {
  const itemsPerPage = 8; // Number of properties per page
  const [hotels, setHotels] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHotels = hotels.slice(startIndex, endIndex);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/api/landing");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">List of Hotel's Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedHotels.map((hotel) => (
            <PropertyCard key={hotel.id} {...hotel} />
          ))}
        </div>

        {/* Pagination Controls */}
        {hotels.length > 8 && (
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={endIndex >= hotels.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
        )}
      </div>
    </div>
  );
}