"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 3) {
      setError("Please enter your full legal name");
      return;
    }
    // Store user data
    if (typeof window !== "undefined") {
      localStorage.setItem("fullName", fullName);
    }
    router.push("/kyc/intro");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Create Profile" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-6">
            Let&apos;s start by getting your basic information.
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Legal Name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError("");
              }}
              placeholder="Enter your full name as on ID"
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

