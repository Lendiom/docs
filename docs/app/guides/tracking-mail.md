---
id: tracking-mail
title: Tracking Mail You Have Sent
---

[Sending a Physical Letter](./sending-a-letter.md) ends the moment you click **Send**. This guide picks up from there: where the letter lands, how its status moves as the carrier scans it, what the per-event tracking history holds, the narrow window in which you can still pull a letter back, and how to get the PDF that was actually printed.

## Where sent mail shows up

Every letter goes through the same pipeline — the ones you upload by hand, the ones generated from a document template, and the ones document automation sends on its own — so all three end up in the same records.

| Where | What it shows | Row actions |
| --- | --- | --- |
| Dashboard → Overview → **Recent Mail Sent** | Every letter your organization has sent, newest first, five per page, paged against the server | Download PDF, View Details, Cancel Mail, View Tracking |
| Client page → **Letters** tab | Only that client's letters, newest first, with a **Send Letter** button in the corner | View Details, View Tracking |
| Document Automation history, and the automation history on a loan or rental | Letters your templates sent automatically, alongside skips and failures | **Download** on rows that reached Sent |

The dashboard card requires `client::entities` Read — see [Understanding Your Dashboard](../how-it-works/dashboard.md) and [Roles and Permissions](../security/roles-and-permissions.md). Automation history is part of the Document Builder add-on ([Add-ons](../billing/add-ons.md)).

<!-- screenshot: The Recent Mail Sent card on the dashboard Overview tab, five rows showing Client, Entity, Description, Status, Sent, and Expected Delivery, with one row's action menu open on Download PDF, View Details, Cancel Mail, and View Tracking -->

## The two dates in the list

**Sent** is the send date the print partner assigned when it accepted the letter, not the moment it reached a mailbox. **Expected Delivery** is the carrier's estimate. It is recorded when the letter is created and re-read on every tracking update afterward, so it can shift while the letter is in transit.

Both render as `MM/DD/YYYY`, with no time of day. A dash means the value has not arrived yet.

:::info An estimate, not a promise
Expected Delivery is what the carrier currently thinks. Judge a letter by its most recent tracking event, not by whether that date has passed.
:::

## Delivery statuses

The Status column reflects the most recent tracking event Lendiom has received. Each update replaces the stored event list in full and re-derives the status from the newest event, so the tag always matches the last thing the carrier reported.

| Status | What it means |
| --- | --- |
| Created | Recorded in Lendiom and accepted by the print partner. Nothing has printed or shipped yet |
| Mailed | Handed off into the mail stream |
| In Transit | Moving between facilities |
| In Local Area | At a facility near the recipient |
| Processed For Delivery | Out for delivery, or staged for it |
| Pickup Available | Waiting at the post office for the recipient to collect |
| Delivered | Delivered |
| Re-Routed | Redirected, typically by a forwarding order or a bad address |
| Return To Sender | Coming back to the return address on the envelope |
| Issue | The carrier reported a problem with the piece |
| Failed | The send did not complete. **Download PDF** stays greyed out on these rows. No carrier tracking event produces this status — it is defined in Lendiom but nothing currently sets it |
| Deleted | Cancelled, and the print partner confirmed the cancellation |
| Unknown | An event arrived that Lendiom has no name for. The event itself is still kept in the tracking history |

## Reading the tracking history

**View Details** opens the mail record: description, class, extra service, color, double-sided, page count, cost, sent date, expected delivery, the client and entity addressed, and the full recipient address.

Underneath, when tracking events exist, is one row per event with the **Date**, the **Location** the carrier reported, and the **Status** that event produced. The list is not paginated and scrolls sideways on narrow screens. Dates here also show no time of day, and Location is blank when the carrier did not report one.

The details view deliberately stays about the piece itself — the tracking number and the current status are not repeated inside it. Read the status from the list row and use **View Tracking** for the number.

<!-- screenshot: The View Mail Details modal for a delivered first-class letter, showing the description grid on top and the tracking event table beneath it with Date, Location, and Status columns across several rows ending in Delivered -->

## Certified and registered letters

