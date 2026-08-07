---
id: security-and-delivery
title: Webhook Security & Delivery
description: How to verify Lendiom's webhook signatures (with Node.js and Python examples), the retry and backoff schedule, idempotency guidance, endpoint URL rules, and troubleshooting.
author: Bradley Hilton
---

This page covers everything your receiver needs to handle Lendiom webhooks safely and reliably: verifying that a request really came from Lendiom, responding correctly, handling retries and duplicates, and troubleshooting failed deliveries. For the list of events and their payloads, see the [Webhook Event Reference](./event-reference).

## Anatomy of a Delivery

Every delivery is an HTTP `POST` to your endpoint URL with:

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |
| `User-Agent` | `Lendiom-Webhooks/1.0` |
| `X-Lendiom-Signature` | `t=<unix seconds>,v1=<hex signature>` — see below |

The body is the JSON [event envelope](./event-reference#the-event-envelope). It is fixed when the event occurs: retries resend the exact same bytes with a fresh signature.

Example request:

```
POST /webhooks/lendiom HTTP/1.1
Host: crm.demolandcompany.example
Content-Type: application/json
User-Agent: Lendiom-Webhooks/1.0
X-Lendiom-Signature: t=1784046011,v1=a2c3e58f4b6d7a8091c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4

{"id":"66f1a2b3c4d5e6f7a8b9c0d1","event":"payment.received", ... }
```

## Verifying the Signature

Every delivery is signed with the endpoint's secret (the `whsec_...` value shown once when you [created the endpoint](./webhooks-overview#registering-an-endpoint)). Verifying the signature proves the request came from Lendiom and that the body was not tampered with. **Verify on every request** — do not rely on the URL being secret or on IP allowlists.

The scheme mirrors Stripe's webhook signatures, so off-the-shelf verification code written for that scheme works here too.

The `X-Lendiom-Signature` header has two parts:

```
t=1784046011,v1=a2c3e58f4b6d7a8091c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4
```

* `t` — the Unix timestamp (in seconds) of when the request was signed.
* `v1` — the hex-encoded HMAC-SHA256 of the string `<t>.<body>` (the timestamp, a literal `.`, then the raw request body), keyed with your endpoint's secret. The full secret string, including the `whsec_` prefix, is the HMAC key.

To verify:

1. **Read the raw request body bytes** — before any JSON parsing. The signature covers the exact bytes on the wire; re-serializing the parsed JSON will produce different bytes and the verification will fail.
2. Parse the header into `t` and `v1`.
3. Compute `HMAC_SHA256(secret, t + "." + rawBody)` and hex-encode it.
4. Compare your computed value to `v1` using a **constant-time comparison** function (not `==`), to avoid leaking timing information.
5. Optionally (recommended), reject the request if `t` is too far from the current time — 5 minutes is a sensible tolerance. This limits replay attacks: a captured request becomes useless once the timestamp goes stale. Retries are signed with a fresh timestamp at send time, so a legitimate retry never appears stale.

If verification fails, respond with a `4xx` status and do not process the body.

### Node.js Example

An Express receiver. The important detail is `express.raw(...)` — the signature must be computed over the raw body, so don't let `express.json()` consume it first:

```js
const crypto = require('crypto');
const express = require('express');

const app = express();
const secret = process.env.LENDIOM_WEBHOOK_SECRET; // whsec_...
const TOLERANCE_SECONDS = 5 * 60;

app.post('/webhooks/lendiom', express.raw({ type: 'application/json' }), (req, res) => {
  const header = req.get('X-Lendiom-Signature') || '';
  const parts = Object.fromEntries(
    header.split(',').map((part) => part.split('=', 2))
  );

  const timestamp = Number.parseInt(parts.t, 10);
  const signature = parts.v1;

  if (!Number.isFinite(timestamp) || !signature) {
    return res.status(400).send('malformed signature header');
  }

  // Reject stale timestamps to limit replay attacks
  if (Math.abs(Date.now() / 1000 - timestamp) > TOLERANCE_SECONDS) {
    return res.status(400).send('timestamp outside tolerance');
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.`)
    .update(req.body) // raw Buffer
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'hex');
  const signatureBuf = Buffer.from(signature, 'hex');

  if (
    expectedBuf.length !== signatureBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, signatureBuf)
  ) {
    return res.status(400).send('signature verification failed');
  }

  const event = JSON.parse(req.body.toString('utf8'));

  // Acknowledge quickly, then process. Anything other than a 2xx (or a
  // response slower than 10 seconds) counts as a failed attempt.
  res.sendStatus(200);

  // ... hand `event` to your own queue / processing here ...
});

