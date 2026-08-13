---
id: notification-settings
title: Notification Settings
---

## Two different things called "notifications"

**In-app notifications** are the bell in the top-right corner of Lendiom. They go to you and your staff — the people who log into Lendiom. This page is about those.

**Automated messages** are the texts, emails, and letters Lendiom sends to your borrowers and tenants: payment reminders, receipts, late notices, opt-in requests. They are configured per organization and covered in [Automated Borrower Messages](../communication/automated-messages.md). Nothing on this page changes what a borrower receives, and nothing in those settings changes what appears in your bell.

## The bell

The bell holds three tabs — **Notifications**, **Reminders**, and **Messages** — and every notification lands in exactly one of them based on its type.

| Behavior | What actually happens |
| --- | --- |
| Badge number | The count of unread items across all three tabs combined, not only the tab you are looking at |
| Tab label count | The number of items in that tab, read and unread |
| Clicking an item | Marks it read. A few notifications carry a link (import sessions do) and clicking those also navigates you there and closes the bell |
| **Clear** at the bottom | Hides every item in that tab |
| Priority tag | Items tagged `urgent`, `high`, `medium`, and so on show a colored tag. Items with no priority show nothing |

Notifications belong to your **user account**, not to an organization. If you belong to more than one organization, the bell mixes them together and there is no filter — the organization name is usually in the title or description.

![The notification bell open, showing the Notifications, Reminders and Messages tabs](/img/docs/app/how-it-works/notification-settings/01.png)

:::caution Clear removes unread items too
**Clear** hides everything in that tab regardless of whether you read it. There is no undo and no archive to look through afterward. If a notification matters, act on it before clearing.
:::

## Changing your own preferences

Go to your avatar in the top-right, then **Account Settings**, then the **Notifications** tab. Four switches read **Notify Me** or **Silenced**. Each one saves the moment you flip it. All four start on for new accounts, and your choices apply only to your account.

| Switch | What the app says it covers |
| --- | --- |
| Security Events | Security events for your account — new logins, several incorrect passwords, and similar |
| System Messages | Any new message the system sends your account |
| Client Messages | Messages from clients, whether text, email, or auto-generated from client actions |
| Reminders Notices | Items you marked to be reminded about on notes or other items |

![The Notifications tab of Account Settings, with a switch for each notification group](/img/docs/app/how-it-works/notification-settings/02.png)

:::caution Three of these four switches currently do nothing
Only **Client Messages** is consulted anywhere in Lendiom, and only for the missed-text email described below. **Security Events**, **System Messages**, and **Reminders Notices** are saved to your account and read by nothing.

No switch suppresses a bell entry. Silencing a category does not stop the notification from appearing.
:::

### What Client Messages actually controls

When a borrower texts your organization and nobody opens the conversation, Lendiom emails your staff. The check runs about once a minute, and a conversation has to sit unread for more than five minutes to qualify. Candidates are the members whose role can **create** on the `communication` feature, and each of them receives it only if their own **Client Messages** switch is on. Opening the conversation in the [Conversations inbox](../communication/conversations-inbox.md) first stops the email.

## Per-user or per-organization?

Every notification preference is **per user**. There is no organization-wide notification setting, no admin screen that turns a category off for everyone, and no way to change another person's preferences.

What is organization-level is **who receives which notification**, and roles decide that. Most notifications are addressed either to every member or to the members holding one specific permission.

:::info To change who gets a category, change the role
The switches do not filter the bell, so the permission a notification is routed by is your only real control. See [Roles and Permissions](../security/roles-and-permissions.md).
:::

## Every notification, what fires it, and who gets it

None of these can be turned off from Notification Settings. "All members" means everyone in the organization.

### Notifications tab — your account and security

These always go to the one affected user, and each is also sent as an email.

| Notification | Fires when |
| --- | --- |
| New Passkey Added / Passkey Removed | A [passkey](../security/passkey.md) is added to or removed from your account |
| Two-Factor Authentication Enabled / Disabled | You turn two-factor on or off |
| Recovery Codes Regenerated | You generate a new set of recovery codes |
| New Login Detected | A successful sign-in happens on your account |
| New Application Connected | You authorize an application to access your account |
| Application Disconnected | A connected application is disconnected |
| Application Connection Revoked | Lendiom automatically disconnects an application after detecting suspicious token reuse |

### Notifications tab — membership

| Notification | Fires when | Who gets it |
| --- | --- | --- |
| Invitation to *Org* | You are invited to an organization and already have a Lendiom account | The invited user |
| Welcome to Lendiom! | Your account is created, either by registering or by accepting an invite that created it | The new user |
| Invite to *Org* Accepted! | You accept an invitation | The accepting user |
| *Name* has accepted your invite! | Someone accepts the invite you sent | The inviter |
| Access to *Org* Removed | Your membership is removed | The removed user |

More on this flow in [Adding Users to Your Organization](../guides/adding-users-to-your-organization.md).

### Notifications tab — payments

