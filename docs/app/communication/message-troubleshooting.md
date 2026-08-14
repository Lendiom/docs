---
id: message-troubleshooting
title: Why Your Borrower Is Not Getting Texts or Emails
---

Most missing messages are not failures. Lendiom checks a short list of conditions before it sends, and when one is not met it stops — no error, no red banner, nothing on your screen. Nothing was attempted, so there is nothing to retry.

Work top to bottom. Each section narrows the problem: the whole organization, one loan or rental, one person, or the clock. For what *should* have gone out and when, see [Automated Borrower Messages](./automated-messages.md).

## Start here: does the message exist?

Open the client's conversation on the **Communications** page and look for the message you expected. Texts Lendiom sends on your behalf appear there alongside the ones you type by hand. Two-factor codes do not — those are hidden by design.

| What you see | What it means | Where to go |
| --- | --- | --- |
| Nothing at all | Lendiom stopped before it created a record | The three sections below |
| An hours-old orange *Message is queued and will be sent shortly* icon | The message was handed to the carrier and the carrier refused it | [Nobody is getting texts](#nobody-in-your-organization-is-getting-texts) |
| A red *Message failed to send* icon | The carrier rejected the recipient, usually an opt-out | [One person is not getting anything](#one-person-is-not-getting-anything) |
| The message is there, but it arrived at 8:00 AM | It was held overnight | [It arrived, only late](#it-arrived-only-late) |

![The Communications page with a client conversation open, showing each message bubble and its delivery status](/img/docs/app/communication/message-troubleshooting/01.png)

:::info
Emails have no equivalent view — the **Email History** tab is not available yet, so a missing email leaves no trace in the app. Diagnose those from the entity record instead.
:::

## Nobody in your organization is getting texts

If only one client is affected, skip ahead. If everyone is, start here.

| Check | How to tell | Fix |
| --- | --- | --- |
| The Communication Portal is not set up | The **Communications** page shows the registration steps, and no phone number appears under the page title | Finish [brand registration, campaign registration, and number purchase](../communication.md) |
| Your brand is still pending or unverified | The wizard sits on the brand step | Wait for approval, or contact support if it came back unverified |
| Your campaign is still pending | The wizard reaches the number step but will not let you buy a number | Campaign approval gates the number purchase, and can take weeks |
| Your number is not text-capable (carrier error 21606) | Messages are created but stay stuck on *queued* | Contact support |
| You hit the carrier's volume limit | Same symptom: messages pile up on *queued* | Contact support |

The last three look identical from the app. Lendiom hands the message over, the carrier refuses it, and because that refusal is a configuration problem rather than a temporary one, the message is dropped rather than retried forever. The record stays in the conversation on *queued*.

:::caution
Email does **not** depend on the Communication Portal. Clients receiving emails but no texts is the signature of a portal problem — check it first.
:::

<!-- screenshot: The Communications registration wizard on the campaign step, with the campaign status showing as pending and the number selection step not yet reachable. -->

## One loan or rental is not sending

Every automated message is gated on the loan or rental it belongs to.

| Check | Where | What happens when it is wrong |
| --- | --- | --- |
| **Automated Communication** is switched off | **Actions → Communication Preferences** on the loan or rental | Nothing automated goes out for it, on any channel |
| **Communication Preferences** is missing the channel | The same modal — a multi-select of SMS and Email | One copy sends per selected channel. With neither selected, nothing sends. Snail Mail is not selectable |
| The loan's [status](../how-it-works/loan-status.md) excludes it | The loan header | Daily reminder jobs skip loans that are draft, inactive, repossessed, canceled, refinanced, or paid off |
| The rental's status excludes it | The rental header | Daily jobs skip rentals that are draft, evicted, or terminated |
| A payment posted on a draft | Recording a transaction on a draft | Payment confirmations are suppressed while the loan or rental is a draft |
| A rental late reminder | The rental is not marked late | That reminder only runs for rentals whose status is *Late* |

![The Change Communication Preferences modal on a loan, with the automated communication switch](/img/docs/app/communication/message-troubleshooting/02.png)

## One person is not getting anything

Both channels are checked per entity, and both fail silently during automated sends.

### Text messages

Lendiom uses the entity's **first** phone number only. Three conditions must hold on it.

| Condition | How it appears in the app | Fix |
| --- | --- | --- |
| A phone number exists | The entity list shows *No phone numbers* | Add one on the entity |
| It is a cellular number | No mobile icon beside the number. The conversation reads *Only phone calls are possible as this number is not a cellular phone* and the message box is disabled | Correct the **Is Cellular** switch on the entity, or get a mobile number |
| It has not opted out | The number is struck through and the conversation reads *The phone has opted out of text messages* | Only the client can undo it — they must text **START** to your number |

A number that is not dialable at all — a bad area code, a typo — behaves like the carrier-refused cases above: created, handed over, refused, left showing *queued*.

Lendiom re-checks the last two overnight. One job validates new numbers against the carrier and writes an auto-generated note on the client saying whether the number is valid and whether it is cellular. Another re-checks opt-in status, raises an in-app notification when someone opts out, and — when someone texts START — flips the number back and re-enables automated communication with SMS on all of that client's loans.

<!-- screenshot: A client's entity list showing one entity whose phone number is struck through with the opted-out tooltip visible, and another entity whose number carries the blue mobile icon. -->

### Emails

An email is skipped unless the address is present, verified, and not blocked.

| Condition | How it appears | Fix |
| --- | --- | --- |
| An address exists | Blank Email column on the entity | Add one on the entity |
| It is verified | No green check beside the address | The client verifies it from Lendiom Pay — see [Updating Information](../../pay/guides/updating-information.md) |
| It is not blocked | A red icon beside the address | A bounce or spam complaint sets this. Confirm the address, then contact support |

:::warning
Changing a client's email — including approving their change request — resets it to unverified. Automated emails stop until the new address is verified.
:::

:::info
By default only the client's **primary** entity receives automated messages. Switch **Send Automated Messages To** to *All Entities* under **Communications → Client Preferences** to reach co-buyers and co-signers as well.
:::

## It arrived, only late

Lendiom holds outbound messages generated between 10:00 PM and 8:00 AM Central. The overnight text queue is released at 8:00 AM and the email queue at 8:05 AM, both Central.

That is why a reminder decided by a 2:30 AM job does not land until morning, and why unrelated messages can reach the same client seconds apart just after 8:00 AM. Messages you send by hand, and two-factor codes, are never held.

## The address confirmation reminder

This one has its own conditions on top of everything above.

| Check | Result |
| --- | --- |
| **Remind Buyers To Confirm Their Mailing Address** is *Off* | No reminders at all. Set it to every 6 or 12 months under **Communications → Client Preferences** |
| The buyer has no address on file | Skipped — the reminder shows the address on record for the buyer to confirm, and there is nothing to show |
| The loan has no closing date | Skipped — the cadence is measured from that date |
| A reminder already covered this milestone | Skipped. A manual send in the month before a milestone counts too |

The scheduled reminder honors each loan's Automated Communication setting. The manual **Send Address Reminder** action on the client does not: it ignores the cadence and that setting, tries email and text, and succeeds if either lands. It refuses only when the buyer has no address on file, or has neither a deliverable email nor a cellular number.

The reminder carries a short link to the buyer's address page in Lendiom Pay. If that short link cannot be created, Lendiom falls back to the full Lendiom Pay address URL — longer, but it opens the same page.

![The Lendiom Pay actions menu on a client, including the address reminder option](/img/docs/app/communication/message-troubleshooting/04.png)

## Still stuck

If the client and the loan pass every check above, send support the client name, the loan label, the date, and the channel. Include any error code Lendiom showed you while sending by hand — see [Error Messages in Lendiom](../how-it-works/error-messages.md).
