---
id: what-to-send-your-buyer
title: What to Send Your Buyer at Closing
---

The paperwork is signed and the loan is live. What the buyer leaves with decides how the next several years of payments go: whether they can sign in on their own, whether the reminders reach them in a language they read, and whether they call you every month asking for a receipt.

This guide is the handoff — the [Lendiom Pay](../../pay/what-is-pay.md) invitation and the two ways to send it, the printable handout, the texts that start arriving on their own, the language setting, and what to say about receipts.

## Get the client record right first

Every item below fails quietly when the client record is thin. The **Lendiom Pay** menu on the client page stays disabled until the primary entity has a cell phone number, an email address, and a mailing address; the tooltip names whatever is missing, and the same list appears as an "Action Needed to Access Lendiom Pay" warning on the page.

| What | Where you set it | Why it matters at closing |
| --- | --- | --- |
| Cell phone on the primary entity | The entity record | Sign-in codes are texted. The code goes to the entity's **first** phone number, and only when that number is marked as a cell phone. A landline sitting in the first slot stops sign-in cold. |
| Email address | The entity record | Required before the Lendiom Pay menu unlocks, and it carries the emailed half of the automated reminders |
| Mailing address | The entity record | Required before the menu unlocks, and it is what physical [letters](./sending-a-letter.md) are sent to |
| Language | **Actions → Edit** on the client | Decides the language of every automated text |
| Loan out of Draft | The loan's Action Center | Draft loans are invisible in Lendiom Pay and send nothing. See [Loan Status](../how-it-works/loan-status.md). |
| Online payments on the loan | **Actions → Online Payments** on the loan | Without it the buyer can sign in and see the loan but cannot pay. See [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md). |

<!-- screenshot: The client page header showing the Account Number, Language, Welcomed At, Portal Last Activity, Code Requested At, and Code Redeemed At fields in the description block. -->

## Set the language before you invite

The client record carries a language — English or Spanish — and it is chosen when the client is created and changed under **Actions → Edit**. The field's own help text says it plainly: it decides which language Lendiom uses for automated communication with that client.

Setting it to Spanish switches every templated text to Spanish, including the Lendiom Pay invitation itself, the six-digit sign-in code text, the account-number recovery text, and the payment reminders. Automated emails are English regardless, so for a Spanish-speaking buyer, text is the channel that carries their language.

:::caution Set it before you activate the loan
The invitation text goes out automatically the moment the loan leaves Draft, and it is sent once per client. A client created in English and switched to Spanish afterward has already received an English invitation. Fix the language first, then activate.
:::

## The invitation, and the two ways to send it

Activating a draft loan sends the invitation on its own when your [Communication Portal](../communication.md) setup is complete and that client has never been welcomed. It fires once per client, not once per loan, and the client page stamps **Welcomed At** when it goes.

To send it yourself — or send it again — open the client page and use the **Lendiom Pay** dropdown.

| Option | What it does | What it needs |
| --- | --- | --- |
| **Send Info** | Texts the buyer their account number and a sign-in link | The Communication Portal set up. Without it you get a "Communication Portal Required" error and nothing is sent. |
| **Lendiom Pay Graphic** | Downloads a printable one-page PDF handout | Nothing beyond the contact details above. Works with no Communication Portal at all. |

The full walkthrough is in [Inviting a Client to Lendiom Pay](./inviting-a-client-to-lendiom-pay.md).

<!-- screenshot: The client page with the Lendiom Pay dropdown open, showing Send Info, Send Address Reminder, Login As, and Lendiom Pay Graphic. -->

The text the buyer receives reads like this:

> Hi Jane Doe, Demo Land Company invites you to use Lendiom Pay. With Lendiom Pay you can view your history and make online payments.
>
> Your account number is: 3fK9wTz
>
> You can visit Lendiom Pay: https://go.lendiom.com/d/IdJMThzrVg

:::info The link signs them in directly
That short link carries a sign-in token, so tapping it drops the buyer straight into the portal with no code to enter. The token is good for a little over a day. After that they sign in the normal way, with the account number and a texted code — which is exactly why the account number is printed in the same message.
:::

## The printable handout

