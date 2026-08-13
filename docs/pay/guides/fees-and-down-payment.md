---
id: pay-fees-and-down-payment
title: Paying a Down Payment, Setup Fees and Other Fees
---

Some amounts are not part of your regular payment and cannot be paid with it. A down payment, a setup fee such as a closing fee, and any other fees added to your loan each have their own screen and their own button. This guide covers where they appear, how to pay each one, and why the **Make a Payment** button sometimes disappears from a loan.

## The three kinds of charges

| Charge | What it is | Where you pay it |
| --- | --- | --- |
| **Down payment** | The money due up front on a loan, in one payment or spread across several | **Pay down payment now**, on the loan page |
| **Setup fee** | A documentation fee, closing fee, earnest money, application fee, or a fee the company you pay named themselves | **Pay [fee name] now**, on the loan page |
| **Other fees** | Charges added to your loan later, such as recording or inspection costs | **Pay Other Fees**, on the loan page |

The amounts for a down payment and a setup fee are fixed by the company you pay. Other fees are the only one of the three where you choose how much to pay.

## Where they appear

On your home screen, a yellow alert sits near the top when a down payment or a setup fee is outstanding: **Down Payment Due**, or the name of the fee, such as **Closing Fee Due**. The loan's own row repeats it with a red alarm icon under the loan name.

Other fees do not produce a home-screen alert. You will only see them on the loan itself.

![The Lendiom Pay home screen with a Down Payment Due alert above the accounts](/img/docs/pay/guides/fees-and-down-payment/01.png)

Open the loan and each outstanding charge gets its own notice, with the amount, the date it is due, and a green button that takes you straight to the payment screen. A setup fee notice turns red once its due date has passed.

![A loan page in Lendiom Pay showing the Down Payment Due notice with its amount and due date](/img/docs/pay/guides/fees-and-down-payment/02.png)

## Paying a down payment

Tap **Pay down payment now** to open the down payment page. It shows two cards, **Due Date** and **Amount Due**, then a **Payment Method** dropdown and a read-only **Total Amount**.

There is no amount box. The figure is set for you, and you cannot pay part of it or more than it.

Whether your down payment comes as one payment or several is decided by the company you pay:

- **One payment.** The full amount is charged at once, and the down payment is settled.
- **Several payments.** The page shows only the next one due, with its own amount and date. Pay it, and the notice comes back for the one after that. Work through them as they arrive.

![The down payment page in Lendiom Pay, with the due date, amount and payment method](/img/docs/pay/guides/fees-and-down-payment/03.png)

## Why Make a Payment can be missing entirely

When a down payment is due as a **single payment** and has not been paid, the **Make a Payment** button is removed from the top of the loan page. So is **Enable Auto Draft** — both live in that same header, so it looks empty.

This is deliberate. The down payment comes first, and until it is paid there is nothing else to pay on that loan. Use **Pay down payment now** in the notice below instead. Once the down payment goes through, the header comes back and you can make regular payments as usual.

A down payment split into several payments does not do this. **Make a Payment** stays where it is the whole time.

:::info
There are other reasons the header can look wrong, and they are covered in [Making a Payment](./making-a-payment.md): the button reads **Add Payment Method** when nothing is saved on your account, and it disappears when online payments are switched off or the loan is closed.
:::

## Setup fees

A setup fee is a one-off charge from when your loan was set up. In the portal it carries its real name rather than the words "setup fee":

| Name in the portal | Notice heading you will see |
| --- | --- |
| Documentation Fee | Documentation Fee Due |
| Closing Fee | Closing Fee Due |
| Earnest Money | Earnest Money Due |
| Application Fee | Application Fee Due |
| A name the company you pay chose | That name, followed by Due |

Each unpaid fee gets its own notice on the loan page and its own payment screen, so a loan with two of them shows two notices.

Like a down payment, the amount is fixed and there is no amount box. A setup fee can also be split into several payments. When it is, the payment screen adds a **Total Fee Amount** card and a blue **Payment Schedule** panel listing every payment with its amount and date, marked **Paid** or **Current** so you can see where you are. Tapping **Pay** charges the one marked Current.

![The setup fee payment page in Lendiom Pay, showing the closing fee and its due date](/img/docs/pay/guides/fees-and-down-payment/04.png)

## Other fees

Other fees are charges added to your loan after it started. The notice on the loan page states it plainly: these fees are not included in your regular payment and must be paid separately. Paying your normal payment does not reduce them.

Tap **Pay Other Fees** and a small window opens with a **Payment Amount** box already filled in with the full balance owed.

This is the one place where you choose the figure, and it works in one direction:

- **You can pay less than the balance.** Lower the amount and the rest stays owed for later.
- **You cannot pay more than the balance.** The **Pay** button stays greyed out while the figure is above what is owed, or is blank or zero.

If a payment does reach us with a bad amount, it is turned down before anything is charged:

| What you see | What it means | What to do |
| --- | --- | --- |
| payment amount must be greater than zero (19511) | The amount arrived as zero or blank. | Enter a figure above zero. |
| payment amount cannot exceed the other fees balance (19512) | More than the other fees currently owed. | Lower it to the amount shown under the box. |
| there are no other fees due on this loan (19510) | The balance was cleared, possibly by a payment that has just landed. | Reload the loan. If nothing is owed, you are done. |

<!-- screenshot: the "Pay Other Fees" window at phone width over a loan page, showing the Payment Method dropdown, the Payment Amount box with the helper text "Other Fees Due: $150.00" beneath it, the greyed-out Total Amount field, and the Cancel and Pay buttons -->

## The total, and authorizing it

All three screens work the same way from here. Pick a card or bank account in **Payment Method** — your default is chosen for you — and the read-only **Total Amount** fills in with exactly what will leave your account. If the company you pay has you covering the processing fee, or splitting it with them, the note under that box spells the fee out. See [Making a Payment](./making-a-payment.md) for how that fee is worked out, and [Adding a Payment Method](./adding-a-payment-method.md) if you have nothing saved yet.

Tap **Pay** and a confirmation appears asking you to authorize the exact total. Nothing is charged until you tap **Authorize**.

## After the payment

You are returned to the loan page with a green confirmation, and a new entry appears in your transaction list named after what you paid: **Down Payment**, **Closing Fee**, **Other Fee**, and so on. It starts as **Status: Pending**, which is normal — the money is already moving, and the processor has not confirmed settlement yet. Card payments usually clear within a day; bank payments take longer.

If a down payment or setup fee was split into several, the notice returns for the next one still owed. Once every part is paid, the notice goes away for good.

:::caution
If a down payment goes unpaid past its due date, the company you pay may change the loan's status, and online payment stops being possible. You will see "payments are not allowed on a loan that is paid off, pending payoff, or refinanced (9993)", or the loan will drop off your home screen. Contact them to make arrangements. This is not something Lendiom can reopen for you.
:::

Any other red message you run into is listed in [Error Messages in Lendiom Pay](./error-messages.md).
