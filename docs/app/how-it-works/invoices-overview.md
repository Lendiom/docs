---
id: invoices-overview
title: Invoices Overview
---

## Introduction

The **Invoices** feature allows you to create, send, and collect payments for one-time or outstanding charges.

Invoices are standalone records that can be used for things such as:

- Service charges
- Property-related fees
- Adjustments
- Miscellaneous billing
- Any amount owed outside of scheduled loan payments

Invoices can be delivered to clients via email, SMS, or physical mail, and can be paid online through **Lendiom Pay**.

![An invoice detail page in Draft status, showing line items, tax and balance due](/img/docs/app/how-it-works/invoices-overview/01.png)

---

## Invoice Statuses

Invoices move through the following statuses:

- **Draft** - The invoice has been created but not sent.
- **Sent** - The invoice has been delivered to the client.
- **Viewed** - The client has opened the invoice.
- **Partially Paid** - A portion of the invoice has been paid.
- **Paid** - The invoice has been paid in full.
- **Overdue** - The due date has passed and a balance remains.
- **Cancelled** - The invoice has been voided.

Invoice statuses update automatically based on payments and due dates.

---

## Creating an Invoice

To create an invoice:

1.

Navigate to the **Invoices** section.

Click **Create Invoice**.

Enter the required details:

  - Client
  - Issue date
  - Due date
  - Line items
  - Tax (if applicable)
2. Save the invoice as **Draft** or send it to the client.

Each invoice is assigned a unique invoice number automatically.

![The new invoice form with the automatically assigned invoice number](/img/docs/app/how-it-works/invoices-overview/02.png)

---

## Adding Line Items

Invoices are built using line items.

Each line item includes:

- Title
- Description
- Quantity
- Unit price
- Amount

The system automatically calculates:

- Subtotal
- Tax (if applicable)
- Total amount

Line items can only be edited while the invoice is in **Draft** status.

![The Line Items editor, available only while an invoice is in Draft status](/img/docs/app/how-it-works/invoices-overview/03.png)

---

## Sending an Invoice

Invoices can be delivered through multiple methods:

- **Email** (includes a PDF attachment)
- **SMS**
- **Physical Mail**

When an invoice is sent:

- The status changes to **Sent**
- The client receives a notification
- The invoice becomes visible in the client portal

If the client opens the invoice, the status updates to **Viewed** automatically.

---

## Online Payments

Invoices can be paid online through **Lendiom Pay**.

To allow online payments:

- Online payments must be enabled for the invoice.
- Your organization must be set up with **PayArc**.

Clients can:

- Select a saved payment method
- Enter a custom amount (if partial payments are allowed)
- Authorize the payment

Online payments are available for invoices in the following statuses:

- Sent
- Viewed
- Partially Paid
- Overdue

Draft, Paid, Cancelled, or pending-payment invoices cannot be paid online.

---

## Partial Payments

Invoices support partial payments when enabled.

If a client pays less than the total amount:

- The invoice status becomes **Partially Paid**
- The remaining balance is updated automatically
- The client may make additional payments until the invoice is fully paid

Once the balance reaches zero:

- The status updates to **Paid**
- The paid date is recorded

---

## Manual Payments

If you receive payment outside of Lendiom Pay, you can manually record it.

Supported manual payment methods include:

- Credit/Debit Card
- Cash
- Check
- Bank Transfer
- Wire
- Money order
- Cashier’s check
- Zelle
- Cash App
- PayPal
- Venmo
- Barter
- Other

When a payment is recorded:

- The invoice balance updates automatically
- The status recalculates accordingly

---

## Overdue Invoices

If an invoice is not paid by its due date:

- The status automatically changes to **Overdue**
- Reminder notifications may be sent (if configured)

You can configure:

- Reminder notifications before the due date
- Notifications on the due date
- Overdue reminders at specific intervals
- Maximum reminder limits

This helps ensure clients are notified.

---

## Cancelling an Invoice

An invoice can be cancelled if:

- It has not been paid
- There is no pending payment in process

Once cancelled:

- The status becomes **Cancelled**
- No further payments can be made
- The invoice remains in records for reference

Invoices that have received payment cannot be cancelled.

---

## Audit Trail

Each invoice includes a detailed audit trail.

The audit log tracks:

- Creation
- Updates
- Delivery events
- Status changes
- Payments
- Cancellations

---

## PDF Downloads

Invoices can be downloaded as a PDF at any time.

PDFs include:

- Organization details
- Client details
- Line items
- Tax breakdown
- Payment summary
- Current payment status
- Online payment link (if enabled)

Multiple template styles are available.

---

## Client Experience

In the client portal, clients can:

- View all invoices
- See balance due
- Download PDFs
- Make online payments (if enabled)

When a client opens an invoice, it is automatically marked as **Viewed**.

If online payments are enabled, they can pay directly from the invoice page.
