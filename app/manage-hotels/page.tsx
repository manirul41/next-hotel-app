import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { auth } from "@/auth";

const prisma = new PrismaClient();
const itemsPerPage = 8;

export default async function ManageHotelsPage({ searchParams }: any) {
  const session = await auth();
  if (!session) return <p>Please log in to manage hotels.</p>;

  const currentPage = Number(searchParams?.page) || 1;
  const totalHotels = await prisma.hotel.count();
  const hotels = await prisma.hotel.findMany({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Hotels</h1>
          <Link href="/manage-hotels/create">
            <Button>Create Hotel</Button>
          </Link>
        </div>

        {/* Hotel List */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <PropertyCard key={hotel.id} {...hotel} session={session} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          {currentPage > 1 && (
            <Link href={`/manage-hotels?page=${currentPage - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}
          {currentPage * itemsPerPage < totalHotels && (
            <Link href={`/manage-hotels?page=${currentPage + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
