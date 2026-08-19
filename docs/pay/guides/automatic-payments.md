---
id: pay-automatic-payments
title: Setting Up Automatic Payments
---

Automatic payments let Lendiom Pay take your payment from a saved card or bank account on a day you pick, without you logging in each time.

Depending on what you have, the button is labeled either **Enable Auto Draft** (a loan) or **Enable Auto Pay** (a rental). They work the same way, with a few differences noted below.

## Before the option appears

Automatic payments are controlled by the company you buy or rent from. The button only shows up when all of the following are true:

- That company has online payments turned on, and turned on for your specific contract.
- That company allows automatic payments on your contract. This is a separate setting they control.
- You have at least one payment method saved. On a loan, if you have none, the top of the page shows **Add Payment Method** instead. On a rental, no buttons appear at all — no **Make a Payment**, no **Enable Auto Pay**, and no **Add Payment Method** — until you add a method from the Payment Methods page. See [Adding a Payment Method](./adding-a-payment-method.md).
- Your status still allows it. On a loan, the button only appears while the status is **Current** or **Grace Period**. It is hidden once the loan is **Late**, **In Default**, or **Defaulted**, and also when it is paid off, pending payoff, refinanced, repossessed, inactive, or still a draft. On a rental, it is hidden once the rental is **Terminated** or **Evicted**; a **Late** rental still shows it.
- On a loan with a one-time down payment, the down payment has to be paid first.

If you expected the button and do not see it, contact the company you buy or rent from. Lendiom Support cannot turn this on for you.

![The Lendiom Pay contract page for a loan at phone width, showing the balance due at the top](/img/docs/pay/guides/automatic-payments/01.png)

## Starting the setup

Open your contract from the dashboard and tap **Enable Auto Draft** or **Enable Auto Pay**. Lendiom Pay first asks whether you want to schedule automatic payments. Tap **Yes!** to continue, or **Not Now** to close it.

Lendiom Pay may also offer this on its own when you open a qualifying contract. **Not Now** stops it from asking again during that visit.

## Choosing a payment method

The **Payment Method** dropdown lists everything you have saved. Each shows the card or bank name, the last four digits, and whether it is your default or disabled. Your default method is selected for you.

- A method marked **(disabled)** cannot be selected. Pick a different one.
- The **+** button next to the dropdown takes you to the Payment Methods page to add a new one.

:::caution Keep the method usable
The card or bank account you pick has to stay valid. If it expires, is closed, or is replaced, the payment fails and automatic payments turn off. Updating a card at your bank does not update it here.
:::

## Choosing the start date

The **Start Date** picker sets the day the money is taken.

- The date has to be in the future. The picker may let you choose today or an earlier day, but it is rejected when you submit. Pick a later day and try again.
- You can pick from **15 days before your next due date** through the end of your grace period after it. Your grace period is the number of days after the due date before a late fee is charged. If the company has not set up late fees, your grace period is zero days and the window closes on the due date itself.
- The day you pick becomes the recurring day: the same day every month on a monthly contract, or the same cadence if your loan is billed weekly or every two weeks.

Your due date itself does not change. If you pick a day after the due date, the payment lands inside your grace period rather than on the due date. If you want the payment to arrive before the due date, pick a day before it.

## Choosing the amount

**On a loan**, you enter a fixed **Payment Amount**. The help text below the field shows your regular payment amount; tapping that amount fills it in for you.

You also choose **How to Apply Extra**, which only matters if you set an amount higher than your regular payment. Extra can go toward **Principal** or toward your **Next Payment**.

**On a rental**, you enter a **maximum** amount instead. Each month Lendiom Pay charges whatever you actually owe at that moment, up to that maximum. If you owe less than the maximum, less is charged.

The **Total Amount** field shows what will actually leave your account. Depending on how the company set things up, it may include a platform fee, half of one with the company covering the rest, or no fee at all. The help text under the field says which applies to the method you picked.

![The Payment Auto Draft form in Lendiom Pay, with the payment method and draft day](/img/docs/pay/guides/automatic-payments/02.png)

## Authorizing it

Tapping **Schedule** brings up an authorization notice. Read it, then tap **Authorize**. **Cancel** takes you back to the form with nothing scheduled.

What the notice says depends on what you are paying:

