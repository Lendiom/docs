---
id: payarc-deposits
title: Reconciling PayArc Deposits
---

A PayArc deposit is one settlement batch: the money PayArc moves to your bank account in a single transfer, covering a group of card charges. The **PayArc → Deposits** page shows those batches, the individual charges inside each one, and the Lendiom transaction each charge came from. It is the page to open when you have a line on a bank statement and need to know which clients and which loans or rentals it represents.

:::info
PayArc deposits reflect card settlement batches only. ACH, cash, checks, and other payment methods never appear in them. ACH charges live under **PayArc → Transactions → ACH Transactions**.
:::

## Opening the page

Go to **PayArc → Deposits** in the left menu. Two things gate access:

| Requirement | What happens without it |
| --- | --- |
| PayArc merchant setup is complete | You are redirected to **PayArc → Merchant Info** |
| Your role holds `billing` with the `update` action | The page loads but every request behind it returns 403 — see [Roles and Permissions](../security/roles-and-permissions.md) |

## The deposits list

The month picker in the toolbar controls what you see. It opens on the current month, and months in the future are disabled — PayArc has no batches to report for a month that has not happened. Deposits are listed oldest settlement first, with no pagination: the whole month is on one screen.

| Column | What it holds |
| --- | --- |
| Date | The settlement date PayArc assigned to the batch |
| Total | The gross amount of the batch |
| Net Amount | PayArc's net for the batch |
| Refund Amount | Refunds included in the batch |
| Transaction Count | How many card transactions PayArc settled in the batch |
| ID | PayArc's batch reference number — quote this to PayArc support |

The summary row at the bottom totals every column for the month shown. The money figures come straight from PayArc's batch report; Lendiom converts them from cents and does not recalculate them.

![The PayArc Deposits page, with the month picker and the settlement batches table](/img/docs/app/payment-processing/payarc-deposits/01.png)

If the month is empty, the table says so and invites you to pick a different month. A month with no deposits usually means no card payments settled in it, not that something failed.

## Opening a deposit

Click the expand arrow at the left of a deposit row. Lendiom asks PayArc for that batch's line items, then tries to match each one back to a record in your organization.

| Column | What it holds |
| --- | --- |
| Date | The transaction date of the charge, which is often earlier than the settlement date |
| Type | PayArc's transaction type for that line |
| Amount | The amount PayArc settled for that charge |
| Client | Link to the client the matched transaction belongs to |
| Related | Link to the rental, loan, or invoice the charge paid |
| Unapplied Payment | Status tag and link, when the money is sitting in [unapplied payments](../how-it-works/unapplied-payments.md) |
| Actions | **View Loan Transaction** or **View Rental Transaction**, which opens the same detail panel you would see on the record itself |

Lines Lendiom could not match still appear, with dashes in the Client, Related, and Unapplied Payment columns and no Actions menu.

<!-- screenshot: An expanded PayArc deposit row showing the inner table of batch line items, with Date, Type, Amount, Client, Related and Unapplied Payment columns filled in for several rows and one row showing dashes. -->

## How a batch line maps back to Lendiom

When Lendiom charges a card through PayArc, it stores both the charge ID and the authorization code on the resulting transaction. Every line in a deposit batch carries an authorization number, and that is the key Lendiom matches on. For each line it looks, in order, for a loan transaction, a rental transaction, an invoice transaction, and an unapplied payment carrying that code, then resolves the client from whatever it found.

Each batch line is one card charge, and one card charge is one Lendiom transaction. A single deposit normally contains many.

:::caution
The line Amount is what the card was charged, which is the transaction's **Total Collected** in Lendiom — not its **Amount**. When the client pays the platform fee, the two differ by the **To Platform** figure on the transaction. Reconcile against Total Collected or the numbers will never agree.
:::

<!-- screenshot: The loan transaction details modal opened from a deposit line's Actions menu, with the Total Collected and To Platform rows visible in the descriptions list. -->

## Why deposit dates do not match transaction dates

