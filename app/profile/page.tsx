"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import {
  User,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(localStorage.getItem("fullName") || "User");
  }, []);

  const menuItems = [
    {
      icon: User,
      label: "Personal Information",
      href: "/profile/personal",
    },
    {
      icon: Shield,
      label: "Security Settings",
      href: "/profile/security",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/profile/notifications/inbox",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/profile/support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profile" showBack={false} />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* User Info Card */}
          <Card>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {fullName}
              </h2>
              <p className="text-sm text-gray-600">
                {localStorage.getItem("phoneNumber") || "+251 9XX XXX XXX"}
              </p>
            </div>
          </Card>

          {/* Menu Items */}
          <Card>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight size={20} className="text-gray-400" />
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Logout */}
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              localStorage.clear();
              router.push("/onboarding/welcome");
            }}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut size={20} className="mr-2" />
            Log Out
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

