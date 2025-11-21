"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MapPin, Camera } from "lucide-react";

export default function LocationPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [residencePhoto, setResidencePhoto] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResidencePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Residence Location" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-2">
              Confirm Your Address
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Help us verify your residence location
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">Map View</p>
                <p className="text-gray-400 text-xs mt-1">
                  (Interactive map would be here)
                </p>
              </div>
            </div>

            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
            />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Residence Photo (Optional)
              </label>
              <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                {residencePhoto ? (
                  <img
                    src={residencePhoto}
                    alt="Residence"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 text-xs">No photo</p>
                  </div>
                )}
              </div>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    (document.querySelector('input[type="file"]') as HTMLInputElement)?.click();
                  }}
                >
                  <Camera className="mr-2" size={16} />
                  Upload Photo
                </Button>
              </label>
            </div>
          </div>

          <Button
            fullWidth
            onClick={() => router.push("/kyc/references")}
            disabled={!address.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

