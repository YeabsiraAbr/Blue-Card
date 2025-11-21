"use client";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import { HelpCircle, Phone, Mail, MessageCircle } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I verify my identity?",
      answer:
        "Go to the Home screen and tap 'Verify Identity'. Follow the steps to upload your ID, take a selfie, and provide your location and references.",
    },
    {
      question: "How long does verification take?",
      answer:
        "Identity verification typically takes 1-2 business days. You'll receive a notification once your verification is complete.",
    },
    {
      question: "How do I make a payment?",
      answer:
        "You can make payments by showing your QR code to merchants or by scanning their QR code. Go to the Payment screen to get started.",
    },
    {
      question: "What is a Trust Score?",
      answer:
        "Your Trust Score is a number between 300-850 that reflects your creditworthiness. A higher score gives you access to better credit terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Help & Support" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <a
                href="tel:+251911234567"
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-primary" />
                </div>
                <span className="font-medium">+251 911 234 567</span>
              </a>
              <a
                href="mailto:support@bluecard.et"
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <span className="font-medium">support@bluecard.et</span>
              </a>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Legal</h2>
            <div className="space-y-2">
              <a
                href="/terms"
                className="block text-primary font-medium py-2"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                className="block text-primary font-medium py-2"
              >
                Privacy Policy
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

