"use client"; // Mark as a Client Component

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8">
        An unexpected error occurred. Please try again later.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}