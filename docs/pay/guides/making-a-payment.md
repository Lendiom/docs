---
id: pay-making-a-payment
title: Making a Payment
---

Lendiom Pay is the online portal the company you pay uses to collect payments. This guide covers making a single payment: what you can pay, what it costs, and what happens afterward.

## Before you start

You need a payment method saved on your account before you can pay. If you have not added one yet, see [Adding a Payment Method](./adding-a-payment-method.md). If you are not signed in yet, see [Logging In](../logging-in.md).

If online payments have not been turned on for your account, the portal shows a message such as "Online payments are not enabled for this loan" and returns you to the details page. That is a setting on the company's side. Contact them to arrange another way to pay.

## Starting a payment

Open the loan or rental you want to pay and tap **Make a Payment** at the top of the page.

If you have no payment method saved yet, what you see depends on what you opened:

- **On a loan or an invoice** — the button reads **Add Payment Method** instead, and takes you to the page where you add one.
- **On a rental** — no button appears at all. The header is empty until a payment method is on your account, so there is nothing to tap.

Either way, add a payment method first (see [Adding a Payment Method](./adding-a-payment-method.md)) and **Make a Payment** will be there when you come back.

![A loan details page in Lendiom Pay at phone width, showing the label, balance due and payment history](/img/docs/pay/guides/making-a-payment/01.png)

## Choosing what to pay

The payment page lists the amounts you are allowed to pay as a set of radio buttons. Which ones appear depends on your account:

- **Balance Due** — everything currently owed: unpaid payments, late fees, unpaid interest, and any other fees. This is selected for you when the page opens.
- **Regular Payment** — your normal scheduled payment amount.
- **Payment Amount** — a minimum set by the company you pay. It only appears when it differs from the two amounts above.
- **Custom Amount** — you type the figure yourself.
- **Custom Principal Amount** — a principal-only payment. See below for when this appears.

If your loan is in default, or your rental is in eviction, the other choices are hidden and only **Balance Due** is offered. The page explains this underneath: you have to pay the total balance due.

Invoices work a little differently. There you choose **Full Balance**, plus **Custom Amount** if partial payments are allowed on that invoice.

![The Lendiom Pay loan payment page at phone width, with the payment method and amount choices](/img/docs/pay/guides/making-a-payment/02.png)

### The minimum

Some accounts have a minimum payment. When yours does, the payment page shows **Minimum payment: $X** under the amount choices. If you type a custom amount below it, the box turns red, the message "Minimum payment is $X" appears, and the **Pay** button stays disabled until you raise the figure.

There is one exception, and it works in your favor: if everything left on the account adds up to less than the minimum, that smaller remaining amount is accepted.

:::caution Type plain numbers

Enter custom amounts as digits with a decimal point, like `1200.00`. A comma can make the page read your amount wrong and warn you that it is below the minimum when it is not.

:::

![The payment page with Custom Amount selected, showing the amount input it reveals](/img/docs/pay/guides/making-a-payment/01.png)

### The most you can pay

On a loan, you cannot pay more than the total owed on it. If you enter more, the payment is turned down with "payment amount exceeds the total amount owed on the loan" — this check runs before anything is charged, so your card or bank account is untouched. Invoices cannot be overpaid either. To settle a loan completely, ask the company you pay for a payoff figure rather than guessing.

## Paying more than the amount due

On a loan, a **How to Apply Extra** dropdown sits below the amount choices. It is on the page from the moment it opens, whatever figure you type — it does not wait for your amount to go above your scheduled payment. What it controls is where any extra lands, so it only changes the outcome when you pay more than is due. Two choices:

- **Principal** — the extra comes off what you owe on the loan itself.
- **Next Payment** — the extra is held against your next scheduled payment.

When your balance due is zero, the money is applied toward the next payment regardless of what you pick here.

There are two times you will not see the dropdown. On loans where interest builds up day by day it is never shown, and extra always goes to principal on those loans. It also disappears while **Custom Principal Amount** is selected, since that payment is principal-only anyway. Rental and invoice payments do not have this dropdown at all.

## Principal-only payments

