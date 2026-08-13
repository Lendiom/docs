---
id: subscription-payment-method
title: Managing the Payment Method That Pays Lendiom
---

This page is about the card or bank account that **Lendiom charges you** for your subscription, add-ons, and usage charges. It is stored on your organization, it lives in Stripe, and it is the only payment method involved when a Lendiom invoice comes due.

:::caution This is not how you collect from your buyers

Lendiom has two completely separate payment systems, and they never touch each other.

| | Money out (this page) | Money in (PayArc) |
| --- | --- | --- |
| Who pays whom | You pay Lendiom | Your buyers and tenants pay you |
| Where the methods live | **Org Settings → Billing → Payment Methods** | On each client record, and in the client's own [Lendiom Pay](../../pay/guides/adding-a-payment-method.md) account |
| What it covers | Subscription, [add-ons](./add-ons.md), snail mail, texts | Loan payments, rent, invoices |
| Processor | Stripe | [PayArc](../payment-processing/payarc.md) |
| Setup guide | This page | [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md) |

Removing your organization's billing card does nothing to your buyers' saved cards, and finishing PayArc onboarding does nothing for your Lendiom invoice. If a support conversation mixes them up, the fastest way to tell them apart is the direction the money moves.

:::

## Who can manage it

Every billing endpoint requires the **all** action on the `billing` feature, not read or update. In practice that means the `admin` role — see [Roles and Permissions](../security/roles-and-permissions.md) for why the role matrix cannot grant this on its own. Someone with `billing read` can open the Billing tab and then watch the data behind it fail to load.

Your methods sit in the **Payment Methods** section of **Org Settings → Billing**, above the Addons card, with an **Add Payment Method** button in the section header.

<!-- screenshot: Org Settings → Billing with the Payment Methods section on the right, the "Add Payment Method" button in its header, and a table listing a Visa row tagged Default and a bank row tagged Pending Verification, with columns Name, Details, Expiration, and Action -->

## Adding a card

1. Click **Add Payment Method** and leave the toggle on **Card**.
2. Enter the **Name on Card** and the card number, expiration, and CVC.
3. Click **Add**.

Lendiom sends the card straight to Stripe from your browser — the card number never reaches Lendiom's servers. Your organization's billing address is attached to the card automatically, so keep that address current in the same Billing tab.

<!-- screenshot: The "Add Payment Method" modal on the Card option, showing the Card / Bank Account (ACH) toggle, the "Name on Card" field, the Stripe card number field, and Cancel and Add buttons -->

## Adding a bank account

1. Click **Add Payment Method** and switch the toggle to **Bank Account (ACH)**.
2. Enter the **Account Holder Name** and click **Continue**. A secure Stripe window opens.
3. Connect the account. Most banks verify instantly when you sign in through that window. If yours does not, enter your routing and account numbers instead — that path finishes with micro-deposits.
4. Confirm the account shown, read the ACH authorization, and click **Agree & Add**.

An instantly verified account is ready to use right away. An account that needs micro-deposits lands in your table tagged **Pending Verification**, and the modal tells you two small deposits are on the way.

<!-- screenshot: The "Add Payment Method" modal at the confirm stage, reading "You are adding the Demo Bank account ending in 6789 as a payment method" above the ACH authorization text, with the "Agree & Add" button -->

:::info Signing up is instant-verification only

During organization signup, the bank option only accepts accounts that verify instantly, so your trial can start with a method that is actually chargeable. Micro-deposit verification is available afterward, from the billing settings.

:::

### Verifying the micro-deposits

Two small deposits reach the account in **1 to 2 business days**. Lendiom emails you and posts an in-app notification when they are sent, and again once the account is verified.

When they arrive, open **Org Settings → Billing**, use the row's action menu, and choose **Verify Bank Account**. You will be asked for one of two things, depending on what your bank shows:

- A **6-character code** from the deposit description on your statement. The description starts with `SM`.
- The **two deposit amounts in cents**, if your bank shows amounts instead of a code.

<!-- screenshot: The "Verify Bank Account" modal explaining to look for a deposit description starting with "SM" on the Demo Bank account ending in 6789, with the 6-character Verification Code field and the Verify button -->

If verification fails or the deposits expire, Lendiom removes the pending account from your list entirely and notifies your organization. Add the account again, or use a card.

## Bank account statuses

| Status shown | What it means | What you can do |
| --- | --- | --- |
| **Pending Verification** | Micro-deposits were sent and no code or amounts have been entered yet | Verify it, or remove it. It cannot be charged and cannot be the default |
| No status tag | The account is verified and chargeable | Set it as default, or remove it once another usable method exists |

A bank account that connected instantly never passes through Pending Verification — Stripe hands it back already verified.

:::warning A pending bank is not a payment method yet

Until it is verified, it cannot be charged, so it does not satisfy any place Lendiom requires a payment method. If a pending bank is all you have and you try to start a subscription, you get `please set up a payment method first`. Trying to make it the default returns error `875`, `the bank account is still pending verification and cannot be the default yet`.

:::

## Setting the default

The default is the method Lendiom charges. Use the row's action menu and choose **Set as Default**. Lendiom sets it as the invoice default in Stripe as well, so the change applies to the next invoice rather than only to what you see in the app.

The first chargeable method you add becomes the default on its own. A pending bank does not, even when it is the only thing in the list.

## Removing a method

Use the row's action menu and choose **Remove**. Two rules apply:

- **You cannot remove your last usable method.** Doing so returns error `874`, `at least one payment method is required`. See [Error Messages](../how-it-works/error-messages.md) for the full code list.
- **You cannot remove the current default from the app.** The action is unavailable on the default row, and on the only row in the table.

Removing an unverified bank account is always allowed, even when it is the only row, because it could never be charged. Lendiom cancels its pending setup instead of detaching it.

## Replacing a card: add, set default, remove

There is no swap. Lendiom's add endpoint refuses to change an existing method and answers `changing payment method is not yet supported` — that endpoint only exists to attach the very first method during organization signup.

To move your billing to a new card or bank account, do it in this order:

1. **Add** the new method. If it is a bank account needing micro-deposits, verify it first.
2. **Set** the new method as the default.
3. **Remove** the old method.

Both guardrails push you into that order anyway: step 3 fails with `874` if you skip step 1, and the Remove action stays unavailable on the old row until step 2 makes something else the default.

<!-- screenshot: The action menu open on a payment method row showing Set as Default, Verify Bank Account, and Remove, with Remove greyed out on the row tagged Default -->

## When a Lendiom charge fails

A failed subscription charge moves your **subscription** to Past Due. Lendiom emails your organization, posts a notification, and disables content creation until the balance clears. Update your billing method and the subscription returns to Active on the next successful charge.

Your billing method itself is not flagged when this happens. The **Disabled** tag you may have seen on the identical-looking table on a client record belongs to the other system: when a buyer's saved card or bank account fails an online payment on a loan, rental, or invoice, Lendiom clears that method's default flag and marks it Disabled so it is not retried. Nothing on the subscription side does that to your own card.

Related reading: [Billing Cycles](./billing-cycles.md), [Add-Ons](./add-ons.md), and [Canceling a Lendiom Subscription](./canceling-a-subscription.md).
