---
id: security-and-data
title: Security and Data Handling
---

This page is written for whoever has to answer for your data: what identifiers Lendiom holds, where each one sits, who can pull it back out, and which controls do not exist yet. Everything below reflects how the product actually behaves, including the parts that are less flattering.

## Where sensitive identifiers live

| Data | How it is stored | Who can retrieve it |
| --- | --- | --- |
| Client tax ID (SSN, EIN, ITIN) | The client record keeps only the last four digits and the type. The full number is encrypted with age public-key encryption and written to a separate secrets store under a key naming the organization, client, and entity. It is never written into the client record itself. | `client::secrets` **read**, plus your password, one entity at a time |
| Your business EIN | Same split: last four on the organization, full value encrypted in the secrets store. | No endpoint returns it to a browser. It is decrypted server-side only when 1098s are e-filed |
| Beneficial owners: name, title, ownership percentage, address, phone, email, date of birth, SSN, and driver's license image | On the organization record, as entered. Not in the encrypted secrets store. | `organization` **update**, through a separate owners endpoint |
| Your business bank account (routing and account number) for card processing | On the organization record, as entered. | `billing` **update**, through the PayArc financial endpoint |
| Member passwords | A bcrypt hash of a SHA-256 digest, salted per user and combined with a server-side pepper that is never stored in the database. | Nobody. The hash is not serialized to any API response |
| Authenticator secrets and recovery codes | The TOTP secret goes into the encrypted secrets store; recovery codes are stored hashed and consumed on use. | Nobody |

Every read, write, and delete against the encrypted store appends an audit record holding the action, the key, the timestamp, and a performer tag that carries the acting user's ID and IP address. Deleting a client entity deletes its tax ID secret along with it.

:::caution
Field-level encryption covers tax IDs and authenticator secrets. It does not cover owner SSNs, owner dates of birth, driver's license images, or your business bank account — those sit in the organization record as entered. Treat access to `organization update` and `billing update` accordingly when you build roles.
:::

<!-- screenshot: a client's entity card showing the Tax ID row rendered as "SSN ••••1234" with a small view control beside it, for a fictional client such as "Jane Doe" at Demo Land Company -->

## Revealing a client tax ID

Two independent gates stand between a staff member and a full SSN:

1. **The permission.** The reveal endpoint requires `client::secrets` **read**. Without it, the control is not disabled — it is not rendered at all, so there is nothing to click. Neither the seeded `property-manager` nor `viewer` role holds it; see [Roles and Permissions](./roles-and-permissions.md).
2. **The password.** The request carries the signed-in user's own password and is rejected before the secret is fetched if it does not match. A stolen or borrowed session is not enough.

The password travels in the request body, never a URL parameter, and that route — along with every route that accepts a tax ID on the way in — is on the server's no-body-logging list.

:::caution
One report bypasses the `client::secrets` gate. The **Yearly 1098 Report** writes full tax identifiers into its spreadsheet and is protected only by password confirmation plus organization membership — it does not check `client::secrets`. Anyone who can run reports can produce that file. See [Reports Library](../guides/reports-library.md) and [E-Filing 1098 INTs](../guides/e-filing-1098s.md).
:::

<!-- screenshot: the "Tax Info" modal open over a client page, showing the blue notice "In order to view their tax information, you must enter your password." above a password field and a Confirm button -->

## What the browser never receives

Some fields are deliberately withheld from the organization payload the app loads on every page. Owner records are the clearest case: they are excluded from that object entirely and served only from their own endpoint, which is why a separate call exists at all. Also withheld: pending invitation codes, your payment processor keys, the messaging auth token and webhook secret, and every member's password hash and security preferences.

Request logging is filtered too. Bodies are dropped on login, passkey, password reset, invite acceptance, two-factor, client and entity create/update, legal and owner submission, driver's license upload, bank details, the Lendiom Pay payment method endpoints, and document signing tokens. Bearer tokens and anything tagged as a secret are redacted from application logs.

## Staff signing in as a borrower

A member holding `client` **update** can open [Lendiom Pay](../../pay/logging-in.md) as one of your clients, without that client's credentials. This is how support questions get answered quickly, and it is a genuine access path you should account for. The seeded `property-manager` role holds `client` update, so it can do this out of the box; `viewer` cannot.

| Property | Behavior |
| --- | --- |
| Session length | Two hours. A borrower's own sign-in lasts 25 hours, or 32 days when they request the extended "stay signed in" option while entering their code |
| Capability | A full borrower session. There is no read-only mode |
| Attribution | Any transaction created during the session is stamped with the impersonating user, and the request is written to the server log with the user, client, and organization |
| Borrower notice | None. The client is not told the session happened |
| Opt-out | Enforced per organization — when set, the request is refused outright |

:::caution
The opt-out works, but there is no switch for it in the app. No settings screen or API endpoint sets it; Lendiom has to set it on your organization. If you want impersonation off, ask [Lendiom Support](mailto:support@lendiom.com) and confirm in writing that it has been applied.
:::

