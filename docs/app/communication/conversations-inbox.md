---
id: conversations-inbox
title: Using the Conversations Inbox
---

The Conversations inbox is where every text message and phone call between your organization and your clients lives. It is the **Conversations** tab of the Communications page, alongside **Jobs**. (The **Email History** tab is visible but not yet available.)

:::info
The inbox only works once your Communication Portal is set up: an approved brand, an approved campaign, and a purchased phone number. See [Communication Portal](../communication.md) for the registration steps, the 10DLC background, and pricing. Until setup is complete, the Communications page shows the registration wizard instead of the inbox.
:::

## What you need

| You want to | You need |
| --- | --- |
| Open the inbox, read history, download attachments | `communication` read |
| Send a message, attach a picture, place a call | `communication` create |
| Open the Jobs tab and send a mass text | `communication` create |
| Register the brand, campaign, or buy a number | Full `communication` access |

Roles are covered in [Roles and Permissions](../security/roles-and-permissions.md).

## The layout

The page header shows the Lendiom number you send from (click it to copy) and, underneath, where incoming calls are forwarded, with a link to change it in your organization settings.

Below that, the inbox is two panes:

- **The left rail** lists conversations, most recently active first, fifteen at a time as you scroll. Each row shows the person's initials, their name, the date of the last activity, and a preview of the last message, with your own messages prefixed `You:`. The search box matches on the recipient's name, and the rail collapses when you want more room for the thread.
- **The right pane** is the selected conversation: a header with the person's name and number, the message and call history, and the composer at the bottom.

Selecting a conversation marks it read and puts its id in the address bar, so you can bookmark a specific thread. New messages stream in live — you do not need to refresh.

![The Conversations inbox, with the thread list on the left and the selected conversation on the right](/img/docs/app/communication/conversations-inbox/01.png)

Two buttons sit in the conversation header: **Call**, and **View Client**, which opens the client record behind the conversation.

## Sending a text

Type in the composer and press the send button. To start a thread with someone who has never been messaged, use **New Message** in the page header: pick the client, pick the person, type the message, and send. If the client has exactly one person on file, Lendiom selects them for you.

A few things decide whether the composer is usable:

| Composer state | Why |
| --- | --- |
| Enabled | The person has a cellular number on file and has not opted out |
| Disabled, thread reads `No phone number provided!` | No number on the person's record |
| Disabled, thread reads `Only phone calls are possible...` | The number is a landline, not a mobile |
| Disabled, placeholder reads `This number has opted out...` | The number opted out of messages |
| Disabled | You do not have `communication` create permission |

Messages go to the **first** phone number on the person's record, so keep the mobile number listed first.

Each sent message carries a small status icon when something is worth knowing: an orange marker means the message is queued and will go out shortly, a red marker means it failed or came back undelivered. Provider-side failures such as an unregistered From number are listed in [Error Messages](../how-it-works/error-messages.md).

When a client texts you, Lendiom raises an in-app notification for everyone with `communication` read access. If the conversation is still unread five minutes later, Lendiom emails the members who have `communication` create access and have client notifications turned on, with the message text and a link straight to the thread.

## Attachments and picture messages

The paperclip in the composer attaches an image. Attaching one turns the message into an MMS, which is billed at the MMS rate.

- The picker accepts image files, one per message.
- The limit is **525 KB**. Anything larger is refused before it uploads.
- Attach the file, then type your message — a message body is required, an image on its own will not send.

Incoming picture messages appear as thumbnails in the thread. Click one to enlarge it, or use its download button to save the original. Lendiom stores up to four images from a single incoming message.

![The conversation composer with an image attached above the text box, its filename shown with a remove control, and a typed message ready to send](/img/docs/app/communication/conversations-inbox/02.png)

## Placing a call

Click **Call** in the conversation header. Lendiom asks for the phone number you want to be reached at, calls *you* first, and then bridges the client in, showing your Lendiom number as the caller ID. The client never sees your personal number.

Calls need the Communication Portal set up and a phone number on the person's record. Landlines are fine here — calling works where texting does not.

Completed and attempted calls appear inline in the thread as a chip showing direction and duration, colored by outcome: green for completed, blue while ringing or in progress, grey for busy, no answer, or canceled, and red for failed.

Incoming calls to your Lendiom number are answered with a short greeting naming your organization, then forwarded to the business number on your organization settings. At the same time, Lendiom texts that forwarding number to tell you who is calling, with a link to their client record.

