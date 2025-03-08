"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCredentialsSignin, handleGithubSignin } from "@/app/actions/authActions";

export default function LoginForm() {
  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
          email: "",
          password: "",
      },
  });

  const onSubmit = async (values: LoginFormData) => {
      try {
          const result = await handleCredentialsSignin(values);
          if (result?.message) {
              setGlobalError(result.message);
          }
      } catch (error) {
          console.log("An unexpected error occurred. Please try again.");
      }
  };

  return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        
        {globalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {globalError}
          </div>
        )}

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={handleGithubSignin}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </Button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
  )
}

