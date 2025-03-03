import { StarIcon } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  id: number | string;
  name: string;
  address: string;
  costPerNight: number;
  availableRooms: number;
  image: string;
  rating: number;
}

export default function PropertyCard({
  id,
  name,
  address,
  costPerNight,
  availableRooms,
  image,
  rating,
}: PropertyCardProps) {
  return (
    <Link href={`/property/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
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
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </span>
            <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}