---
id: recording-rental-transactions
title: Recording Rental Transactions
---

Every exchange of money on a rental is a transaction: rent collected, a late fee charged, a fee added to the tenant's account. This guide covers the transaction types Lendiom stores on a rental, which balance each one moves, and what you can change after the fact.

## Before you start

Open the rental and use the **Record Transaction** button in the page header. The modal it opens is titled **Add a Transaction**, and that is the name this guide uses for it. If you do not have create permission on Rental Transactions, that button is replaced by **View Client**. See [Roles and Permissions](../security/roles-and-permissions) for how those are granted.

The rental's history lives in the **Transactions** panel further down the page. Each row's actions menu holds View Details, Reverse, and Change Status.

<!-- screenshot: A rental detail page showing the Record Transaction button in the header, the Overview tab with Balance Due, Late Fees Due, Other Fees Due, and Total Due, and the collapsed Transactions panel below -->

## The transaction types

Seven types exist. The Add a Transaction dialog groups them under Rent, Fees, and Record Keeping.

| Type | Group in the dialog | What it moves |
| --- | --- | --- |
| Regular Payment | Rent | Pays late fees first (depending on your tier setting), then reduces **Balance Due** |
| Late Fee | Fees | Raises or lowers **Late Fees Due** |
| Other Fee | Fees | Raises or lowers **Other Fees Due**; a comment is required |
| Early Termination Fee | Fees | Nothing |
| Maintenance Fee | Fees | Nothing |
| Deposit | Record Keeping | Nothing |
| Documentation Fee | Record Keeping | Nothing |

:::caution Four types are record-keeping only

Early Termination Fee, Maintenance Fee, Deposit, and Documentation Fee are stored in the transaction history with a date, amount, method, and comment — and they move no balance at all. Their **To Balance** and **To Fees** columns will read $0.00, and the tenant's Total Due will not change. Two of them sit under the **Fees** heading, which makes it look like they bill the tenant. They do not.

If you need one of these charges to actually be owed, record it as an **Other Fee** with a negative amount and describe it in the comment.

:::

Two further gaps in the same area:

- The **Deposit Amount** entered on the How Much step of the rental wizard is stored on the rental, and picking Deposit in the dialog pre-fills that real figure. Everything after creation is missing: no page displays the deposit, nothing edits or adjusts it, and a Deposit transaction leaves it unchanged. The Deposit Tracking panel on the rental page is disabled and labelled "Coming soon". See [Rental Late Fees, Recurring Fees and Deposits](../how-it-works/rental-fees).
- The Type filter above the Transactions table is missing Early Termination Fee and Maintenance Fee, so those types can be created but not filtered for.

## How a regular payment is applied

A regular payment is applied in this order:

1. **Late fees, if your tier calls for it.** If the rental's late fee tier application is *First Part of Next Payment*, the payment pays down Late Fees Due before anything else. If the tier is *Added to Late Fee Balance*, the payment skips late fees entirely and they stay owed until you pay them off deliberately. See [How Late Fees Work](../how-it-works/late-fees). Rentals support a single tier.
2. **The rest goes to Balance Due.** Whatever is left after late fees is recorded as **To Balance**.

When there is a late fee balance and you choose Regular Payment, the dialog shows a warning telling you how much will be taken by fees first.

Balance Due is then recalculated from scratch: Lendiom counts one rent payment for every month from the rental's first payment date up to today, subtracts the **To Balance** total of every successful or pending regular payment, and floors the result at zero. Overpayments carry forward on their own — next month's expected amount grows while the received total stays, so the credit shows up as a smaller Balance Due. It is never shown as a negative number.

<!-- screenshot: The Add a Transaction dialog with Regular Payment selected, the amount pre-filled with the rent amount, a Payment Method select, a Date picker, a Status select, and the orange warning banner reading that a late fee balance will be paid first -->

## Positive and negative amounts on fees

Late Fee and Other Fee are the only types where the sign of the amount matters, and it is the opposite of what most people expect.

| Type | Negative amount | Positive amount |
| --- | --- | --- |
| Late Fee | Charges the tenant a late fee | Records a payment against Late Fees Due |
| Other Fee | Charges the tenant a fee | Records a payment against Other Fees Due |

The dialog enforces this. For a Late Fee, a positive amount is rejected if there are no late fees due, or if it exceeds the current balance. Payment Method is disabled while the amount is negative, because no money changed hands. Every other type rejects negative amounts outright.

:::caution An overpaid Other Fee balance is stranded

