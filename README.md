# Blue-Card - Digital Credit & Payment App

A modern, secure Next.js 15 application for digital credit and payment services in Ethiopia.

## Features

### User Flows

1. **Onboarding & Sign-Up**
   - Welcome screen with app introduction
   - Phone number verification with OTP
   - Terms & privacy consent
   - Profile creation

2. **Identity Verification (KYC)**
   - ID document upload (front & back)
   - Selfie/liveness check
   - Location verification
   - Reference submission

3. **Home Dashboard**
   - Available balance and credit limit display
   - Trust Score visualization
   - Virtual card display
   - Quick actions (Make Payment, Repay Bill)
   - Recent transactions

4. **Payments**
   - QR code display for merchant scanning
   - QR code scanning for merchant payments
   - Payment confirmation with PIN
   - Payment success feedback

5. **Repayment**
   - View total amount due and due date
   - Multiple repayment methods (Telebirr, USSD)
   - Step-by-step repayment guidance

6. **Transaction History**
   - Full transaction list with filters
   - Transaction details (amount, date, merchant, status)

7. **Profile & Settings**
   - Personal information management
   - Security settings (PIN, biometrics)
   - Notification preferences
   - Help & support

## Credit Scoring Algorithm

The app includes a comprehensive credit scoring system (ET-Score v2.0) that supports 7 different product types:

1. Salary-Linked Advances
2. Nano/Micro Cash Loans
3. BNPL & Consumer Installment
4. MSME Working Capital
5. Asset Finance
6. Agri Seasonal Input
7. Housing & Long-term Asset Finance

The algorithm uses a weighted factor-based model with 6 core factors:
- Payment History (35% for individuals, 30% for business)
- Debt Burden & Credit Usage (25% / 20%)
- Income & Revenue Quality (20% / 30%)
- Financial History & Stability (10% / 15%)
- Credit Seeking Behavior (5%)
- Identity Confidence (5% / 0%)

Final scores are mapped to a 300-850 range with letter bands (A-F).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Design System

- **Primary Color**: Navy Blue (#000080)
- **Secondary Color**: White (#FFFFFF)
- **Typography**: Inter (Google Fonts)
- **Icons**: Clean line-art style (Lucide React)

## Project Structure

```
/app
  /onboarding      # Onboarding flow screens
  /kyc             # Identity verification screens
  /home            # Main dashboard
  /payment         # Payment flows
  /repayment       # Repayment screens
  /history         # Transaction history
  /profile         # Profile and settings
/components        # Reusable UI components
/lib               # Credit scoring algorithm
/types             # TypeScript type definitions
```

## Notes

- This is a frontend MVP implementation
- Backend API integration is not included
- Camera/QR scanning uses placeholder implementations
- User data is stored in localStorage (should be replaced with proper state management)
- Credit scoring algorithm is fully implemented and ready for integration

## License

MIT

