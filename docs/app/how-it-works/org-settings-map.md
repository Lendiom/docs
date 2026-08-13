---
id: org-settings-map
title: "Org Settings: What Is Here and What Lives Elsewhere"
---

Org Settings holds the settings that belong to the business itself: who your organization is, who works in it, what you pay Lendiom, and the definitions shared across every record. It does **not** hold the settings that belong to a loan, a rental, a client, or to you personally. Those live next to the thing they affect, which is why half of the "where is that setting?" questions end here and have to keep going.

Open it at **Org Settings** in the left navigation, or go straight to `/<your-org>/settings/<tab>`. The page itself opens for everyone: every role is granted `organization read` when it is created and again every time it is saved, so nobody can be locked out of the settings screen. Individual tabs are another matter.

![Org Settings on the Basic Settings tab, with the full vertical tab rail down the left](/img/docs/app/how-it-works/org-settings-map/01.png)

## The tabs

| Tab | What it configures | Permission to open it |
| --- | --- | --- |
| **Basic Settings** | Business name, contact number, website, contact email, mailing address | None beyond opening the page. The form is read-only without `organization update` |
| **Billing** | Subscription status and plan, period dates, cancel or reactivate, billing address, payment methods, add-ons | `billing read` |
| **Roles** | The role matrix — check permissions per role and save each column, plus **New Role** | `member read` |
| **Members** | Who is in the organization, invitations, role changes, removals | `member read` |
| **Invoices** | Lendiom's invoices *to you*: PDF downloads, invoices that need a payment action, and your accrued balance | `billing read` |
| **Scheduled Reports** | Recurring payments-summary emails, their recipients and cadence, delivery history, test sends and resends | `organization update` |
| **Fillable PDFs** | Uploaded PDF forms and the fields mapped into them, for cash loans, tract loans, clients, or tracts | `setting update` |
| **Custom Fields** | Custom field definitions per record type — Client, Loan, Tract, Property, Rental — including type, required, default, and order | `organization read` to view; adding, editing, and deleting a field need `organization create`, `update`, and `delete` |
| **Import/Export** | Data import sessions, and CSV/JSON exports of your data | Imports need `data-import read`; **Exports & Backups** needs `setting update`. Without either, the tab shows a 403 |

Import and Export used to be two tabs. Old bookmarks to `/settings/import` and `/settings/export` still work — both land on the combined **Import/Export** tab.

For what each feature and action actually unlocks, and for the trap where saving a role in the matrix silently drops permissions the matrix cannot express, read [Roles and Permissions](../security/roles-and-permissions.md).

:::caution
Two controls in these tabs are permanently disabled and do nothing when clicked. **Import/Export → Download Internal Backup** describes a backup generated every Monday at 1:30am, but the Download button has no action behind it — use the CSV or JSON export instead. **Billing → Add-ons → Custom Website** shows an Enable button that is disabled for everyone; that add-on is turned on by Lendiom, not by you.
:::

### Billing and Invoices open, then fail

The Billing and Invoices tabs are gated on `billing read`, but every request behind them — subscription, payment methods, add-ons, invoice list — requires the `billing` wildcard on the server. A role with `billing read` gets the tab and then an error where the data should be. In practice, billing belongs to `admin`. See [Add-Ons](../billing/add-ons.md) and [Canceling a Subscription](../billing/canceling-a-subscription.md).

The **Balance Due** tag on the Invoices tab is not an overdue amount. It is usage you have accrued since your last invoice — mailed [letters](../guides/sending-a-letter.md) and other metered items — that will appear on your next one.

![The Invoices page, with the Balance Due tag beside the heading](/img/docs/app/how-it-works/org-settings-map/04.png)

## Your organization profile

**Basic Settings** carries five fields, and each has a constraint worth knowing before you fight with it.

| Field | Rules |
| --- | --- |
| Business/Organization Name | Required. Changing it also updates your billing customer record |
| Contact Number | Required, exactly 10 digits, digits only. The country code is a fixed `+1` dropdown that cannot be changed — US numbers only. This is the number incoming calls to your [communication portal](../communication.md) are forwarded to |
| Website | Entered without a scheme; `https://` is a fixed prefix. The value must contain a domain (a dot) |
| Email Address | Required, must be a valid address |
| Mailing Address | Street, optional second line, city, state, and a 5-digit zip. State is free text and is not validated |

Three things people look for here and will not find:

- **Timezone.** Every organization is set to `America/Chicago` and there is no control anywhere in the app to change it. It is the timezone used for scheduled report send times, loan dates, and dated documents. If yours is wrong, [Lendiom Support](mailto:support@lendiom.com) has to change it.
- **Logo upload.** There is none. Lendiom stores no organization logo, so nothing you upload elsewhere in the app becomes letterhead.
- **A separate billing address field.** It is on the **Billing** tab, behind a toggle labeled **Same as Shipping** — which means the mailing address you just entered on Basic Settings. While that toggle is on, saving Basic Settings overwrites the billing address too.

