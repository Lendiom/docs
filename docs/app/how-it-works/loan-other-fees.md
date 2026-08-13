---
id: loan-other-fees
title: Loan Other Fees
---

## What Are Other Fees?

Other fees are **manually created, general-purpose charges** that an organization can apply to a loan. They are designed to cover any miscellaneous fee or charge that does not fall into the system's built-in fee categories.

Common examples of what other fees might be used for:

- Legal fees
- Inspection fees
- Insurance charges
- Recording fees
- Survey costs
- Any custom charge the organization needs to assess against the borrower

A comment is **required** when creating an other fee transaction. This ensures there is always a clear record of what the charge is for.

## What Other Fees Are NOT

Other fees are **not** any of the following:

| Fee Type | How It Differs From Other Fees |
| --- | --- |
| Late fees | Late fees can be assessed automatically by the system based on late fee tier configuration. Other fees are always manual. |
| Setup fees | Setup fees (documentation fee, closing fee, earnest money, application fee) are one-time fees collected during loan setup with their own dedicated workflow, due dates, and expiration logic. Other fees have no due date or expiration. |
| Property tax | Property tax is a dedicated feature for tract-type loans with its own tracking and payment system. Other fees are not tied to property tax. |
| Platform/processing fees | Platform fees are the payment processor charges (e.g., card or ACH fees) managed by the system and paid by the buyer, seller, or both depending on configuration. Other fees are not related to payment processing costs. |
| Escrow | Escrow is a separate account system for holding and disbursing funds. Other fees do not flow through escrow. |
| Interest | Interest accrues automatically based on the loan terms. Other fees do not accrue or compound. |
| Regular payments | Regular payments reduce the loan balance (principal and/or interest). Other fees are a separate balance category that sits alongside the loan balance. |

## How Other Fees Get Added to a Loan

Other fees are added by creating a transaction of type `other-fee`  on the loan. There are two ways this happens:

### 1. Adding a Fee (Increasing What the Borrower Owes)

To add a new fee to the loan, create an other fee transaction with a **negative** amount. This increases the `OtherFees`  balance on the loan.

For example, to charge the borrower $150 for an inspection fee, you would create an other fee transaction for **-$150**. The negative amount indicates the borrower is going further into debt.

When adding a fee (negative amount), the payment method is automatically set to blank since no money is being collected — it is simply a charge being assessed.

### 2. Charging the Borrower Directly

If the loan has online payments enabled, the organization uses PayArc and the organization has Charging **enabled**, you can **charge** the borrower directly for an other fee. When a charge is created:

- The system records the fee as a negative amount (adding to the balance)
- It then submits an online payment to collect the funds from the borrower immediately
- If the charge fails, the transaction is automatically reversed

## How Other Fees Get Paid

### Manual Payment

To pay down other fees, create an other fee transaction with a **positive** amount and a valid payment method. This reduces the `OtherFees`  balance on the loan.

For example, if the borrower owes $150 in other fees and pays $150, the other fee balance goes to $0. If they pay $100, the remaining other fee balance would be $50.

It is also possible to overpay — if the borrower pays more than the current other fee balance, the balance goes negative (a credit).

### Online Payment via Lendiom Pay

**Being Added in Q2 2026**

Borrowers can pay down their other fee balance online through Lendiom Pay.

When paying other fees online:

- The borrower selects a payment method and specifies the amount to pay.
- The amount must be greater than zero and cannot exceed the current other fee balance.
- There must be an other fee balance on the loan (no balance or a credit balance will be rejected).
- The loan must be in a status that allows online payments (not paid off, pending payoff, or refinanced).
- Platform/processing fees apply based on the loan's fee payee configuration, the same as any other online payment.
- The transaction is created with a `pending`  status and settles once the payment processor confirms.

The transaction comment follows the same pattern as all other online payments:

- Normal: `"Online other fee payment initiated by the client: [name]."`
- Impersonated: `"Online other fee payment initiated on behalf of the client: [name] by [impersonator] (impersonated)."`

### Payoff

When a loan is paid off, other fees **are** included in the payoff amount. During payoff processing, the system pays fees in this order:

1. Late fees
2. Flex late fees (late fees applied to a running balance)
3. **Other fees**
4. Interest and principal

This is the only scenario where other fees are automatically paid as part of another transaction type.

## How Other Fees Are NOT Paid

Other fees have several important limitations on how they are collected:

- **Not paid by regular payments.** When a borrower makes a regular monthly payment, none of that payment is applied to "Other Fees". Regular payments only cover the scheduled payment amount, interest, and (depending on configuration) late fees. The "Other Fees" balance is untouched.
- **Not paid automatically.** The system never automatically generates a payment for "Other Fees". Unlike late fees (which can be auto-assessed) or interest, "Other Fees" sit on the balance until someone manually pays them down, pays them online (*coming soon*), or the loan is paid off.
- **Not paid by regular online payments.** When a borrower makes a regular online payment through Lendiom Pay, that payment is processed as a regular payment and does not reduce the "Other Fees" balance. The borrower must use the dedicated "Other Fees" payment option to pay down "Other Fees" online (*coming soon*).
- **Not included in auto-draft.** Auto-draft only drafts the configured regular payment amount. It does not include or pay down other fees.
- **Not reduced by principal payments.** A principal-only payment goes entirely to the loan principal. It does not touch other fees.
- **Not paid through escrow.** Escrow disbursements are a separate system. "Other Fees" cannot be paid via escrow entries.

## How Other Fees Affect the Loan

### Total Due Calculation

Other fees are included in the loan's **total due** amount:

`TotalDue = Due + LateFees + OtherFees + Interest `

### Due Without Late Fees

Other fees are included in the **due without late fees** calculation (used in letters and communications):

`DueWithoutLateFees = Due + Interest + OtherFees `

### Payoff Amount

Other fees are included in the loan's **payoff** calculation:

`PayoffTotal = Principal + LateFees + OtherFees + FlexLateFees + Interest + UnpaidInterest + PropertyTax + Escrow `

### Minimum Payment Rules

When a loan uses the `current late balance`  minimum payment rule, other fees are included in the minimum payment amount since it is based on the total due.

### Dashboard and Reporting

- Other fees appear on the **dashboard** as part of the total fees across all loans.
- Other fees appear in the **late loans** report.
- Negative other fee transactions (charges assessed) are **excluded** from monthly and yearly transaction list reports because they represent debt added, not money collected.
- Positive other fee transactions (payments received) **are** included in transaction list reports.

### Payoff Letters

When a payoff letter is generated, other fees appear as a separate line item (`OtherFeesDue` ) and are also included in the `TotalFeesDue`  alongside late fees.

## Reversing Other Fee Transactions

Other fee transactions can be reversed. The reversal logic mirrors the original transaction:

- If the original transaction was **positive** (a payment), reversing it **adds** the amount back to the other fee balance.
- If the original transaction was **negative** (a charge), reversing it **removes** the amount from the other fee balance.

## Summary

| Aspect | Details |
| --- | --- |
| Created by | Organization users, manually |
| Purpose | Miscellaneous charges not covered by other fee types |
| Requires comment | Yes, always |
| Automatically assessed | No |
| Automatically paid by regular payments | No |
| Paid by buyer online (Lendiom Pay) | **Pending**, via the dedicated other fee payment option (coming in Q2 2026) |
| Included in payoff | Yes |
| Included in total due | Yes |
| Can be charged to borrower | Yes, if online payments and PayArc are enabled |
| Can be reversed | Yes |
