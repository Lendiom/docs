---
id: invoice-settings
title: Invoice Settings
---

Almost everything that governs how an invoice behaves — when it reminds, whether it can be paid online, who absorbs the processing fee, which PDF your client receives — lives on the invoice itself rather than in your organization settings. The default tax rate is the one exception.

This guide covers each setting, where to change it, and when it stops being changeable. For the invoice status machine, see [Invoices Overview](../how-it-works/invoices-overview.md).

## Where each setting lives

| Setting | Scope | Where to change it | When |
| --- | --- | --- | --- |
| Default tax rate | Organization | Invoices list → gear icon (**Invoice Settings**) | Any time |
| Tax rate, PDF template, dates, notes | One invoice | Creation form, or the invoice's **Details** panel | Draft only |
| Reminder schedule | One invoice | Creation form → **Advanced Settings**, or the **Notification Settings** panel | Draft only |
| Online payments and fee payee | One invoice | Creation form → **Advanced Settings**, or the **Payment Settings** panel | Draft only |
| Partial payments | One invoice | **Payment Settings** panel | Any status except Paid, Cancelled, or Payment Pending |

Every one of these requires the `invoice` **Update** permission, including the organization-wide tax rate. See [Roles and Permissions](../security/roles-and-permissions.md).

<!-- screenshot: The Invoices list page header showing the "New Invoice" button, the "A/R Aging Report" button with its Excel icon, and the gear icon button whose tooltip reads "Invoice Settings". -->

## The default tax rate

Open the Invoices list and click the gear icon. The **Default Tax Rate** modal takes a percentage between 0 and 100, to two decimal places.

The rate applies to **new invoices only**. Existing invoices keep whatever rate they were created with — changing the default never rewrites history. On the creation form the field is pre-filled with the default and you can override it per invoice.

Tax is calculated on the subtotal of your line items. Any discount is then applied to the subtotal **plus** tax, not to the subtotal alone.

:::info
If a creation request arrives without a tax rate at all, Lendiom falls back to your organization default on the server. That is what keeps invoices created outside the normal form consistent with the ones created inside it.
:::

<!-- screenshot: The "Default Tax Rate" modal open over the Invoices list, with the explanatory paragraph and the "Tax Rate (%)" number input filled in. -->

## The reminder schedule

Reminders are configured under **Advanced Settings** on the creation form, and afterwards in the **Notification Settings** panel on the invoice page. While the invoice is a Draft the panel is editable; once it leaves Draft the same values are displayed read-only as tags.

| Setting | Choices | Default on a new invoice |
| --- | --- | --- |
| Reminders Before Due | 14, 7, 3, or 1 days — pick any combination | 7, 3, and 1 |
| Notify on Due Date | On / off | On |
| Overdue Reminders | On / off | On |
| Overdue Reminder Days | 1, 7, 14, 30, 60, or 90 days after due | 1, 7, 14, and 30 |
| Max Overdue Reminders | 1 to 10 | 4 |

Three daily jobs drive this, all on Central time:

| Time | Job | What it does |
| --- | --- | --- |
| 02:15 | Check for Overdue Invoices | Flips past-due invoices to **Overdue** and writes an audit entry |
| 08:35 | Invoice Due Date Reminders | Sends the "due in *n* days" notices |
| 08:40 | Invoice Overdue Reminders | Sends the "*n* days overdue" notices |

Pre-due reminders are only considered for invoices in **Sent**, **Viewed**, or **Partially Paid** status whose due date is still in the future and that have at least one reminder day configured. Overdue reminders cover those three statuses plus **Overdue**, once the due date has passed. Drafts, cancelled invoices, paid invoices, and invoices with a payment in flight are skipped.

Each offset fires once — Lendiom records the day count and the methods used, so the same reminder is never repeated. If every delivery method fails, nothing is recorded and the reminder is retried the next day. **Max Overdue Reminders** caps the total across all offsets; once reached, the remaining offsets are skipped.

Reminders use the invoice's delivery preferences and fall back to email when none are set. Physical mail carries the invoice itself but is deliberately skipped for time-sensitive notices such as payment confirmations and cancellations.

:::caution
**Notify on Due Date** is saved on the invoice and shown in the panel, but the daily reminder job matches only against the **Reminders Before Due** list. Turning this switch on does not, by itself, produce a notice on the due date. Neither does anything else: a notice on the day itself would need an offset of 0, and the list offers only 14, 7, 3, and 1. The nearest you can get is the 1-day reminder, which goes out the morning **before** the due date, or — with **Overdue Reminders** on — a 1-day overdue reminder, which goes out the morning **after** it.
:::

