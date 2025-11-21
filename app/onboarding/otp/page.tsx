"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // In real app, verify OTP with backend
      router.push("/onboarding/consent");
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    // In real app, resend OTP
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Verify Code" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Enter the 6-digit code sent to your phone
          </p>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            ))}
          </div>

          <Button
            fullWidth
            onClick={handleVerify}
            disabled={otp.join("").length !== 6}
          >
            Verify
          </Button>

          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-primary font-medium"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend code in {timer}s
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

