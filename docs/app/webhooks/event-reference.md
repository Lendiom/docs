---
id: event-reference
title: Webhook Event Reference
description: Every outbound webhook event Lendiom sends — exactly when it fires, its full payload schema, and example JSON.
author: Bradley Hilton
---

This page documents every event Lendiom can deliver to your [webhook endpoints](./webhooks-overview): when each one fires, every field in its payload, and a full example request body. For request headers, signature verification, and retry behavior, see [Webhook Security & Delivery](./security-and-delivery).

All example data below is fictional — "Demo Land Company", "Jane Doe", and all IDs are made up for illustration.

## The Event Envelope

Every delivery is an HTTP `POST` with a JSON body in the same envelope, regardless of event type:

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "event": "payment.received",
  "createdAt": "2026-07-14T16:20:11.482Z",
  "organizationId": "66f0000000000000000000a1",
  "data": { }
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | The unique ID of this delivery. If a delivery is retried, every retry carries the **same** `id` and the exact same body — use it as your idempotency key. When one event fans out to multiple endpoints, each endpoint's delivery has its own `id`. |
| `event` | string | The event type: `payment.received`, `payment.failed`, `loan.past_due`, `loan.paid_off`, or `test`. |
| `createdAt` | string | When the event occurred, as a UTC RFC 3339 timestamp. Fixed at the moment the event was queued — retries do not change it. |
| `organizationId` | string | The ID of your Lendiom organization. Useful if one receiver serves several organizations. |
| `data` | object | The event-specific payload, documented per event below. |

The body is fixed at the moment the event occurs and never re-serialized, because the [signature](./security-and-delivery#verifying-the-signature) covers those exact bytes.

:::tip
New event types will be added over time. Your receiver should ignore unknown `event` values (or unknown fields inside `data`) rather than treating them as errors.
:::

## Payment Events

Both payment events share the same core `data` fields, describing the loan and the transaction:

| Field | Type | Description |
|---|---|---|
| `loanId` | string | The ID of the loan the payment applies to. |
| `loanLabel` | string | The loan's human-readable label, as shown in the Lendiom app. |
| `clientId` | string | The ID of the client (buyer) on the loan. |
| `transactionId` | string | The user-facing ID of the loan transaction — the same ID you see on the loan's transaction list. This is the key to deduplicate on (see the note under `payment.received`). |
| `amount` | string | The payment amount applied to the loan, as a decimal string with two decimal places (e.g. `"550.00"`). Sent as a string to avoid floating-point rounding — parse it with a decimal type, not a float. |
| `date` | string | The date of the transaction (UTC RFC 3339). This is the payment's effective date, which can differ from `createdAt` — for example when a payment is recorded after the fact. |
| `method` | string | How the payment was made. One of: `cash`, `check`, `money-order`, `cashier-check`, `card`, `ach`, `wire`, `cash-app`, `paypal`, `venmo`, `zelle`, `barter`, `other`, `system`. Online payments are always `card` or `ach`; manually recorded payments can be any of these. |
| `type` | string | The kind of payment: `regular-payment` (a scheduled loan payment) or `principal-payment` (a principal-only payment). |

### `payment.received`

Fires when a **regular** or **principal-only** payment on a loan becomes successful. All payment paths trigger it:

* A team member manually records a payment in the app.
* A client's online payment succeeds at the payment processor (card or ACH, including auto-drafted payments).
* A team member edits a transaction and it is (still) successful.

It does **not** fire for down payments, setup fees, or fees/charges — only regular and principal payments.

:::caution Deduplicate on `data.transactionId`
Editing a successful transaction (for example, correcting its date or comment) re-fires `payment.received` for the same transaction, as a **new** delivery with a new envelope `id`. If double-processing a payment would cause problems on your side, key your processing on `(event, data.transactionId)` and treat repeats as updates, not new payments.
:::

Example:

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "event": "payment.received",
  "createdAt": "2026-07-14T16:20:11.482Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "loanId": "66f000000000000000000b42",
    "loanLabel": "Sunset Ranch - Tract 42 - Jane Doe",
    "clientId": "66f000000000000000000c17",
    "transactionId": "Vw7Kp2QzXa",
    "amount": "550.00",
    "date": "2026-07-14T00:00:00Z",
    "method": "ach",
    "type": "regular-payment"
  }
}
```

### `payment.failed`

Fires when an **online** payment definitively fails at the payment processor — a declined card or a rejected/returned ACH payment. It is not sent for manually recorded payments (those never go through a processor) and it is not sent for transient processor hiccups, only when the processor reports the payment as failed.

In addition to the [shared payment fields](#payment-events) above, `payment.failed` includes:

| Field | Type | Description |
|---|---|---|
| `reason` | string | Why the payment failed. One of: `card-declined`, `expired-card`, `insufficient-funds`, `bank-rejected`, `invalid-account`, `stop-payment`. |

The reasons map to what the processor reported:

| Reason | Meaning |
|---|---|
| `card-declined` | The card was declined (the generic card failure). |
| `expired-card` | The card has expired. |
| `insufficient-funds` | The card or bank account did not have sufficient funds. |
| `bank-rejected` | The bank rejected the ACH payment without a more specific mappable reason. |
| `invalid-account` | The bank account is closed, could not be found, or is otherwise invalid. |
| `stop-payment` | The account holder stopped or disputed the ACH payment. |

Example:

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d2",
  "event": "payment.failed",
  "createdAt": "2026-07-16T09:03:44.907Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "loanId": "66f000000000000000000b42",
    "loanLabel": "Sunset Ranch - Tract 42 - Jane Doe",
    "clientId": "66f000000000000000000c17",
    "transactionId": "aDjhyeMb7K",
    "amount": "550.00",
    "date": "2026-07-14T00:00:00Z",
    "method": "ach",
    "type": "regular-payment",
    "reason": "insufficient-funds"
  }
}
```

