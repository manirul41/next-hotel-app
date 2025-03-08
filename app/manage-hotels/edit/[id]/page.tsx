"use client"; // Mark as a Client Component

import { use, useEffect } from "react";
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
import { ArrowBigLeft } from "lucide-react";


export default function EditHotelPage({ params }: any) {
  const { id } : any = use(params);
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
  }, [id, form]);

  const { fetchWithAuth, loading } = useAuthFetch(`/api/hotels/${id}`);

  // Handle form submission
  const onSubmit = async (data: HotelFormData) => {
    try {
      const response = await fetch(`/api/hotels/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-white p-8 rounded-lg shadow-lg">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowBigLeft/> Back
        </Button>

        <h1 className="text-2xl font-medium text-gray-800 mb-8 text-center">Update Hotel Information</h1>

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