If you are still finishing initial setup, [Setting Up Your Lendiom Business](../guides/setting-up-your-business.md) covers the creation wizard that collects these values the first time.

![The Basic Settings form, showing the fixed +1 country code and the https:// website prefix](/img/docs/app/how-it-works/org-settings-map/03.png)

## Settings people look for here that live elsewhere

Everything below is organization-wide or record-level configuration that is **not** in Org Settings.

| What you are looking for | Where it actually is |
| --- | --- |
| Default late fee tiers, defaulting terms, communication preferences, document automation, or minimum payment for new loans | **Loans** list → **Default Loan Settings** dropdown. Needs `loan create`, except document automation, which needs `organization update`. See [Late Fees](./late-fees.md) |
| Those same five settings on one existing loan | The loan's **Actions** menu, under **Settings & Automation** |
| Default document automation or minimum payment for new rentals | **Rentals** list → **Default Rental Settings** dropdown. Minimum payment needs `rental create`; document automation needs `organization update` |
| Communication preferences or minimum payment on one rental | The rental's **Actions** menu |
| Rent amount, late fees, security deposit, recurring fees on a rental | Set in the New Rental wizard — see [Rental Late Fees, Recurring Fees and Deposits](./rental-fees.md) |
| Escrow accounts and escrow settings | Per loan — see [Loan Escrow](./loan-escrow.md) |
| Whether automated messages go to every entity on a client, and the address-update reminder interval | **Communications** → **Client Preferences**. Needs `client update` |
| Your texting phone number, brand, and campaign registration | **Communications** — see [What Is a Brand](../communication/what-is-a-brand.md) and [Registration Timelines](../communication/registration-timelines.md) |
| Which automated messages Lendiom sends | Not configurable as a list — see [Automated Messages](../communication/automated-messages.md) |
| Default sales tax rate on invoices | **Invoices** list → the gear button (**Invoice Settings**). Needs `invoice update` |
| Default signing user for generated documents | **Documents → Builder** → **Settings** → **Default Signing User** |
| Online payment processing — merchant application, bank account, documents | `/<your-org>/payarc/merchant`, reached from **PayArc** in the navigation. See [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md) |
| Whether a specific loan or rental accepts online payments | On that loan or rental, not organization-wide |
| Your own password, passkeys, and notification preferences | **Account Settings** (your avatar → Account Settings), a different page entirely. See [Passkeys](../security/passkey.md) |

The distinction that catches people: Org Settings **Invoices** is what Lendiom bills you; the **Invoices** page in the main navigation is what you bill your clients. They are unrelated. See [Invoices Overview](./invoices-overview.md).

![The Loans list with the Default Loan Settings dropdown open, listing the organization-wide loan defaults](/img/docs/app/how-it-works/org-settings-map/05.png)

## Only Lendiom support can change these

| Setting | Why |
| --- | --- |
| Organization timezone | Creation hardcodes `America/Chicago`, and nothing writes it after that — no screen and no endpoint changes it. The value rides along in the organization record; it is simply never set to anything but the default |
| Restarting a canceled subscription | Once the status is `cancelled`, the Billing tab replaces the action button with **Contact Support** |
| Direct card charging on a loan | No in-app control sets it; until it is switched on, the Charge button is hidden |
| The Custom Website add-on | The Enable button is disabled for everyone |
| Restoring a role that lost wildcard permissions | The role matrix cannot express the wildcard action, so it cannot put it back |

The **voice assistant** belongs just outside this list, and it is the one people get wrong. It has no screen — nothing in Org Settings or anywhere else in the app toggles it, and the floating microphone button is simply there or not — but it is not support-only the way the rows above are. The server takes a voice-assistant preference update from any role holding `organization update`; there is just nothing in the interface that sends one. In practice most organizations ask Lendiom to flip it, which is why it reads like a support setting. See [Settings Your Lendiom Contact Controls](./support-controlled-settings.md).

<!-- screenshot: the Billing tab for a canceled organization, with the Status row showing cancelled and a Contact Support button in the Action row -->

## Related reading

- [Adding Users to Your Organization](../guides/adding-users-to-your-organization.md) — the Members tab, invitations, and role assignment
- [Scheduled Report Emails](../guides/scheduled-reports.md) — the Scheduled Reports tab in detail
- [Adding a Fillable PDF](../guides/adding-fillable-pdf.md) — uploading and mapping a PDF form
- [Importing Your Existing Portfolio](../guides/data-import.md) and [Getting Your Data Out of Lendiom](../guides/exporting-your-data.md) — both halves of the Import/Export tab
