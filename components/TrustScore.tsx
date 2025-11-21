"use client";

interface TrustScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function TrustScore({ score, size = "md" }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 700) return "text-blue-600";
    if (score >= 650) return "text-yellow-600";
    if (score >= 600) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBand = (score: number) => {
    if (score >= 750) return "A";
    if (score >= 700) return "B";
    if (score >= 650) return "C";
    if (score >= 600) return "D";
    if (score >= 550) return "E";
    return "F";
  };

  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`font-bold ${sizes[size]} ${getScoreColor(score)}`}>
        {score}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        Band {getScoreBand(score)}
      </div>
      <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-full ${getScoreColor(score).replace("text-", "bg-")}`}
          style={{ width: `${((score - 300) / 550) * 100}%` }}
        />
      </div>
    </div>
  );
}

