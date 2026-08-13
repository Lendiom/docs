---
id: for-your-bookkeeper
title: Lendiom for Your Bookkeeper
---

Lendiom is a servicing system, not a general ledger. It tracks what each borrower owes, splits every payment into its parts, and hands you those parts as spreadsheets. Turning them into journal entries is your bookkeeper's job. This page explains what each number means so they do not have to guess.

Hand it over along with the month's [Monthly Journal Entry Report](./reports-library.md).

## How a regular payment splits

A payment does not go where the borrower says it goes. Lendiom applies it in a fixed order, taking each bucket in full before moving to the next. On loans where [interest accrues daily](../how-it-works/interest-accrues-daily.md), the order is:

| Order | Bucket | Notes |
| --- | --- | --- |
| 1 | Late fees | Only when a late fee tier is set to be paid with the next payment. Tiers set to accrue on the balance or roll into principal are never paid automatically. |
| 2 | Escrow | Only when the escrow step is **Before Interest**. Escrow after principal is not supported on daily-accrual loans. |
| 3 | Previously accrued unpaid interest | Interest carried over from earlier periods that was never collected. |
| 4 | Current-period interest | Interest accrued since the last payment. |
| 5 | Scheduled principal | |
| 6 | Anything left over | Remaining unpaid interest first, then any remaining current-period interest, then extra principal. |

If the payment runs out before step 4 is satisfied, the uncollected current-period interest is **added to the loan's interest balance**. It is earned but not received. Nothing about that shows up as cash.

On loans where interest follows the schedule, the order per scheduled payment is escrow (if set to Before Interest), interest, principal, then escrow (if set to After Principal), oldest scheduled payment first. A payoff runs a different sequence: late fees, then flex late fees, then other fees, and only then interest, principal, and escrow.

:::info
Extra money on a payment goes to interest before it goes to principal. A borrower who overpays does not automatically buy down the balance until every dollar of accrued interest is covered.
:::

## Which parts are income

| Column on the reports | Accounting treatment |
| --- | --- |
| To Interest | Interest income |
| To Previously Accrued Interest | Interest income, earned in an earlier period |
| To Principal | Reduces the receivable. Not income — except under the installment method, where a gross-profit percentage of principal collected is recognized |
| To Fees | Fee income (late fees, other fees) |
| To Escrow | A liability. Money held for the borrower's taxes or insurance, not yours |
| To Platform | Payment processing fee. Never your revenue |

Property tax is the exception that trips people up. It is collected as its own transaction and stored internally as a fee, so which column it lands in depends on the report. See [Collecting Property Tax](./collecting-property-tax.md) and [Escrow on a Loan](../how-it-works/loan-escrow.md).

## How the Monthly Journal Entry Report is built

The report produces six sheets for the month: New Contracts, Repossessions, Inventory, Transactions, Installment, and the Monthly Journal summary. Every cell on the summary sheet is a live formula pointing at the supporting sheets, so any total can be traced back.

| Summary line | Where the number comes from |
| --- | --- |
| Total Payments | Sum of Transactions column G, Total Collected |
| Total Property Tax | Sum of Transactions column K where the type is Property Tax |
| Total Interest | Sum of column I plus sum of column N |
| Total Principal | Sum of column J |
| Total Fees | Sum of column K, minus Total Property Tax |
| Total Escrow | Sum of column M |
| Customer-Paid Processing Fees / To Platform | Sum of column L |
| Cash Land Sales | Sum of column G where the type is a tract cash sale |
| Installment Income | Installment sheet, totals row, column M |
| Accounts Receivable | Installment sheet, totals row, column Q |
| Deferred Installment Income | Installment sheet, totals row, column R |
| New Contracts | Count of rows on the New Contracts sheet |
| Repossessed Contracts | Count of rows on the Repossessions sheet |

Two things about the Transactions sheet inside this workbook. It contains **successful transactions only** — pending, failed, and reversed rows are dropped. And property tax stays in the To Fees column, which is why the summary subtracts it back out to get Total Fees.

The standalone Monthly Transaction List does the opposite on both counts: it includes unsuccessful rows and unapplied-payment rows, and it moves property tax into To Escrow. The two reports will not tie. That is deliberate, not a bug.

Column H is a formula, `G - L`: what you actually received after the processing fee. Each column is written at two decimals, and where independent rounding leaves a row a cent or two short, the residual is absorbed into principal so every row reconciles. A gap larger than three cents is a genuine unallocated amount and stays visible.

