"use client";

import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Lock, Fingerprint } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Security Settings" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-4">
          <Card>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-gray-900">Change PIN</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Fingerprint size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Biometric Authentication
                  </span>
                </div>
                <span className="text-sm text-gray-500">Enabled</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