| Notification | Fires when | Who gets it |
| --- | --- | --- |
| Failed Online Loan Payment | The processor marks an online loan payment failed | All members |
| Failed Online Rental Payment | The processor marks an online rental payment failed | All members |
| Failed Online Invoice Payment | The processor marks an online invoice payment failed | All members |
| Automatic Payment Skipped | An auto draft or auto pay run is skipped — either another payment for the same account was in flight, or the processor flagged a possible duplicate. Retried on the next run | All members |
| Auto Draft Enabled / Auto Pay Enabled | A borrower enrolls in [automatic payments](./automatic-payments.md), with the amount and next date | All members |
| Auto Draft Stopped / Auto Pay Stopped | Automatic payments are turned off, with the recorded reason | All members |
| Down Payment Missed ❌ | A loan's down payment is not paid in full by the last due date | Members with full access to `loan` |
| *Fee* Missed | A loan setup fee is not paid in full and on time | Members with full access to `loan` |

<!-- screenshot: the Notifications tab of the bell showing a red "urgent" and an orange "high" item side by side — a Failed Online Loan Payment row and an Automatic Payment Skipped row with the possible-duplicate wording -->

### Notifications tab — clients, documents, property tax, imports

| Notification | Fires when | Who gets it |
| --- | --- | --- |
| *Name* Submitted Information | A client submits an information [change request](../guides/client-change-requests.md) from the client portal | Members who can create, read, or update `client::entities` |
| *Name* Submitted Address Update | A client submits an address change request | Members who can create, read, or update `client::entities` |
| *Name* has opted out / has opted back in | The opt-out checker sees a phone number stop or resume texting | Members who can create, read, or update `communication` |
| Document Signed 🔏 | All parties sign a [signature request](../guides/document-signing.md) | Members with full access to `documentSignature` |
| Document Expired ⌛️ | A signature request passes its expiration and is canceled | Members with full access to `documentSignature` |
| Document Canceled 🚫 | A signature request is canceled, with the reason | Members with full access to `documentSignature` |
| *Property*'s *Year* [Property Tax](../guides/property-taxes.md) Finalized | You finalize a property tax year | Only you |
| *Property*'s *Year* Property Tax Paid | A property tax is fully paid and marked reimbursed | Only the user whose action completed it |
| *Year* Property Tax Finalization Failed | Finalization errors out | All members |
| Import finished / Import paused / Import could not be completed | An [import](../guides/data-import.md) reaches a terminal state. Clicking opens the import | Only the user who started it |
| Import data purged / Import data was only partly deleted | An import purge finishes or stops partway | Only the user who requested the purge |

### Notifications tab — billing and add-ons

Every row here goes to members who can update `billing`, except the add-on rows.

| Notification | Fires when |
| --- | --- |
| *Org* Setup Complete! | Billing information is completed and the subscription is active |
| *Org* Trial Started | The 31-day trial begins (goes only to the user who completed setup) |
| *Org* billing pending | Billing information is entered but not yet active (goes only to that user) |
| *Org*'s Subscription is Active | The subscription moves to active from any other state |
| *Org* Subscription Canceled | The subscription is canceled |
| *Org* Subscription Past Due | A subscription payment fails. Content creation is disabled |
| *Org*'s Subscription Status Changed | Any other status change |
| *Org*'s Subscription Set to Cancel | The subscription is set to cancel at the end of the period |
| *Org*'s Subscription Requires action | The latest invoice needs action, such as a card authentication step |
| Verify Your Bank Account | Micro-deposits are sent to a new bank account |
| Bank Account Verified | The bank account is confirmed |
| Bank Account Verification Failed | Verification fails or expires and the account is removed |

[Add-on](../billing/add-ons.md) changes — Document Signing 🔏, Communication Portal 📱, Document Builder 🏗️, and Deal Analysis 📊 — each raise an Enabled or Disabled notification naming who made the change. They go to members who can create (on enable) or delete (on disable) that add-on's feature.

:::caution Communication Portal notices follow document signing permissions
Both **Communication Portal Enabled 📱** and **Communication Portal Disabled** are routed by the `documentSignature` permission rather than `communication`. Someone who manages your texting but has no document signing access will not see them.
:::

### Messages tab

| Notification | Fires when | Who gets it |
| --- | --- | --- |
| New Message | A client's inbound text arrives, with the sender and message text | Members who can read `communication` |
| Brand Status Update | Your brand [registration](../communication/registration-timelines.md) status changes | Members who can create `communication` |
| Campaign Status Update | Your campaign registration status changes | Members who can create `communication` |

<!-- screenshot: the Messages tab of the bell showing a "New Message" row with the client name and message preview above a "Campaign Status Update" row tagged high -->

### Reminders tab

:::caution The Reminders tab is always empty
Nothing in Lendiom creates a reminder notification today. The tab, its count, its Clear button, and the **Reminders Notices** switch all exist, but no note, loan, or other record ever generates one.
:::

## Troubleshooting

**A coworker sees notifications you don't.** This is a role difference, not a settings difference. Compare the two roles against the tables above.

**Document notifications stopped arriving.** Roles holding the wildcard on `documentSignature` lose it silently the first time anyone saves the role matrix, which also cuts off these notifications. See the wildcard trap in [Roles and Permissions](../security/roles-and-permissions.md).

**You silenced a category and still get bell entries.** Expected — only the missed-text email responds to a switch.

<!-- screenshot: the Role Matrix open on a role's communication and document signature rows, illustrating the permission columns that decide who receives which notification -->
