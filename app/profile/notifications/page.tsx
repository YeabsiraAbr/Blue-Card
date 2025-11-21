"use client";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import { useState } from "react";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    paymentAlerts: true,
    repaymentReminders: true,
    scoreUpdates: true,
    promotions: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Notifications" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="space-y-1">
              {Object.entries(settings).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <button
                    onClick={() => toggleSetting(key as keyof typeof settings)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