app.listen(8080);
```

### Python Example

A Flask receiver — the same steps, using `hmac.compare_digest` for the constant-time comparison:

```python
import hmac
import hashlib
import json
import os
import time

from flask import Flask, request

app = Flask(__name__)
SECRET = os.environ["LENDIOM_WEBHOOK_SECRET"]  # whsec_...
TOLERANCE_SECONDS = 5 * 60


@app.post("/webhooks/lendiom")
def lendiom_webhook():
    header = request.headers.get("X-Lendiom-Signature", "")
    parts = dict(
        part.split("=", 1) for part in header.split(",") if "=" in part
    )

    timestamp = parts.get("t", "")
    signature = parts.get("v1", "")

    if not timestamp.isdigit() or not signature:
        return "malformed signature header", 400

    # Reject stale timestamps to limit replay attacks
    if abs(time.time() - int(timestamp)) > TOLERANCE_SECONDS:
        return "timestamp outside tolerance", 400

    raw_body = request.get_data()  # raw bytes, before any JSON parsing
    signed_payload = timestamp.encode() + b"." + raw_body
    expected = hmac.new(SECRET.encode(), signed_payload, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, signature):
        return "signature verification failed", 400

    event = json.loads(raw_body)

    # ... hand `event` to your own queue / processing here ...

    return "", 204
```

### Validating Your Implementation

You can check your verification code against this fixed test vector (the same one Lendiom's own test suite pins the scheme to):

| Input | Value |
|---|---|
| Secret | `whsec_c2VjcmV0LXZhbHVl` |
| Timestamp (`t`) | `1720000000` |
| Body | `{"id":"665f0d0b8f1c2a3d4e5f6071","event":"payment.received","data":{"amount":"100.00"}}` |
| Expected `v1` | `7151b0757ccd8032cae5bb27259be39b2bd3f686aa784423f1b2b1f3570d990c` |

If your code computes that `v1` from those inputs, it will verify real deliveries. The easiest end-to-end check after deploying is to [send a test event](./webhooks-overview#sending-a-test-event).

## Responding to a Delivery

* **Any `2xx` status code counts as delivered** — `200`, `202`, and `204` are all fine. The response body is ignored.
* **Respond within 10 seconds.** Each attempt has a 10-second timeout; a slower response counts as a failed attempt even if you eventually return `200`. If your processing is slow, acknowledge first and process asynchronously (queue the event, then work it off).
* **Do not redirect.** Lendiom never follows redirects — a `3xx` response counts as a failed attempt. Your endpoint URL must point directly at the receiver (watch out for `http` → `https` and trailing-slash redirects some frameworks add automatically).
* Any other response (`4xx`, `5xx`), a timeout, a TLS failure, or a connection error counts as a failed attempt and will be retried.

## Retries & Backoff

Deliveries are handled by a background worker that runs every 60 seconds, so the first attempt happens within about a minute of the event. If an attempt fails, Lendiom retries on a backoff schedule:

| Attempt | Wait after the previous failure | Approximate time since the event |
|---|---|---|
| 1 | — | within ~1 minute |
| 2 | +1 minute | ~2 minutes |
| 3 | +30 minutes | ~30 minutes |
| 4 | +4 hours | ~5 hours |
| 5 | +19 hours | ~24 hours |

After the fifth failed attempt the delivery is marked **failed** and no further attempts are made — five attempts spanning roughly a day. Every attempt (timestamp, HTTP status code, error, and duration) is recorded in the endpoint's [delivery log](./webhooks-overview#the-delivery-log), so you can see exactly what your endpoint returned and when.

Notes:

* Retries resend the **exact same body** with the same envelope `id`; only the signature timestamp is fresh.
* Each delivery retries independently — one stuck delivery does not block others.
* If the endpoint is deleted while deliveries are pending, those deliveries are not sent.
* Failed deliveries are not replayed automatically after the schedule is exhausted. If your receiver was down for longer than a day, use the delivery log to see what was missed and reconcile from your loan and transaction data in Lendiom.

## Idempotency & Duplicate Events

Design your receiver to process the same logical event more than once without side effects. Two distinct situations produce repeats:

1. **The same delivery, retried.** If your endpoint failed or timed out (or your `2xx` never reached us), the retry has the **same envelope `id`** and the same body. Track processed `id` values (e.g. in a unique-keyed table) and skip any you have already handled.
2. **A new delivery for the same underlying object.** Editing a successful transaction re-fires `payment.received` for the same `data.transactionId` with a **new** envelope `id`. Likewise, a loan can genuinely go late more than once over its life, producing multiple `loan.past_due` events. For business-level deduplication, key on the event type plus the object ID (`data.transactionId` for payment events, `data.loanId` for loan status events) and treat repeats as updates.

**Ordering is not guaranteed.** Deliveries are independent and retries can reorder them — a `loan.paid_off` could arrive before the `payment.received` for the payment that paid the loan off. Use `createdAt` to order events for the same object, and rely on your own reads of the Lendiom app for authoritative current state rather than replaying events into state blindly.

## Endpoint URL Requirements

Endpoint URLs are validated when you create or update an endpoint:

* Must be a valid URL with an `http` or `https` scheme — and outside of local development, **`https` is required**.
* Must include a host.
* Must not point at an internal or private destination. Rejected outright:
  * `localhost`, any `*.localhost`, `*.local`, or `*.internal` hostname.
  * IP-literal hosts that are loopback (`127.0.0.1`, `::1`), private-range (`10.x.x.x`, `172.16.x.x`–`172.31.x.x`, `192.168.x.x`), link-local, or unspecified (`0.0.0.0`).

These rules protect against server-side request forgery (SSRF) — they stop a webhook endpoint from being pointed at infrastructure that should never receive outside traffic. Because Lendiom also refuses to follow redirects, an allowed URL cannot bounce a delivery into a private network either.

To develop your receiver locally, use a tunneling tool (such as ngrok or Cloudflare Tunnel) that gives your local server a public `https://` URL, and register that URL as the endpoint.

