---
id: first-week-bookkeeper
title: Your First Week as a Bookkeeper
---

If your job is to make Lendiom agree with the bank, read these pages in this order. Each day builds on the one before it: you cannot correct a transaction you do not understand, and you cannot reconcile a deposit you cannot trace back to a loan.

## Before you start: get the right permissions

Reconciling touches more areas than people expect. Ask whoever administers your organization for a role covering all of these.

| What you need to do | Permission |
| --- | --- |
| Record payments on loans | `loan::transactions` `create` |
| Reverse, revise, or change status | `loan::transactions` `update` |
| Record payments on rentals | `rental::transactions` `create` |
| Open the PayArc section, including Deposits | `billing` `update` |
| Create or edit a scheduled report | `organization` `update` |

See [Roles and Permissions](../security/roles-and-permissions.md) for how a role is assembled. If a button is greyed out or a page returns a 403, check this first.

## Day 1 — Learn where the money goes

Nothing else makes sense until you know how one payment is split. A borrower sends $600; Lendiom decides how much becomes interest, principal, escrow, and fees, based on how the loan was configured at creation.

| Read | Why |
| --- | --- |
| [Adding a Loan Transaction](./adding-a-transaction.md) | Its Transaction Payment Distribution section is the split itself: late fees first when the tier comes out of the next payment, escrow at the point configured on the loan, then interest, then principal. Anything left over follows the loan's Extra Payment Application setting. |
| [Choosing an Interest Schedule](../how-it-works/choosing-an-interest-schedule.md) | Follows Payment Schedule, Accrues Daily, and Interest Only produce different splits from the same dollar amount. It cannot be edited later. |
| [Interest Accrues Daily](../how-it-works/interest-accrues-daily.md) | On a daily-accrual loan, unpaid accrued interest is settled before the scheduled interest. This is the most common reason a split looks "wrong" to someone new. |
| [Understanding the Amortization Schedule](../how-it-works/amortization-schedule.md) | Regenerated from the loan's terms and recorded transactions — rows behind the last payment are history, rows ahead are a projection. |
| [Late Fees](../how-it-works/late-fees.md) | A fee is dated the last day of grace even though it is created later. That dating matters when you close a month. |
| [Loan Escrow](../how-it-works/loan-escrow.md) and [Loan Other Fees](../how-it-works/loan-other-fees.md) | The two balances beside principal and interest, settled from the same payment. |

Rentals do not amortize. Read [How Rental Balances Are Calculated](../how-it-works/rental-balances.md) — the balance is recomputed from the first payment date every night, so a figure you type in does not survive — and [Rental Late Fees, Recurring Fees and Deposits](../how-it-works/rental-fees.md).

:::tip
Before touching a live loan, open one with a year of history and read its transactions against its schedule. If you can explain every split on the page, you are ready for Day 2.
:::

## Day 2 — Record transactions

Now enter money. Each type applies differently, and picking the wrong one produces a balance that is right today and wrong next month.

| Read | Why |
| --- | --- |
| [Adding a Loan Transaction](./adding-a-transaction.md) | Every field on the Add a Transaction dialog, and what each type does to the loan. Transactions must be entered oldest to newest. |
| [Recording Rental Transactions](./recording-rental-transactions.md) | The seven rental types and which balance each one moves. |
| [Principal-Only Payments](./principal-only-payments.md) | Goes entirely at the balance, does not move the due date, and on a daily-accrual loan makes the unpaid interest balance go **up**. Expect that. |
| [Charging a Loan Transaction](./charging-a-loan-transaction.md) | Charging a client's stored payment method for a fee. It writes two transactions, not one. |
| [Recording a Loan Payoff](./recording-a-loan-payoff.md) | A payoff is not a regular payment. The dedicated action zeroes the balance and closes the loan. |
| [Recording a Cash Sale on a Tract](./recording-a-cash-sale.md) | An outright sale never becomes a loan at all — it is the **Mark Sold** action on the tract, and it still shows up in your reports. |
| [Collecting Property Tax After You Finalize](./collecting-property-tax.md) | Property tax lands on the loan as its own balance with its own due date. |

Two habits worth forming. Use **Pending** for checks you have deposited but not seen clear, then move them to Success the day the bank posts them. And when Lendiom refuses something, read the code in the red notification against [Error Messages in Lendiom](../how-it-works/error-messages.md) before retrying.

## Day 3 — Reversals and adjustments

Amounts on a recorded transaction are locked; there is no edit. Learn the tools that can still change one, and when each is correct.

| Read | Why |
| --- | --- |
| [Reversing a Transaction](./reversing-a-transaction.md) | The core article. Reverse undoes the money, Change Status moves a pending transaction, Revise Date moves only the date. You can reverse only the newest transaction on a loan — error **912** means working backwards one at a time. |
| [Waiving Late Fees](./waiving-late-fees.md) | Waiving forgives a fee as a business decision and reallocates money that already paid it. A reversal does not. |
| [Deleting Late Fees](./deleting-late-fees.md) | Deleting a reversed fee does not waive it. If the payment is still overdue, the next integrity run applies it again. |
| [Unapplied Payments](../how-it-works/unapplied-payments.md) | Reversing an online payment lets you hold the funds instead of refunding them. They sit in **Unapplied Payments** on the main menu until you apply or refund them. |
| [Moving a Payment Due Date](./moving-a-due-date.md) | The only deferment mechanism. It rebuilds every payment after the one you move. |

