---
id: what-lendiom-records
title: What Lendiom Records
---

When an auditor or a lender asks whether Lendiom keeps an audit trail, the accurate answer is that it keeps **several trails, each attached to a specific object** — and none for the organization as a whole. This page lists what is written, where you read it, and what is never captured.

## Per-object timelines

Clients and tracts each carry a timeline. On a client it is the **History / Timeline** card. On a tract it opens in a modal from the **Timeline** button.

An entry holds a date, a colored icon, and one line of text. Entries come from two places: Lendiom writes them automatically when something happens, and you add your own with **Add Item**.

| What happened | Timeline it lands on |
| --- | --- |
| A tract was created | That tract |
| A tract was marked sold, or its cash sale was edited | That tract |
| A tract-backed loan was created, went late, or was paid off | Every tract on the loan, and the client |
| A residential loan was created, went late, or was paid off | The inventory item, and the client |
| A cash loan went late or was paid off | The client |
| A borrower set up or canceled automatic payments | The client |
| Property tax was finalized on a tract | The tract owner |

![The Notes and history on a client, listing each recorded event in order](/img/docs/app/security/what-lendiom-records/01.png)

Two gaps are worth knowing before you rely on a timeline as evidence.

Loans and rentals have no timeline of their own. Everything a loan does is recorded against the tract, inventory item, or client attached to it, so reconstructing one loan's story from timelines alone means opening several pages. The [Story tab](../how-it-works/loan-story.md) exists for exactly this reason.

Inventory items receive timeline entries and have no timeline view. A residential loan going late writes an entry against the inventory item, and there is no card, modal, or button anywhere that displays it. The matching **note** on that inventory item is visible; the timeline entry is not.

:::caution
Timeline entries cannot be edited or deleted. The endpoints for reading, updating, and deleting a single entry return `501 Not Implemented`, and no button in the app calls them. The role editor still lists **Update** and **Delete** for `client::timeline` and `tract::timeline` — granting either one changes nothing. See [Roles and Permissions](./roles-and-permissions.md).
:::

## Notes

Notes sit on inventory items, tracts, clients, loans, and rentals. Lendiom writes system notes automatically — a loan going late, a payoff, a [recast](../guides/recasting-a-loan.md), a [refinance](../guides/refinancing-a-loan.md), a [moved due date](../guides/moving-a-due-date.md), an escrow change, a failed auto-draft — each authored as **System** and stamped with the time. You write the rest.

A system note usually carries a matching timeline entry, which is why the same sentence shows up in both places.

:::warning
Deleting a note is permanent and unlogged. There is no soft delete, no tombstone, and no record that a note ever existed. Deleting a note also deletes its timeline entry. The app disables **Edit** on system notes but leaves **Delete** enabled on them, so an auto-generated late-payment note can be removed by anyone holding Delete on that feature. If you need notes to be tamper-evident, withhold the `::notes` Delete action from every role that does not need it.
:::

## The Loan Story

The **Story** tab assembles the loan, its schedule, its transactions, its notes, and the client's messages and calls into one narrative. It is a view, not a record — it is rebuilt on every load and nothing on it is stored except the optional polished narrative, which is cached and can be regenerated.

The timeline on it is capped at **50 events**; past that, the oldest are dropped. Do not treat it as the complete history of a loan. Full details are in [The Loan Story Tab](../how-it-works/loan-story.md).

## Invoice activity log

Invoices carry a genuine append-only audit trail, shown as the **Activity Log** panel on the invoice page. It is the most detailed record in the product.

| Recorded | Examples |
| --- | --- |
| Lifecycle | Created, updated, cloned, cancelled, deleted, status changed, marked overdue |
| Delivery | Sent, marked sent, send failed, reminder sent, overdue reminder sent, email delivered, email opened |
| Money | Payment added, payment reversed, online payment initiated, succeeded, or failed |
| Documents and links | PDF generated, entity linked, entity unlinked |
| Field changes | The field name, its old value, and its new value |

Each entry records the action, a details line, the changed fields, the timestamp, and who did it. Actions taken from the client portal are recorded with **no user attached** — the client's name appears in the details text instead.

![The Activity Log panel on an invoice, listing each recorded event in order](/img/docs/app/security/what-lendiom-records/02.png)

:::caution
Two limits apply. **Viewed** is written once — only on the first view while the invoice is still in **Sent** status — so repeat views by the client are not recorded. And the panel loads the 100 most recent entries with no paging control, so an invoice with a longer history has older entries stored but not reachable from that panel.
:::

