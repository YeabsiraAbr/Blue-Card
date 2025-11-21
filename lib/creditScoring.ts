import type {
  CreditScoreRequest,
  CreditScoreResponse,
  LoanType,
  Loan,
} from "@/types";

// Factor weights by loan type
const FACTOR_WEIGHTS: Record<
  "INDIVIDUAL" | "BUSINESS",
  Record<string, number>
> = {
  INDIVIDUAL: {
    payment_history: 0.35,
    debt_burden: 0.25,
    income_quality: 0.20,
    financial_stability: 0.10,
    credit_seeking: 0.05,
    identity_confidence: 0.05,
  },
  BUSINESS: {
    payment_history: 0.30,
    debt_burden: 0.20,
    income_quality: 0.30,
    financial_stability: 0.15,
    credit_seeking: 0.05,
    identity_confidence: 0.0,
  },
};

// Determine if loan type is business
function isBusinessLoan(loanType: LoanType): boolean {
  return loanType === "MSME_WORKING_CAPITAL";
}

// Factor 1: Payment History
function calculatePaymentHistory(
  loans: Loan[] = []
): number {
  let score = 100;

  for (const loan of loans) {
    if (loan.writeoff_ever) score -= 100;
    if (loan.any_60dpd_12m) score -= 50;
    if (loan.any_30dpd_12m) score -= 25;
    if (loan.credit_account_risk_classification === "SUB-STANDARD")
      score -= 40;
    if (
      loan.credit_account_risk_classification === "DOUBTFUL" ||
      loan.credit_account_risk_classification === "LOSS"
    )
      score -= 70;
    if (loan.credit_account_status === "DEFAULTED") score -= 60;

    if (loan.months_since_last_late) {
      if (loan.months_since_last_late >= 6 && loan.months_since_last_late < 12)
        score += 5;
      if (loan.months_since_last_late >= 12) score += 10;
    }
  }

  return Math.max(0, Math.min(100, score));
}

// Factor 2: Debt Burden & Credit Usage
function calculateDebtBurden(
  request: CreditScoreRequest
): number {
  const { loan_request, financial_history, income_and_revenue } = request;

  if (!income_and_revenue) return 0;

  const monthlyIncome =
    income_and_revenue.verified_monthly_income ||
    income_and_revenue.average_monthly_earnings_3m ||
    0;

  if (monthlyIncome === 0) return 0;

  // Calculate new monthly installment (simplified PMT)
  const amount = loan_request.amount_requested;
  const term = loan_request.term_months || 12;
  const rate = 0.02; // 2% monthly rate
  const newMonthlyInstallment =
    (amount * rate * Math.pow(1 + rate, term)) /
    (Math.pow(1 + rate, term) - 1);

  // Calculate existing monthly debt
  const existingMonthlyDebt =
    financial_history?.loans
      ?.filter((l) => l.status === "ACTIVE")
      .reduce((sum, l) => sum + (l.installment_amount || 0), 0) || 0;

  // Repayment Capacity Ratio
  const rcr = newMonthlyInstallment / monthlyIncome;
  const rcrScore = 100 * (1 - rcr);

  // Total Debt Burden Ratio
  const dbr = (existingMonthlyDebt + newMonthlyInstallment) / monthlyIncome;
  const dbrScore = 100 * (1 - dbr);

  const finalScore = rcrScore * 0.6 + dbrScore * 0.4;
  return Math.max(0, Math.min(100, finalScore));
}

// Factor 3: Income & Revenue Quality
function calculateIncomeQuality(
  request: CreditScoreRequest
): number {
  const { income_and_revenue } = request;
  if (!income_and_revenue) return 0;

  // Select primary income source
  let sourceValue =
    income_and_revenue.verified_monthly_income ||
    income_and_revenue.average_monthly_earnings_3m ||
    0;

  if (sourceValue === 0 && income_and_revenue.statement_inflow_3m) {
    sourceValue = (income_and_revenue.statement_inflow_3m / 3) * 0.7;
  }

  if (sourceValue === 0) return 0;

  // Base score with logarithmic scaling
  let baseScore = 20 * Math.log10(sourceValue);

  // Volatility penalty (for individuals)
  let volatilityPenalty = 0;
  if (
    income_and_revenue.earnings_volatility_stddev_3m &&
    income_and_revenue.average_monthly_earnings_3m
  ) {
    volatilityPenalty =
      (income_and_revenue.earnings_volatility_stddev_3m /
        income_and_revenue.average_monthly_earnings_3m) *
      100;
  }

  // Net cash flow adjustment
  let netFlowAdjustment = 0;
  if (
    income_and_revenue.statement_inflow_3m &&
    income_and_revenue.statement_outflow_3m
  ) {
    const netFlowRatio =
      (income_and_revenue.statement_inflow_3m -
        income_and_revenue.statement_outflow_3m) /
      income_and_revenue.statement_inflow_3m;

    if (netFlowRatio < 0) {
      netFlowAdjustment = Math.max(-15, netFlowRatio * 15);
    } else {
      netFlowAdjustment = Math.min(10, netFlowRatio * 10);
    }
  }

  const finalScore = baseScore - volatilityPenalty + netFlowAdjustment;
  return Math.max(0, Math.min(100, finalScore));
}

