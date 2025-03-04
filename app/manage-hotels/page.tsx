import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Sample data for hotel properties
const hotels = [
    {
      id: 1,
      name: "Luxury Resort & Spa",
      address: "123 Beachfront Ave, Miami, FL",
      costPerNight: 250,
      availableRooms: 10,
      image: "https://dummyimage.com/400x250",
      rating: 3.5,
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      address: "456 Mountain Rd, Aspen, CO",
      costPerNight: 180,
      availableRooms: 5,
      image: "https://dummyimage.com/400x250",
      rating: 4.2,
    },
    {
      id: 3,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
    {
      id: 4,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
    {
      id: 5,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
    {
      id: 6,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
    {
      id: 7,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
    {
      id: 8,
      name: "City Central Hotel",
      address: "789 Downtown St, New York, NY",
      costPerNight: 300,
      availableRooms: 8,
      image: "https://dummyimage.com/400x250",
      rating: 4.7,
    },
  ];

export default function ManageHotelsPage() {
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
          {hotels.map((hotel) => (
            <PropertyCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}