"use client";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
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
        const response = await fetch("/api/landing");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data?.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-blue-500 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Property</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {/* Hotel Property Cards */}
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
              className="transition-transform transform hover:scale-105"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={endIndex >= hotels.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="transition-transform transform hover:scale-105"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}