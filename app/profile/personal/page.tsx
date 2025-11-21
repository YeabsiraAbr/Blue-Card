"use client";

import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useState, useEffect } from "react";

export default function PersonalPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullName(localStorage.getItem("fullName") || "");
      setPhone(localStorage.getItem("phoneNumber") || "");
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fullName", fullName);
    }
    // In real app, save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Personal Information" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled
              />
              <Input
                label="Email (Optional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
              <Button fullWidth onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

