---
id: client-change-requests
title: Approving Client Change Requests
---

A borrower signed into [Lendiom Pay](../../pay/what-is-pay.md) can ask you to correct the name, email, phone number, or mailing address you have on file. Nothing on the record moves until someone on your team approves the request. This guide covers what a borrower is able to send, where the request lands, what approving it rewrites, and what each side is told along the way.

## What a borrower can request

Lendiom Pay has two separate forms under **Account**, and each one produces its own change request. The borrower's side of this is documented in [Updating Information](../../pay/guides/updating-information.md).

| Form | Fields | What Lendiom requires |
| --- | --- | --- |
| Update Your Information | First name, last name, email, phone number | All four. Each name must be at least two characters, the email has to pass validation, and the phone number has to parse as a real number |
| Address | Street address (one or two lines), city, state, ZIP | All four. The address is checked against USPS records before the request is stored |

The address form runs verification first, so the request holds the corrected, standardized version of what the borrower typed — proper casing, the ZIP+4, and a deliverability result. It is stored as a verified address, which is what [year-end 1098 filing](./year-end-close.md) requires.

Each request is attached to one client and one person on that client. The address form always targets the client's primary entity. Nothing else about the account can be changed this way: account numbers, payment methods, loan terms, and balances are untouched.

<!-- screenshot: The Lendiom Pay Account screen at phone width, showing the "Update Your Information" form with first name, last name, email, and phone number filled in and the "Request Update" button below it -->

## Where requests appear for staff

A submitted request surfaces in four places at once.

| Where | What you see | Permission needed |
| --- | --- | --- |
| Dashboard → **Client Change Requests** tab | A count badge on the tab, and a **Pending Client Change Requests** card listing Client, Entity, Requested Updates, Submitted date, and a **Review** button, five per page | `client` update, or the tab shows a 403 |
| The client's own page | A blue **Pending Update** alert with a **View Request** button | `client::entities` update to press the button |
| The bell in the top bar | "Jane Doe Submitted Information" or "Jane Doe Submitted Address Update", with a line pointing you at the client's details page | `client::entities` create, read, or update |
| Email | Subject "Client Submitted Information: Jane Doe" (or "Client Submitted Address Update: Jane Doe") with a **Review Now** button linking straight to the client | Same as the bell notification |

The bell notification and the email go to every member of the organization whose role holds create, read, or update on `client::entities` — not only to whoever owns the account. See [Roles and Permissions](../security/roles-and-permissions.md) for how those pairs are built.

![The Client Change Requests tab of the dashboard, where pending buyer-submitted changes are reviewed](/img/docs/app/guides/client-change-requests/02.png)

## Reviewing and approving

From either entry point you land in the same **Pending Change Requests** modal. It lists every pending request for that client, one table each, with three columns: **Field**, **Existing**, and **Requested**. Only the fields the borrower actually filled in are listed, so a request that changed a phone number shows one row.

1. Open the request from the dashboard's **Review** button or the client page's **View Request** button.
2. Read each row against the Existing column. This is the only comparison Lendiom gives you.
3. Press **Approve**. There is no confirmation step — the change applies as soon as you press it.
4. A "Change request approved successfully!" notice appears and the list reloads. When nothing is left pending, the modal closes on its own and the Pending Update alert on the client disappears.

The modal ignores the Escape key and clicks outside it. Use the **Close** button to back out.

<!-- screenshot: The Pending Change Requests modal open over a client page, showing a small table with Field / Existing / Requested rows for Email and Phone Number, and an Approve button beside a greyed-out Reject button underneath -->

## Rejecting

The **Reject** button sits next to **Approve** and is disabled. Rejection is not available in this version: no action sets a request to rejected, and a pending request cannot be deleted.

That matters operationally, because a pending request keeps blocking the borrower's address form until it clears (see below). If a request holds something you do not want on the record, the practical path is to approve it and then correct the entity by hand through its **Edit** drawer. Leaving it pending leaves the borrower stuck.

:::caution
Because a request can only leave the pending state by being approved, do not treat "ignore it" as a way to decline a change. The borrower keeps seeing **Update Pending** in Lendiom Pay for as long as it sits there.
:::

