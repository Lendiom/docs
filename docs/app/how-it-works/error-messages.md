---
id: error-messages
title: Error Messages in Lendiom
---

When Lendiom refuses an action, it tells you why and gives the reason a number. This page is a reference for the numbers you are most likely to see.

## How to read an error

Errors appear as a red notification. The message is the title, and the line beneath it reads:

`Status: 400, Code: 19530, Request ID: 6f2c...`

- **Status** is the category. `400` means the request was rejected over data, timing, or configuration. `404` means not found, `401` and `403` mean permission, `500` means something failed inside Lendiom.
- **Code** is the specific reason, and it is what the tables below are keyed on.
- **Request ID** identifies that one request in our logs. Include it when you contact support. On some `500` errors it comes back empty, because the server returns the identifier under a different name than the notification looks for. When that happens, send support the exact message text, the code, and roughly when it happened — we can still find the request.

<!-- screenshot: the Lendiom app with a red error notification open in the top-right corner, showing the message as the title and "Status: 400, Code: 19530, Request ID: ..." on the line below it -->

Three codes are generic and can appear anywhere:

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `73` | A "not found" message naming the record, such as `loan not found` | The record is gone, or the tab is stale | Reload the page |
| `74` | `request forbidden` or `requester unauthorized` | No permission, or the session expired | Sign in again, or ask an administrator about your role |
| `2` | `internal_server_error` | A failure inside Lendiom | Send support the Request ID |

:::info
Codes are not unique across the whole product. A few numbers, such as `19510` and `19511`, are reused in different areas with different messages. Match on the message text first, then the code.
:::

## Add-ons that are not turned on

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `571` | `document builder addon is not enabled` | Every builder action is gated: upload, preview, generate, send, edit | Enable it under **Organization Settings → Billing → Addons** |
| `198415` | `document signature addon is not enabled` | Creating a template or a signature request | Enable it in the same card. See the [Document Signing Guide](../guides/document-signing.md) |
| `198415` | `rental addon is not enabled` | Creating a rental | Rentals are not self-serve. The Addons card has no rentals switch, and the rentals page reads "Coming soon" — contact Lendiom to have it turned on for your organization |

![The Addons card on the Billing tab, listing each add-on and whether it is enabled](/img/docs/app/how-it-works/error-messages/02.png)

## Loan payments and transactions

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `19530` | `a payment for this loan is already being processed, please wait a moment and try again` | Lendiom locks a loan while a payment is charged and recorded, so it cannot be charged twice | Check the transaction list, then retry |
| `105001` | `payment amount is below the minimum of $250.00` | The loan or rental has a minimum payment rule | Take the full minimum, or change the rule |
| `9993` | `payments are not allowed on a loan that is paid off, pending payoff, or refinanced` | The loan's [status](./loan-status.md) blocks payments | Resolve the payoff, or return the loan to an active status |
| `19505` | `payment amount exceeds the total amount owed on the loan` | More than everything owed | Reduce it, or record the excess separately as an unapplied payment |
| `19506` / `19507` | `principal payment cannot exceed the remaining principal balance` | `19506` from a staff entry, `19507` from Lendiom Pay | Use the remaining principal, or record a payoff |
| `19510` | `there are no other fees due on this loan` | The other fees balance is zero | Charge the fee first |
| `19511` / `19512` | `payment amount must be greater than zero`, or `payment amount cannot exceed the other fees balance` | The other-fee payment is zero, negative, or too large | Enter a positive amount within the other fees balance |
| `345` / `490484` | `please select a valid payment method`, or `the client does not have a default payment method that is enabled` | The method is missing, disabled, or not on this client | Have the client add one in [Lendiom Pay](../../pay/what-is-pay.md) and set it as default |
| `913993` | `can not change the status of online payments; use the reverse functionality to reverse the payment` | Online payments carry processor state | Reverse the transaction |

<!-- screenshot: the New Transaction modal on a loan with the 19530 "a payment for this loan is already being processed" notification visible over it -->

:::caution
`19530` never retries on its own. If a client hits it in Lendiom Pay, tell them to check their payment history before trying again — the first payment may have gone through.
:::

## Reversals and payoffs

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `912` | `reversing transactions must be done in sequential order. this transaction is not the latest` | Reversals unwind newest first | Reverse the later ones first |
| `99430` | `cannot hold as unapplied payment: the transaction is still pending and has not been settled by the payment processor` | The funds are not settled | Wait, or reverse it as a refund |
| `9997` | `loan has available unapplied payments that must be resolved (applied or refunded) before recording a payoff` | Unapplied money is still on the loan | Apply or refund it, then record the [payoff](../guides/recording-a-loan-payoff.md) |