![The Make an Outbound Call dialog, with its explanation above a masked callback number and the Call button in the footer](/img/docs/app/communication/conversations-inbox/04.png)

## Sending a mass text

**Send Mass Text** in the page header sends one SMS to a group. Pick a scope, write the message, and click **Queue Send**. Lendiom creates a job and works through it in the background.

| Scope | Who receives it |
| --- | --- |
| All Clients | Every client in the organization |
| Active Clients | Clients with a status of active |
| Prospective Clients | Clients with a status of prospect |
| Clients with Current Loans | Loans that are pending, current, or in the grace period |
| Clients with Late Loans | Loans that are late, in default, or defaulted |
| Clients Related to an Inventory | Owners or tenants tied to the inventory you select |

The limits worth knowing:

- **SMS only.** Email and letter jobs are not implemented; the method is fixed to SMS.
- **256 characters.** The compose box counts down as you type.
- **Everyone on the client.** The message goes to every person attached to a matching client, not only the primary contact.
- **Skips who it must.** People without a mobile number, with a landline, or who have opted out are skipped and counted as failures on the job.
- **Quiet hours apply.** Unlike a message you type into a thread, a mass text obeys the schedule below.

:::caution
The 256 characters are yours alone. Lendiom's built-in automated reminders carry their own `Reply STOP to opt out` line, but a mass text sends what you wrote — include opt-out wording so recipients always have it.
:::

Every job lands on the **Jobs** tab with its date, method, scope, status (draft, queued, processing, completed, failed), and running success and failure counts. Filter by method, scope, or status to find an older run.

![The Send Mass Text modal, with the audience Scope select above the message box](/img/docs/app/communication/conversations-inbox/03.png)

## Messages from numbers you do not know

When a text or a call arrives from a number that is not on any client record, Lendiom does not drop it. It creates a client for that number so the conversation has somewhere to live:

- The client's display name is the phone number itself, with a type of unidentified and a status of unknown.
- The person on it is named after the number with a last name of `Unknown`, and the number is saved as a mobile number.
- A conversation is opened, and the message appears in the inbox like any other.

These are the "Unknown" clients in your Clients list. Fill one in when the caller turns out to be a real prospect, or delete it to clear out a wrong number — deleting the client removes the conversation with it.

## Opt-outs, STOP, and START

Opt-out is handled by the mobile carriers, not by Lendiom. When someone replies **STOP** to your number, the carrier stops delivering your messages to them immediately, regardless of what Lendiom does next.

On your side: the next message you send comes back rejected as an unsubscribed recipient, Lendiom marks it **undelivered** and flags the number as opted out, the composer for that conversation locks, and automated reminders skip the number from then on.

Overnight, Lendiom also reconciles opt-in status for every number with the messaging provider, so an opt-out that happened outside a send still shows up. When a number flips, everyone with communication access gets a notification — `<name> has opted out`, or `<name> has opted back in`.

When someone texts **START**, they are re-subscribed. Lendiom also turns automated communication back on for that client's loans and rentals and adds SMS back to their communication preferences, so payment reminders resume without you touching each loan.

:::warning
You cannot opt someone back in on their behalf. The message has to come from their phone. If a client says they are not getting texts, check whether their number shows as opted out, then ask them to text `START` to your Lendiom number.
:::

![A conversation whose number has opted out, its composer greyed out with an opted-out placeholder above a notice saying the contact must text START to start receiving messages again](/img/docs/app/communication/conversations-inbox/05.png)

## Quiet hours and the overnight queue

Lendiom holds machine-generated messages overnight so your clients are not woken up.

| Message | When it goes out |
| --- | --- |
| A message you type into a conversation or the New Message window | Immediately, any hour |
| A mass text | Immediately if queued between 8:00 a.m. and 9:59 p.m. Central; otherwise held |
| Automated reminders (due today, late, upcoming, property tax) | Same window; otherwise held |
| Login and verification codes | Immediately, any hour |

Anything held is released the next morning at **8:00 a.m. Central**, and sits in the thread with the orange queued marker until then. A mass text queued at 11 p.m. shows as queued overnight and delivers in the morning.

:::tip
Quiet hours run on Central time, not on your organization's timezone. Queue a mass text whenever it suits you and let the 8:00 a.m. Central release handle the timing.
:::
