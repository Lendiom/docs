---
id: webhooks-overview
title: Webhooks Overview & Getting Started
description: What Lendiom's outbound webhooks are, how to register an endpoint, choose events, keep your signing secret safe, and send your first test event.
author: Bradley Hilton
---

## What are Webhooks?

Webhooks let Lendiom notify **your** systems the moment something happens in your organization — a payment lands, a payment fails, a loan goes past due, or a loan is paid off. Instead of polling or manually exporting data, Lendiom sends an HTTP `POST` request with a JSON body to a URL you control, within about a minute of the event.

Typical uses:

* Keeping a CRM in sync with payment activity (mark an opportunity paid, kick off a follow-up task, etc.).
* Alerting your collections team the moment a loan transitions to **Late**.
* Triggering your own paid-in-full workflow when a loan is paid off.
* Feeding a data warehouse or reporting tool in near real-time.

Every delivery is cryptographically signed with a per-endpoint secret so your receiver can verify the request truly came from Lendiom — see [Webhook Security & Delivery](./security-and-delivery) for the verification guide.

## Available Events

| Event | Fires when |
|---|---|
| `payment.received` | A regular or principal-only payment on a loan is successfully received |
| `payment.failed` | An online payment definitively fails at the payment processor |
| `loan.past_due` | A loan's status transitions to **Late** |
| `loan.paid_off` | A loan's status transitions to **Paid Off** |

Each event's exact trigger conditions, payload fields, and example JSON are documented in the [Webhook Event Reference](./event-reference).

There is also a special `test` event you can send on demand to verify your receiver — it cannot be subscribed to and is only sent when you explicitly request it (see [Sending a Test Event](#sending-a-test-event) below).

## Before You Start

* **Permissions**: viewing your organization's webhooks requires the *Settings* read permission; creating, updating, deleting, or testing an endpoint requires the *Settings* update permission. Organization owners have both.
* **An HTTPS endpoint**: you need a publicly reachable URL that accepts `POST` requests. Plain `http://` URLs, `localhost`, and private/internal network addresses are rejected — the full rules are in [Endpoint URL Requirements](./security-and-delivery#endpoint-url-requirements).
* **Somewhere safe to store a secret**: each endpoint gets its own signing secret, and it is only shown once.

## Registering an Endpoint

1. Open your organization's **Settings** and go to the **Webhooks** section.
2. Choose to add a new webhook endpoint.
3. Enter the **URL** Lendiom should deliver events to. It must be an `https://` URL that is reachable from the public internet.
4. Select the **events** the endpoint should receive. An endpoint must subscribe to at least one event; you can change the selection at any time.
5. Save the endpoint.

When the endpoint is created, Lendiom generates a **signing secret** and shows it to you **once**:

* The secret looks like `whsec_` followed by 64 hexadecimal characters, for example:
  `whsec_0f3c9a1b7e5d2c4a6f8091b3d5e7f9a1c3b5d7e9f1a3c5b7d9e1f3a5c7b9d1e3`
* Copy it immediately and store it in your secret manager or your application's environment configuration.
* Lendiom stores it securely and **cannot show it to you again**. If you lose it, delete the endpoint and create a new one (which generates a new secret).

Every delivery to the endpoint is signed with this secret via the `X-Lendiom-Signature` header. Your receiver should verify the signature on every request — the step-by-step guide with code samples is in [Verifying Signatures](./security-and-delivery#verifying-the-signature).

## Active vs. Inactive Endpoints

Each endpoint has an **active** flag (endpoints are active by default when created). While an endpoint is inactive:

* No new events are queued for it — events that occur while it is inactive are **not** delivered later when you re-activate it.
* You can still send it a [test event](#sending-a-test-event).

Deactivating an endpoint is the right choice when your receiver is down for planned maintenance and you don't want a backlog of failed deliveries, or when you want to pause an integration without losing its configuration and secret.

## Sending a Test Event

Once your receiver is deployed, use the **send test event** action on the endpoint to make sure everything is wired up correctly. The test delivery:

* Is a real, signed delivery — same headers, same signature scheme, same retry behavior as any other event.
* Uses the event type `test` with a simple payload:

```json
{
  "id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "event": "test",
  "createdAt": "2026-07-14T16:20:11.482Z",
  "organizationId": "66f0000000000000000000a1",
  "data": {
    "message": "This is a test event from Lendiom."
  }
}
```

* Is sent to the endpoint regardless of which events it subscribes to.
* Shows up in the [delivery log](#the-delivery-log) like any other delivery, so you can confirm your endpoint returned a `2xx` response.

Deliveries are picked up by a background worker that runs every 60 seconds, so expect the test request to arrive within about a minute.

## The Delivery Log

Every event queued for an endpoint becomes a **delivery**, and every delivery keeps a full attempt-by-attempt history you can inspect from the endpoint's delivery log. For each delivery you can see:

* **Event type** and the exact **JSON payload** that was (or will be) sent. The payload is fixed at the moment the event occurs, because the signature covers those exact bytes.
* **Status**:
  * `pending` — waiting for its next attempt.
  * `succeeded` — your endpoint acknowledged it with a `2xx` response.
  * `failed` — every attempt failed; no further attempts will be made.
* **Attempts** — for each HTTP attempt: when it happened, the HTTP status code your endpoint returned (if it responded), the error if the attempt failed, and how long the attempt took in milliseconds.
* **Next attempt time** — when the next retry will happen, for deliveries that are still pending.

Failed attempts are retried automatically on a backoff schedule spanning roughly a day — see [Retries & Backoff](./security-and-delivery#retries--backoff) for the exact schedule.

## Managing Endpoints

* **Update** an endpoint to change its URL, its subscribed events, or its active flag. The signing secret never changes on update.
* **Rotate a secret** by creating a new endpoint (new secret), pointing it at your receiver, and deleting the old endpoint once the new one is confirmed working. There is currently no in-place secret rotation.
* **Delete** an endpoint to stop all deliveries to it immediately. Deleting an endpoint also deletes its entire delivery log, including deliveries that were still pending.

You can register multiple endpoints — for example, one for your CRM and one for an internal alerting tool — each with its own URL, event selection, and secret. Every subscribed endpoint receives its own independent copy of each event.

## Quick Checklist

1. Build a receiver that accepts `POST` requests with a JSON body and responds `2xx` quickly (within 10 seconds).
2. Verify the `X-Lendiom-Signature` header on every request ([guide](./security-and-delivery#verifying-the-signature)).
3. Register the endpoint in **Settings → Webhooks**, select your events, and store the secret securely.
4. Send a test event and confirm it shows as `succeeded` in the delivery log.
5. Make your processing idempotent — retries and edited transactions can deliver the same logical event more than once ([idempotency guide](./security-and-delivery#idempotency--duplicate-events)).
