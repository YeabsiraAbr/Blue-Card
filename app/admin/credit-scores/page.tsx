"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Search, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { calculateCreditScore } from "@/lib/creditScoring";
import type { CreditScoreRequest } from "@/types";

export default function CreditScoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [scoreDetails, setScoreDetails] = useState<any>(null);

  // Mock user data - in real app, fetch from API
  const mockUsers = [
    {
      id: "1",
      name: "Alemayehu Bekele",
      phone: "+251 911 234 567",
      email: "alemayehu@example.com",
    },
    {
      id: "2",
      name: "Meron Tadesse",
      phone: "+251 922 345 678",
      email: "meron@example.com",
    },
    {
      id: "3",
      name: "Yonas Haile",
      phone: "+251 933 456 789",
      email: "yonas@example.com",
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleCalculateScore = (userId: string) => {
    // Mock credit score request - in real app, fetch user data from API
    const mockRequest: CreditScoreRequest = {
      loan_type: "SALARY_LINKED_ADVANCES",
      loan_request: {
        amount_requested: 50000,
        loan_type: "SALARY_LINKED_ADVANCES",
        term_months: 12,
      },
      financial_history: {
        loans: [
          {
            status: "PAID_OFF",
            credit_account_status: "CLOSED",
            payments_missed: 0,
            months_since_last_late: 24,
          },
        ],
        savings: {
          average_balance_6m: 10000,
        },
      },
      income_and_revenue: {
        verified_monthly_income: 15000,
        average_monthly_earnings_3m: 15000,
      },
      credit_application_history: {
        applications: [],
      },
      identity_verification: {
        device_is_rooted: false,
        selfie_match_score: 0.95,
        id_scan_quality_score: 0.92,
      },
    };

    const result = calculateCreditScore(mockRequest);
    setScoreDetails(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Credit Scores</h1>
          <p className="text-gray-600">
            Search and view credit scores for users
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Search User
              </h2>
              <div className="space-y-4">
                <Input
                  label="Search by Name, Phone, or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter search query"
                />
                <Button fullWidth onClick={handleSearch}>
                  <Search size={20} className="mr-2" />
                  Search
                </Button>

                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Results ({searchResults.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => {
                            setSelectedUser(user);
                            handleCalculateScore(user.id);
                          }}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.phone}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Score Details */}
          <div className="lg:col-span-2">
            {scoreDetails ? (
              <Card>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Credit Score Details
                  </h2>
                  {selectedUser && (
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Name:</strong> {selectedUser.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedUser.phone}
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Score */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white mb-6">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Final Credit Score</p>
                    <p className="text-5xl font-bold mb-2">
                      {scoreDetails.final_score}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium">
                        Band {scoreDetails.score_band}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Factor Scores */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Factor Breakdown
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(scoreDetails.factor_scores).map(
                      ([factor, score]) => (
                        <div key={factor}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {factor.replace(/_/g, " ")}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {score as number} / 100
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                (score as number) >= 70
                                  ? "bg-green-600"
                                  : (score as number) >= 50
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                              }`}
                              style={{
                                width: `${score as number}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Fraud Flag */}
                {scoreDetails.fraud_flag !== "LOW" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={20} className="text-red-600" />
                      <p className="text-sm font-medium text-red-800">
                        Fraud Flag: {scoreDetails.fraud_flag}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <FileText size={20} className="mr-2" />
                    View Full Report
                  </Button>
                  <Button className="flex-1">
                    <TrendingUp size={20} className="mr-2" />
                    Calculate New Score
                  </Button>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Search for a user to view their credit score
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

