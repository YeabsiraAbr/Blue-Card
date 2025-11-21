"use client";

import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage institution settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Institution Information
            </h2>
            <div className="space-y-4">
              <Input label="Institution Name" defaultValue="Blue-Card Financial" />
              <Input label="Contact Email" defaultValue="admin@bluecard.et" />
              <Input label="Contact Phone" defaultValue="+251 911 234 567" />
              <Input label="Address" defaultValue="Addis Ababa, Ethiopia" />
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Credit Scoring Settings
            </h2>
            <div className="space-y-4">
              <Input
                label="Minimum Credit Score"
                type="number"
                defaultValue="600"
              />
              <Input
                label="Maximum Loan Amount (ETB)"
                type="number"
                defaultValue="500000"
              />
              <Input
                label="Default Interest Rate (%)"
                type="number"
                defaultValue="12"
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span className="text-sm text-gray-700">
                  Email notifications for new applications
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span className="text-sm text-gray-700">
                  SMS alerts for high-risk applications
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm text-gray-700">
                  Weekly performance reports
                </span>
              </label>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Security Settings
            </h2>
            <div className="space-y-4">
              <Button variant="outline" fullWidth>
                Change Password
              </Button>
              <Button variant="outline" fullWidth>
                Manage API Keys
              </Button>
              <Button variant="outline" fullWidth className="text-red-600 border-red-300 hover:bg-red-50">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Button size="lg">
            <Save size={20} className="mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

