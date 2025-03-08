"use client";
import { StarIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

interface PropertyDetailsProps {
  params: {
    id: string;
  };
}

interface Property {
  id: string;
  name: string;
  address: string;
  costPerNight: number;
  availableRooms: number;
  image: string;
  rating: number;
  description: string;
}

export default function PropertyDetails({ params }: any) {
  const { id } : any= use(params)
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/landing/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data?.hotel);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>No property found</div>;
  }

  // Construct the property URL
  const propertyUrl = `${process.env.API_SERVER_BASE_URL}/property/${property.id}`;

  // Social Media Sharing URLs
  const socialMediaLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(
      `Check out this amazing property: ${property.name}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`,
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
              <StarRating count={5} filled={Math.floor(property?.rating || 0)} />
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