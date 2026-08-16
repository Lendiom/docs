---
id: automatic-payments
title: Automatic Payments
---

## Introduction
Lendiom can pull a payment on its own, on a schedule, from a payment method the borrower has saved in Lendiom Pay. On loans the feature is called **Auto Draft**; on rentals it is called **Auto Pay**. They behave the same way from your side: you decide whether the option is offered, the borrower decides whether to use it, and a nightly job does the charging.

This article covers the lender side — what you control, what runs when, and what you will see when something goes wrong.

## What has to be true first
Automatic payments sit at the end of the online payment chain: a completed PayArc merchant account, online payments switched on for that specific loan or rental, and then **Allow Auto Draft** or **Allow Auto Pay** set to Yes in the same configuration. All of that is covered in [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md).

The last link is the borrower's: they need a card or bank account saved in Lendiom Pay before they can enroll. See [Adding a Payment Method](../../pay/guides/adding-a-payment-method.md).

Automatic payments only run through PayArc. A payment method that came from Stripe cannot be drafted.

![The Online Payments modal on a loan, with online payments enabled and the auto draft controls](/img/docs/app/how-it-works/automatic-payments/01.png)

## Who enrolls
**The borrower does, in Lendiom Pay** — the steps they follow are in [Setting Up Automatic Payments](../../pay/guides/automatic-payments.md). There is no button in Lendiom that turns on a borrower's automatic payments for them. Your three levers are the **Allow Auto Draft** / **Allow Auto Pay** switch, the online payment switch above it, and — if you have the borrower's authorization — signing into Lendiom Pay as them from the client record.

:::caution
Opening Lendiom Pay as a client is impersonation. Lendiom shows a warning before it opens, records who requested it, and an organization can turn impersonation off entirely in its preferences. Anything you do there is recorded as the client's own action.
:::

What the borrower picks at enrollment differs by product:

| | Loan (Auto Draft) | Rental (Auto Pay) |
| --- | --- | --- |
| Payment method | One saved method, must not be disabled | One saved method, must not be disabled |
| Amount | A fixed dollar amount they choose | A ceiling — "up to" this much |
| Extra handling | Extra applies to principal or to the next payment | Not applicable |
| Start date | Must be a future date in your organization's timezone | Must be a future date in your organization's timezone |

Enrollment also flips the record to **automated communication** and adds SMS to its preferences (rentals get SMS and email), since the borrower needs the confirmations and failure notices. Lendiom writes a system note and a client timeline entry recording who enrolled, the amount, the start date, and the date they authorized it, then notifies your organization.

## When drafts run
Two daily jobs do the work, both on **America/Chicago** time regardless of where your organization is:

| Job | Time |
| --- | --- |
| Loan auto draft | 3:00 AM Central |
| Rental auto pay | 3:30 AM Central |

A record is eligible when its next draft date lands anywhere inside that Central calendar day, so a borrower who picked the 15th is charged in the small hours of the 15th, Central.

After a successful charge, the next date moves forward on its own:

- **Loans** advance by the loan's payment frequency — monthly, bi-weekly, or weekly.
- **Rentals** always advance one month.

:::caution
The system note written at enrollment is phrased "on the Nth of each month". For a bi-weekly or weekly loan, the draft actually follows the loan's payment frequency, not the calendar month. On a loan imported with a frequency Lendiom does not generate schedules for (quarterly, for example), the next draft date is deliberately left alone rather than guessed — the loan drafts once and then stops. Contact support if you see that.
:::

## How much gets charged
On a **loan**, Lendiom test-applies the borrower's chosen amount before it touches the card. If the loan cannot absorb the full amount — the payoff is smaller than the draft — the amount is trimmed down to what remains owed so the final draft closes the loan cleanly. If less than a cent is owed, auto draft turns off with "Nothing is owed on the loan." If even the trimmed amount is rejected, auto draft turns off and the note tells you the final payment has to be recorded by hand.

On a **rental**, the charge is the smaller of the borrower's ceiling and the total due — rent, late fees, other fees, and any unpaid recurring fees.

Platform fees ride along with the charge exactly as they do for a manual online payment, split according to the fee payee configuration on that loan or rental.

## When a draft is skipped instead of attempted
Some conditions stop a draft before any money moves. In most of these Lendiom sets an internal retry for the next day, which keeps the borrower's chosen schedule date from drifting forward.

