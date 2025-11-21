// User and Authentication Types
export interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  verificationStatus: "unverified" | "pending" | "verified";
  trustScore?: number;
  creditLimit?: number;
  availableBalance?: number;
}

// KYC Types
export interface IdentityVerification {
  idFront?: string;
  idBack?: string;
  selfie?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  residencePhoto?: string;
  references?: Reference[];
  status: "not_started" | "in_progress" | "submitted" | "approved" | "rejected";
}

export interface Reference {
  name: string;
  phone: string;
  relationship: "Family" | "Friend" | "Colleague" | "Other";
}

// Transaction Types
export interface Transaction {
  id: string;
  type: "payment" | "repayment" | "credit" | "debit";
  amount: number;
  merchant?: string;
  date: Date;
  status: "pending" | "completed" | "failed";
  transactionId: string;
}

// Credit Scoring Types
export type LoanType =
  | "SALARY_LINKED_ADVANCES"
  | "NANO_MICRO_CASH_LOANS"
  | "BNPL_CONSUMER_INSTALLMENT"
  | "MSME_WORKING_CAPITAL"
  | "ASSET_FINANCE"
  | "AGRI_SEASONAL_INPUT"
  | "HOUSING_LONG_TERM_ASSET";

export interface CreditScoreRequest {
  loan_type: LoanType;
  loan_request: {
    amount_requested: number;
    loan_type: LoanType;
    term_months?: number;
  };
  financial_history?: {
    loans: Loan[];
    savings?: {
      average_balance_6m: number;
    };
  };
  income_and_revenue?: {
    verified_monthly_income?: number;
    average_monthly_earnings_3m?: number;
    statement_inflow_3m?: number;
    statement_outflow_3m?: number;
    earnings_volatility_stddev_3m?: number;
  };
  credit_application_history?: {
    applications: CreditApplication[];
  };
  identity_verification?: {
    device_is_rooted: boolean;
    selfie_match_score: number;
    id_scan_quality_score: number;
  };
  digital_footprint?: {
    wallet_tenure_months?: number;
    sim_card_tenure_months?: number;
    current_wallet_balance?: number;
    avg_monthly_wallet_turnover?: number;
    avg_monthly_wallet_transactions?: number;
  };
  work_history?: {
    time_since_employed_months?: number;
    primary_income_source_tenure_months?: number;
  };
  business_data?: {
    last_6_months_turnover?: number[];
    is_business_license_verified?: boolean;
    business_tenure_months?: number;
  };
  // Additional fields for specific product types
  last6MonthsSalary?: number[];
  isSalaryVerifiedByPartner?: boolean;
  activeBnplPlanCount?: number;
  totalActiveBnplDebt?: number;
  assetValue?: number;
  downPaymentAmount?: number;
  propertyValue?: number;
  hasInsuranceCoverage?: boolean;
  harvestHistory?: HarvestRecord[];
  isCooperativeMember?: boolean;
  isAssetRegisteredOnEmcr?: boolean;
  farmSizeAcres?: number;
  cropType?: string;
  isCollateralVerified?: boolean;
}

export interface Loan {
  status: string;
  credit_account_status?: string;
  credit_account_risk_classification?: string;
  payments_missed?: number;
  writeoff_ever?: boolean;
  any_60dpd_12m?: boolean;
  any_30dpd_12m?: boolean;
  months_since_last_late?: number;
  installment_amount?: number;
}

export interface CreditApplication {
  date: string;
  decision: "APPROVED" | "REJECTED" | "PENDING";
}

export interface HarvestRecord {
  yieldKg: number;
  salePricePerKg: number;
  year: number;
}

export interface CreditScoreResponse {
  final_score: number;
  factor_scores: {
    payment_history: number;
    debt_burden: number;
    income_quality: number;
    financial_stability: number;
    credit_seeking: number;
    identity_confidence: number;
  };
  fraud_flag: "LOW" | "MEDIUM" | "HIGH";
  score_band: "A" | "B" | "C" | "D" | "E" | "F";
}