![The action bar on a client page, with the Lendiom Pay and mail controls](/img/docs/app/security/security-and-data/03.png)

## Lendiom's own access

Lendiom system administrators can list **every** organization and every user account, search across them, and view aggregate analytics. That directory includes each organization's legal profile, billing status, messaging registration, and contact details. Owner records are excluded there too.

Reaching the records *inside* an organization — clients, loans, rentals, files, documents — is a different check. Every organization-scoped route requires an actual membership and role in that organization, and the permission engine has no system-administrator bypass. Lendiom staff who need to work inside your account are added as members like anyone else, which means they show up in your Members list. Review it periodically; see [Adding Users to Your Organization](../guides/adding-users-to-your-organization.md).

Two systems receive data during onboarding, and only one of them is internal.

Submitting a card-processing application opens a work item in **Plane**, a hosted project-management service at `api.plane.so`. It is a sub-processor, not an internal system, and it is listed as one below. That work item carries your business details — legal name, office and registered addresses, business structure, the last four of your EIN, and your stated processing volumes — and, for each owner, their name, title, ownership percentage, email address, phone number, full mailing address, date of birth masked to the birth year, and the last four of their SSN. It also carries the last four of the bank routing and account numbers you supplied for card processing.

Separately, several milestone events post notifications to Lendiom's chat. That one is genuinely internal: a self-hosted Rocket.Chat instance at `chat.fidetech.io`, not a hosted service.

## Connecting other software

Lendiom issues no API keys, personal access tokens, or long-lived credentials. The only programmatic path in is OAuth 2.1, used by the [AI assistant connector](../product-updates/mcp-connector.md).

| Property | Behavior |
| --- | --- |
| Flow | Authorization code with PKCE, `S256` only. No client secrets are issued or accepted |
| Authorization code lifetime | Five minutes, single use |
| Access token lifetime | One hour |
| Refresh token lifetime | Thirty days, rotated on use |
| Reach | Organization-scoped data routes plus a single read-only account lookup. Account management, billing, and administrative routes are refused |
| Organization limits | The token carries the organizations you consented to, and cannot reach the others |
| Permissions | Your own role still applies. A connector can never do what you cannot do |
| Revocation | Immediate. The grant is re-checked on every single request, so a disconnected assistant is locked out on its next call rather than when its token expires |

Connecting and revoking both generate an email and an in-app notification, so an unexpected connection is visible rather than silent.

![The Security tab of Account Settings, showing passkeys, the two-factor status and the start of the connected applications list](/img/docs/app/security/security-and-data/04.png)

## Sub-processors

| Provider | What it handles |
| --- | --- |
| [Stripe](../payment-processing/stripe.md) | Subscription billing and card/ACH payment processing |
| [PayArc](../payment-processing/payarc.md) | Card and ACH processing, plus the merchant application (owner identity data) |
| Plane | Hosted project management at `api.plane.so`. Receives the card-processing application work item: your business details and each owner's identity data |
| Backblaze B2 | File and document storage; downloads use one-minute authorized links |
| Postmark | Transactional email |
| Twilio and TextGrid | SMS, MMS, and voice for the [communication portal](../communication.md) |
| Lob | Printed [letters](../guides/sending-a-letter.md) and USPS address verification |
| DocuSeal | [Document signing](../guides/document-signing.md) |
| Tax1099 | 1098 e-filing |
| OpenAI | Loan story summaries, help search, and the voice assistant (off unless your organization enables it) |
| Mapbox | Property maps |
| Sentry | Error monitoring. Every authenticated request attaches the signed-in user's ID, email address, full name, and IP address, along with tags for operating system, browser, and role. Any error Sentry receives carries all of it |
| Help Scout | Support conversations, identified by your verified email address |

## Gaps we will not paper over

<!-- screenshot: Account Settings → Security showing the two-factor section with an authenticator app enrolled and the registered passkeys listed below it -->

- **There is no two-factor enforcement policy.** TOTP and [passkeys](./passkey.md) are available and work well, but enrollment is each user's own choice. You cannot require them organization-wide, and the Members list does not report who has enrolled. Enforcement today is a conversation, not a control.
- **There is no session revocation and no "sign out everywhere."** Sign-in tokens are self-contained and valid for fourteen days. Changing or resetting a password does not invalidate sessions already issued. If a laptop goes missing, contact [Lendiom Support](mailto:support@lendiom.com) rather than assuming a password change closes the hole.
- **Removing a member does take effect at once.** Role membership is checked on every request, so revoking a role or removing someone ends their access to that organization immediately, even though their sign-in token remains valid elsewhere. This is the fastest lever you have.
- **The secret-access audit trail has no screen.** Reveals are recorded server-side with user, IP, and timestamp, but you cannot browse them in the app. Request an extract from support if you need one for an investigation.

For getting data out under your own control, see [Exporting Your Data](../guides/exporting-your-data.md).
