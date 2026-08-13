---
id: principal-only-payments
title: Principal-Only Payments
---

A principal-only payment is money that goes straight at the balance. None of it pays interest, none of it pays a scheduled payment, and it does not move the due date. The borrower still owes their regular payment on the same day for the same amount.

On a loan whose interest [accrues daily](../how-it-works/interest-accrues-daily.md), recording one does something that surprises people the first time they see it: **the unpaid interest balance goes up**. That is correct, and this article explains why, along with what you can no longer do to the loan afterward.

## Recording one

You need the **Loan Transaction / Create** permission.

1. Open the loan and click **Record Transaction**.
2. In the **Add a Transaction** window, set **Type** to **Principal Payment**, under the *Principal* group.
3. Enter the **Amount**, **Payment Method**, **Date**, and **Status**.
4. Save.

<!-- screenshot: The "Add a Transaction" modal on an accrues-daily loan with Type set to "Principal Payment". Amount is 10,000.00, Payment Method is Check, Status is Success. Note that the "Payment For" field is visible but greyed out, and the "Extra Application" field is not shown for this type. -->

| Field | Behavior for a Principal Payment |
| --- | --- |
| Payment For | Shown, but disabled — you cannot pick the payment yourself. The payment is attached to the first schedule item that is not fully paid. |
| Amount | Cannot exceed the remaining principal balance (error 19506). Must be positive, except on Interest Only loans, where a negative amount is allowed and only zero is rejected — see [Increasing the principal](#increasing-the-principal). |
| Payment Method | Required, and must be a valid method (error 19509). |
| Date | Cannot be earlier than the loan's last payment date **or** the last date interest was settled, whichever is later (error 860). |
| Status | Pending or Success. |
| Extra Application | Not shown. Every dollar goes to principal. |

The loan must still have at least one payment that is not fully paid. If every scheduled payment is settled, the transaction is rejected — record a [payoff](recording-a-loan-payoff.md) instead.

:::caution

A principal payment on a loan with no schedule room, or one cent over the principal balance, is rejected outright rather than clamped. Check the remaining principal on the **Overview** tab before you type the amount.

:::

## What happens on an Accrues Daily loan

Before the balance is reduced, Lendiom **settles** the interest that has already been earned. It calculates the interest accrued from the last settle point through the transaction date, on the *old, higher* principal, and moves that amount into the loan's **Unpaid Interest** balance. Only then does it subtract the payment from principal.

A worked example. A loan sits at $21,375.65 at 10%, Actual / 360. The last regular payment landed on June 4. On June 24 the borrower hands over $10,000 for principal.

* 20 days have accrued at $5.94/day, which is $118.75.
* That $118.75 moves into **Unpaid Interest**.
* Principal drops to $11,375.65.
* From June 24 forward, interest accrues at $3.16/day on the new balance. Ten days later that is $31.60, not the $59.38 the old balance would have produced.

<!-- screenshot: The loan Overview tab immediately after the paydown, showing Remaining Principal of $11,375.65 and Unpaid Interest of $118.75, with the Accrued Interest field at $0.00. -->

:::info Why the balance goes up

That $118.75 was genuinely earned on the higher balance and is owed to the seller. If Lendiom did not capture it, a payoff quote pulled the same afternoon would recompute those 20 days against $11,375.65 and show $63.20 — quietly erasing $55.55 the seller earned. Settling the interest first is what keeps a same-day payoff quote correct.

:::

The trade is that the loan's **Total Due** on the Overview tab goes up by the settled amount the instant you save — unpaid interest is one of the things it sums. The borrower sees the same figure in their portal as **Balance Due**. Nothing was charged and nothing was lost; the interest simply moved from "accruing" to "owed". It gets paid first out of the next regular payment, ahead of current-period interest and principal.

The same settlement runs on **Interest Only** loans. On loans whose interest **follows the payment schedule**, there is no daily accrual to settle, so a principal payment only reduces the balance.

## Back-dating is closed off permanently

Settling interest also advances the loan's interest anchor to the transaction date. From then on, Lendiom refuses any Regular Payment, Principal Payment, or Adjustment dated before that anchor — reopening a window whose interest is already booked would leave that interest sitting on the wrong balance.

:::caution This is one-way

In the example above, the anchor moves from June 4 to June 24. If a check that actually arrived on June 20 turns up in the mail on June 25, **you can no longer enter it with its true date**. Your only remedy is to reverse the principal payment, enter the June 20 payment, then re-enter the paydown.

Enter transactions in date order. When you have a stack of paper to catch up on, sort it by date before you start.

:::

The transaction modal enforces this before it submits, so the date picker will bounce you with "The date of the transaction cannot be before…" rather than letting the server reject it.

## What it does not change

A principal-only payment deliberately leaves the schedule alone.

| Thing | Effect |
| --- | --- |
| The scheduled interest/principal split | Unchanged. Lendiom does **not** zero the schedule item's interest and principal columns — those are the contractual amounts, and blanking them would understate the loan's total interest. |
| Due date and next payment | Unchanged. The regular payment is still owed, in full, on the same day. |
| Balance Due | Unchanged. On the Overview tab, **Balance Due** is the scheduled amount still owed, and the schedule item's received amount does not move, so the payment still counts as unpaid. **Total Due** is the wider figure — it adds unpaid interest, late fees, and other fees on top — and that one does go up by the interest the paydown settled. |
| [Late fees](../how-it-works/late-fees.md) | Still assessed on schedule if the regular payment is missed. |
| Payment amount | Unchanged. The loan pays off sooner instead, because the schedule stops generating payments once the running balance reaches zero. To lower the payment instead, recast the loan. |
| Last payment date | Unchanged. Only the interest anchor moves. |

On the amortization schedule, the paydown is folded into the **Principal** column of the first unpaid payment, and the item is flagged partially paid. Hovering the figure shows how many principal-only payments are included.

<!-- screenshot: The loan's Schedule tab with the cursor hovering the Principal column of payment #31, showing the tooltip "1 principal only payment" over a combined figure. -->

The transaction details view shows **To Principal** equal to the full amount and **To Interest** at zero. The interest that got settled is not itemized on the transaction — look at **Unpaid Interest** on the loan's Overview tab to see it.

## Versus a regular payment with extra to principal

Both reduce the balance. They are not interchangeable.

| | Principal Payment | Regular Payment, extra to Principal |
| --- | --- | --- |
| Pays accrued interest | No — it is booked as unpaid instead | Yes, interest is paid first |
| Effect on Unpaid Interest | Goes **up** by the interest earned since the last settle | Goes down, or stays flat |
| Satisfies the scheduled payment | No | Yes |
| Advances the due date | No | Yes |
| Advances the last payment date | No | Yes |
| Where the extra lands | All of it, to principal | Whatever remains after fees, unpaid interest, current interest, and scheduled principal |

The rule of thumb: if the borrower is paying their payment *and* extra, record one Regular Payment with **Extra Application** set to Principal. Use Principal Payment only when the money is genuinely separate from the scheduled payment — a windfall, a lot release, a lump sum mid-period.

## What the borrower sees

If the loan has online payments turned on, **Allow Principal Only** controls whether the option is offered in the borrower's portal. You set it when creating the loan and can change it later from the loan's online payments settings.

<!-- screenshot: The loan's Online Payments settings modal with the "Allow Principal Only" Yes/No toggle set to Yes, and its helper text visible below the field. -->

In the portal, the option appears as **Custom Principal Amount** on the payment screen, and only when all three are true:

* the loan allows principal-only payments,
* the loan's status is not In Default, and
* the balance due is exactly zero.

Selecting it pops a confirmation that spells out the consequence: the payment will not modify the due date and will not count toward the regular payment. The borrower types an amount and pays with a saved card or bank account.

<!-- screenshot: The borrower portal payment page showing the amount options with "Custom Principal Amount" selected, its amount input revealed, and the confirmation dialog stating the payment will not modify the due date. -->

That third condition has a consequence worth knowing. Because the settled interest lands in the balance due, a borrower who makes a mid-period principal payment on an accrues-daily loan **cannot immediately make another one** — their balance due is no longer zero. It clears when the next regular payment is applied.

Borrowers get the same payment confirmation email and SMS they would for a regular payment, if the loan has automated communication enabled. The online path charges through [PayArc](../payment-processing/payarc.md) and lands as a Pending transaction until the processor settles it.

## Reversing one

Reversing a principal payment unwinds the whole thing: the principal goes back up, the interest that was captured comes back out of the unpaid balance, and the interest anchor is restored to exactly where it was. The days between the old anchor and the transaction become eligible to accrue again on the restored balance.

Reversals must be done newest-first. If a later transaction exists, Lendiom refuses with "reversing transactions must be done in sequential order" (error 912) — reverse the later one first.

## Increasing the principal

On **Interest Only** loans only, entering a negative amount increases the principal balance instead. The modal asks you to confirm, requires a comment explaining why, disables the payment method, and adds a note to the loan. It settles interest first for the same reason a paydown does, so the larger balance only affects days going forward.

Attempting a negative amount on any other interest schedule is rejected, as is trying to charge the client for one.

## Error reference

| Code | Meaning |
| --- | --- |
| 860 | The date is before the last payment date or the last interest settle date |
| 912 | The transaction is not the latest, so it cannot be reversed yet |
| 19506 | The amount exceeds the remaining principal balance |
| 19507 | Same, from the borrower's portal |
| 19508 | A principal increase needs a comment, or the loan is not interest-only |
| 19509 | Invalid payment method |
| 19510 | You cannot charge a payment processor when increasing principal |
