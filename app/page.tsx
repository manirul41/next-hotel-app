import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Hotel Booking</h1>
          <div className="flex space-x-4">
            <Link href={'/login'}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link href={'/register'}>
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {/* Hotel Property Cards */}
          {hotels?.map((hotel) => (
            <PropertyCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </main>
    </div>
  );
}
