"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+251");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 13) {
      setError("Please enter a valid phone number");
      return;
    }
    // Store phone number (in real app, use context or state management)
    if (typeof window !== "undefined") {
      localStorage.setItem("phoneNumber", phone);
    }
    router.push("/onboarding/otp");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Enter Phone Number" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-6">
            We'll send you a verification code to confirm your number.
          </p>
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
        </div>
      </div>
    </div>
  );
}

