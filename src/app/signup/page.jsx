"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import React from "react";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Label,
  TextField,
  FieldError,
  Fieldset,
  Form,
  Surface,
  Chip,
} from "@heroui/react";

// React Icons
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiHome } from "react-icons/hi";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || "",
    });

    if (error) {
      toast.error(error.message || "Signup failed");
      return;
    }

    toast.success("Account created successfully!!");
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <HiHome />
            Rentora
          </div>

          <p className="text-sm opacity-80 mt-1">Your Next Home Awaits</p>

          <h2 className="text-2xl font-semibold mt-8">
            Start Your Rental Journey Today
          </h2>

          <p className="mt-3 text-sm opacity-90">
            Discover verified rental properties, connect with trusted owners,
            and book your next home with confidence.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            <li>✓ Verified Properties</li>
            <li>✓ Secure Online Booking</li>
            <li>✓ Trusted Owners</li>
            <li>✓ Easy Rental Process</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <Chip color="primary" variant="flat">
              Welcome to Rentora
            </Chip>

            <h2 className="text-2xl font-bold mt-3">Create Your Account</h2>

            <p className="text-sm text-gray-500">
              Join Rentora and find your next home
            </p>
          </div>

          <Surface className="p-4 rounded-xl border">
            <Form onSubmit={onSubmit} className="space-y-4">
              {/* NAME */}
              <TextField name="name" isRequired>
                <Label className="flex items-center gap-2">
                  <FaUser /> Full Name
                </Label>
                <Input placeholder="John Doe" />
                <FieldError />
              </TextField>

              {/* IMAGE */}
              <TextField name="image" type="url">
                <Label className="flex items-center gap-2">
                  <FaImage /> Photo URL
                </Label>
                <Input placeholder="https://example.com/photo.jpg" />
                <FieldError />
              </TextField>

              {/* EMAIL */}
              <TextField name="email" type="email" isRequired>
                <Label className="flex items-center gap-2">
                  <FaEnvelope /> Email
                </Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              {/* PASSWORD */}
              <TextField name="password" type="password" isRequired>
                <Label className="flex items-center gap-2">
                  <FaLock /> Password
                </Label>
                <Input placeholder="••••••••" />
                <FieldError />
              </TextField>

              {/* SUBMIT */}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </Form>

            {/* OR */}
            <div className="my-4 text-center text-xs text-gray-400">
              ---------------- OR ----------------
            </div>

            {/* GOOGLE */}
            <Button
              onClick={handleGoogleSignIn}
              variant="bordered"
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </Button>

            {/* LOGIN */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold">
                Sign In
              </Link>
            </p>
          </Surface>
        </div>
      </div>
    </div>
  );
}