**Custom Principal Amount** shows up only when both of these are true: the company you pay has allowed principal-only payments on your loan, **and** your balance due is exactly $0.00. In other words, it appears once you are fully caught up and nothing is owed right now. If you owe anything at all, the option is hidden until that is paid.

Selecting it brings up a confirmation first, because a principal-only payment behaves differently: it does **not** move your due date forward and it does **not** count as your regular payment. You still owe your next payment when it comes due. A principal-only payment also cannot be larger than the principal you have left.

## Card or bank account, and the fee

Both work the same way here. Pick the method in the **Payment Method** dropdown at the top; your default is selected automatically. Methods that have been disabled are marked and cannot be chosen.

Processing a payment costs a fee: a small percentage of the amount plus a flat per-transaction charge. Bank account payments generally carry a lower percentage than cards. Who pays that fee is decided by the company you pay, separately for cards and for bank accounts:

- **They cover it** — you are charged only the payment amount.
- **You cover it** — the fee is added on top of your payment.
- **You split it** — you cover half, they cover the other half.

The **Total Amount** box shows exactly what will leave your account, and the note under it spells out the fee if you are paying any part of it. Until you choose a payment method it reads "No payment method selected."

![The How to Apply Extra selector on the payment page, set to Principal, above the total](/img/docs/pay/guides/making-a-payment/02.png)

## Authorizing the payment

Tap **Pay** and a confirmation appears: "By clicking the authorize button, you authorize Lendiom Pay to charge the selected payment method $X." For a principal-only payment it also repeats that the payment will not change your due date. Tap **Authorize** to go ahead, or **Cancel** to back out. Nothing is charged until you tap **Authorize**.

![The Authorize Payment confirmation at phone width, naming the exact amount that will be charged, with Authorize and Cancel](/img/docs/pay/guides/making-a-payment/03.png)

## What a successful payment looks like

You are returned to the loan or rental page and a green message confirms the payment went through. Two things change straight away:

- Your balance drops. The payment is recorded against your account immediately.
- A new entry appears in your payment history showing the date, the amount, and **Status: Pending**.

![The transaction list at phone width with the newest entry still marked pending, above the payments that already settled](/img/docs/pay/guides/making-a-payment/04.png)

## What "Pending" means

Pending does not mean the payment is stuck or that it did not count. The money is already on its way: a card is charged when you authorize, and a bank payment is submitted to your bank at that moment. Pending means the processor has not confirmed yet that the funds have settled.

Lendiom checks with the processor twice a day and updates the status when it hears back. Card payments usually change from Pending to Success within a day. Bank account payments stay Pending longer, because transfers between banks take longer to settle. There is nothing to do while you wait, and you should not pay again — if a payment is still being processed you will see "a payment for this loan is already being processed, please wait a moment and try again."

If the payment is ultimately rejected — not enough funds, an expired card, a closed account, a stop payment — the entry is marked as failed and reversed, and that payment method is switched off on your account so it is not used again by mistake. You will need to add a working payment method and pay again. Depending on how the company has set things up, you may also get a text message or email about it.

## Receipts and records

:::info There is no receipt document

Lendiom Pay does not produce a downloadable receipt or confirmation PDF for a loan or rental payment. Your record is the entry in your payment history, which shows the date, the amount, the total charged, how the money was split, and the status. Open any entry to see the full detail.

:::

The one file you can download from the portal is an **invoice PDF**, using the **Download PDF** button on an invoice page.

If you need something in writing, the company you pay can send you a payment-success letter. It is produced on their side when your payment is applied and lays out the amount, the date, how much went to principal, interest, fees, and escrow, your remaining balance, and your next payment. Ask them for it.

## Two last things

If the payment page fails to open, you will see "We couldn't load this payment page" with **Try Again** and **Back to Loan** buttons. Try again first — usually it is a brief connection problem. If it keeps failing, contact the company you pay.

If automatic payments are already set up, a blue notice at the top of the payment page gives the date of the next scheduled one. Paying here does **not** cancel or postpone it. To skip or stop it, turn it off from the loan or rental page instead.
