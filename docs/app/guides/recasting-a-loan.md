---
id: recasting-a-loan
title: Recasting a Loan
---

Since [version](../faq.md#check-version) 0.57.1, Lendiom can recast a loan. A recast re-amortizes the unpaid remainder of a loan **in place**. It does not create a new loan, it does not change the loan's status, and it does not touch the payments the borrower has already made.

Use it after a large principal prepayment, after a forbearance period that left unpaid interest and fees stacked up, or when you and the borrower agree to a different payment cadence.

## What Changes and What Stays

| Stays the same | Changes |
| --- | --- |
| The loan record, its ID, and its status | The due dates of every unpaid installment |
| Every **fully paid** schedule item and its linked transactions | Partially paid installments (they are regenerated) |
| The interest rate | The payment amount, unless you pick *Leave as-is* |
| The property tax balance | Principal, if you pick *Capitalize* |
| The borrower, tracts, escrow configuration, and late fee configuration | The payment frequency, if you change it |

The recast rebuilds only the tail of the schedule. Payment numbering continues from the last preserved paid installment, so the schedule stays continuous — including on a loan that was previously refinanced into its current form.

:::caution
A recast cannot be undone from the app. There is no "revert recast" action. Preview the result and confirm the numbers before you commit.
:::

## Which Loans Are Eligible

Open the loan, click `Actions`, and choose `Recast Loan`.

<!-- screenshot: The loan detail page with the Actions dropdown open, showing the primary group of menu items (Move Due Date, Record Payoff, Refinance Loan, Recast Loan, Calculate Payoff) with "Recast Loan" hovered. -->

The `Actions` button itself is disabled unless your role has the **Loan → Update** permission. The `Recast Loan` item is disabled — with the reason in a tooltip next to it — when any of the following are true:

| Condition | Why |
| --- | --- |
| Loan is in `Draft` or `Pending` | There is nothing amortizing yet |
| Loan has no payment schedule | Recast rebuilds a schedule tail; without a schedule there is nothing to rebuild |
| Interest schedule is **Interest Only** | See below |
| Status is `Pending Payoff`, `Paid Off`, `Repossessed`, `Canceled`, `Inactive`, or `Refinanced` | The loan is closed to further servicing actions |

On the server, only these statuses are accepted: `Current`, `Grace Period`, `Late`, `In Default`, and `Defaulted`. See [Loan Status](../how-it-works/loan-status.md) for what each one means.

**Interest-only loans are not eligible.** A recast re-amortizes outstanding principal across the installments that are left. An interest-only schedule has no principal amortization to redistribute, so there is nothing to recompute — and a recast cannot change a loan's interest schedule. To convert an interest-only loan to an amortizing one, use **Refinance**.

**Refinanced loans are not eligible.** The `Refinanced` status means that loan was already replaced by a successor and is kept as a historical record. Recast the successor, not the original.

If every installment is already fully paid, the recast is rejected — there is no unpaid tail to regenerate.

### Error Codes

| Code | Message |
| --- | --- |
| 2600 | Only active, grace period, late, in default, or defaulted loans can be recast |
| 2601 | An effective date is required for recast |
| 2602 | A valid balance handling mode is required (leave-as-is, re-amortize, or capitalize) |
| 2603 | The effective date can not be before the closing date |
| 2604 | The effective date can not be before the last transaction date |
| 2605 | A refinanced loan can not be recast |
| 2606 | Interest-only loans can not be recast |
| 2607 | Can not recast a loan with no remaining unpaid payments |
| 2608 | Only loans with a schedule can be recast |
| 2609 | The new payment frequency must be monthly, biweekly, or weekly |

## The Recast Modal

![The Recast Loan modal, showing the recalculated payment for the remaining term](/img/docs/app/guides/recasting-a-loan/01.png)

Everything below the form is a **preview** — a dry run against the real loan data. Nothing is saved until you click `Recast` and confirm. The preview refreshes about half a second after each change, and the `Recast` button stays disabled while it loads.

Read the preview's **Last Payment Date** every time. It is the fastest way to catch a recast that did something you did not intend.

## Balance Handling

This is the most consequential field in the modal. It defaults to **Re-amortize**.

<!-- screenshot: The Balance Handling select expanded inside the Recast Loan modal, showing all three options: "Leave balances as-is (shift dates only)", "Re-amortize principal (recompute payment)", and "Capitalize unpaid interest and fees into principal". -->

| Mode | Principal | Interest, late fees, other fees | Payment amount |
| --- | --- | --- | --- |
| **Leave as-is** | Unchanged | Unchanged | Unchanged |
| **Re-amortize** | Unchanged | Unchanged | Recomputed |
| **Capitalize** | Increased by the unpaid interest and fees | Zeroed out | Recomputed |

**Leave as-is** shifts the due dates of the unpaid installments and nothing else. Use it when the schedule needs to move and the payment must not change.

**Re-amortize** leaves the interest, late fee, and other fee balances standing on their own and recomputes the periodic payment by amortizing the *current* principal over the remaining installments at the *current* rate. Use it after a large principal prepayment when the borrower wants a lower payment rather than an earlier payoff.

**Capitalize** rolls unpaid interest, accrued interest, late fees, flex late fees, and other fees into principal, zeroes those balances, then re-amortizes. Property tax is never capitalized.

:::caution
Capitalizing is real money moving into principal. The borrower will pay interest on fees and interest that were previously not interest-bearing, and the fee balances that got folded in are gone from the loan as separate line items. On a loan whose [interest accrues daily](../how-it-works/interest-accrues-daily.md), capitalizing also re-anchors interest accrual to the recast's effective date.
:::

If the loan has [escrow](../how-it-works/loan-escrow.md), the payment amounts shown in the preview and written back to the loan include the escrow contribution.

## Changing the Payment Frequency

Recast supports **Monthly**, **Biweekly**, and **Weekly**. If the loan is on an older cadence Lendiom no longer supports end to end, the modal says so and defaults the selector to Monthly.

Changing the cadence converts the remaining term to months and lays the new installments out over roughly that same horizon. The loan's stored frequency and remaining length are updated too, so payoff quotes, status checks, and any future recast see the new cadence.

<!-- screenshot: The Recast Loan modal with Balance Handling set to "Leave balances as-is (shift dates only)" and Payment Frequency changed from Monthly to Weekly, showing the orange warning alert about the payment amount being applied to every new period. -->

:::warning
**Leave as-is plus a frequency change will pay the loan off far earlier than the contract.**

Leave as-is preserves the payment *amount per period* literally. Switch a $1,200 monthly loan to weekly and the borrower is scheduled for $1,200 every week — over four times the contractual pace. The schedule stops as soon as the balance reaches zero, so the loan finishes years early. The modal shows an orange warning on this combination.

To change cadence without accelerating payoff, use **Re-amortize**; it computes a per-period payment appropriate to the new frequency. Either way, confirm the preview's **Last Payment Date** before committing.
:::

## Effective Date and Closing Date

**Next Payment Date** (the effective date) is required. It becomes the due date of the first unpaid installment and the loan's next due date; every later installment follows from it on the selected cadence.

Two rules are enforced on the server, both evaluated at midnight in your organization's timezone:

- The effective date cannot be earlier than the loan's closing date (error 2603).
- The effective date cannot be earlier than the loan's last transaction date (error 2604).

The date picker enforces this by disabling every day before the latest of the loan's closing date, last transaction date, and last payment received date.

**Closing Date** is the date the recast itself took place. It defaults to the next payment date; set it to today or earlier. It is stored on the recast record and used as the basis date when the new tail is generated.

## The Immediate Late Fee Warning

If you pick a next payment date that is already far enough in the past that its grace period has expired, the modal shows a red warning:

> The selected next payment date plus the *N*-day grace period is before today. This will immediately trigger a late fee after the recast.

<!-- screenshot: The Recast Loan modal with a backdated Next Payment Date, showing the red error alert warning that the date plus the grace period is before today and a late fee will trigger immediately. -->

*N* is the shortest grace period across the loan's late fee tiers, and the warning only appears when late fees are configured and enabled. See [Late Fees](../how-it-works/late-fees.md) for how grace periods are counted.

This is a warning, not a block — you can still commit. Do it deliberately: backdating a recast into an expired grace window means the next automation run assesses a late fee on the schedule you just created.

## Committing the Recast

Click `Recast`. A confirmation dialog summarizes the mode and any cadence change and states that the action cannot be undone. Click `Yes, Recast` to commit.

## Where the Recast Is Recorded

Every committed recast is stored permanently on the loan. Nothing is overwritten — the history is append-only.

<!-- screenshot: The loan Overview tab showing the "Last Recast" row in the loan details descriptions with a date and a "(2 total)" count next to it, and the loan timeline below showing the auto-generated system note describing the recast. -->

- **The recast history on the loan.** Each entry records who ran it, when, the effective and closing dates, the mode, before/after values for the payment amount, remaining payment count, payment frequency, and the full balance breakdown, plus the interest rate as it stood before the recast.
- **The Overview tab.** A `Last Recast` row shows the most recent recast date, plus a total count when the loan has been recast more than once.
- **The loan timeline.** A system note is written automatically, reading something like: *Jane Doe recast this loan with principal re-amortized. The next payment is due on August 15th, 2026. Payment changed from $1,240.00 to $980.00.* A cadence change or a capitalization is named in the note too, including the exact dollar amount capitalized.
- **The schedule.** Totals are recomputed across both the preserved paid history and the regenerated tail, so the loan's total interest and total payments stay accurate.

## Recast or Refinance?

Use **Recast** when the loan stays the same and only the remaining schedule needs rebuilding. Use **Refinance** when the terms themselves change — a new rate, a new term length, or converting an interest-only loan to an amortizing one. Refinance closes the original loan (status `Refinanced`) and creates a successor; recast leaves you with the loan you started with.
