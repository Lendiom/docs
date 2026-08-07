---
id: paying-by-bank-account
title: Paying Your Subscription by Bank Account (ACH)
---

Your Lendiom subscription can be paid with a bank account (ACH) instead of a card. This guide walks through connecting a bank account, verifying it, and making it your default payment method.

## Adding a Bank Account

Head to your organization's settings and open the **Billing** tab. On the right side you will see your payment methods:

![Billing tab with the payment methods list](/img/docs/app/guides/paying-by-bank-account/billing-payment-methods.png)

Click **Add Payment Method**, then choose **Bank Account (ACH)** at the top of the window:

![Add Payment Method window with Bank Account selected](/img/docs/app/guides/paying-by-bank-account/add-bank-modal.png)

Enter the full name of the account holder and click **Continue**. A secure Stripe window opens where you select your bank:

![Stripe's secure bank connection window](/img/docs/app/guides/paying-by-bank-account/stripe-bank-window.png)

:::note Your credentials stay with Stripe

Connecting your bank happens entirely inside Stripe's window. Your online banking sign-in and account details never touch Lendiom's servers.

:::

Most banks support **instant verification**: sign in to your bank inside the Stripe window, pick the account you want to use, and you are done in under a minute.

After the account is connected, you will be asked to authorize Lendiom to debit it for your subscription charges. Review the authorization and click **Agree & Add**:

![The bank debit authorization](/img/docs/app/guides/paying-by-bank-account/authorize-debits.png)

That's it — the bank account now appears in your payment methods.

## If Your Bank Needs Micro-Deposit Verification

If your bank doesn't support instant verification, you can enter your routing and account numbers manually in the Stripe window. Stripe then sends a small deposit to your account, which usually arrives within **1-2 business days**. Until it is verified, the account shows a **Pending Verification** tag and cannot be used for payments yet:

![A bank account pending verification](/img/docs/app/guides/paying-by-bank-account/pending-verification.png)

Once the deposit shows up on your bank statement, look for the 6-character code in its description (it starts with **SM**). Back in the Billing tab, open the **Actions** menu next to the bank account, choose **Verify Bank Account**, and enter the code:

![The verify bank account window](/img/docs/app/guides/paying-by-bank-account/verify-bank-modal.png)

Click **Verify** and the account is ready to use.

## Making the Bank Account Your Default

New payment methods do not automatically become your default. To pay your subscription from the bank account, open the **Actions** menu next to it and choose **Set as Default**. Future subscription invoices will be drafted from the bank account.

:::note Bank payments take a few days to settle

Unlike cards, ACH payments settle over a few business days. While a payment is settling, the invoice shows a **Processing** tag — no action is needed, and you will receive the usual receipt email once it completes.

:::

## Removing a Bank Account

To remove a bank account, open the **Actions** menu next to it and choose **Remove**. You will always need at least one usable payment method on file, so add a replacement first if the bank account is your only one.
