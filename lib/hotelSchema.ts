import { z } from "zod";

// Hotel Creation Schema
export const hotelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  costPerNight: z.number().min(1, "Cost per night must be at least 1"),
  availableRooms: z.number().min(1, "Available rooms must be at least 1"),
  image: z.string().url("Invalid URL").min(1, "Image URL is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

// Infer the type from the schema
export type HotelFormData = z.infer<typeof hotelSchema>;