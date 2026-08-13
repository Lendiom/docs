---
id: reversing-a-transaction
title: Reversing a Transaction
---

Once a transaction is recorded, its amounts are locked. Three actions on the transaction row can still change it: **Reverse** undoes the money, **Change Status** moves a pending transaction to success or failure, and **Revise Date** moves the date and nothing else. Picking the wrong one leaves the loan balance right and the history wrong, or the history right and the balance wrong.

All three live in the actions menu at the end of each row in the loan's **Transactions** table. All three require update permission on Loan Transactions.

<!-- screenshot: The loan Transactions table with the row actions menu open on a successful regular payment, showing View Details, Reverse, Revise Date, Generate Letter, and Download Success Letter -->

## Pick the tool that matches the situation

| Situation | Use | Why |
| --- | --- | --- |
| A check bounced after you recorded it | Reverse | The money never arrived, so it has to come back off the loan. |
| A card or bank payment was disputed with the issuer | Reverse, reason **Other** | Chargeback is not one of the reasons offered. Say "chargeback" in the comment. |
| You typed the wrong amount or applied it to the wrong payment | Reverse, reason **Clerical Error**, then re-enter it | There is no edit. Reversing and re-adding is the only correction path. |
| Only the date is wrong and the money landed correctly | Revise Date | It moves the date and leaves every applied dollar alone. |
| A check is deposited but has not cleared yet | Change Status | Record it as Pending, then flip it to Success when the bank clears it. |
| You want to forgive a late fee as a courtesy | Waive (Beta), on the late fee row | Waive reallocates the payments that funded the fee. A reversal does not. |

:::caution

None of these are undo buttons for each other. A reversal cannot be un-reversed. If you reverse a payment by mistake, your only recovery is to record the transaction again from scratch, and the new transaction gets a new date, a new ID, and a new place in the history.

:::

## Reverse

### Newest first

You can only reverse the most recent transaction on the loan. If a later-dated transaction exists, Lendiom refuses with error **912** — "reversing transactions must be done in sequential order." Work backwards one at a time.

Transactions already marked Reversed or Failure do not count as "later." Once you reverse the newest payment, the one before it becomes reversible, and so on down the history.

### Reason, comment, and client visibility

The reason and the comment are both required. The reason list in the Reverse dialog is short on purpose: Buyer Requested, Check Bounced, Clerical Error, Insufficient Funds, and Other. The comment accepts formatted text and cannot be left blank.

<!-- screenshot: The Reverse Transaction modal for a check payment, showing the Reason select expanded with its five options, the Client Visibility select, the Reversal Comment editor, and the Transaction Details table underneath -->

**Client Visibility** controls whether the transaction stays in the client's history in Lendiom Pay:

| Setting | Effect |
| --- | --- |
| Visible | The reversed transaction stays in the client's transaction list, struck through, with the reason shown. |
| Hidden | The entire transaction disappears from the client portal. Your staff still sees it. |

:::caution

When you reverse a transaction yourself, this choice is the whole story: the reversal clears any existing hidden flag first, so picking Visible puts a previously hidden transaction back in the client's list. The keep-it-hidden rule only applies to the reversals Lendiom performs for you from a processor report — those leave an already-hidden transaction hidden. Use Hidden only for entries the client should never have seen — a payment you posted to the wrong loan, for example — not to quietly walk back a real payment.

:::

### Online payments: refund or hold

When the transaction went through a payment processor **and** the loan still has online payments enabled, the dialog adds a section asking how the money should be handled. If online payments were switched off on the loan after that transaction was taken, the section never appears, and the reversal falls through to the default — a refund to the customer.

<!-- screenshot: The Reverse Transaction modal for an online payment, showing the orange "Online Payment" alert with the non-refundable platform fee amount and the two radio choices, Refund to customer and Hold as unapplied payment -->

**Refund to customer** sends the money back through PayArc. On a charge that has already been captured, the refund covers the transaction's **Amount** — the loan payment — not the **Total**. The platform fee shown as "To Platform" is not returned, because the processor already took its cut on a charge that went through. Whoever paid that fee, your organization or the buyer, is out that amount. The dialog states the exact figure before you confirm.

If the charge has not been captured yet, Lendiom voids it instead of refunding it, and a void cancels the entire charge — platform fee included — so nothing is lost. The dialog shows the same non-refundable fee warning either way, so it is worth checking whether the charge has settled before you read that number as a loss.

**Hold as unapplied payment** reverses the loan side without touching the processor. The full amount becomes an unapplied payment record listed on the loan under **Unapplied Payments**, and it can later fund a new transaction or be refunded by hand.

:::info Pending vs settled

A pending transaction has not settled, so the funds are not guaranteed. **Hold as unapplied payment** is disabled for pending transactions, and the server rejects it with error **99430** if it is sent anyway. Refund the customer, or wait for the payment to settle.

Charges taken through a processor Lendiom can no longer refund automatically — historical Stripe charges — return error **99431**. Issue that refund in the processor's own dashboard and reverse it here as an unapplied payment.

:::

### What a reversal changes on the loan