Late fee assessments never appear. A late fee is debt the borrower takes on, not cash you received. Negative other-fee rows and transactions on inactive, draft, or canceled loans are excluded for the same reason.

:::caution
The Monthly Journal Entry Report is marked **Beta**. Its numbers are still under review with CPAs. Verify it against the underlying sheets before posting from it.
:::

## Processing fees and who bore them

For a card payment, the grossed-up total is the payment amount plus your per-transaction card fee, divided by one minus your card rate. For a bank payment it is the amount plus thirty cents, divided by one minus your ACH rate. Who pays that fee is configured per loan and separately for each rail — card and ACH can differ. See [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md).

| Fee payee | Borrower is charged | To Platform column |
| --- | --- | --- |
| Buyer | Payment amount plus the full fee | The full fee |
| Both | Payment amount plus half the fee | Half the fee |
| Seller | The payment amount only | Zero |

Read that last row carefully. When you absorb the fee, **it never appears in Lendiom at all**. The journal line is called Customer-Paid Processing Fees for exactly that reason. Your share surfaces only as the difference between the gross and net figures on the processor's deposit report, and your bookkeeper has to pick it up from there.

## Reconciling a PayArc deposit batch to a bank line

A deposit batch will almost never equal a day's payments. Four reasons:

- **Card only.** PayArc settlement batches cover card transactions. ACH, cash, checks, and money orders are never in them.
- **Timing.** Payments near the end of a period settle in the next one. The Payments Summary widens its deposit lookup by seven days past the period end for this reason.
- **Fees are still in there.** Deposits arrive with platform fees included. The processor withdraws the accumulated fees at the start of the following month, as a separate debit.
- **Held funds bring no new money.** A transaction funded from a previously held payment counts in the period's totals but produces no deposit, because the cash arrived earlier.

Run the Payments Summary for the period. Its Transactions sheet stamps each reconcilable card payment with a **Settled On** date and a **Batch** reference, and the summary sheet lists each batch with its gross, refunds, net, and transaction count. Successful card payments with no batch yet are totaled on the **Card Payments Awaiting Deposit** line.

The summary's **Net Deposit Estimate** is total collected minus platform fees. It will not match the processor for the same window. For setup and rates, see [PayArc](../payment-processing/payarc.md); the **PayArc Deposits** article covers batch mechanics in more depth.

## Unapplied payments and accrual

When a payment is reversed but the money is kept rather than refunded, it becomes an [unapplied payment](../how-it-works/unapplied-payments.md) — cash you hold that is not yet applied to any obligation. Treat it as a customer deposit liability, not revenue.

On the Monthly Transaction List these show as type **Unapplied Payment**, carrying only the undrawn portion. Once drawn, the applied part appears as its own row, so nothing is double-counted, and a draw takes a proportional share of the original collected amount and platform fee. The Monthly Journal Entry Report excludes them entirely, since they are not successful transactions.

## Reversals and waivers restate prior periods

Neither a reversal nor a waiver creates an offsetting entry dated today. Both modify the original transaction in place, keeping its original date, and mark it Reversed.

The consequence: re-running last month's Monthly Journal Entry Report after a reversal produces **different numbers than the copy you ran at month end**, because the reversed row is now excluded from a report that takes successful transactions only. A waiver goes further — it reverses the fee and then replays every later transaction on that loan through the same application pipeline, which can move principal and interest splits on payments that were already posted.

:::warning
If your books are closed for a period, a reversal or waiver dated inside that period is a restatement. Reconcile the report against what you posted rather than assuming it still matches. See [Reversing a Transaction](./reversing-a-transaction.md) and [Waiving Late Fees](./waiving-late-fees.md).
:::

## What to run every month

| Report | Why |
| --- | --- |
| Monthly Journal Entry Report | The month-close summary and its supporting sheets |
| Monthly Transaction List | Every transaction including pending, failed, and reversed |
| Payments Summary | Loans, rentals, and invoices together, plus deposit reconciliation |
| Monthly Installment Income | Installment income, accounts receivable, and deferred income per loan |

Save each file the month you run it. That copy is your evidence of what the books looked like at close, which matters precisely because a later reversal changes what a re-run produces.

Lendiom can email the Payments Summary daily, weekly, or monthly, and a monthly schedule can attach the other three — see [Scheduled Reports](./scheduled-reports.md). For year-end, see [Year-End Close and Tax Season](./year-end-close.md) and [E-Filing 1098 INTs](./e-filing-1098s.md).