:::note
Card payments usually resolve within moments of the attempt, but ACH payments can take several business days for the bank to settle or reject. An online ACH payment stays pending in Lendiom until the bank's result is known, and then exactly one of `payment.received` (settled) or `payment.failed` (rejected) fires — so expect a multi-day gap between the transaction's `date` and the event's `createdAt` for ACH.
:::

## Loan Status Events

Both loan status events share the same `data` shape:

| Field | Type | Description |
|---|---|---|
| `loanId` | string | The ID of the loan whose status changed. |
| `loanLabel` | string | The loan's human-readable label. |
| `clientId` | string | The ID of the client (buyer) on the loan. |
| `status` | string | The loan's new status: `late` for `loan.past_due`, `paid-off` for `loan.paid_off`. |
| `previousStatus` | string | The status the loan transitioned from. Any [loan status](../how-it-works/loan-status) value: `draft`, `pending`, `active`, `grace-period`, `late`, `in-default`, `defaulted`, `pending-payoff`, `paid-off`, `repo`, `inactive`, `canceled`, `refinanced`. |

These events fire on the status **transition** — whether the change came from Lendiom's automatic nightly loan integrity check or from a team member manually changing the status in the app. They fire once per transition, not repeatedly while the loan remains in the status.

### `loan.past_due`

Fires when a loan's status transitions to **Late** — typically because a payment was not made by the end of the grace period (detected by the nightly check), or because a team member manually set the status.

A loan can legitimately go late more than once over its life (late in March, catches up, late again in June), so expect this event to repeat for the same loan over time — each occurrence is a real, new transition.

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d3",
  "event": "loan.past_due",
  "createdAt": "2026-08-02T05:15:27.001Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "loanId": "66f000000000000000000b42",
    "loanLabel": "Sunset Ranch - Tract 42 - Jane Doe",
    "clientId": "66f000000000000000000c17",
    "status": "late",
    "previousStatus": "grace-period"
  }
}
```

### `loan.paid_off`

Fires when a loan's status transitions to **Paid Off** — the loan has been paid in full, whether through the final scheduled payment, an early payoff, or a team member manually setting the status.

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d4",
  "event": "loan.paid_off",
  "createdAt": "2026-09-30T18:42:03.512Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "loanId": "66f000000000000000000b42",
    "loanLabel": "Sunset Ranch - Tract 42 - Jane Doe",
    "clientId": "66f000000000000000000c17",
    "status": "paid-off",
    "previousStatus": "pending-payoff"
  }
}
```

## The `test` Event

Sent only when you use the **send test event** action on an endpoint — it cannot be subscribed to and never fires on its own. It goes to the endpoint regardless of the endpoint's event selection.

| Field | Type | Description |
|---|---|---|
| `message` | string | Always `"This is a test event from Lendiom."` |

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d5",
  "event": "test",
  "createdAt": "2026-07-14T16:25:40.113Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "message": "This is a test event from Lendiom."
  }
}
```

## Events Not (Yet) Covered

The current catalog is focused on loan payments and loan status. The following do **not** fire webhooks today:

* Down payments, setup fees, documentation/closing fees, and other fee or charge transactions (`payment.received` covers regular and principal payments only).
* Rental payments and rental status changes.
* Loan status transitions other than **Late** and **Paid Off** (e.g. In Default, Repossessed).

If your integration needs an event that isn't listed here, let us know — the catalog is designed to grow.