// Factor 4: Financial History Length & Stability
function calculateFinancialStability(
  request: CreditScoreRequest
): number {
  const { financial_history, digital_footprint, work_history, loan_request } =
    request;

  // History length score
  let monthsOfHistory = 0;
  if (work_history?.time_since_employed_months)
    monthsOfHistory = Math.max(
      monthsOfHistory,
      work_history.time_since_employed_months
    );
  if (digital_footprint?.wallet_tenure_months)
    monthsOfHistory = Math.max(
      monthsOfHistory,
      digital_footprint.wallet_tenure_months
    );

  const historyScore = Math.min(50, 1.25 * monthsOfHistory);

  // Savings cushion score
  let savingsScore = 0;
  if (
    financial_history?.savings?.average_balance_6m &&
    loan_request.amount_requested
  ) {
    const savingsToLoanRatio =
      financial_history.savings.average_balance_6m /
      loan_request.amount_requested;
    savingsScore = 50 * (1 - Math.exp(-2 * savingsToLoanRatio));
  }

  return Math.max(0, Math.min(100, historyScore + savingsScore));
}

// Factor 5: Credit Seeking Behavior
function calculateCreditSeeking(
  request: CreditScoreRequest
): number {
  const { credit_application_history } = request;

  let score = 80;

  if (!credit_application_history?.applications) return score;

  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth());
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6);

  const apps12m = credit_application_history.applications.filter((app) => {
    const appDate = new Date(app.date);
    return appDate >= twelveMonthsAgo;
  }).length;

  const apps6m = credit_application_history.applications.filter((app) => {
    const appDate = new Date(app.date);
    return appDate >= sixMonthsAgo;
  }).length;

  if (apps12m === 0) return 100;

  score -= apps12m * 10;
  if (apps6m > 3) score -= 20;

  return Math.max(0, Math.min(100, score));
}

// Factor 6: Identity Confidence
function calculateIdentityConfidence(
  request: CreditScoreRequest
): number {
  const { identity_verification } = request;

  if (!identity_verification) return 0;

  let score = 100;

  if (identity_verification.device_is_rooted) score -= 80;
  score -= (1 - identity_verification.selfie_match_score) * 50;
  score -= (1 - identity_verification.id_scan_quality_score) * 30;

  return Math.max(0, Math.min(100, score));
}

// Main scoring function
export function calculateCreditScore(
  request: CreditScoreRequest
): CreditScoreResponse {
  const isBusiness = isBusinessLoan(request.loan_type);
  const weights = FACTOR_WEIGHTS[isBusiness ? "BUSINESS" : "INDIVIDUAL"];

  // Calculate all factor scores
  const factorScores = {
    payment_history: calculatePaymentHistory(
      request.financial_history?.loans
    ),
    debt_burden: calculateDebtBurden(request),
    income_quality: calculateIncomeQuality(request),
    financial_stability: calculateFinancialStability(request),
    credit_seeking: calculateCreditSeeking(request),
    identity_confidence: calculateIdentityConfidence(request),
  };

  // Normalize weights for missing factors
  const availableFactors: string[] = [];
  const factorKeys = Object.keys(weights) as Array<keyof typeof factorScores>;

  for (const key of factorKeys) {
    if (factorScores[key] > 0 || key === "credit_seeking") {
      availableFactors.push(key);
    }
  }

  const totalAvailableWeight = availableFactors.reduce(
    (sum, key) => sum + weights[key],
    0
  );

  const normalizedWeights: Record<string, number> = {};
  for (const key of availableFactors) {
    normalizedWeights[key] = weights[key] / totalAvailableWeight;
  }

  // Calculate weighted average
  let weightedScore = 0;
  for (const key of availableFactors) {
    weightedScore += factorScores[key as keyof typeof factorScores] * normalizedWeights[key];
  }

  // Apply pre-normalization guardrails
  let fraudFlag: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (request.identity_verification?.device_is_rooted) {
    fraudFlag = "HIGH";
  } else if (
    request.identity_verification &&
    (request.identity_verification.selfie_match_score < 0.7 ||
      request.identity_verification.id_scan_quality_score < 0.7)
  ) {
    fraudFlag = "MEDIUM";
  }

  if (fraudFlag === "MEDIUM") {
    weightedScore *= 0.9;
  } else if (fraudFlag === "HIGH") {
    weightedScore = Math.min(weightedScore, (580 - 300) / 5.5);
  }

  // Check for missing critical data
  if (
    !request.financial_history &&
    !request.income_and_revenue
  ) {
    weightedScore = Math.min(weightedScore, (739 - 300) / 5.5);
  }

  // Scale to final score (300-850)
  const finalScore = 300 + weightedScore * 5.5;

  // Determine score band
  let scoreBand: "A" | "B" | "C" | "D" | "E" | "F";
  if (finalScore >= 750) scoreBand = "A";
  else if (finalScore >= 700) scoreBand = "B";
  else if (finalScore >= 650) scoreBand = "C";
  else if (finalScore >= 600) scoreBand = "D";
  else if (finalScore >= 550) scoreBand = "E";
  else scoreBand = "F";

  return {
    final_score: Math.round(finalScore),
    factor_scores: factorScores,
    fraud_flag: fraudFlag,
    score_band: scoreBand,
  };
}