## Waiving late fees

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `19531` / `19532` / `19533` | `only late fee transactions can be waived`, `this late fee has already been reversed or waived`, or `only successful late fees can be waived` | Not a [late fee](./late-fees.md), or nothing left to waive | Check the transaction history |
| `19534` / `19543` | `this transaction is a late fee payment, not a late fee; reverse it instead of waiving it`, or `to waive a late fee, use the waive action instead of a reversal` | Wrong action, or wrong transaction | Use Waive on the fee itself |
| `19535` / `19537` | `this loan has been paid off; reverse the final payment before waiving late fees`, or `the loan was paid off after this late fee; reverse the payoff before waiving it` | The waiver would rewrite history the payoff depends on | Reverse the payoff, waive, re-record it |
| `19536` / `19544` / `19545` | `this loan was refinanced`, `this loan has been repossessed`, or `this loan has been cancelled; late fees on it can no longer be waived` | The loan is closed to changes | Record an other-fee credit instead |
| `19541` | `the loan's transactions changed while the waiver was being computed, please try again` | Someone changed the loan mid-waiver | Retry |

<!-- screenshot: a loan's transaction list with the Waive Late Fee modal open and the 19533 "only successful late fees can be waived" notification showing -->

## Invoices

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `99100` | `partial payments are not allowed for this invoice` | The client paid less than the balance due | Allow partials on the invoice, or take it in full |
| `99101` | `payment amount exceeds balance due` | Over the invoice balance | Reduce the amount |
| `99999` | `online payments are not enabled for this invoice` | Created without online payment | Enable it and resend |
| `99998` | `cannot process payment for invoice in its current status` | Draft, cancelled, or already paid | Check the invoice status |

## Lendiom Pay

Clients report these over the phone, so the message text is what they will read to you. [Lendiom Pay](../../pay/what-is-pay.md) is used mostly on phones.

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `746` | `the phone number on file cannot receive authorization codes; please reply START to opt back in or update the phone number` | The number opted out of texts, or is marked invalid | Have them text `START` to your number, or fix the client record |
| `747` / `748` / `784` | `too many invalid authorization code attempts; please request a new code`, `authorization code already used; please request a new code`, or `auth token expired` | Codes are single use and expire five minutes after they are requested | Have them request a fresh code |
| `5555` | `invalid integration, processor setup not completed` | [PayArc](../payment-processing/payarc.md) onboarding is unfinished | Finish onboarding |
| `9381` | `primary person on the account must have an address; no address on file` | The processor requires a billing address | Add an address to the primary person |
| `874` | `at least one payment method is required` | They tried to remove their only method. You get the same message removing your organization's last usable billing method | Add the replacement first |
| `99731` | `payment method can not be removed, it is used for automatic payment(s)` | Attached to auto-draft or automatic rent | Move automatic payments to another method |
| `5570` | `a pending change request already exists, please wait for it to be processed before submitting a new one` | They submitted an address change while an earlier change request on that person is still open | Approve or reject the pending request |

<!-- screenshot: Lendiom Pay at phone width on the make-a-payment screen with the "payment amount is below the minimum of $250.00" error shown under the amount field -->

<!-- screenshot: Lendiom Pay at phone width on the payment methods screen with the 99731 "payment method can not be removed, it is used for automatic payment(s)" message -->

## Text messaging

`21606` is not a Lendiom code. It comes from our messaging provider and appears in support logs rather than on your screen.

| Code | What it means | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `21606` | Your From number `is not a valid, SMS-capable phone number or short code for your account.` | Your [communication portal](../communication.md) number is not registered for texting | Contact support. Lendiom does not retry these, so the message drops and nothing queues behind it |

## Signing in

| Code | What you see | Why it happens | How to resolve |
| --- | --- | --- | --- |
| `88` | `invalid password`, shown as `Invalid password.` | Wrong or blank password | Retry, or use the forgot-password link |
| `940100` | `invalid two-factor code`, shown as `Invalid authentication code. Please try again.` | The code is wrong or expired | Wait for the next code; check the device clock |
| `940103` | `invalid recovery code`, shown as `Recovery code not recognized or already used.` | Recovery codes are single use | Use another, then regenerate your set |
| `940106` | `two-factor authentication enabled but not configured` | Two-factor is on but has no secret | Contact support to reset two-factor |

:::tip
If an error is not on this page, send support the exact message text and the Request ID. Those two things trace the request end to end.
:::