Adjustments are the exception to "reverse and re-enter." An **Adjustment** reconciles a loan balance that is off. Its value can only be negative and it requires a reason. Select a payment and it affects only that payment; select none and it moves the principal balance and the schedule without touching interest. Adjustments cannot be reversed — the server refuses — so a mistaken one is corrected with another adjustment.

:::caution
Adjustments are for reconciling, not routine correction. If you reach for one every month, something upstream is wrong. Email [support@lendiom.com](mailto:support@lendiom.com) rather than papering over it.
:::

Error **19530** means someone else is mid-payment on the same loan. Nothing was changed. Wait and try again.

## Day 4 — Reconcile PayArc deposits

The day the ledger meets the bank statement. Open **PayArc → Deposits** and pick a month; future months are refused, so the current month shows only what has settled so far.

<!-- screenshot: the PayArc Deposits page with the month picker set to March 2026, the table showing several settlement batches with Date, Total, Net Amount, Refund Amount, Transaction Count and ID columns, the bold month total row beneath them, and the Export button in the toolbar -->

Each row is one settlement batch PayArc sent to your bank account. **Total** is gross, **Net Amount** is what landed, **Refund Amount** is what went back out, and the summary row totals the month.

Expand a row to see the line items inside that batch: date, type, amount, the client, and the loan, rental, or invoice it belongs to, each linked through to the record. Where a reversal produced held funds, the **Unapplied Payment** column shows the credit and its status. The row actions open the matched transaction so you can compare both sides without leaving the page.

Lendiom matches a deposit line to your records by the processor's authorization number. The **Export** button produces `PayArc-Deposits-YYYY-MM.xlsx`, the version to hand a CPA: a summary block covering every batch, then one block per deposit listing its line items with an **Internal Txn ID** and a **Matched** column. Anything Lendiom could not tie to a transaction or a held credit is flagged **UNMATCHED**. Those are your exceptions — work them before closing the month.

| Read | Why |
| --- | --- |
| [Processor: PayArc](../payment-processing/payarc.md) | Settlement timing. Cards land in one to two business days; ACH runs 10 to 15 business days before it reaches your bank and another 3 to 5 before Lendiom shows it successful. Most "missing" money is timing. |
| [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md) | Which loans, rentals, and invoices can take an online payment at all. |

:::info
The Deposits page covers **card** settlement batches. ACH never appears there — use **PayArc → Transactions** and its ACH Transactions tab, which is available only when ACH is enabled on your merchant account.
:::

## Day 5 — Run the monthly reports

| Read | Why |
| --- | --- |
| [The Reports Library](./reports-library.md) | Every report, its inputs, and its output. For a month close you want the **Monthly Journal Entry Report** (six sheets, live formulas back to the supporting data, still Beta), the **Monthly Transaction List**, the **Monthly Rental Transaction List**, and **Monthly Installment Income**. |
| [Scheduled Report Emails](./scheduled-reports.md) | The Payments Summary can be emailed on a cadence to people without a Lendiom login, and a monthly schedule can attach the month's transaction, installment, or journal report. |
| [Getting Your Data Out of Lendiom](./exporting-your-data.md) | Four export mechanisms and what each leaves behind. Worth knowing before an accountant asks. |

The **Payments Summary** is the one report spanning loans, rentals, and invoices at once, and the only one taking a free date range. Its net deposit estimate is total collected minus platform fees, and it will not equal your processor's settled deposits for the same window — settlement timing differs, and platform fees stay in the deposit until the processor withdraws them the following month. Reconcile against the Deposits page, not that estimate.

[Understanding Your Dashboard](../how-it-works/dashboard.md) is the daily version of this work: what each card counts, including whether pending and failed money is in the number.

## Ongoing — Prepare for year end

Do not wait for January. [Year-End Close and Tax Season](./year-end-close.md) is two checklists, and the December half is the one that saves you.

- **Verify borrower mailing addresses.** An unverified address blocks e-filing outright.
- **Collect every tax identifier.** The e-file button stays disabled until every listed borrower has one.
- **Clear unapplied payments.** Held funds contribute nothing to the year's interest or principal until applied or refunded, and the date you apply one on decides which tax year the interest lands in.
- **Finish reversals before the year closes.** Year-end math counts only Pending and Successful transactions, so a reversal pulls that payment out of the totals.

Then read [E-Filing 1098 INTs](./e-filing-1098s.md) for the filing itself.

One last thing to keep in mind all year: several correction actions disappear once a loan is Paid Off, Repossessed, Canceled, or Refinanced. See [Loan Status](../how-it-works/loan-status.md).