For a regular payment, reversing restores the loan to its pre-payment state:

- Principal and extra principal go back onto the balance.
- Every schedule row the payment touched has that money subtracted. Rows that drop to zero received go back to fully unpaid.
- Late fees the payment covered are restored. Late fee transactions that were themselves already reversed are skipped, so a fee is never charged twice.
- Unpaid interest the payment cleared is added back; interest the payment captured into the balance is removed.
- Escrow amounts are backed out of the escrow entry.
- The interest accrual anchor is reset to exactly where it stood before this payment, and **Last Payment Received** is re-derived from the newest remaining regular payment that is neither reversed nor failed. Other transaction types do not count toward it. On daily-accrual and interest-only loans, accrued interest is recalculated on the spot.
- The schedule is rebuilt, so a payment that is unpaid again and past its grace period can pick up a fresh late fee on the next integrity run.

<!-- screenshot: The Transactions table after a reversal, with the reversed row shaded red and struck through and its Comment column reading "Reversal reason: check bounced (by Jane Doe)" -->

Other types unwind their own side effects: a down payment or setup fee goes back to unpaid, a late fee comes off the late fee, flex late fee, or principal balance depending on how its tier applies, and a property tax payment is removed.

### What cannot be reversed

| Transaction or loan | Behavior |
| --- | --- |
| Adjustment transactions | Refused by the server. Record a correcting adjustment instead. |
| Payoff transactions | No Reverse option. See [Recording a Loan Payoff](./recording-a-loan-payoff.md). |
| Already reversed | The action is hidden. |
| Already failed | The action is disabled. A failure has already been reversed for you. |
| The charge entry that produced a processor charge | Hidden. Reverse the resulting charge row instead. See [Charging a Loan Transaction](./charging-a-loan-transaction.md). |
| Loans that are Inactive, Pending Payoff, Paid Off, Repossessed, Canceled, or Refinanced | Reverse is disabled, along with Waive (Beta) and Delete on late fee rows. View Details, Revise Date, Change Status, Generate Letter, and Download Success Letter still work. See [Loan Status](../how-it-works/loan-status.md). |

If someone else is mid-payment on the same loan, you will see error **19530**. Nothing was changed. Wait a moment and try again.

### Reversals Lendiom performs for you

When PayArc reports a declined card or a returned ACH, Lendiom marks the transaction as Failure and reverses it for you, with the reason mapped from the processor's code — Card Declined, Expired Card, Insufficient Funds, Invalid Account, Stop Payment, or Bank Rejected — and the processor's message in the comment. These ask for client visibility — a transaction that was already hidden stays hidden — and no refund is issued because the money never arrived. ACH notifications of change are not treated as failures.

## Changing a transaction status

**Change Status** only appears on transactions that are **Pending**, and it is disabled entirely for anything with a processor transaction behind it. Attempting it on an online payment returns error **913993**; reverse it instead.

<!-- screenshot: The Transaction Status Change modal with Failure chosen, showing the Transaction Status select, the Status Change Date picker, the Failure Reason select, and the Reversal Comment editor -->

| New status | What happens |
| --- | --- |
| Success | The loan is re-checked and the schedule rebuilt as of the status change date. On a regular or principal payment, successful-payment document automation runs, and if the loan's automated communication is on, the client gets the successful-payment notification. |
| Failure | Requires a failure reason and a comment. Lendiom then reverses the transaction for you, using that reason and comment. |
| Reversed | Only offered while the loan is a Draft. On a live loan, use Reverse. |

The **Status Change Date** cannot be earlier than the transaction date. Use the day the money actually cleared, since that is the date the schedule is evaluated against.

## Revising a date

**Revise Date** appears only on transactions with a status of **Success**. It still shows in the menu for online payments, but the modal opens with its **Revise Date** button greyed out for anything that carries a processor behind it, so the date cannot be moved.

<!-- screenshot: The Revise Transaction Date modal showing the red warning text and the date picker calendar with the payment due date outlined in green, the late fee grace cutoff outlined in red, and the transaction's current date outlined in gold -->

The new date has to stay inside its neighbors: not before the previous transaction on the loan and not after the next one. The calendar marks the due date of the payment this transaction paid in green, the late fee grace cutoffs in red, and the transaction's current date in gold, so you can see what you are moving across.

:::warning This changes the date and nothing else

Revising a date does **not** re-run the payment's distribution. The split across interest, principal, escrow, and fees stays exactly as it was recorded, and late fees already assessed are not recalculated. Moving a payment from before a due date to after it does not create a late fee, and moving it the other way does not remove one.

If the split itself is wrong — the payment was applied with the wrong interest, or hit the wrong payment — reverse the transaction and record it again with the correct date. That is the only way to make the schedule follow the date.

:::

## Related

- [Adding a Loan Transaction](./adding-a-transaction.md) for the fields you re-enter after a reversal
- [Late Fees](../how-it-works/late-fees.md) for how tiers are assessed and reassessed
- [Interest Accrues Daily](../how-it-works/interest-accrues-daily.md) for why the accrual anchor matters
