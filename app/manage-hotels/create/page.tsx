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
import { ArrowBigLeft } from "lucide-react";

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
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-white p-8 rounded-lg shadow-lg">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-6 hover:bg-gray-100 transition-colors"
        >
          <ArrowBigLeft/> Back
        </Button>

        {/* Form Title */}
        <h1 className="text-2xl font-medium text-gray-800 mb-8 text-center">
          Create Hotel
        </h1>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hotel name"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hotel address"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Cost per Night Field */}
            <FormField
              control={form.control}
              name="costPerNight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Cost per Night
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter cost per night"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Available Rooms Field */}
            <FormField
              control={form.control}
              name="availableRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Available Rooms
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of available rooms"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Image URL Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Rating
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter rating (1-5)"
                      min="1"
                      max="5"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
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