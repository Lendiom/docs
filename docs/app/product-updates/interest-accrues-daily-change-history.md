---
id: interest-accrues-daily-change-history
title: Interest Accrues Daily - Change History
---

## Complete History of Interest Accruing Daily Changes (2023-2025)

### **2023: Initial Development Phase**

#### **July-August 2023** - Foundation & Core Implementation

- **Dates:** July 10 - August 14, 2023
- **Changes:**
  - Initial development of interest accrues daily functionality
  - Implemented transaction creation for daily interest accrual
  - Added support for unpaid interest tracking
  - Fixed integrity worker for daily interest calculations
  - Renamed fields for clarity (accrual method → interest formula)
- **Impact:** Core feature development establishing the daily interest system

#### **August 30, 2023** - Year-to-Date Tracking

- **Change:** Added interest year-to-date tracking for existing loans

#### **December 31, 2023** - Schedule Generation

- **Change:** Implemented amortization schedule generation for loans with daily interest accrual
- **Impact:** Major feature adding schedule visibility

---

### **2024: Refinement & Bug Fixes**

#### **January 3, 2024** - Infinite Loop Fix

- **Change:** Fixed infinite loop in daily schedule calculations

#### **January 11, 2024** - Portal Exposure

- **Change:** Exposed interest schedule to client portal

#### **January 19-22, 2024** - Multiple Payments Support

- **Changes:**
  - Enabled one transaction to apply to multiple payments for daily interest loans
  - Fixed unpaid interest accounting
  - Fixed transaction reversals with unpaid interest
- **Impact:** Critical functionality for payment allocation

#### **April 3, 2024** - Partial Payments Support

- **Change:** Enabled partial payments for daily interest loans
- **Impact:** Major enhancement allowing flexible payment amounts

#### **May 17, 2024** - Payoff Fix

- **Change:** Fixed payoffs not working on interest follows payment schedule

#### **June 6, 2024** - Transaction Reversal Fix

- **Change:** Fixed reversing transactions that included unpaid interest

#### **July 3, 2024** - Enhanced Reporting & Clarity

- **Changes:**
  - Exposed unpaid interest on transaction list reports
  - Added loan balance breakdown to client portal
  - Exposed unpaid interest on amortization schedule
  - Added clarifying language for daily interest and amortization schedules

#### **July 9, 2024** - Historical Data Fix

- **Changes:**
  - Fixed prior transactions (before April 4th) having incorrect unpaid interest allocation
  - Fixed interest amount allocation when one transaction applies to multiple payments
- **Impact:** Data correction for historical transactions

#### **August 5-6, 2024** - Payoff Letter Enhancements

- **Changes:**
  - Fixed payoff calculations having an extra day of interest
  - Added support for daily interest loans in successful payment letters

#### **October 11, 2024** - Reversal Fix

- **Change:** Fixed transaction reversal incorrectly reversing interest

#### **November 8, 2024** - Critical Calculation Fix

- **Changes:**
  - Fixed interest amount increasing exponentially with partial payments
  - Improved amortization schedule handling with partial payments
  - Fixed payment allocation calculations
- **Impact:** Major bug fix preventing exponential interest growth

#### **November 17, 2024** - Code Readability

- **Change:** Improved readability of interest, principal, and escrow calculations

November 18, 2024 - Track Extra Principal

- **Change**: Added a dedicated handler to track extra principal paid per expected payment.

#### **November 20, 2024** - Interest Balance Reversal Fix

- **Change:** Fixed reversing transactions that increased loan's interest balance

---

### **2025: Stability & Refinement**

#### **January 13, 2025** - Enhanced Reporting

- **Change:** Exposed separate tracking of regular interest vs unpaid interest in 1098 reporting

#### **August 1-5, 2025** - Multiple Payments Fix

- **Changes:**
  - Fixed interest calculation when transactions go to multiple payments with daily accrual
  - Included data migration script to fix affected historical loans
- **Impact:** Comprehensive fix requiring historical data correction

#### **October 7, 2025** - Interest Tracking Overhaul (PR #523, #524)

- **Changes:**
  - Fixed double-calculating interest due
  - Properly separated regular interest from unpaid interest
  - Added tracking for when recently accrued interest is paid off
  - Fixed retention of unpaid interest after partial payments
  - Renamed transaction fields for clarity
- **Impact:** Resolved longstanding confusion about interest allocation and double-calculation issues

---

## Summary

The interest accrues daily feature evolved from initial development in **mid-2023** through multiple iterations addressing edge cases with partial payments, multiple payment allocation, transaction reversals, and double-calculation issues. The most significant fixes occurred in:

- **April 2024** - Partial payments support
- **November 2024** - Exponential growth bug fix
- **October 2025** - Double-calculation resolution
