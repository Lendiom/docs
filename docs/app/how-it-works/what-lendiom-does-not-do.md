---
id: what-lendiom-does-not-do
title: What Lendiom Does Not Do (Yet)
---

This page exists so you can stop looking. Everything listed here is genuinely absent or genuinely broken — not hidden behind a permission, not tucked into a menu you have not found, not waiting on an add-on. If something you need is on this list, the answer is a workaround or a support request, not more hunting.

Two sections. The first is things Lendiom never built. The second is worse: things you can *see* in the interface that do not work. A greyed-out button reads like a permission problem or a missing add-on, and people burn real time chasing it.

:::info

This list reflects the current release. Items move off it as they ship — check the [Changelog](../product-updates/changelog.md) rather than assuming this page is eternal.

:::

## Not built

### Reporting

| What you may be looking for | The situation |
| --- | --- |
| Rent roll | No such report. The report library is a fixed list, and rent roll is not in it. |
| Occupancy report | Nothing reports on units occupied versus vacant. |
| Per-loan billing statement | There is no monthly statement document. Lendiom can produce an amortization schedule, a payoff letter, and a payment letter for a loan — none of them is a statement of account activity. |
| Organization-wide audit log | No record of who changed what, who signed in, or who deleted something. |

The reports that do exist are enumerated in [Reports Library](../guides/reports-library.md). The list is fixed — you cannot define your own report, and there is no report builder.

On the audit-log point: the **Recent Events** feed on the dashboard is sometimes mistaken for one. It is a business-activity feed (tracts sold, loans created, invoices paid), not a change log, and it cannot be filtered or searched. See [Dashboard](./dashboard.md). Individual invoices keep their own audit trail, but nothing rolls up across the organization.

### Loans

| What you may be looking for | The situation |
| --- | --- |
| Charge-off status | Not one of the loan statuses. |
| Loan transfer or assumption | You cannot move a loan to a different borrower. |

There is no way to change a loan's borrower after creation. No screen offers it and no endpoint accepts it. [Refinancing](../guides/refinancing-a-loan.md) is not a workaround either — the refinance copies the original borrower onto the successor loan and gives you no chance to pick a different one. To move a contract to a new buyer, create a new loan for them and close the old one.

For ending a loan without a payoff, the terminal statuses are Paid Off, Repossessed, Canceled, and Refinanced — see [Loan Status](./loan-status.md) and [Ending a Loan](./ending-a-loan.md). Pick the closest fit and put the real story in a note.

### Property and land

| What you may be looking for | The situation |
| --- | --- |
| Split, subdivide, or combine a tract | No such action. |
| GIS import | Nothing accepts a shapefile, GeoJSON, or any other boundary format. |
| Parcel boundaries | Lendiom stores parcel *numbers* as plain text. It stores no geometry — no polygons, no acreage derived from a boundary. |
| Interactive map | There is no map you can pan, zoom, or click. |

To split a tract, create the new tracts and retire the old one by hand. Acreage, cost, and label are each editable on an existing tract, so you can reshape one in place if the change is small — [Working with Tracts](../guides/working-with-tracts.md) covers the individual controls.

The one map-like feature is a **Preview Map** button on a tract. It opens a single static satellite image with a pin dropped on the coordinates, generated from the latitude, longitude, and zoom you typed in yourself. Nothing is drawn on it, nothing is clickable, and it does not know your parcel exists.

### Rentals

| What you may be looking for | The situation |
| --- | --- |
| Eviction case tracking | Eviction and Evicted are statuses on a rental and nothing more. There is no case number, court date, filing, or document trail. |
| Insurance module | Lendiom tracks no policies, carriers, coverage amounts, or expiration dates. |

Escrow is the closest thing to insurance handling, and it is deliberately generic: a balance, a per-payment amount, and credits and disbursements you record. It does not know what the money is for. See [Loan Escrow](./loan-escrow.md).

[Ending a Lease](../guides/ending-a-lease.md) covers the eviction statuses in detail, including why setting **Eviction** does not stick overnight.

### Integrations and access

| What you may be looking for | The situation |
| --- | --- |
| Outbound webhooks | Lendiom sends no events to your endpoints. Every webhook in the system is inbound, from payment and messaging vendors into Lendiom. |
| API keys | You cannot generate a key, token, or secret for your organization. |
| Push notifications | No mobile or browser push. |

The supported programmatic path is the OAuth-based connector described in [Connecting Your AI Assistant to Lendiom](../product-updates/mcp-connector.md). You authorize an assistant against your own login and scope it to one organization — there is no key to copy and no way to point a script at Lendiom directly.

