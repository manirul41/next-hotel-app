"use client";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

export default function Header() {
  const handleLogout = () => {
    // Handle logout logic here
    alert("Logged out successfully!");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">Hotel Booking</h1>
        </Link>

        {/* Right Side: Login/Register or Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Login and Register Buttons */}
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Admin</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>
                <Link href="/manage-hotels" className="w-full">
                  Manage Hotels
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}