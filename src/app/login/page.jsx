"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

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
import { FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <FaHome />
            Rentora
          </div>

          <p className="text-sm opacity-80 mt-1">Your Next Home Awaits</p>

          <h2 className="text-2xl font-semibold mt-8">Welcome Back 👋</h2>

          <p className="mt-3 text-sm opacity-90">
            Login to explore verified properties, manage bookings, and continue
            your rental journey with Rentora.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            <li>✓ Access Saved Properties</li>
            <li>✓ Manage Bookings</li>
            <li>✓ Secure Dashboard</li>
            <li>✓ Trusted Platform</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <Chip color="primary" variant="flat">
              Welcome Back
            </Chip>

            <h2 className="text-2xl font-bold mt-3">Login to Your Account</h2>

            <p className="text-sm text-gray-500">
              Enter your credentials to continue
            </p>
          </div>

          <Surface className="p-4 rounded-xl border">
            <Form onSubmit={onSubmit} className="space-y-4">
              {/* EMAIL */}
              <TextField name="email" type="email" isRequired>
                <Label className="flex items-center gap-2">
                  <FaEnvelope /> Email Address
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

              {/* LOGIN BUTTON */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Form>

            {/* OR */}
            <div className="my-4 text-center text-xs text-gray-400">
              ---------------- OR ----------------
            </div>

            {/* GOOGLE LOGIN */}
            <Button
              variant="bordered"
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </Button>

            {/* SIGNUP LINK */}
            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </p>
          </Surface>
        </div>
      </div>
    </div>
  );
}