**Lendiom Pay Graphic** produces a single US Letter page built for a closing folder. It carries the buyer's name and their account number in the top-right corner, the account number again in a highlighted box, and seven numbered steps: go to lendiom.com, click **Go to Lendiom Pay**, enter the account number, enter the authorization code that arrives by text, add a card or bank account under **Payment Methods**, open the loan, and click **Make a Payment**. A footer note tells them automatic payments can be set up after the first payment.

The download link Lendiom opens is valid for about a minute, so the PDF lands in your **Downloads** folder immediately — send the file itself, not that link. A copy is also filed under the client's Files.

The handout is English only. For a Spanish-speaking buyer, hand over the page for the account number and the step order, and lean on **Send Info** for the words — that text follows the client's language.

<!-- screenshot: The generated Lendiom Pay Graphic PDF, with the buyer's name and account number printed in the top-right corner and the account number repeated in the highlighted box. -->

## What the buyer will receive, and roughly when

Tell them what is coming so the first automated text is not a surprise.

| Text | When it arrives |
| --- | --- |
| Lendiom Pay invitation | The moment the loan goes from Draft to active, or when you pick **Send Info**. Not held overnight. |
| Sign-in code | Every time they tap **Get Code**. Six digits, expires in five minutes. |
| Account number recovery | When they use **I forgot my account number** on the sign-in screen |
| Upcoming payment | Seven days before the due date, in the 9:00 AM Central run |
| Payment due today | The morning of the due date, at 8:00 AM Central |
| Payment late | The morning after the first late fee grace period passes, at 8:30 AM Central |
| Payment pending, successful, or failed | Within moments of the payment being recorded |
| Auto draft set up or stopped | Immediately, when they enroll or turn it off in the portal |
| Confirm your mailing address | At 6- or 12-month milestones from closing, if you have picked that cadence |

Automated reminders end with "Reply STOP to opt out from future messages" — worth mentioning at closing, because a buyer who replies STOP stops receiving reminders and you will not get an error telling you so.

Messages generated between 10:00 PM and 8:00 AM Central are held and released the next morning. The full catalog, with the trigger and channel for each message, is in [Automated Borrower Messages](../communication/automated-messages.md), and the timetable behind it is in [When Things Run](../how-it-works/when-things-run.md).

## What to tell them about receipts

This is the question that comes back most often, so answer it at closing rather than by phone later.

:::info Lendiom Pay does not issue receipts
The portal produces no receipt or confirmation PDF for a loan or rental payment. The buyer's record is the entry in their payment history, which shows the date, the amount, the total charged, how the money was split, and the status. The one file they can download themselves is an invoice PDF. See [Making a Payment](../../pay/guides/making-a-payment.md).
:::

The written record comes from you. When a regular payment is applied to a scheduled payment, Lendiom builds a **Successful Payment Letter** in the background and files it on the loan under **Files → Letters** as `Successful Transaction - <date>.pdf`. On the loan's transaction row, the action menu offers **Download Success Letter**, plus **Generate Letter** or **Regenerate Letter** when the letter is missing or the numbers changed after a correction.

It lays out the payment period, the amount and how it split across principal, interest, fees, and escrow, the original loan amount and rate, principal and interest paid to date, the remaining principal, unpaid interest, remaining fees, and the next payment due. Email it, or mail it with [Sending a Physical Letter](./sending-a-letter.md).

<!-- screenshot: A loan's transactions table with a regular payment row's action menu open, showing Download Success Letter and Regenerate Letter. -->

## The closing packet

- The **Lendiom Pay Graphic** handout, printed, with the account number on it
- Confirmation that the invitation text went out — check **Welcomed At** on the client page
- A sentence about receipts: the portal keeps their history, you send the letter on request
- Where to point them for the rest: [How do I log into Lendiom Pay?](../../pay/logging-in.md), [Your Lendiom Pay Home Screen](../../pay/home-screen.md), [Adding a Payment Method](../../pay/guides/adding-a-payment-method.md), [Setting Up Automatic Payments](../../pay/guides/automatic-payments.md), and [I Cannot Sign In](../../pay/guides/cannot-sign-in.md)

Two more worth saying out loud. A buyer can correct their own name, email, phone, or mailing address from the portal, and the change waits for your approval — their side is [Updating Information](../../pay/guides/updating-information.md), yours is [Client Change Requests](./client-change-requests.md). And only the buyer can enroll in automatic payments; your part is the switch on the loan, covered in [Automatic Payments](../how-it-works/automatic-payments.md).
