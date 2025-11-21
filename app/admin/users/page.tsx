"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Search, Eye, Shield, Ban } from "lucide-react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: "1",
      name: "Alemayehu Bekele",
      phone: "+251 911 234 567",
      email: "alemayehu@example.com",
      status: "active",
      verificationStatus: "verified",
      trustScore: 725,
      creditLimit: 100000,
      joinDate: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Meron Tadesse",
      phone: "+251 922 345 678",
      email: "meron@example.com",
      status: "active",
      verificationStatus: "verified",
      trustScore: 680,
      creditLimit: 50000,
      joinDate: new Date("2024-02-20"),
    },
    {
      id: "3",
      name: "Yonas Haile",
      phone: "+251 933 456 789",
      email: "yonas@example.com",
      status: "suspended",
      verificationStatus: "pending",
      trustScore: 590,
      creditLimit: 25000,
      joinDate: new Date("2024-03-10"),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and information</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Search Users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone, or email"
              />
            </div>
          </div>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.verificationStatus === "verified"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.verificationStatus.charAt(0).toUpperCase() +
                        user.verificationStatus.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Trust Score</p>
                      <p className="font-medium text-gray-900">{user.trustScore}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Credit Limit</p>
                      <p className="font-medium text-gray-900">
                        ETB {user.creditLimit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Joined: {user.joinDate.toLocaleDateString()}
                  </div>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield size={16} className="mr-2" />
                    View Score
                  </Button>
                  {user.status === "active" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Ban size={16} className="mr-2" />
                      Suspend
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                      Activate
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

