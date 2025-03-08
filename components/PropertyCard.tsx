"use client";
import { PencilIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  id: string | number;
  name: string;
  address: string;
  costPerNight: number;
  availableRooms: number;
  image: string;
  rating: number;
  session: any;
}

export default function PropertyCard({
  id,
  name,
  address,
  costPerNight,
  availableRooms,
  image,
  rating,
  session,
}: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setIsModalOpen(true); // Open the modal
  };

  const onDelete = async (hotelId: number) => {
      try {
        const response = await fetch("/api/hotels", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({ id: hotelId }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete hotel");
        }
  
        // Remove the deleted hotel from the state
        alert("Hotel deleted successfully");
        router.push('/manage-hotels');
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    };

  const handleConfirmDelete = () => {
    // @ts-ignore
    onDelete(id); // Trigger deletion
    setIsModalOpen(false); // Close the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const StarRating = ({ count = 5, filled = 0 }) => {
    if (count === 0) return null;
    return (
      <>
        <StarIcon className={`h-5 w-5 ${filled > 0 ? "text-yellow-400" : "text-gray-300"}`} />
        <StarRating count={count - 1} filled={filled - 1} />
      </>
    );
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group relative">
      {/* Edit and Delete Icons */}
      {session && (
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/manage-hotels/edit/${id}`}
            onClick={(e) => e.stopPropagation()} // Prevent card click event
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <PencilIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <button
            onClick={handleDeleteClick}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

      {/* Clickable Card Area */}
      <Link href={`/property/${id}`}>
        <div>
          {/* Property Image */}
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />

          {/* Property Details */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">{address}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Cost per Night:</span> $
              {costPerNight}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Available Rooms:</span>{" "}
              {availableRooms}
            </p>
            <div className="flex items-center">
              <span className="text-yellow-500 flex">
              <StarRating count={5} filled={Math.floor(rating || 0)} />
              </span>
              <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
            </div>
          </div>
        </div>
      </Link>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
      />
    </div>
  );
}