There are two different dates in play:

- The **settlement date** on the deposit row, which is when PayArc closed the batch and sent the money.
- The **transaction date** on each line inside it, which is when the card was actually charged.

The month picker filters on settlement date. Card payments normally take a business day or two to reach your bank after they succeed, and longer if your merchant account has funding delays — see [Transaction Timing](./payarc.md#transaction-timing). A payment your client made on the last day of the month will usually settle in a batch dated in the next month, so it belongs to the next month's deposit list even though the transaction sits in this month's books.

:::tip
Run the Payments Summary report over the same window for the other side of this picture. Its transaction sheet stamps a **Settled On** date and batch reference on each PayArc card payment once it turns up in a batch, and marks successful card payments that have not settled yet as **Awaiting**. The summary sheet carries a matching **Card Payments Awaiting Deposit** line. See [Reports Library](../guides/reports-library.md).
:::

## The monthly export

The **Export** button in the toolbar exports the month currently selected. It downloads an Excel workbook named `PayArc-Deposits-2026-07.xlsx` with a single **PayArc Deposits** sheet, laid out for handing to a bookkeeper or CPA:

1. A header with your organization name, the words *PayArc Deposit Reconciliation*, and the month.
2. A **Deposits Summary** table — Settlement Date, Batch Ref, Gross Total, Net Amount, Refund Amount, Transactions — with a totals row.
3. One block per deposit, headed `Deposit 12345 — settled 07/09/2026 — Net $4812.66`, listing that batch's line items with Date, Type, Amount, Client, Related, Internal Txn ID, Unapplied Payment, and Matched columns, and closing with a Deposit Total.

The last column is the point of the export:

| Marking | Meaning |
| --- | --- |
| Matched | Lendiom found a loan transaction, a rental transaction, or an unapplied payment carrying that line's authorization code |
| UNMATCHED | Nothing in Lendiom carries that authorization code — shown in bold red |

Lendiom only stores an authorization code for charges it created, so the usual causes are a charge taken outside Lendiom — through PayArc's own virtual terminal, for instance — and lines PayArc puts in the batch itself, such as refunds and adjustments.

:::caution
Card payments made against an **invoice** are marked UNMATCHED in the export, with empty Related and Internal Txn ID cells, even though the expanded row inside Lendiom links the invoice correctly. Check any UNMATCHED line against **PayArc → Transactions → Card Transactions** before treating it as unexplained money.
:::

## Where fees appear

| Figure | Where you see it | What it is |
| --- | --- | --- |
| Gross Total, Net Amount, Refund Amount | Deposits list and export summary | PayArc's own batch numbers, passed through as reported |
| Line Amount | Expanded deposit row and export detail rows | The full amount charged to the card, including the platform fee when the client is the fee payer |
| Payment and Fee | **PayArc → Transactions → Card Transactions** | Each charge split into the payment and the platform fee |
| To Platform | Loan or rental transaction details | The processor and Lendiom fee on that single transaction |

Deposits arrive with the platform fees still included; the payment processor withdraws the accumulated fees at the start of the following month. So do not expect a deposit's net to equal your collections minus fees — look for the separate fee withdrawal on your bank statement instead. Your rate schedule and the fees PayArc charges are covered in [Processor: PayArc](./payarc.md).

## Tying a bank line back to Lendiom

1. Note the date and amount of the deposit on your bank statement.
2. Open **PayArc → Deposits** and select the month that deposit landed in. If nothing matches, check the previous month — batches settled at a month boundary land on the other side of the picker.
3. Find the row whose Net Amount matches the bank line. Its ID is the batch reference number.
4. Expand the row. Every line is one card charge inside that transfer.
5. Follow the Client and Related links, or use the Actions menu, to open the underlying transaction in Lendiom.
6. Export the month and keep the workbook with your monthly close, then chase anything marked UNMATCHED.

If a batch still will not reconcile after that, contact PayArc support with the batch reference number from the ID column — it is the same number PayArc uses on their side.
