"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 13) {
      setError("Please enter a valid phone number");
      return;
    }
    // In real app, verify phone and redirect to OTP
    router.push("/onboarding/otp");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Login" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Enter your phone number to continue
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              placeholder="+251 9XX XXX XXX"
              error={error}
              autoFocus
            />
            <Button type="submit" fullWidth className="mt-6">
              Continue
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/onboarding/welcome")}
              className="text-primary font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

