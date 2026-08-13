---
id: your-invoices
title: Your Lendiom Invoices and Snail-Mail Balance
---

## What This Tab Is

**Org Settings → Invoices** is the record of what **Lendiom charges you**. Every invoice listed here is a bill for your own subscription, your add-ons, and the usage you racked up last period — physical mail, text messages, and calls.

:::caution

This is not the [Invoices feature](../how-it-works/invoices-overview.md) you use to bill your clients. Those invoices live under the **Invoices** item in the main navigation, they are yours to create and send, and they have their own statuses (Draft, Sent, Viewed, Paid). The tab described on this page is read-only, and the only actions it offers are downloading a PDF and clearing a stuck payment.

:::

![The Org Settings Billing tab, with the left-hand tab rail alongside the billing detail](/img/docs/app/billing/your-invoices/01.png)

## Getting to the Tab

Open your organization's settings and choose the **Invoices** tab, or go straight to `/settings/invoices` under your organization.

Access is governed by the **billing** permission, and it behaves the way the rest of billing does: the tab itself appears for a role with **billing read**, but every request behind it — the invoice list, the balance, the payment action — requires the wildcard **billing \*** action. A role with read alone will watch the tab open and then fail to load. See [Roles and Permissions](../security/roles-and-permissions.md) for why billing needs the wildcard.

The table does not refresh on its own. Use the **Refresh** button in the table header after you take an action or after a payment has had time to settle.

## Reading the Invoice List

| Column | What it shows |
| --- | --- |
| Number | The invoice number. Draft invoices have not been assigned one yet and show a dash. |
| Status | The invoice status, plus a marker when a payment needs your attention. |
| Amount | The invoice total. |
| Date | When the invoice was created. Sorted newest first by default; click the header to reverse it. |
| *(actions)* | An **Actions** menu. Draft rows have no menu. |

## Invoice Statuses

| Status | What it means |
| --- | --- |
| Draft | The invoice has been opened for the coming period but is not finalized. Usage charges get attached at this point. No number, no PDF, no actions. |
| Open | The invoice has been finalized and is waiting to be paid. |
| Paid | The invoice has been paid in full. |
| Void | The invoice was finalized and then voided — usually a correction. Nothing is owed. |
| Uncollectible | The invoice was written off. Contact support if you see this and did not expect it. |

Alongside the status text, the Status column adds a marker for the state of the underlying payment attempt:

| Marker | Meaning |
| --- | --- |
| Green check | The invoice is paid. |
| Pink alert icon | The payment needs something from you. Hovering it says to see the actions menu. |
| Blue **Processing** tag | The payment is in flight. Bank payments take a few business days to settle. |

<!-- screenshot: The invoice table's Status column with three rows — one reading "paid" with a green check circle, one reading "open" with a pink alert icon, and one reading "open" with a blue "Processing" tag -->

## Downloading an Invoice PDF

Open the **Actions** menu on the invoice row and choose **Download**. The PDF opens in a new browser tab, served directly by the payment processor.

Draft invoices have no PDF, which is why the entire Actions menu is hidden on draft rows. Wait until the invoice is finalized and moves to **open**, then download it.

<!-- screenshot: An invoice row with the Actions dropdown open, showing "Download" with a red PDF icon and "Take Action: Needs Payment Method" with an alert icon -->

## When an Invoice Needs Action

Card payments sometimes stop partway through and wait on you — 3-D Secure confirmation from your bank is the common case, and a declined or expired card is the other. When that happens, the Actions menu grows a second entry:

| Menu entry | Why it appeared |
| --- | --- |
| **Take Action: Needs Confirmation** | The payment needs to be confirmed or captured. Your bank most likely wants a verification step. |
| **Take Action: Needs Payment Method** | The payment method on the invoice was refused or is missing. |

Choosing it opens the **Payment Action Required** dialog. Click **Take Action** and the payment processor's verification flow starts in place — you complete the bank challenge in the dialog, and Lendiom reports back with a success notification. If the invoice needs a payment method and your organization has no default one on file, Lendiom opens the **Add Payment Method** dialog first, then retries the action with the method you just added.

<!-- screenshot: The "Payment Action Required" modal reading "Action is required to complete your payment. Please click the Take Action button to start the process." with "Take Action" and Cancel buttons -->

After the action succeeds, Lendiom pauses a few seconds for the processor to report the result, then reloads your organization. If the status has not caught up, hit **Refresh**.

:::info

When an invoice's payment moves into an action-required state, Lendiom posts an in-app notification titled "*Your organization*'s Subscription Requires action" to every member whose role carries the **billing update** permission. It fires on the transition into that state, not on every update, so it will not nag you while the invoice sits there waiting.

:::

## ACH Invoices That Sit in Processing

