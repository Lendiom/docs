---
id: pay-linking-a-bank-account
title: Linking a Bank Account
---

Lendiom Pay can take payments straight from a checking or savings account. You type the account details in
yourself — there is no step where you sign in to your bank through another app, and no bank login is ever
asked for. This page covers what you need on hand, how the portal checks what you type, what happens once
the account is saved, and what the error messages mean.

## What You Need

Have a paper check or a bank statement nearby. Everything comes off the bottom row of a check.

| What | Where to find it | What the portal accepts |
| --- | --- | --- |
| Account type | Your bank paperwork | **Personal Checking**, **Personal Savings**, **Business Checking**, or **Business Savings** |
| Account holder first and last name | The name the account is held under | At least two characters in each box (personal accounts only) |
| Company name | The business name on the account | At least two characters (business accounts only) |
| Routing number | The leftmost group of nine digits along the bottom of a check | Exactly nine digits |
| Account number | The group next to the routing number | Three to seventeen digits |

:::caution Digits only

Type the routing and account numbers as plain digits. Spaces are stripped out for you, but dashes and other
characters are kept exactly as you type them and are sent on to your bank as part of the number.

:::

## Before You Can Add One

Two things have to be in place first, and neither is something you can switch on from the portal.

| What is needed | Why | If it is missing |
| --- | --- | --- |
| An email address and a mailing address on your account | The first payment method you add registers you with the payment processor, and it uses both | The portal shows **Account Not Setup**: "Adding payment methods requires an email address and a physical mailing address." Add them under **Account**, or ask the company you pay to. See [Updating Information](./updating-information.md). |
| Bank payments enabled by the company you pay | Taking money from a bank account is a separate service the company turns on with the processor. Cards can be available while bank accounts are not | The **Link Bank** button will not be on the page, even though **New Card** is. Ask the company you pay whether they accept bank payments. |

:::info About email verification

Lendiom Pay may prompt you to verify your email address. That prompt is worth following, but adding a bank
account does not wait on it. What matters here is that an email address and a mailing address are recorded
on your account.

:::

Address changes you request are reviewed by the company you pay before they take effect, so leave a few
business days if you have to add one first.

![The Payment Methods page in Lendiom Pay at phone width, with no methods saved yet](/img/docs/pay/guides/linking-a-bank-account/01.png)

## Adding the Account

1. Open the menu (☰) and tap **Payment Methods**, or go straight to https://pay.lendiom.com/payment-methods.
2. Tap **Link Bank** at the top of the page. The form opens over the page.
3. Pick your **Account Type**. This choice changes the next boxes: the two personal types ask for
   **Account Holder First Name** and **Account Holder Last Name**, and the two business types replace both
   with a single **Company Name**.
4. Enter the **Routing Number**, then the **Account Number**.
5. Tap **Save**.

**Save** stays greyed out until every box holds something the portal will accept. If it will not light up,
one of the numbers is the wrong length or a name box is under two characters. Grey does not mean something
went wrong — it means the form is still waiting on a field.

<!-- screenshot: the Link Bank form at phone width with Account Type set to "Personal Checking", the Account Holder First Name and Last Name boxes side by side, and the Routing Number and Account Number boxes below, each with its grey helper text -->

<!-- screenshot: the Link Bank form at phone width with Account Type set to "Business Checking", showing the single Company Name box in place of the two name boxes -->

## Authorizing It

Tapping **Save** brings up a confirmation titled **Authorize Bank Account**. It explains that you are
authorizing Lendiom Pay, through its payment processor, to store the account for future use so payments can
be drafted from it. Tap **Authorize** to save the account, or **Cancel** to back out.

Nothing is stored anywhere until you tap **Authorize**.

<!-- screenshot: the "Authorize Bank Account" confirmation dialog at phone width, with its explanatory paragraph and the Authorize and Cancel buttons -->

## How the Routing Number Is Checked

The routing number goes through up to two checks before anything is saved.

1. **Length.** It has to be exactly nine digits. The box will not take a tenth character, and a shorter
   entry is turned down with "routing number must be 9 digits long." This check always runs.