| Situation | What happens |
| --- | --- |
| Loan is draft, inactive, repossessed, paid off, canceled, or refinanced | Never picked up |
| Rental is draft, evicted, or terminated | Never picked up |
| Another payment on the same loan is mid-flight | Skipped, retried tomorrow, and your organization gets an "Automatic Payment Skipped" notification |
| PayArc flags the charge as a possible duplicate | Skipped, retried tomorrow, high-priority notification asking you to confirm the borrower was not already billed |
| The card network asks for the transaction to be re-entered | Retried immediately a few times, then deferred to tomorrow |
| PayArc's daily processing cap for that borrower is reached | Retried tomorrow; if it keeps slipping for three days, Lendiom alerts its own operations team to request a higher cap |
| PayArc's per-check ACH ceiling is exceeded | Retried tomorrow and Lendiom's operations team is alerted, since that ceiling is a setting on your merchant account |

None of these turn auto pay off. The borrower stays enrolled and the scheduled date stays put.

![The notifications panel with a high-priority Automatic Payment Skipped card, explaining that the draft was held back because the processor flagged a possible duplicate and will be retried tomorrow](/img/docs/app/how-it-works/automatic-payments/02.png)

## When enrollment is switched off automatically
Other failures are treated as real failures. Lendiom cancels the enrollment, writes a system note with the reason, adds a red entry to the client timeline, notifies your organization, and texts the borrower.

| Reason | Borrower is told |
| --- | --- |
| Their bank declined the charge ("do not honor") | Auto pay is paused; contact the bank, then restart it in Lendiom Pay |
| The saved payment method is gone or disabled | The method is invalid; pick a different one in Lendiom Pay |
| The processor returned any other error | Something went wrong; restart it in Lendiom Pay |
| You turned off online payments or Allow Auto Draft | Auto payments are paused, with a link to re-enroll only if the option is still allowed |

There is a slower path worth knowing about. A drafted payment is recorded as pending, and a job that runs twice a day asks PayArc what became of it. When a loan draft comes back rejected — insufficient funds, closed account, stop payment — Lendiom reverses the transaction, disables the payment method it came from, files a "Failed Online Loan Payment" notification, and notes on the loan that an automatic payment failed. The enrollment itself survives that moment; the next scheduled draft finds a disabled payment method and is what actually turns auto draft off.

## Payment method changes and refinances
A borrower cannot delete a payment method that an active enrollment points at — Lendiom Pay refuses with "payment method can not be removed, it is used for automatic payment(s)". To switch cards, they enroll again with the new method, which replaces the whole configuration. Simply adding a method changes nothing.

A **refinance** ends the enrollment. The original loan is marked refinanced and its auto draft is switched off; the new loan is created with online payments, the statement descriptor, the fee payee settings, and **Allow Auto Draft** carried over, but with auto draft itself off.

:::warning
The refinance path does not text the borrower and does not record a disable reason. If they were on auto draft, tell them to enroll again on the new loan, or their next payment will not be drafted.
:::

## Seeing whether a borrower is enrolled
The loan's **Details** tab carries an **Auto Draft** row that reads one of four ways:

| Row shows | Meaning |
| --- | --- |
| Not Allowed | You have not enabled Allow Auto Draft |
| Disabled | Allowed, never enrolled or previously canceled |
| Disabled, with a date | Canceled — hover for the recorded reason |
| Enabled | Active — hover for the draft amount; a **Next Auto Draft Date** row follows |

![The Details tab of a loan with auto draft enabled, showing the auto draft row and next draft date](/img/docs/app/how-it-works/automatic-payments/03.png)

Rentals work the same way on their **Details** tab, showing **Auto Pay**, **Next Auto Pay Date**, and the **Up To Amount** ceiling.

![The Details tab of a rental with auto pay enabled, showing the next auto pay date and the up-to amount](/img/docs/app/how-it-works/automatic-payments/04.png)

For history rather than current state, the loan's **Story** tab lists every time auto pay was enabled or disabled as timeline events, and raises an active issue — "Auto-pay is not enabled" — on any loan where you allow it but the borrower is not currently enrolled, with the most recent reason and the date it stopped.

![The loan Story tab with the Auto-pay is not enabled active issue showing the recorded reason, and the narrative above it giving the date the draft was switched off](/img/docs/app/how-it-works/automatic-payments/05.png)

## Turning it off yourself
Open the **Online Payments** configuration on the loan or rental and set **Allow Auto Draft** (or **Allow Auto Pay**) to No, or switch online payments off entirely. Either one cancels the borrower's enrollment, records the disable against your name, and texts them.

The two modals differ. The loan modal shows an "Automatic Payments Enabled" alert while auto draft is running and makes you confirm a **Cancel auto draft?** prompt. The rental modal saves immediately, with no prompt.

![The Cancel auto draft? confirmation over the loan’s online payments modal, with Yes and No, keep them!](/img/docs/app/how-it-works/automatic-payments/06.png)

Re-enrolling afterward is the borrower's action, not yours.

:::tip
Cancelling the enrollment does not reverse a draft already in flight. If a charge went out this morning and you want it back, reverse the transaction on the loan or rental instead.
:::
