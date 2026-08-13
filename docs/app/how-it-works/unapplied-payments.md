---
id: unapplied-payments
title: Unapplied Payments
---

## Introduction

When a customer makes an online payment through Lendiom Pay and the transaction succeeds, there are situations where a staff member may need to reverse that payment due to a clerical error — for example, the payment was applied to the wrong entity or needs to be corrected. Rather than refunding the money back through the payment processor (incurring fees and delays) only to collect it again, Lendiom allows the organization to reverse the transaction and hold the funds as an **unapplied credit** on the customer's account. These held funds can then be reapplied to the same source or refunded to the customer.

Unapplied payments are only created from online payments made through Lendiom Pay. Other payment issues such as bounced checks, chargebacks, ACH rejections, or insufficient funds are handled through standard reversals and refunds.

## Why It Matters

- **Avoid unnecessary refund fees:** Payment processors charge fees for refunds. If the customer still owes money, refunding and re-collecting creates double fees.
- **Maintain cash flow:** Instead of sending money back and waiting for the customer to pay again, the organization can hold the funds and reapply them to the same source immediately.
- **Full audit trail:** Every step is tracked: who reversed the original payment, why it was reversed, where the funds were held, when they were reapplied (or refunded), and by whom.
- **Processor detail preservation:** The original payment processor transaction IDs and authorization codes are preserved throughout the lifecycle, maintaining a clear connection to the original payment for reconciliation.

## Key Concepts

### Status Lifecycle

Each unapplied payment receives a unique, sequential ID (e.g., `UP-0001`, `UP-0002`) scoped to the organization. An unapplied payment follows a simple, one-way status lifecycle:

```
                ┌──────────►  applied    (funds consumed by a new transaction)
                │
  available  ───┤
                │
                └──────────►  refunded   (funds returned to the customer)

```

- **Available:** The funds are held and ready to be applied or refunded. This is the initial state.
- **Applied:** The funds have been consumed by a new transaction on the same source entity.
- **Refunded**: The funds have been returned to the customer via the original payment processor.

Once an unapplied payment transitions from `available`, it cannot go back. The transition is permanent and one-directional.

### Source Types

Unapplied payments can originate from reversals on three entity types:

| Source Type | Description |
| --- | --- |
| Loan | A reversed online payment on a loan |
| Invoice | A reversed online payment on an invoice |
| Rental | A reversed online payment on a rental |

When funds are reapplied, they **must** go back to the exact same source — the same type and the same entity. For example, an unapplied payment from Loan #123 can only be applied back to Loan #123.

## How It Works

### Reversing a Payment

When a user reverses an online Lendiom Pay payment transaction on a loan, invoice, or rental, they are presented with a choice:

- **Refund to customer:** Immediately refund the money through the original payment processor.
- **Hold as unapplied payment:** Keep the funds on the customer's account as a credit.

If the user chooses to hold the funds, they must provide a **reversal reason** (e.g., Clerical Error) and an optional **reversal comment** with additional details.

### What Happens Behind the Scenes

When the reversal is processed with "hold as unapplied payment", the system:

1. Reverses the original transaction on the loan, invoice, or rental.
2. Creates a new unapplied payment record in the **available** state.
3. Preserves all original payment details including the amount, payment processor, transaction ID, authorization code, and payment method.
4. Links the reversed transaction to the new unapplied payment for traceability.

If you are reversing payments, we recommend setting the status to draft, or loans and rentals, so late fees are not created.

### Applying the Credit

Once the unapplied payment is in `available` status, it can be applied back to the same source:

1. Navigate to the same loan, invoice, or rental where the original payment was made.
2. Open the **Record Transaction** modal.
3. Select the unapplied payment from the dropdown selector.
4. The form auto-fills with the payment details (amount, date, method).
5. Save the transaction — the funds are consumed and the unapplied payment transitions to **applied**.

### Refunding to the Customer

Alternatively, the funds can be returned to the customer:

1. Navigate to the Unapplied Payments list or detail page.
2. Click the **Refund** action on an available payment.
3. Confirm the refund.
4. The system processes the refund through the original payment processor.
5. The unapplied payment transitions to **refunded**.

---

## Unapplied Payments List

The main list page provides a paginated, searchable, and filterable table of all unapplied payments in the organization. It is accessible from the main sidebar navigation menu.

![The Unapplied Payments list, showing the ID, source, status and Actions columns](/img/docs/app/how-it-works/unapplied-payments/01.png)

### Search and Filters

- **ID:** Search by unapplied payment ID (e.g., "UP-0001")
- **Source:** Filter by source type (Loan, Invoice, Rental)
- **Source ID:** Filter by a specific source entity ID

### Table Columns

| Column | Description |
| --- | --- |
| ID | Unique payment identifier (e.g., `UP-0001`) |
| Transaction Date | Date of the original payment transaction |
| Amount | Payment amount (excluding any platform fees) |
| Client | Name of the client who made the original payment |
| Source | Type of entity the payment originated from (Loan/Invoice/Rental) |
| Source Entity | Name/label of the specific loan, invoice, or rental |
| Payment Method | How the payment was made (Credit/Debit Card, ACH, etc.) |
| Status | Color-coded badge: green (Available), blue (Applied), gray (Refunded) |
| Reversal Reason | Why the original transaction was reversed |
| Created | Date the unapplied payment was created |

Column visibility can be customized via the settings gear icon in the table header. Your column preferences are saved automatically.

---

## Unapplied Payment Detail

Clicking on an unapplied payment from the list opens the detail page, which shows the complete information organized into card sections.

![The Payment Details card on an unapplied payment, showing amount, platform fees and status](/img/docs/app/how-it-works/unapplied-payments/02.png)

**Payment Details Card** displays the ID, transaction date, amount, total collected (includes fees), platform fees, payment method, status, and any comments.

**Source Information Card** displays the client name (linked to the client page), source type and entity (linked to the entity page), reversal reason and comment, processor details, and creation metadata.

![The Source Information card, showing the originating client, source entity and processor details](/img/docs/app/how-it-works/unapplied-payments/03.png)

When the payment has been applied, an **Applied Details Card** appears showing the target entity, when it was applied, and by whom. When refunded, a **Refund Details Card** appears with the refund ID, date, and the user who issued the refund.

---

## Source Entity Tables

On each loan, rental, and invoice detail page, there is a collapsible **Unapplied Payments** section that shows all unapplied payments originating from that specific entity.

![The collapsible Unapplied Payments section on a loan detail page](/img/docs/app/how-it-works/unapplied-payments/04.png)

The table columns include ID (linked to the detail page), Transaction Date, Amount, Payment Method, Status, and Created date. This section only appears when there are unapplied payments associated with the entity.

---

## Applying via the Transaction Modal

When recording a new transaction on a loan, invoice, or rental, the modal includes an **Unapplied Payment Selector** dropdown. This selector only appears when there are `available` unapplied payments for the same source (matching type and entity).

![The Unapplied Payment Selector dropdown inside the new transaction modal](/img/docs/app/how-it-works/unapplied-payments/05.png)

**How the selector works:**

1. The selector fetches available unapplied payments matching the source type and source entity.
2. Each option displays the ID, amount, and payment method.
3. When a payment is selected, the form auto-fills:
  - **Amount** is set and locked (cannot be changed).
  - **Date** is set to the original transaction date.
  - **Payment Method** is set to the original method.
  - **Status** is automatically set to "Success".

If no unapplied payment selector appears in the modal, it means there are no available unapplied payments for this source entity.