## What approval changes on the record

Approval writes to the person the request was filed against, not to the client as a whole.

| Requested field | What Lendiom does on approval |
| --- | --- |
| First name, last name | Replaces the value on the entity. A field the borrower left out of the request is ignored |
| Email | Replaces the email when it differs from the current one, and resets verification: the address goes back to unverified and the old verification token is cleared, so the borrower has to verify it again from Lendiom Pay |
| Phone number | Replaces the entity's **entire** phone list with one cellular number, labeled "Jane's Number" after the person's first name |
| Address | Replaces the entity's **entire** address list with the single verified address from the request |

Alongside those field writes, approving does four more things:

- Marks the request approved and stamps it with the user who approved it.
- Adds a system note to the client: "Jane Smith has approved a change request for Jane Doe."
- Pushes the new address to the client's PayArc customer record in the background when the address changed and the client has one, so later charges and receipts carry it. This runs off to the side — a slow or failing sync never blocks the approval.
- Refreshes the client and the person for everyone with the page open.

:::warning
Phone numbers and addresses are replacements, not additions. If the person carries a second number or a second address in Lendiom, approving a request that includes that field drops the extras. Note anything you need to keep before you press Approve, then re-add it on the entity afterward.
:::

## When a request is already pending (5570)

Before it accepts an address submission, Lendiom Pay checks whether that client already has something waiting. If it does, the borrower is stopped with:

> a pending change request already exists, please wait for it to be processed before submitting a new one (5570)

Three things are worth knowing about that check:

- It is per client, not per field. A pending contact-details request blocks the address form just as much as a pending address request does.
- It clears the moment you approve the outstanding request. Nothing on the borrower's side resolves it.
- The contact-details form does not run this check, so a borrower can send a second one while the first is still waiting. The review modal lists each request separately, and you approve them one at a time. When two of them touch the same field, the one you approve last is the value that sticks.

The neighboring codes come from the same two forms and are all validation, not conflict:

| Code | Message |
| --- | --- |
| `5556` | invalid email, please provide a valid email address |
| `5557` / `5558` | invalid first name / invalid last name |
| `5559` / `5560` | empty phone number provided / invalid phone number format |
| `5565` / `5566` | at least one street address is required / street address cannot be empty |
| `5567` / `5568` / `5569` | city, state, or zip code cannot be empty |
| `5570` | a pending change request already exists |

For the wider list, see [Error Messages in Lendiom Pay](../../pay/guides/error-messages.md) and [Error Messages in Lendiom](../how-it-works/error-messages.md).

## Notifications on both sides

| Moment | Your team gets | The borrower gets |
| --- | --- | --- |
| Request submitted | A bell notification and an email with a **Review Now** link, to every member with create, read, or update on `client::entities` | An **Update Pending** alert on their Lendiom Pay account screen |
| Request approved | A system note on the client reading who approved what | An "Information Update Approved" email, and a text message when your organization is set up for messaging |
| Request never approved | Nothing further | Nothing. There is no declined message |

The approval email goes to the address on the person's record *after* the change applied — so when the borrower changed their email, the notice goes to the new one. It is skipped when the person has no email, or when their address is marked blocked. The text message goes out only if your organization has finished messaging setup in the [Communication Portal](../communication.md), and is skipped for anyone with no cellular number on file or who has replied STOP. It follows the client's language preference, English or Spanish. Both land in that client's conversation thread.

![The notes on a client, including the system notes Lendiom writes automatically](/img/docs/app/guides/client-change-requests/04.png)

## Asking a borrower to update their address

You do not have to wait for a borrower to think of it. On the client's page, the Lendiom Pay menu holds **Send Address Reminder**, which emails and texts the primary entity the address currently on file plus a link that opens the Pay address form directly. Lendiom tries both channels and only reports a failure when neither is deliverable. The item is disabled when the person has no address to confirm, or has neither an email nor a cellular number.

The same reminder can run on a schedule. On the **Communications** page, open **Client Preferences** and set **Remind Buyers To Confirm Their Mailing Address** to every 6 or every 12 months. Reminders are measured from each loan's closing date and respect that loan's automated communication setting.
