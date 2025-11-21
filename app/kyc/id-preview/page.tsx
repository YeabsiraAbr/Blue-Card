"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";

export default function IDPreviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Confirm ID Images" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-6 text-center">
            Please confirm that both images are clear and readable before
            submitting.
          </p>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="aspect-video bg-gray-100 rounded-lg mb-2 border-2 border-gray-200">
                  {/* In real app, show actual ID front image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    ID Front
                  </div>
                </div>
                <p className="text-xs text-center text-gray-600">Front</p>
              </div>
              <div>
                <div className="aspect-video bg-gray-100 rounded-lg mb-2 border-2 border-gray-200">
                  {/* In real app, show actual ID back image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    ID Back
                  </div>
                </div>
                <p className="text-xs text-center text-gray-600">Back</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Make sure all text is clearly visible and
              there are no shadows or glare on the images.
            </p>
          </div>

          <Button
            fullWidth
            onClick={() => router.push("/kyc/selfie")}
          >
            Confirm and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

