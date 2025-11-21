"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-12">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl font-bold">BC</span>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Welcome to Blue-Card
          </h1>
          <p className="text-center text-gray-600 text-lg max-w-md">
            Your digital credit and payment solution for Ethiopia. Access credit
            quickly, make payments easily, and build your financial future.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push("/onboarding/phone")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

