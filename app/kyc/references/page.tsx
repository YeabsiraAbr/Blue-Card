"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Users } from "lucide-react";

export default function ReferencesPage() {
  const router = useRouter();
  const [reference1, setReference1] = useState({
    name: "",
    phone: "",
    relationship: "Family" as "Family" | "Friend" | "Colleague" | "Other",
  });
  const [reference2, setReference2] = useState({
    name: "",
    phone: "",
    relationship: "Family" as "Family" | "Friend" | "Colleague" | "Other",
  });

  const relationships = ["Family", "Friend", "Colleague", "Other"];

  const handleSubmit = () => {
    if (
      reference1.name &&
      reference1.phone &&
      reference2.name &&
      reference2.phone
    ) {
      router.push("/kyc/submitted");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="References" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-2">
              Add Two References
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Provide contact information for two people who can verify your
              identity
            </p>
          </div>

          <div className="space-y-6">
            {/* Reference 1 */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-primary" />
                <h3 className="font-medium">Reference 1</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={reference1.name}
                  onChange={(e) =>
                    setReference1({ ...reference1, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={reference1.phone}
                  onChange={(e) =>
                    setReference1({ ...reference1, phone: e.target.value })
                  }
                  placeholder="+251 9XX XXX XXX"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <select
                    value={reference1.relationship}
                    onChange={(e) =>
                      setReference1({
                        ...reference1,
                        relationship: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reference 2 */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-primary" />
                <h3 className="font-medium">Reference 2</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={reference2.name}
                  onChange={(e) =>
                    setReference2({ ...reference2, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={reference2.phone}
                  onChange={(e) =>
                    setReference2({ ...reference2, phone: e.target.value })
                  }
                  placeholder="+251 9XX XXX XXX"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <select
                    value={reference2.relationship}
                    onChange={(e) =>
                      setReference2({
                        ...reference2,
                        relationship: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <Button
            fullWidth
            className="mt-6"
            onClick={handleSubmit}
            disabled={
              !reference1.name ||
              !reference1.phone ||
              !reference2.name ||
              !reference2.phone
            }
          >
            Submit Verification
          </Button>
        </div>
      </div>
    </div>
  );
}