Other Fees Due can go negative if the tenant pays in more than was charged. That credit is never applied to rent or to anything else, and Total Due deliberately treats it as zero so it does not mask real amounts owed. The negative number sits on the Overview tab until you charge a matching fee against it.

:::

## Dates and order

Regular Payment and Late Fee must be dated on or after the rental's last payment received date. Dates before it are greyed out in the picker, and the server rejects them with error **860**, naming the earliest allowed date. The other five types are exempt from this rule and can be back-dated freely.

## Applying funds you are already holding

If a previous online payment was reversed and held rather than refunded, the resulting unapplied payment appears in a selector at the top of the Add a Transaction dialog. Selecting it fills in the amount, date, payment method, and status from the held funds, and locks the method and status to match the original charge.

Lower the amount to draw only part of the credit; the remainder stays available for another transaction. The transaction cannot be dated before the day the funds were received. Once saved, the transaction and the unapplied payment link to each other in View Details.

<!-- screenshot: The Add a Transaction dialog with an unapplied payment selected, showing the blue notice about the original receipt date, the amount field with the "Up to $X is available" hint, and the disabled Payment Method and Status selects -->

## Changing a transaction after it is saved

There is no edit. Two actions can change a saved transaction.

**Change Status** appears only on Pending transactions and only for offline payments. Attempting it on a transaction that came through a payment processor is rejected with error **913993** — reverse those instead. Reversed is offered as a target status only while the rental is in Draft.

**Reverse** undoes the money and requires a reason and a comment. Reversing a Regular Payment must be done newest-first; if a later regular payment exists, the reversal is rejected with error **912**. Reversal restores balances for Regular Payment, Late Fee, and Other Fee. For the four record-keeping types it changes the status and nothing else — consistent, since they never moved a balance.

For an online payment you also choose how the money is handled: **Refund to customer** sends it back through Stripe or PayArc (the platform fee is not refundable), or **Hold as unapplied payment** keeps the full amount available to apply elsewhere. Holding is unavailable on a Pending transaction because the funds have not settled; the server rejects it with error **99430**.

<!-- screenshot: The Reverse Transaction modal for an online rental payment, with the Refund to customer and Hold as unapplied payment radio options, the Reason and Client Visibility selects, the Reversal Comment editor, and the Transaction Details table -->

:::caution Client Visibility on a rental reversal does nothing

The **Client Visibility** select in the rental Reverse dialog is sent to the server and then ignored. The reversal behaves identically whether you choose Visible or Hidden. The equivalent control on loan reversals does work; the rental path never reads it. If a reversal must be kept out of the tenant's view, there is currently no way to do it from this dialog.

:::

:::caution Failing a payment does not give back its late fees

Recording a regular payment applies it to Late Fees Due immediately, whatever status you give it. Changing that transaction's status to Failure afterwards — or creating it as Failure in the first place — recalculates Balance Due correctly but leaves Late Fees Due at the reduced amount. Only a **Reverse** puts the late fees back. If a rent check bounces, reverse it rather than marking it failed.

:::

:::caution Recurring fees accumulate and cannot be paid off

Recurring fees configured on a rental are added to the rental's balance on each charge date and are included in Total Due. No transaction type pays them, and nothing removes them. Total Due will climb month after month for any rental with a recurring fee, and the only way to correct it today is to avoid configuring recurring fees.

:::

Waiving a late fee as part of a payment is supported by the server but has no control in the rental dialog, so it cannot be triggered. To forgive a late fee on a rental, reverse the late fee transaction instead.

## How rental payments differ from loan payments

| | Rental | Loan |
| --- | --- | --- |
| What a payment pays | Late fees, then a single Balance Due | Interest, principal, escrow, and fees per the amortization schedule |
| Payment targeting | None; the amount applies to the balance as a whole | You pick which scheduled payments the money is for |
| Balance calculation | Rent expected to date minus rent received, recalculated after every transaction | The amortization schedule, plus elapsed days on daily-accrual loans |
| Payoff | No payoff action | Record Pay Off computes and closes the loan |
| Types available | 7 | 13, including down payment, principal payment, property tax, earnest money, and payoff |
| Waiving a late fee at payment time | Not reachable in the dialog | Supported |
| Reversal order | Regular payments newest-first | Any transaction, newest-first |

<!-- screenshot: The rental Transactions table showing a mix of rows — a successful regular payment with amounts in To Balance and To Fees, a system-applied late fee, an other fee with a negative amount, and a reversed payment whose comment column reads the reversal reason -->
