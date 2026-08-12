---
id: deleting-late-fees
title: Deleting Late Fees
---

This document explains how deleting reversed late fee transactions works and what behavior to expect.

## Overview

When a late fee is charged on a loan, you can reverse it to cancel the late fee. After reversing, you have the option to permanently delete the reversed transaction from the loan's history. This feature is useful for keeping transaction records clean while managing late fee policies.

## Key Behavior: Late Fee Re-Application

**Important:** Deleting a reversed late fee does NOT permanently waive the late fee. If the underlying conditions that triggered the late fee still exist (payment still overdue, loan is active), the system will automatically re-apply the late fee on the next integrity check.

This is intentional behavior designed to support the following workflow:

1. A late fee is automatically applied when a payment is overdue
2. You reverse the late fee as a one-time courtesy
3. You delete the reversed transaction to clean up the history
4. If the borrower still doesn't pay, the system re-applies the late fee

### When Does Re-Application Happen?

The system checks loan integrity and may re-apply late fees during:

- Recording a new payment
- Scheduled background jobs
- Any loan status change

## Common Use Cases

### Use Case 1: One-Time Courtesy Waiver

- **Scenario:** A borrower asks for a one-time courtesy waiver because they were a day late.
- **Steps:**
  1. Reverse the late fee transaction
  2. Delete the reversed transaction (optional, for clean records)
  3. The borrower makes their payment
- **Result:** Since the payment is now made, the late fee will NOT be re-applied.

### Use Case 2: Temporary Waiver While Investigating

- **Scenario:** A borrower disputes a late fee, claiming they paid on time.
- **Steps:**
  1. Change the loan status to Draft (prevents new late fees)
  2. Reverse the late fee
  3. Delete the reversed transaction
  4. Investigate the issue
  5. If the borrower was right: Keep the loan in draft until payment is verified
  6. If the borrower was wrong: Change status back to Active/Current
- **Result:** If changed back to Active with payment still overdue, the late fee will be re-applied.

### Use Case 3: Permanent Late Fee Waiver

- **Scenario:** You want to permanently waive late fees for a specific loan.
- **Steps:**
  1. Go to the loan's late fee configuration
  2. Either:
    1. Disable late fees entirely for this loan, OR
    2. Extend the grace period beyond what's needed (modify late fee config)
  3. Reverse any existing late fees
  4. Delete the reversed transactions (optional)
- **Result:** With late fees disabled or grace period extended, no new late fees will be applied regardless of payment status.

## Loan Status and Late Fees

Late fees can only be applied when the loan is in an **active** status:

- Current
- Grace Period
- Late
- In Default
- Defaulted
- Pending
- Pending Payoff

Late fees are NOT applied when the loan is in an **inactive** status:

- Draft
- Inactive
- Paid Off
- Repossessed
- Canceled

**Tip**: Temporarily changing a loan to Draft status prevents new late fees from being applied while you investigate or make adjustments.

## What Gets Deleted

When you delete a reversed late fee:

- The transaction is permanently removed from the loan's transaction history
- The late fee tier is unmarked from the payment schedule (allowing re-application)
- The related transaction reference is removed from the payment

## What Cannot Be Deleted

You can only delete late fee transactions that have been reversed. You cannot delete:

- Active (non-reversed) late fees
- Payments
- Other transaction types (principal payments, interest payments, etc.)

## Frequently Asked Questions

### Why was the late fee re-applied after I deleted it?

The late fee was re-applied because:

1. The loan is in an active status (Current, Late, etc.)
2. The payment is still overdue (past due date + grace period)
3. The late fee tier was cleared when you deleted the transaction

This is intentional. To prevent re-application, either make the payment or disable late fees in the loan configuration.

### How do I permanently waive a late fee?

To permanently waive late fees for a loan:

1. Go to the loan's settings
2. Disable automatic late fees OR extend the grace period
3. Reverse and optionally delete any existing late fees

### Can I delete a late fee without reversing it first?

No. Late fees must be reversed before they can be deleted. This ensures proper accounting and prevents accidental deletion of active charges.

### Does deleting a late fee affect the borrower's balance?

No. The reversal already adjusted the balance. Deletion only removes the transaction from history; it doesn't change any balances.

### Will the borrower see the deleted late fee?

No. Once deleted, the transaction is permanently removed and will not appear in the transaction history, client portal, or any reports.

## Summary

| Action | Result |
| --- | --- |
| Reverse late fee | Cancels the charge, transaction remains in history |
| Delete reversed late fee | Removes transaction, allows re-application if conditions warrant |
| Disable late fees in config | Permanently prevents all late fees on the loan |
| Change loan to Draft | Temporarily prevents late fee application |
