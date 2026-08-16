---
id: pay-paying-an-invoice
title: Paying an Invoice
---

An invoice is a one-time bill — a fee, a service charge, an adjustment — and it stands on its own. It is not part of your regular loan or rental payment, and paying that does not pay it. This guide covers where invoices turn up, how to pay one, the file you can download, and the two errors that show up most often on this screen.

## Where invoices show up

The company you pay sends the invoice by email, text message, or mail, depending on how they set it up. That message carries a link straight to it.

The invoice also sits on your home screen in a list called **Invoices**. When money is owed on one, that list jumps above your rentals and loans so it is the first thing you see; when everything is settled, it drops to the bottom. Each row shows the invoice number, its status, the due date, and the amount still owed, in red when there is a balance. Tap **View Details** to open it.

![The Lendiom Pay home screen at phone width, with the Invoices list above the loans](/img/docs/pay/guides/paying-an-invoice/01.png)

## The invoice page

At the top: the invoice number and **Balance Due**, the amount still to be paid. Four cards follow — **Due Date**, **Issued Date**, **Status**, and **Total Amount**. Total Amount is the original figure on the invoice; Balance Due is what is left of it.

Under the cards, **Transactions** lists every payment recorded against the invoice, newest first. Tap an entry for the full detail, or **Load more** when there are more than fit on screen.

The first time you open the page, the invoice is marked as **Viewed** on the company's side. That is a record that it reached you, nothing more.

Two buttons sit in the header. **Download PDF** is always there. Beside it you get **Make a Payment**, or **Add Payment Method** when you have none on file yet — see [Adding a Payment Method](./adding-a-payment-method.md).

![An invoice open in Lendiom Pay at phone width, showing the balance due and the line items](/img/docs/pay/guides/paying-an-invoice/02.png)

| Status | Can you pay it here? |
| --- | --- |
| **Sent**, **Viewed**, **Overdue** | Yes. |
| **Partially Paid** | Yes — for the remaining balance. |
| **Payment Pending** | No. A payment on this invoice is already going through. |
| **Paid** | No. A green panel confirms it is paid in full. |
| **Cancelled** | No. A panel says no payment is required. |
| **Draft** | No. It has not been finalized yet. |

Online payment can also be switched off for one particular invoice. If it is, the payment screen bounces you back with "Online payments are not enabled for this invoice." Contact the company you pay to arrange another way.

## Choosing how much to pay

Tap **Make a Payment** and you get two amount choices, one of which may not be there:

- **Full Balance** — the whole remaining amount, selected for you when the screen opens.
- **Custom Amount** — you type the figure. It appears only when the company you pay has allowed partial payments on this invoice.

When partial payments are not allowed, the grey text says so: "Partial payments are not allowed for this invoice. The full balance must be paid." That is set per invoice on their side. Some allow it, others do not.

There is no minimum on invoices. When Custom Amount is available, any figure above zero and up to the balance due is accepted. Type it as plain digits with a decimal point, like `250.00`.

If part of this invoice is already paid, a blue **Partial Payment Made** panel shows the amount paid so far and the balance left.

![The Lendiom Pay invoice payment screen at phone width, with the payment method and amount](/img/docs/pay/guides/paying-an-invoice/03.png)

## The total, and authorizing it

Pick your card or bank account in the **Payment Method** dropdown at the top. Your default is selected automatically, and any method that has been switched off is marked and cannot be chosen. The **+** button beside it takes you to your payment methods.

**Total Amount** underneath is read-only and shows exactly what will leave your account; until you pick a method it reads "No payment method selected." Processing carries a fee, and whether it falls to you, to the company you pay, or is split between you is their decision — the note under the box spells out your share. [Making a Payment](./making-a-payment.md) explains how that fee is worked out.

**Pay** stays greyed out until you have a payment method and an amount above zero. Tap it and a confirmation appears: "By clicking the authorize button, you authorize Lendiom Pay to charge the selected payment method $X. This amount will be applied to this invoice." Nothing is charged until you tap **Authorize**. When it goes through you land back on the invoice with a green "Invoice payment successfully submitted!" message.

![The Authorize Payment confirmation over the invoice payment screen at phone width, naming the amount that will be charged](/img/docs/pay/guides/paying-an-invoice/04.png)

## What happens next

Straight away the balance due drops by the amount you paid, the status becomes **Payment Pending**, and a new entry appears in Transactions with **Status: Pending**.

Pending is normal. The payment is on its way; the processor has not confirmed the money has settled. Cards usually confirm quickly, bank transfers take longer. While the invoice sits at Payment Pending the **Make a Payment** button is gone and a second payment is turned down — that is deliberate, so you are never charged twice for the same bill. There is nothing to do but wait. An email or text headed "Payment Processing for Invoice ..." confirms it started.

### When the balance clears

Once the processor confirms, the invoice settles on its own:

- **The balance reached zero.** The status becomes **Paid**, the paid date is recorded, and a green **Invoice Paid** panel appears: "This invoice has been fully paid. Thank you for your payment!" The payment button is gone; **Download PDF** stays. You get a message headed "Invoice ... Paid in Full".
- **Money is still owed.** The status becomes **Partially Paid**, the remaining balance is shown, and the payment button comes back for whenever you are ready. You get a message headed "Payment Received for Invoice ...".

The transaction entry changes from Pending to Success at the same time.

:::caution If the payment is rejected

If your bank or card issuer turns it down after the fact, the amount is added back and the balance returns to where it was. The transaction is marked in red as a failure, and that card or bank account is switched off on your account so it is not used again by mistake. You get a message headed "Payment Failed for Invoice ...". Add a working payment method and pay again — [Error Messages](./error-messages.md) explains the bank's reasons.

:::

## Downloading the invoice

**Download PDF** on the invoice page is the one document you can download anywhere in Lendiom Pay. It works at every status, paid or not, and saves as `Invoice-<number>.pdf`.

The file holds the company's contact details and yours, your account number, the invoice number with its issue and due dates, every line item with quantity and unit price, the subtotal, any tax or discount, the total, the amount paid, the balance due, any notes, and the current status with the paid date once it is settled. While a balance remains and online payment is turned on, it also carries a link back to the invoice so you can pay from it.

This is the file to keep for your records or hand to anyone who needs proof of the charge.

<!-- screenshot: at phone width, the invoice page showing the green "Invoice Paid" panel reading "This invoice has been fully paid. Thank you for your payment!" with the Download PDF button still in the header -->

## Two errors specific to invoices

Both are checked before any money moves, so nothing is charged when you see one.

| What you see | What it means | What to do |
| --- | --- | --- |
| partial payments are not allowed for this invoice (99100) | The amount was less than the full balance, and this invoice has to be paid in full. | Choose **Full Balance**. If the balance changed while the screen was open, reopen the invoice and start again. |
| payment amount exceeds balance due (99101) | The amount was more than the balance left. An invoice cannot be overpaid. | Lower it to the balance shown, or choose **Full Balance**. |

If the balance in front of you does not look right, reopen the invoice before paying. A payment recorded on the company's side changes it, and the screen may have been open a while.

If the payment screen itself will not load, you will see "We were unable to load the payment page. Please try again later." with a **Go to Home** button. Open the invoice again and start from there; if it keeps failing, contact the company you pay.

## Where to go next

- [Adding a Payment Method](./adding-a-payment-method.md) — before your first payment
- [Making a Payment](./making-a-payment.md) — paying a loan or rental, and how the fee works
- [Your Lendiom Pay Home Screen](../home-screen.md) — how invoices fit into your overall balance
- [Error Messages](./error-messages.md) — every message the portal can show you
