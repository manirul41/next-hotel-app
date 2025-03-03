"use client";
import { StarIcon } from "lucide-react";

interface PropertyDetailsProps {
  params: {
    id: string;
  };
}

export default function PropertyDetails({ params }: PropertyDetailsProps) {
  // Fetch property details based on ID (replace with actual data fetching logic)
  const property = {
    id: params.id,
    name: "Luxury Resort & Spa",
    address: "123 Beachfront Ave, Miami, FL",
    costPerNight: 250,
    availableRooms: 10,
    image: "https://dummyimage.com/800x400",
    rating: 4.5,
    description:
      "Experience luxury at its finest with our world-class amenities and stunning beachfront views.",
  };

  // Construct the property URL
  const propertyUrl = `http://localhost:3000/property/${property.id}`;

  // Social Media Sharing URLs
  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      propertyUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      propertyUrl
    )}&text=${encodeURIComponent(
      `Check out this amazing property: ${property.name}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      propertyUrl
    )}`,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {property.name}
            </h1>
            <p className="text-gray-600 mb-2">{property.address}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Cost per Night:</span> $
              {property.costPerNight}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Available Rooms:</span>{" "}
              {property.availableRooms}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(property.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </span>
              <span className="ml-2 text-gray-600">
                ({property.rating.toFixed(1)})
              </span>
            </div>
            <p className="text-gray-700 mb-6">{property.description}</p>

            {/* Social Media Sharing Buttons */}
            <div className="flex space-x-4">
              <a
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share on Facebook
              </a>
              <a
                href={socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Share on Twitter
              </a>
              <a
                href={socialMediaLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}