- **On a loan**, it restates the total amount, the day of the month you picked, the start date, and the company's name. It refers only to "the selected payment method" without naming it.
- **On a rental**, it names you and the last four digits of the payment method, along with the maximum amount, the start date, and the company's name. It does **not** repeat the day you picked: the wording always reads "the 15th day of the month" no matter which start date you chose. Go by the date in the **Start Date** field and by the confirmation message you receive afterward, which shows the real scheduled date.

Either way, the notice explains that the authorization stays in effect until you cancel it in Lendiom Pay or your payment method stops working.

![The Authorize Automatic Payments confirmation at phone width, spelling out the amount, the day of the month, the start date and the company being authorised](/img/docs/pay/guides/automatic-payments/03.png)

## After it is set up

Your contract page shows a green **Automatic Payments Enabled** panel with the next scheduled date.

You also get a text message confirming the date and the amount. Setting up automatic payments turns on automated messages about this contract, so you will get texts about upcoming and missed payments too. On a rental, that includes email.

![A loan page in Lendiom Pay with automatic payments enabled, showing the confirmation alert and the next draft date](/img/docs/pay/guides/automatic-payments/04.png)

:::info Payments run overnight
Lendiom Pay processes automatic payments early in the morning, Central time — loans around 3:00 AM and rentals around 3:30 AM. The charge shows on your statement that day or shortly after, depending on your bank.
:::

Making a one-time payment yourself does not cancel or postpone the scheduled automatic payment. If you pay manually and want to skip the automatic one, stop it before the scheduled day.

## When a payment does not go through

If the charge is declined or cannot be processed, **automatic payments are turned off** and you are notified. There is no automatic second attempt, and the payment is still owed.

What you get depends on what happened:

- **Your bank declined it.** The message says the bank responded with "do not honor," which usually means a hold, a review flag, or not enough funds. Contact your bank, then set automatic payments up again in Lendiom Pay.
- **The payment method is no longer valid or was disabled.** Add a working card or bank account, or pick a different saved one, then set automatic payments up again.
- **Something else went wrong.** Check the details on your saved payment method or choose a different one, then set it up again. If it keeps happening, contact the company you buy or rent from.

These arrive by text, and by email as well if email notices are turned on for you.

There are also cases where a payment is skipped **without** turning automatic payments off — for example, another payment on the same contract was being processed at that moment, or the payment processor hit a limit. Lendiom Pay tries again the next day and your enrollment stays in place. You will not get a message for these.

## Changing or canceling

On a loan, the green panel has two buttons:

- **Edit** reopens the form with your current settings so you can change the payment method, date, amount, or how extra is applied. Tap **Update** and authorize again.
- **Stop** cancels automatic payments.

On a rental there is no Edit. To change anything, tap **Stop** and set it up again with the new details.

Either way, Lendiom Pay asks you to confirm: **Yes, stop!** to stop, or **Whoops, no** to keep it running. You can turn automatic payments back on later, as long as the company still allows them.

![The confirmation dialog asking whether to stop automatic payments on a loan](/img/docs/pay/guides/automatic-payments/05.png)

:::caution Removing a saved payment method
You cannot delete a card or bank account while automatic payments are using it — Lendiom Pay tells you the method is in use. Stop automatic payments, or switch them to a different method, then remove it.
:::

## The company can turn this off from their side

The company you buy or rent from can turn off automatic payments for your contract, or turn off online payments entirely. Either one **cancels your enrollment right away**.

When that happens you get a text letting you know automatic payments have been paused, and telling you to get in touch with them if you have questions. The **Enable** button no longer appears on your contract page.

Your payments are still due on schedule. Until automatic payments are available again, pay manually in Lendiom Pay or however the company asks.

![A loan at phone width after the company disabled automatic payments, the header offering only Make a Payment with no enable-auto-draft button](/img/docs/pay/guides/automatic-payments/06.png)

## If something looks wrong

- The date in the green panel is the next scheduled draw. If it is not what you expect, tap **Edit** (loan) or stop and set it up again (rental).
- On a rental, a charge smaller than your maximum is normal — the amount is based on what you owed that day.
- On a loan close to payoff, Lendiom Pay lowers the last draft to what is actually left. If the remaining balance cannot be covered that way, automatic payments stop and the final payment has to be made another way.
- For anything about your balance, due dates, or late fees, contact the company you buy or rent from.
