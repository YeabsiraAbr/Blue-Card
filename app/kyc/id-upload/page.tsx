"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { Camera, Check } from "lucide-react";

export default function IDUploadPage() {
  const router = useRouter();
  const [idFront, setIdFront] = useState<string | null>(null);
  const [idBack, setIdBack] = useState<string | null>(null);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (currentSide === "front") {
          setIdFront(reader.result as string);
        } else {
          setIdBack(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (currentSide === "front" && idFront) {
      setCurrentSide("back");
    } else if (currentSide === "back" && idBack) {
      router.push("/kyc/id-preview");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Upload ID" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {currentSide === "front" ? "Step 1 of 2" : "Step 2 of 2"}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              {currentSide === "front"
                ? "Upload Front of ID"
                : "Upload Back of ID"}
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Make sure the image is clear and all text is readable
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
              {currentSide === "front" && idFront ? (
                <img
                  src={idFront}
                  alt="ID Front"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : currentSide === "back" && idBack ? (
                <img
                  src={idBack}
                  alt="ID Back"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">No image selected</p>
                </div>
              )}
            </div>

            <label className="block">
              <input
                type="file"
                accept="image/*"
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
                {currentSide === "front" && idFront
                  ? "Retake Front"
                  : currentSide === "back" && idBack
                  ? "Retake Back"
                  : "Take Photo"}
              </Button>
            </label>
          </div>

          <Button
            fullWidth
            onClick={handleContinue}
            disabled={
              (currentSide === "front" && !idFront) ||
              (currentSide === "back" && !idBack)
            }
          >
            {currentSide === "front" ? "Continue to Back" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

