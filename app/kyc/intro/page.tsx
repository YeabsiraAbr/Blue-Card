"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { Shield, Camera, MapPin, Users } from "lucide-react";

export default function KYCIntroPage() {
  const router = useRouter();

  const steps = [
    {
      icon: Shield,
      title: "ID Verification",
      description: "Upload front and back of your ID",
    },
    {
      icon: Camera,
      title: "Selfie Check",
      description: "Take a selfie for identity confirmation",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Confirm your residence address",
    },
    {
      icon: Users,
      title: "References",
      description: "Provide two contact references",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Verify Your Identity" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Complete Identity Verification
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              To unlock your virtual card and access credit, we need to verify
              your identity. This process takes just a few minutes.
            </p>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={() => router.push("/kyc/id-upload")}
          >
            Start Verification
          </Button>
        </div>
      </div>
    </div>
  );
}