Notifications reach you in the app and by email or SMS, per the preferences in [Notification Settings](./notification-settings.md). Nothing arrives on a phone's lock screen.

### Organization and account

| What you may be looking for | The situation |
| --- | --- |
| Timezone setting | Every organization runs on `America/Chicago` and no screen or API changes it. |
| Logo or branding upload | Lendiom stores no organization logo. Nothing you upload becomes letterhead. |
| Plan change | The Billing tab shows your plan read-only. You can cancel or reactivate; you cannot switch plans yourself. |
| Client merge | Two records for the same person stay two records. |
| Browser session management | No list of active sessions and no "sign out everywhere". |

[Org Settings Map](./org-settings-map.md) covers the timezone and logo gaps and who to ask. [Settings Your Lendiom Contact Controls](./support-controlled-settings.md) lists the rest of what lives on Lendiom's side.

Duplicate clients have to be reconciled by hand: move what you need onto the record you are keeping, then delete the other. [Managing Clients](../guides/managing-clients.md) covers what a client record holds. Note that the [data import](../guides/data-import.md) does de-duplicate borrowers as it loads them — that logic is not available to you afterwards.

For session security, use passkeys and two-factor authentication instead. See [Passkeys](../security/passkey.md).

## Visible but disabled

These are in the interface right now. Some are greyed out, one looks completely normal and silently does nothing.

| Where | What you see | What actually happens |
| --- | --- | --- |
| Communications page | **Email History** tab | Permanently disabled. Use the Conversations tab. |
| Rental page | **Deposit Tracking** panel | Disabled, labeled "Coming soon". The panel body reads "Coming soon". |
| Settings → Import/Export | **Download Internal Backup** | Button permanently disabled with no endpoint behind it. |
| Loan escrow setup | Escrow application step **Before Fees** | Disabled option in the dropdown. |
| Inventory → Units | Editing a unit | No edit control exists. |
| Rental actions → Status | **Terminated** | Clicking it does nothing at all. |
| Account Settings → Security | **Account Password** | "Coming Soon", disabled. |
| Account Settings → Security | **Security Questions** | "Coming Soon", disabled. |
| New inventory wizard | **Commercial** and **Other** categories | Both disabled in the dropdown. |
| Settings → Billing → Addons | **Custom Website** | Enable button disabled. |

:::warning

**Terminated on a rental is the dangerous one.** It is not greyed out. It sits in the Status submenu looking exactly like the statuses that work, and choosing it returns immediately without sending anything to Lendiom — no error, no confirmation, no change to the status tag. Use **Evicted** to close out a tenancy regardless of why it ended. [Ending a Lease](../guides/ending-a-lease.md) explains the full picture.

:::

A few of these deserve a sentence more.

**Escrow "Before Fees"** is disabled, leaving **Before Interest** and **After Principal** selectable. The help text under the dropdown is more pessimistic still and says only after principal is supported. If escrow ordering matters to your contracts, confirm the behavior on a test loan before you rely on it.

**Units cannot be edited or deleted** once created. Rows in the Units table show a pointer cursor as though they were clickable, which is misleading — nothing happens. A typo in a unit number is permanent. [Units on Multifamily](../guides/units-on-multifamily.md) covers which fields you cannot recover from.

**Download Internal Backup** is not your data export. The **Export** dropdown beside it works and produces a CSV or JSON archive; only the internal-backup row is dead. See [Exporting Your Data](../guides/exporting-your-data.md).

**Commercial and Other inventory categories** are greyed out in the category dropdown, so Land, Residential, and Multifamily are the three you can actually pick. The server itself treats Commercial and Other as valid — it is the new-inventory wizard that will not let you choose them. Put a commercial property under whichever of the three fits its structure.

**Custom Website** cannot be switched on from the Addons card — [Add-Ons](../billing/add-ons.md) covers what the add-on does and does not change. Separately, the only place in the app that generates a `lendiom.site` address for you is the Support Information step of PayArc registration, which is an odd place to find it and easy to miss.

## When something here blocks you

Contact [Lendiom Support](mailto:support@lendiom.com). Several of these — timezone, plan changes, the Custom Website — are settings Lendiom can change on your behalf in minutes even though there is no switch for you.

For the rest, say what you were trying to accomplish rather than which button you wanted. A rent roll request is usually a question about who is current and who owes, which the Portfolio and Payments Summary reports may already answer from a different angle. Being told the real goal is what gets a feature prioritized.

:::caution

Do not work around a dead end by inventing data. Recording an eviction as a fee type that moves no money, or a loan transfer as a payoff plus a new loan with a fabricated closing date, produces a ledger that will not reconcile at year end. Put the truth in a note and ask us instead.

:::
