"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Phone, ArrowRight } from "lucide-react";

export default function TelebirrRepaymentPage() {
  const router = useRouter();
  const totalDue = 15000;
  const [step, setStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Open Telebirr App",
      description: "Launch the Telebirr mobile application on your phone.",
    },
    {
      number: 2,
      title: "Select 'Send Money'",
      description: "Navigate to the Send Money option in the app menu.",
    },
    {
      number: 3,
      title: "Enter Amount",
      description: `Enter the amount ETB ${totalDue.toLocaleString()} to send.`,
    },
    {
      number: 4,
      title: "Enter Recipient",
      description: "Enter Blue-Card payment number: 9999999999",
    },
    {
      number: 5,
      title: "Confirm Payment",
      description: "Review and confirm the transaction details.",
    },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      router.push("/repayment/confirmation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Repay via Telebirr" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-primary" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Amount Due</p>
              <p className="text-3xl font-bold text-gray-900">
                ETB {totalDue.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Step {step} of {steps.length}</h2>
                <span className="text-sm text-gray-500">
                  {step}/{steps.length}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {steps.map((s) => (
                  <div
                    key={s.number}
                    className={`p-4 rounded-lg border-2 ${
                      s.number === step
                        ? "border-primary bg-primary/5"
                        : s.number < step
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                          s.number === step
                            ? "bg-primary text-white"
                            : s.number < step
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {s.number < step ? "✓" : s.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {s.title}
                        </h3>
                        <p className="text-sm text-gray-600">{s.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button fullWidth onClick={handleNext}>
              {step < steps.length ? "Next Step" : "Complete Payment"}
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

