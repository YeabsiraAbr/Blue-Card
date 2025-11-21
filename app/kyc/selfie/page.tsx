"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { Camera } from "lucide-react";

export default function SelfiePage() {
  const router = useRouter();
  const [selfie, setSelfie] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("Position your face in the oval");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfie(reader.result as string);
        setFeedback("Good! Face detected");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Selfie Verification" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-2">
              Take a Selfie
            </h2>
            <p className="text-gray-600 text-sm text-center">
              We need to verify that you're a real person
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
              {selfie ? (
                <img
                  src={selfie}
                  alt="Selfie"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-64 border-4 border-primary rounded-full opacity-50"></div>
                  </div>
                  <div className="text-center z-10">
                    <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">{feedback}</p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800 text-center">{feedback}</p>
            </div>

            <label className="block">
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  (document.querySelector('input[type="file"]') as HTMLInputElement)?.click();
                }}
              >
                <Camera className="mr-2" size={20} />
                {selfie ? "Retake Selfie" : "Take Selfie"}
              </Button>
            </label>
          </div>

          <Button
            fullWidth
            onClick={() => router.push("/kyc/location")}
            disabled={!selfie}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

