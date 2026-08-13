---
id: after-you-send
title: After You Send a Document for Signature
---

Building a request, placing fields, and clicking **Send for Signature** are covered in the [Document Signing guide](./document-signing.md). This guide picks up once the request leaves your hands: tracking it, nudging signers, moving the due date, retrieving the finished paperwork, and shutting a request down. Everything here lives under **Documents → Sign Requests**.

## The Sign Requests table

Each row is one request. Name, Status, Status Changed, Due Date, Signers, and Actions show by default. Template, Created At, Created By, Updated At, and Updated By are hidden until you turn them on in the column settings. Your column choices, the name search, and the status filter are remembered in the browser you are using.

![The Signature Requests page, listing each request with its status](/img/docs/app/guides/after-you-send/01.png)

**Status Changed** shows a different date depending on where the request stands: the created date for a draft, the sent date once requested, the completion date, the due date for an expired request, or the cancellation date.

**Signers** lists everyone on the request, with a green check beside anyone who has finished. Click a name for a popover with that signer's email, phone, and the magic code they can use to reach the document.

![The Signers column on a sign request, with a signer opened to show their details](/img/docs/app/guides/after-you-send/01.png)

### Statuses

| Status | What it means | Actions available |
| --- | --- | --- |
| Draft | Built but never sent. No signer has been contacted | Edit, Delete (Copy is listed too, but is not available yet) |
| Requested | Out with the signers and waiting | Extend, Remind, Cancel |
| Completed | Every signer has signed | Download, Download Audit Log |
| Expired | The due date passed — plus the grace period, if you set one | Extend, Download (in the `...` menu) |
| Canceled | Stopped early, either by you or by a bounced invitation email | Delete |

You may also see an orange **Past Due** tag instead of a status word. That is not a sixth status: it is a Requested row whose due date has passed while it is still inside its grace period. Hover the tag to see the date the grace period runs out.

<!-- screenshot: A Sign Requests row displaying the orange "Past Due" tag in the Status column with its tooltip open reading "Grace period until" followed by a date -->

## Sending a reminder

**Remind** sits in the `...` menu on a Requested row. It re-sends the original invitation — same link, same magic code — to whoever still owes you a signature.

Who gets it depends on the sign order you chose when you built the request:

- **Any Order** — every signer who has not finished is contacted.
- **Sequential** — only the signer whose turn it is right now.

A signer is emailed only if email notification was turned on for them, and texted only if SMS was turned on and your organization has finished messaging setup. If everyone has already signed, the reminder is refused with a message saying so.

Reminders only work while a request is Requested. Extend an expired one first, or start over.

## What the due date actually does

Lendiom checks for overdue requests every two hours. What happens when it finds one is set by the **Post Due Date** choice you made in the request:

- **Auto Cancel** — the request moves to Expired at the next check after the due date.
- **Grace Period** — the request stays open for the number of extra days you set, anywhere from 1 to 30.

During a grace period the request keeps its Requested status, shows the Past Due tag, and pending signers get a reminder — at most one per day, no matter how often the check runs. When the window closes, the request moves to Expired.

Expiry is not silent. Every signer set up for email or SMS gets an expiration notice, and a **Document Expired** notification is posted for the members who hold the document signature permission (see [Roles and Permissions](../security/roles-and-permissions.md)).

:::info Expired means closed
Once a request is Expired, Lendiom stops accepting signatures against it. Anything already signed is kept, but no further signer can complete it until you extend the request.
:::

## Extending a request

**Extend** appears on Requested rows in the `...` menu, and directly in the Actions column on Expired rows. Completed and Canceled requests cannot be extended.

![The Extend Sign Request modal, with the new due date picker and the reminder option](/img/docs/app/guides/after-you-send/03.png)

The modal asks for two things:

| Field | Notes |
| --- | --- |
| New Due Date | Date and time. Must be in the future — a past date is rejected |
| Remind pending signers | Off by default. Turn it on to send a fresh invitation to everyone still outstanding |

Extending an Expired request revives it: the status goes back to Requested, the new due date replaces the old one, and the grace-period reminder marker is reset so daily reminders can start again if a grace period is configured. Any cancellation date and reason left on the request are cleared at the same time.

Signing links and magic codes do not change when you extend, so anything a signer already received still works. That is why the reminder toggle is optional — use it when the signer needs to know the date moved.

## Downloading the signed document and the audit file

A completed request produces two files.

| File | Where to get it | Available for |
| --- | --- | --- |
| Signed document | **Download** — in the Actions column on a Completed row, in the `...` menu on an Expired one | Completed and Expired requests |
| Audit log | **Download Audit Log** in the `...` menu | Completed requests only |

![The Sign Requests table with a completed row offering a Download link alongside the in-flight requests](/img/docs/app/guides/after-you-send/04.png)

Both open in a new browser tab. The audit log records who opened, consented to, and signed the document, and when — keep it with the signed PDF.

Lendiom saves the signed PDF again after every individual signature, not only at the end. That is why an Expired request can still have something to download: you get the document as it stood when time ran out. If nobody signed at all, the download says so plainly rather than failing with an error.

Completion also files everything for you. The signed document is emailed to the signers, organization signers also receive the audit log, and a copy is filed under the client's **Files**.

## Multi-document packages

A request can carry more than the template PDF. The attachments step of the builder takes up to 20 extra PDFs — 50 MB per file, 150 MB across the package — and you can place fields on all of them. Signers receive one invitation covering the whole package and sign it in a single session.

Two things follow from that after sending:

- **The package is fixed once you leave the attachments step.** Attached documents are handed off at that point and cannot be pulled back out, and once the request is sent nothing can be added or removed at all.
- **Completion produces one combined file plus the parts.** **Download** gives you a single PDF containing everything. Each document is also stored on its own, numbered in package order, so you can pull out only the survey map when you need it.

## Canceling a request

**Cancel** appears in the Actions column on Requested rows. It takes effect immediately — there is no confirmation prompt.

:::caution Cancel is one click
Unlike Delete, Cancel does not ask you to confirm. Read the row before you click it.
:::

Canceling moves the request to Canceled and posts a **Document Canceled** notification to the members who hold the document signature permission, recording your name as the reason. Signers are not emailed about a cancellation, so tell them yourself if they were expecting to sign. A Canceled request cannot be extended or reopened, and anything signed beforehand is retained.

Lendiom also cancels a request on its own if the invitation email bounces. The notification will say the request to sign email bounced — check the signer's email address, then build a new request.

### Cancel versus Delete

They are different actions with different outcomes.

| | Cancel | Delete |
| --- | --- | --- |
| Applies to | Requested | Draft and Canceled |
| Confirmation | None | Yes |
| Result | Status becomes Canceled; the record stays | The request and its files, timeline entries, and notes are removed permanently |

## What you cannot change after sending

Once a request leaves Draft it is locked. You cannot add a signer, remove one, swap one for someone else, change the document, or attach another PDF. The request is in the signing service's hands and signers may already be partway through it.

:::warning Wrong signer list means starting over
There is no way to add a signer to a request that has already gone out. Cancel it and build a new one. Reminding, extending, canceling, and downloading are the only things a sent request will accept.
:::

The one thing you can still change is the deadline, through Extend.