The lifecycle behind these entries is in [Invoices Overview](../how-it-works/invoices-overview.md).

## Signature audit files

When a signature request completes, Lendiom downloads the signing provider's audit log PDF and stores it against the request. Pull it from the row's action menu on **Documents → Signatures**, where a completed request offers **Download Audit Log**. That table also carries **Created By**, **Updated By**, and **Updated At** columns for each request.

Completed requests cannot be deleted — the server refuses. A request that is out for signature becomes **Canceled** rather than being removed. Only drafts and already-canceled requests are deleted outright, and those take their files, timeline entries, and notes with them permanently. See [Document Signing](../guides/document-signing.md) and [After You Send](../guides/after-you-send.md).

## Document automation history

Every rule evaluation that matched produces exactly one write-once record: **sent**, **skipped**, or **failed**. Evaluations that were never candidates — a status that did not match, a tier that was skipped — are not recorded at all.

Each record captures the automation type, what triggered it (status change, late-fee tier, payment reminder, upcoming payment, or successful payment), the previous and new status, the tier or reminder-day count, the template's ID and its name **as of that moment**, the outcome, the skip reason or error text, and the letter that resulted. Because the template name is snapshotted, renaming or deleting a template later does not rewrite the history.

Read it org-wide at **Documents → Automation History**, or per loan and rental in the **Document Automation History** section of those pages.

![The Document Automation History page, with its filterable table of sent, skipped and failed jobs](/img/docs/app/security/what-lendiom-records/03.png)

## Delivery and import history

| Record | Retained | Covered in |
| --- | --- | --- |
| Scheduled report deliveries | The 50 most recent, with per-recipient results and a resend action | [Scheduled Reports](../guides/scheduled-reports.md) |
| Data import sessions | Every session, with a per-entity ledger of what was created | [Data Import](../guides/data-import.md) |

An import session is deliberately hard to erase. A **completed** import cannot be deleted, because it is the record of what was brought in while the imported loans and clients live on. A **purged** import cannot be deleted either, because it is the record of both the import and the purge that undid it. Only failed or interrupted sessions can be removed, and the app greys out **Delete** on the rest with a tooltip explaining why.

![The import sessions list in Org Settings, with each session and its available actions](/img/docs/app/security/what-lendiom-records/04.png)

## Recent Events

The dashboard's **Recent Events** feed is the closest thing to an organization-wide activity view, and its scope is narrow: it covers tract sales and reclaims, new tracts, developments, loans, clients, non-draft invoices, invoice payments, and automation outcomes. Nothing else.

The window runs **365 days** back from now, it cannot be filtered or searched, and pagination is the only control. Full behavior, including why the header reads "Last 365 (or more) days", is in [The Dashboard](../how-it-works/dashboard.md).

## What Lendiom does not record

| Not recorded | What that means |
| --- | --- |
| An organization-wide audit log | There is no feed of who did what across your organization. Every trail above is scoped to one object or one feature. |
| Login history | Each user record holds the timestamp of their most recent sign-in and nothing more. There is no session list, no IP or device record, and no "sign out everywhere" — see [Signing In](./signing-in.md). |
| Admin activity | Role edits, permission changes, member invites and removals, and organization setting changes leave no note, no timeline entry, and no log entry. |
| Field-level change history | Outside invoices, an object stores who created it and who last updated it. Both are overwritten on the next change, so you get the current answer, not the sequence. |
| Deletions | Deleting a note, a tract, a rental, or a draft signature request removes it and its attachments with no tombstone anywhere. |

What survives is the money. Reversed transactions are never removed. The transaction stays in the table with its status set to **reversed**, and its Comment column is rewritten to read the reversal reason followed by the name of whoever performed it — `Reversal reason: clerical error (by Jane Doe)`. The reversal time is stored on the row as well. See [Reversing a Transaction](../guides/reversing-a-transaction.md).

<!-- screenshot: a loan's transaction table with one row whose Status column reads "reversed" and whose Comment column reads "Reversal reason: clerical error (by Jane Doe)", with normal rows above and below it -->

:::info
Notes on inventory items and tracts are included in the organization backup; timeline entries, invoice activity logs, and automation history are not. See [Exporting Your Data](../guides/exporting-your-data.md) for what a backup contains and where to get the rest.
:::
