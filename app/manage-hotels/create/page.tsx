"use client"; // Mark as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateHotelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    costPerNight: "",
    availableRooms: "",
    image: "",
    rating: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Form Data:", formData);
    alert("Hotel created successfully!");
    router.push("/manage-hotels"); // Redirect to Manage Hotels Page
  };

  const handleBack = () => {
    router.push("/manage-hotels"); // Navigate back to Manage Hotels Page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-6"
        >
          Back to Manage Hotels
        </Button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Hotel</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hotel name"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter hotel address"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Cost per Night Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cost per Night
              </label>
              <input
                type="number"
                name="costPerNight"
                value={formData.costPerNight}
                onChange={handleChange}
                placeholder="Enter cost per night"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Available Rooms Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available Rooms
              </label>
              <input
                type="number"
                name="availableRooms"
                value={formData.availableRooms}
                onChange={handleChange}
                placeholder="Enter number of available rooms"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Rating Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Create Hotel
          </Button>
        </form>
      </div>
    </div>
  );
}