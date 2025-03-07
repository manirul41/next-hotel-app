"use client"; // Mark as a Client Component

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hotelSchema, HotelFormData } from "@/lib/hotelSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useAuthFetch from "@/hooks/useAuthFetch";
import { useSession } from "next-auth/react";

interface EditHotelPageProps {
  params: {
    id: string;
  };
}

export default function EditHotelPage({ params }: EditHotelPageProps) {
  const router = useRouter();
  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: "",
      address: "",
      costPerNight: 0,
      availableRooms: 0,
      image: "",
      rating: 0,
    },
  });
     const { data: session } = useSession();
  
    useEffect(() => {
      fetchWithAuth().then((data) => {
        if (data && data.hotel) {
          const { hotel } = data;
        form.reset({
          name: hotel.name,
          address: hotel.address,
          costPerNight: hotel.costPerNight,
          availableRooms: hotel.availableRooms,
          image: hotel.image,
          rating: hotel.rating,
        });
        }
      });
    }, [params.id, form]);

    const { fetchWithAuth, loading } = useAuthFetch(`/api/hotels/${params.id}`);

  // Initialize React Hook Form with Zod resolver


  // Fetch hotel data from the API
  // useEffect(() => {
  //   const fetchHotel = async () => {
  //     try {
  //       const response = await fetch(`/api/hotels/${params.id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch hotel");
  //       }

  //       const { hotel } = await response.json();
  //       form.reset({
  //         name: hotel.name,
  //         address: hotel.address,
  //         costPerNight: hotel.costPerNight,
  //         availableRooms: hotel.availableRooms,
  //         image: hotel.image,
  //         rating: hotel.rating,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching hotel:", error);
  //     }
  //   };

  //   fetchHotel();
  // }, [params.id, form]);

  // Handle form submission
  const onSubmit = async (data: HotelFormData) => {
    try {
      const response = await fetch(`/api/hotels/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }

      alert("Hotel updated successfully!");
      router.push("/manage-hotels"); // Redirect to Manage Hotels Page
    } catch (error) {
      console.error("Error updating hotel:", error);
      alert("An error occurred while updating the hotel");
    }
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

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Hotel</h1>

        {/* Hotel Edit Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hotel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hotel address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cost per Night Field */}
            <FormField
              control={form.control}
              name="costPerNight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost per Night</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter cost per night"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Available Rooms Field */}
            <FormField
              control={form.control}
              name="availableRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Rooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of available rooms"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter rating (1-5)"
                      min="1"
                      max="5"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6">
              Update Hotel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}