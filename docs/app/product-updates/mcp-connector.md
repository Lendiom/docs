---
id: mcp-connector
title: Connecting Your AI Assistant to Lendiom
---

*Link Claude — or any MCP-compatible AI assistant — to your Lendiom account so you can ask about your loans, rentals, clients, and invoices in plain language and get live answers.*

---

## What is the Lendiom connector?

The Lendiom connector is a secure bridge between your AI assistant and your Lendiom data, built on the open **Model Context Protocol (MCP)**. Once you connect it, your assistant can look things up and take supported actions in Lendiom **on your behalf** — no copying and pasting, no exporting spreadsheets.

It is a **custom connector**: hosted by Lendiom, multi-user, and protected by **OAuth 2.1**. That means:

- You sign in with **your own Lendiom login** — the assistant never sees your password.
- You choose **exactly which business** (organization) the assistant may access.
- The connection uses a **limited, delegated token**, not a full account session.
- You can **revoke** access at any time, instantly.

**Note**: we recommend creating a dedicated user to use for the connectors with custom permissions, that way you are in full control over what the AI Assistant does via the MCP.

---

## How it helps

Instead of navigating screens and running reports by hand, you can just ask. For example:

- *"How many loans in Faith Properties are past due, and by how much?"*
- *"Show me this month's total collected across all my organizations."*
- *"Which clients have an undeliverable mailing address on file?"*
- *"Draft a text reminder for tenants whose rent is due in 3 days."*

Your assistant reaches Lendiom through a set of **organization-scoped tools** grouped by area:

| Area | Examples of what it can do |
| --- | --- |
| Clients | Look up client details, contact info, and status |
| Loans | Read balances, schedules, transactions, payoff figures |
| Rentals | Read leases, tenants, rent status |
| Invoices | Look up invoices and their payments |
| Payments | Review collected/received/pending totals, unapplied payments |
| Communication | Draft and review SMS/email activity |
| Dashboard & Reports | Pull month totals and generate/read reports |
| Documents | Check document-signature status |
| Inventory | Look up tracts and inventory records |

>

The connector currently exposes ~69 read-and-act tools across these areas. The exact set may grow over time; your assistant discovers the available tools automatically when it connects.

---

## Before you begin

You'll need:

1. A **Lendiom account** you can log into.
2. Membership in **at least one organization** in Lendiom.
3. An **MCP-compatible AI assistant** that supports *custom connectors* (for example, Claude on web or desktop or ChatGPT).
4. The **Lendiom connector URL**: `https://mcp.lendiom.com/mcp`

---

## How to connect (step by step)

1. **Get the connector URL from Lendiom.** In Lendiom, either click **Connect now** on the "Introducing the Lendiom MCP" banner, or go to **Account → Settings → Security → Connections** and open **"How to connect an AI assistant."** Copy the connector URL shown there.
2. **Add a custom connector in your assistant.** In your AI assistant's settings, choose **Add custom connector** (wording varies by app) and paste the Lendiom connector URL.
3. **Sign in to Lendiom.** Your assistant opens a Lendiom login/consent page in your browser. If you're not already signed in, log in as you normally would.
4. **Choose which organizations to grant.** On the **consent screen** you'll see which application is requesting access and where it will send you. Tick the **organization(s)** you want this connection to reach. Nothing is pre-selected, and you must pick at least one. Then click **Approve**.
5. **You're connected.** Your browser returns to the assistant and the connection becomes active. Try a prompt like *"List my organizations in Lendiom."* to confirm it works.

If you ever need to reconnect (for example after revoking), just repeat these steps.

---

## Choosing which organizations to grant

The connection can only ever reach the organizations you select on the consent screen — even if your Lendiom account belongs to more. Requests for any **non-selected** organization are treated as "not found," with no indication that the org exists. To change the scope, **revoke the connection and reconnect**, selecting the organizations you want.

---

## What the connection can and can't access

**It can:**

- Read and act on **organization-scoped data** (loans, rentals, clients, invoices, payments, communication, reports, inventory) for the organizations you selected.
- Read your basic **user profile** (read-only).

**It cannot:**

- Access **account management** — it can't change your password, email, or passkeys.
- Access **admin** functions.
- Reach organizations you did **not** grant.
- Act outside the connector — the token only works through the Lendiom connector.

This is enforced server-side, not just in the assistant.

---

## Managing and revoking connections

Go to **Account → Settings → Security → Connections** to see every connected assistant, including:

- The application name and where it sends you.
- The organizations it can access (by name).
- When it was connected.

Click **Revoke** on any connection to cut off access **immediately** — the assistant's token stops working on its next request, and it can no longer refresh. You'll get an email and in-app notification whenever a connection is added or removed, so unexpected activity is easy to spot.

---

## Security & privacy

- **OAuth 2.1 with PKCE** — the industry-standard delegated-authorization flow; your password is never shared with the assistant.
- **Least privilege** — the connection is limited to org-scoped data plus your read-only profile; sensitive account/admin/voice routes are denied.
- **You pick the scope** — access is confined to the organizations you approve.
- **Short-lived tokens** — access tokens expire after 1 hour; access codes are single-use and expire in 5 minutes.
- **Rotating refresh tokens** — if a refresh token is ever reused (a sign of theft), the whole connection is automatically revoked.
- **Sender-constrained** — a leaked token can't be replayed against Lendiom's public API.
- **Revocable and auditable** — revoke anytime; connect/disconnect events notify you by email and in-app.
- **Hashed at rest** — authorization codes and refresh tokens are stored hashed, not in the clear.

---

## Troubleshooting

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| "Invalid authorization request" on the consent page | The connection was started with missing parameters | Start the connection again from your AI assistant, not by opening the URL directly |
| Approve button is disabled | No organization selected (or your account has none) | Select at least one organization; if you have none, finish setting up your organization first |
| Assistant says it isn't authorized / keeps asking you to sign in | Token expired or the connection was revoked | Reconnect from **Account → Settings → Security → Connections** |
| Assistant can't find data you expect | That organization wasn't granted | Revoke and reconnect, selecting the right organization(s) |
| "We could not load your organizations" on consent | Temporary load error | Retry; if it persists, contact support |
| Nothing happens after you click Approve | Assistant lost the connection mid-flow | Restart the connect flow from the assistant |

---

## Frequently asked questions

**Does the assistant get my password?** No. You log in to Lendiom yourself; the assistant only ever receives a limited, revocable token.

**Can it see all my organizations?** Only the ones you select when you connect.

**Can it change my account or make admin changes?** No — account management, admin, and voice are blocked for connector access.

**How do I turn it off?** Revoke the connection under **Account → Settings → Security → Connections**. It stops working immediately.

**Which assistants are supported?** Any assistant that supports MCP custom connectors. Claude is the primary tested client; others that speak MCP should work.

**Is there an extra cost?** See your Lendiom plan details / contact support for the latest on availability and pricing.

---

## Limits & known limitations

- One full-access scope (`mcp` ) today — there isn't yet a finer-grained "read-only vs. act" toggle per connection.
- Changing which organizations a connection can reach requires revoke-and-reconnect.
- The set of available tools may change between releases.

---

## Getting help

If you get stuck, reach out to Lendiom support from within the app or at your usual support channel, and include:

- What you were trying to do and the exact prompt.
- Which organization(s) you granted.
- Any error message shown on the consent page or in your assistant.