Letters sent with an extra service get richer tracking. Alongside the status, each event can carry the carrier's own event name, a description, free-text notes, and a flag marking whether the event needs someone to act — a notice left, a signature still owed, a piece held for pickup.

For these letters only, the details table gains a **Certified Notes** column. That text is where the carrier's account of the event lives, and it is the part worth reading when a certified letter stalls short of Delivered.

<!-- screenshot: The View Mail Details modal for a certified letter, Extra Services reading "certified return receipt", and the tracking table showing the extra Certified Notes column populated on a Pickup Available row -->

:::caution Nothing tells you when action is needed
Lendiom records the action-required flag but does not surface it as a badge, and no notification goes out. A certified letter can sit at Pickup Available for weeks without a word. If certified delivery matters to a case you are building, check the record yourself rather than waiting to be told.
:::

Certified and registered letters are always printed with the address on the first page, even when **Insert Blank Page** was chosen at send time. The quoted cost and the page count on the record still count that extra page. The rendered PDF is the authority on what actually printed.

## Tracking numbers

**View Tracking** opens USPS tracking in a new tab with the number already filled in. The action stays greyed out until a tracking number has been assigned, which is not the case for every letter and can happen after the letter already reads as Mailed. The number itself is stored but is not printed anywhere in the app — the tracking action is the way to it.

## Cancelling, and exactly when the window closes

Cancellation is possible for **five minutes**, measured from the moment the mail record was created, which is when you clicked Send. Not five minutes from the send date, not from the print run. The menu item greys out at that boundary and the server enforces the same limit, answering `mail cancellation period has expired` to anything later.

| Condition | Requirement |
| --- | --- |
| Time | Under five minutes since the letter was created |
| Status | Still Created. Once tracking has started the menu item greys out — but this one is the browser's rule, not the server's |
| Handoff | The letter must already have reached the print partner, otherwise you get `mail has yet to be triggered to send` |
| Permission | Update on the client record |

Time, handoff, and permission are the server's rules. Status is not: the cancel request checks that the letter belongs to the client it was filed under, that the print partner has it, and that under five minutes have passed — and never looks at the status. The greyed-out menu item is the only thing holding back a letter that has already started tracking; anything that gets past it is left to the print partner to refuse.

On confirmation, Lendiom asks the print partner to delete the letter. If it refuses — usually because the piece has already entered production — you get `mail cancellation failed` and the letter continues. On success, the status becomes **Deleted** when the partner's confirmation comes back, which is a separate message arriving moments later. The Recent Mail Sent card does not recover on its own after a cancellation. It drops into its loading skeleton — the table of letters replaced by placeholder bars — and stays there for the rest of the visit. Reload the page to bring the card back, and the new status with it.

:::warning Cancelling stops the letter, not the charge
The cost of a letter is added to your invoice when it is sent, not when it is delivered. Cancelling inside the five-minute window does not remove that line. Contact support if a cancelled letter needs a credit.
:::

## Downloading the rendered PDF

Once the print partner has laid the letter out, it sends the finished file back and Lendiom stores it against the mail record, named `rendered_letter_…`. **Download PDF** saves that file through your browser.

This is not the file you uploaded. Your original is kept untouched; the rendered copy is the record of what went in the envelope.

| Your upload | The rendered PDF |
| --- | --- |
| The pages you wrote | The same pages with the recipient and return addresses printed in, at the placement you chose |
| Your page count | One more page when a blank address page was inserted |
| Kept exactly as you sent it | Laid out by the print partner, then returned to Lendiom and stored with the record |

Use the rendered PDF whenever the exact printed content matters — proving what a borrower was sent, checking that an address window lines up, or filing a copy alongside a certified receipt.

<!-- screenshot: A downloaded rendered_letter PDF open in a viewer, first page showing the recipient block for Jane Doe and the return address for Demo Land Company printed above the body text that was uploaded -->

**Download PDF** is greyed out while a letter is still Created, and for any letter marked Failed. It can also fail with `rendered mail file not available` in the first minutes after sending, because the rendered file arrives separately from status updates. Wait a moment and try again.

<!-- screenshot: The Document Automation history table with several job rows, the blue Download link visible at the right edge of the rows whose status is Sent -->
