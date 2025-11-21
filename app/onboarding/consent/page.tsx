"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Terms & Privacy" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Data Privacy & Permissions
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                To provide you with the best service, we need to collect and
                verify some information about you. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Identity verification documents</li>
                <li>Location data for address verification</li>
                <li>Contact information for references</li>
                <li>Financial information for credit assessment</li>
              </ul>
              <p className="mt-4">
                Your data is encrypted and stored securely. We never share your
                information with third parties without your consent.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <a
              href="/terms"
              className="text-primary text-sm font-medium"
              target="_blank"
            >
              Read Terms & Conditions
            </a>
          </div>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              I agree to the Terms & Conditions and Privacy Policy. I consent to
              the collection and use of my data as described above.
            </span>
          </label>

          <Button
            fullWidth
            onClick={() => router.push("/onboarding/profile")}
            disabled={!agreed}
          >
            Agree and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

