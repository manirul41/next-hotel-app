import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">Hotel/Properties</h1>
        </Link>

        {/* Right Side: Login/Register or Dropdown */}
        <div className="flex items-center space-x-4">
          {session ? (
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
                  <button onClick={handleSignOut} className="w-full text-left">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}