If you pay by bank account rather than card, expect invoices to sit with a blue **Processing** tag for a while. ACH is not instant: the debit is submitted, and the bank takes a few business days to settle it. There is no action to take, no Actions entry appears beyond **Download**, and clicking Refresh repeatedly will not speed it up.

What you should watch for is a Processing invoice that later flips to an action-required marker. That means the debit failed after the fact — insufficient funds, a closed account, a rejected debit — and you now need to take the action or add a different payment method.

## The Balance Due Tag: Charges Staged for Your Next Invoice

Next to the **Invoices** heading, Lendiom shows a **Balance Due** tag when you have charges building up that no invoice has picked up yet. The tag is hidden entirely when the amount is zero.

The figure is two numbers added together: mail Lendiom has not managed to charge you for yet, plus the total of every charge already staged with the payment processor for your next invoice. In normal operation the first number is zero, because each letter is charged the moment it is sent — so what the tag shows is effectively the running total of the charges waiting to land on your next invoice. **It is the only running total of what physical mail has cost you that the app shows.** The individual pieces appear in each client's mail section, and the Send Mail modal quotes the price of a single letter before you send it, but nothing else adds them up for you.

How the balance behaves:

- Every letter you send is charged at send time. As soon as the letter is handed to the print partner, Lendiom stages a charge for that one piece and marks it as billed. The cost is calculated exactly the same way as the estimate you were shown in the Send Mail modal, so what you approved is what you owe. See [Sending a Physical Letter](../guides/sending-a-letter.md) for the price of each mail class and extra service.
- Cancelling a letter, or a letter later failing, does **not** undo the charge. Because billing happens at send time, nothing reverses the staged charge, and a cancelled or failed letter still lands on your next invoice. See [Tracking Mail You Have Sent](../guides/tracking-mail.md) for the cancellation window, and contact support if a cancelled letter needs a credit.
- When your next invoice opens as a draft, everything staged is pulled onto it and the tag drops back toward zero. Each letter appears as its own line naming the mail class or extra service, whether it was printed in color, and the page count — for example `First Class; Black & White; 2 Pages`, or `Certified Mail w/ Return Receipt; Color; 1 Page`.
- The same draft picks up your messaging and call usage for the period, plus a **10DLC Carrier Fees** line when carriers passed fees through. Prices for those are on the [Communication Portal Costs](./communication-portal-costs.md) page.

:::note

A single grouped **Snail Mail** line, carrying a quantity instead of a per-letter description, is not what a normal invoice looks like. It means the send-time charge did not go through for those pieces, so the draft invoice swept them up as a fallback and grouped them by price. The amount is still right — it is the same per-piece cost — but if you see one, the per-letter detail for those pieces is gone.

:::

<!-- screenshot: The invoice table header at the top of the tab, with the heading "Invoices" followed by a grey "Balance Due: $12.83" tag and the Refresh button aligned to the right -->

:::tip

If the Balance Due tag looks higher than you expected, the usual cause is certified or registered mail. Those extra services cost multiples of a plain first-class letter, and each one lands on the balance individually.

:::

When those charges are actually collected depends on your billing interval — see [Billing Cycles](./billing-cycles.md). Add-on charges reach the same invoice through proration; see [Add-Ons](./add-ons.md).

## Emails You Will Receive

These invoices generate email even if you never open the tab. Every one of them goes to the person who created the organization, not to everyone with billing access.

| Email | When it is sent |
| --- | --- |
| Upcoming payment due | Once, when an invoice is finalized and becomes **open**. Includes the due date and a link to the PDF. |
| Payment successful | Once, when the invoice is marked **paid**. The invoice PDF is attached to the email. |
| Subscription past due | When a failed payment pushes your subscription into a past-due state. Content creation is disabled while you are past due. |

Because the receipt carries the PDF as an attachment, that email is often the fastest way to hand an invoice to your bookkeeper without opening Lendiom at all.

## Troubleshooting

**The tab loads and then errors.** Your role has **billing read** but not **billing \***. Every endpoint behind this tab requires the wildcard.

**A row shows a dash instead of a number.** It is a draft. Numbers are assigned at finalization.

**There is no Actions menu on a row.** Same reason — drafts have no PDF and nothing to act on.

**The status did not change after I took action.** Click **Refresh**. The processor confirms asynchronously, and the table only reloads when you ask it to.

**The Balance Due tag disappeared.** The staged charges were rolled onto a draft invoice. Look for the newest draft row, or download the PDF once the invoice is finalized — mail shows up there as one line per letter, such as `First Class; Black & White; 2 Pages`, not as a single grouped total.

**I cancelled a letter and it was still billed.** That is expected. The charge is placed when the letter is sent, and cancelling stops the letter without reversing the charge. Contact support if it needs a credit.