2. **A real bank.** When the routing-number lookup is switched on for Lendiom Pay, the nine digits are
   looked up against the published directory of US bank routing numbers. If nothing matches, you get
   "invalid routing number provided" and the account is not saved. The lookup is a setting on the Lendiom
   Pay side, not something you or the company you pay turns on; when it is off, the nine digits are saved
   as you typed them and nothing is checked against the directory.

When the lookup runs and succeeds, the bank's name comes back with it. That is the name shown beside your
saved account — you never type it. When the lookup is off, the saved account is simply labelled
**Bank Account**.

:::caution The account number is not checked the same way

Only the routing number is ever verified. Nothing confirms that the account number belongs to a real account
before your first payment, and there are no micro-deposits to confirm. A mistyped digit usually surfaces
days later as a returned payment, which switches that method off on your account. Read both numbers back
before you tap **Authorize**.

:::

## After You Add It

A green **Bank successfully added!** message appears and the page refreshes itself after a couple of
seconds. Give it that moment before assuming nothing happened.

Your new entry shows the bank's name, the last four digits of the account, and a status of **New**. That
status is normal for a freshly linked account and does not mean anything is pending on your side.

Three things follow automatically:

- **If it is your first payment method, it becomes your default.** The default is what payment screens
  select for you.
- **You can pay with it right away.** It appears in the **Payment Method** list on any loan, rental, or
  invoice payment page. See [Making a Payment](./making-a-payment.md).
- **The company you pay sees it.** A note is added to your account on their side saying a payment method was
  added. They never see your full account number.

Bank payments take longer to settle than card payments, so a payment from this account will sit at
**Pending** for longer. That is expected, and it is covered in [Making a Payment](./making-a-payment.md).
You can also point automatic payments at it — see [Setting Up Automatic Payments](./automatic-payments.md).

![The Payment Methods page in Lendiom Pay showing the saved bank account for the borrower](/img/docs/pay/guides/linking-a-bank-account/05.png)

## Errors You Might Hit

Messages appear as a red banner and usually end with a number in parentheses. The words are the reason; the
number helps whoever you contact find the same failure.

| What you see | What it means | What to do |
| --- | --- | --- |
| routing number must be 9 digits long (38482) | Fewer or more than nine digits reached the server. | Re-enter the leftmost nine digits from the bottom of a check, digits only. |
| invalid routing number provided (57291) | The nine digits do not match any US bank. | Check for transposed digits. Confirm the number with your bank if it keeps failing. |
| company name is too long or too short (934) | The company name is under two characters. The box stops you at 45, so the "too long" half of the message cannot come from the form. | Enter the business name as your bank has it. |
| first name is too long or too short (934), last name is too long or too short (934) | A name box is under two characters. The name boxes also stop at 45 characters, so "too long" cannot come from the form. | Enter the name the account is held under. Single-letter names need a second character, such as an initial with a period. |
| account number is too long or too short (934) | Fewer than three or more than seventeen digits. | Re-enter the account number, digits only. |
| primary person on the account must have an address; no address on file (9381) | No mailing address is recorded. | Add one under **Account**, or ask the company you pay to, then try again. |
| entity must have an email address (999), entity must have at least one address (999) | One of the two is missing, caught while you are being registered with the processor. | Add the missing one under **Account**, then try again. |
| invalid integration, processor setup not completed (5555) | The company you pay has not finished setting up payment processing. | Nothing to fix on your side. Contact the company you pay. |
| Failed to add the bank account, the account type is invalid. Please check the account details and try again. (104) | The account type did not come through. | Close the form, reopen it, pick the account type again. |

More messages, including the ones you can hit while paying, are listed in
[Error Messages in Lendiom Pay](./error-messages.md).

<!-- screenshot: the Link Bank form at phone width with a red error banner across the bottom of the screen reading "invalid routing number provided (57291)" -->

## Changing or Removing It

On the **Payment Methods** page, each entry has **Set Default** and **Remove**. Both ask you to confirm.

**Remove** is greyed out on your default method and on your only method, so add the replacement first, make
it the default, then remove the old one. There is no edit — to correct an account number, remove the
account and link it again.

:::warning Keep your numbers to yourself

Enter your routing and account numbers only in Lendiom Pay itself. Never send them by text or email, to the
company you pay or to anyone claiming to be from Lendiom. Nobody on either side needs them from you.

:::
