"use client";

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
import { useSession } from "next-auth/react";

export default function CreateHotelPage() {
  const router = useRouter();
  const { data: session } = useSession(); // Get the authenticated user's session

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

  const onSubmit = async (data: HotelFormData) => {
    try {
      if (!session) {
        alert("You must be logged in to create a hotel");
        return;
      }

      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${session?.user?.accessToken ?? ''}`,
        },
        body: JSON.stringify({
          ...data,
          userId: parseInt(session?.user?.id ?? ''), // Include the userId
        }),
      });

      if (response.ok) {
        alert("Hotel created successfully!");
        router.push("/manage-hotels");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert(errorData.error || "Failed to create hotel");
      }
    } catch (error) {
      console.error("Error creating hotel:", error);
      alert("An error occurred while creating the hotel");
    }
  };

  const handleBack = () => {
    router.push("/manage-hotels");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <Button variant="outline" onClick={handleBack} className="mb-6">
          Back to Manage Hotels
        </Button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Hotel</h1>

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
              Create Hotel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}