<!-- screenshot: The Notification Settings panel expanded on a draft invoice, showing "Reminders Before Due" with 7, 3 and 1 selected, "Notify on Due Date" on, "Overdue Reminders" enabled, and the Overdue Reminder Days and Max Overdue Reminders fields below. -->

## Online payments and the fee split

The **Online Payments** switch appears only once your organization has finished PayArc setup. Until then the creation form shows an alert linking to the PayArc merchant application, and the Payment Settings panel shows a plain Disabled tag. On a new invoice the switch defaults to on when setup is complete.

With online payments on, two dropdowns appear — one for ACH, one for card — because bank and card processing cost very different amounts:

| Choice | What your client is charged |
| --- | --- |
| Client pays fee | The invoice amount grossed up so you receive the full amount |
| Split fee | The invoice amount plus half the fee; you absorb the other half |
| Organization pays fee | Exactly the invoice amount; you absorb the whole fee |

Both default to **Client pays fee**. They are independent, so you can absorb the card fee while passing the cheaper ACH fee along, or the reverse. Lendiom resolves which of the two applies at the moment of the charge, from the payment method the client picked. The gross-up math and the rate sources are documented in [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md) and [Processor: PayArc](../payment-processing/payarc.md).

<!-- screenshot: The Payment Settings panel expanded on a draft invoice with Partial Payments allowed, Online Payments enabled, and the ACH Fee Payee and Card Fee Payee dropdowns both showing "Client pays fee". -->

## Partial payments

**Partial Payments** defaults to allowed. Unlike the other payment settings, it is not restricted to Draft — you can flip it at any point until the invoice is Paid, Cancelled, or has an online payment pending confirmation.

When it is off, a payment for less than the full balance is rejected. That applies to **both** paths: a client paying in Lendiom Pay and a staff member recording a payment manually on the invoice. Either way the request fails with "partial payments are not allowed for this invoice."

Overpayment is blocked regardless of this setting — no payment may exceed the balance due.

## The PDF template

Three templates ship with Lendiom: **Classic**, **Modern Blue**, and **Minimal**. Classic is used when nothing is chosen.

Pick one under **PDF Settings** on the creation form, or edit the **PDF Template** row in the Details panel while the invoice is still a Draft. That choice is what gets attached to the invoice email and what gets printed when you send by physical mail.

The download menu on the invoice page is separate. It always offers all three, with your saved template marked *(Default)*, so you can pull a one-off copy in another style without changing the invoice.

## Accounts receivable aging

Two entry points produce the same report:

- **Invoices list → A/R Aging Report** downloads the Excel export immediately, as of today.
- **Dashboard → Invoice A/R Aging** shows it on screen with an as-of date picker, per-bucket totals, and its own export button.

Invoices are bucketed by how many days past due they are on the as-of date:

| Bucket | Days past due |
| --- | --- |
| Current | Not yet due |
| 1-30 Days | 1 through 30 |
| 31-60 Days | 31 through 60 |
| 61-90 Days | 61 through 90 |
| 90+ Days | More than 90 |

An invoice qualifies when it has a balance greater than zero and is **not** Draft, Paid, or Cancelled. The amount in each bucket is the balance due, not the invoice total, so partially paid invoices contribute only what is still owed. The report also totals the tax across everything it includes.

Both entry points need `invoice` **Read**; the aging tab is hidden from the dashboard without it. See [The Dashboard](../how-it-works/dashboard.md).

<!-- screenshot: The Dashboard's Invoice A/R Aging tab with the as-of date picker, the five bucket statistic cards across the top, and the detail table listing invoice number, client, due date, days overdue and balance due. -->

## Two prompts you may hit while saving

**Down Payment Detected.** If any line item's title or description contains "down payment" (in any casing, with or without a space), saving raises a confirmation first. Loans have a built-in down payment feature that tracks the payment and updates the loan balance automatically — an invoice does neither. The prompt lets you continue anyway, but consider [Loan Down Payments](../how-it-works/loan-down-payments.md) instead.

**100% Discount.** A percentage discount is capped at 100 in the form and rejected above 100 by the server. At exactly 100 you get a warning that the invoice will total $0.00 before it saves. A flat-dollar discount is capped at the pre-discount total instead, so it can zero an invoice but never drive it negative.

:::tip
Cloning an invoice carries all of these settings across — reminder schedule, fee payees, partial payment rule, and template — so a recurring charge only needs to be configured once.
:::