## Security Checklist

* Store the endpoint secret in a secret manager or environment variable — never in source control.
* Verify the `X-Lendiom-Signature` header on every request, with a constant-time comparison.
* Enforce a timestamp tolerance (e.g. 5 minutes) to blunt replay attacks.
* Serve your endpoint over HTTPS with a valid certificate (a TLS failure counts as a failed attempt).
* Don't put sensitive values in the endpoint URL itself — URLs tend to end up in logs on both sides.
* Treat webhook data as a notification, not as your source of truth: for anything money-critical, confirm current state in Lendiom before acting.

## Troubleshooting Failed Deliveries

The endpoint's [delivery log](./webhooks-overview#the-delivery-log) records every attempt with its status code, error, and duration. Common patterns:

| Symptom in the delivery log | Likely cause | Fix |
|---|---|---|
| `the endpoint responded with status 301` (or another `3xx`) | Your server redirects, e.g. `http` → `https` or adding a trailing slash | Register the final URL exactly; Lendiom never follows redirects |
| `the endpoint responded with status 401` / `403` | Your framework's auth or CSRF middleware is blocking the request | Exempt the webhook route from session/CSRF auth; authenticate via the signature instead |
| `the endpoint responded with status 404` | Wrong path in the registered URL | Update the endpoint URL |
| `the endpoint responded with status 400` | Your own signature verification is rejecting the request | Check you verify against the **raw** body and use the correct endpoint secret (each endpoint has its own) |
| `the endpoint responded with status 500` | Your handler is throwing before it responds | Acknowledge first, process async; check your server logs for the matching request |
| A timeout / `context deadline exceeded` error | Your handler takes longer than 10 seconds | Respond immediately and process the event in the background |
| TLS or certificate errors | Expired/invalid/self-signed certificate on your endpoint | Fix the certificate; self-signed certificates will not work |
| `the webhook endpoint no longer exists` | The endpoint was deleted while this delivery was still pending | Expected — nothing to fix |
| Nothing arrives at all, and no deliveries appear in the log | The endpoint is inactive, or it isn't subscribed to the event type | Check the endpoint's active flag and event selection; events that occur while inactive are not queued retroactively |

When testing changes to your receiver, remember the [test event](./webhooks-overview#sending-a-test-event) — it exercises the full pipeline (signing, delivery, logging, retries) without waiting for a real payment.
