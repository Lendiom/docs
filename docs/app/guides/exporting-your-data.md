---
id: exporting-your-data
title: Getting Your Data Out of Lendiom
---

Your records are yours. Lendiom gives you four separate ways to pull them out, and none of them is a single "download everything" button. Each covers a different slice, and the gaps matter most at exactly the moment you need the data — when you are leaving, changing accountants, or handing a portfolio to someone else.

This page describes what each mechanism produces, what it leaves behind, and the constraints to plan around.

| Mechanism | Where | Format | Scope |
| --- | --- | --- | --- |
| Import/Export archive | Settings → Import/Export | Zip of CSV or JSON | Inventory, tracts, clients, entities, loans |
| Transaction CSV | A loan's Transactions panel | CSV | One loan's full ledger |
| Reports library | Reports | Excel (one PDF) | Aggregates by month, year, or range |
| PayArc deposit export | PayArc → Deposits | Excel | One month of settlement batches |

## The Import/Export Archive

Open **Settings**, choose the **Import/Export** tab, and look under **Exports & Backups**. The **Export** dropdown offers **CSV Export** and **JSON Export**; they produce the same records in the same folder layout, differing only in file format.

Either one opens a new browser tab that downloads a zip named after your organization, its internal ID, and the date. Everything inside sits under a single `<Your Organization>-backup/` folder.

![The Exports and Backups section of the Import/Export tab](/img/docs/app/guides/exporting-your-data/01.png)

### What the archive contains

| File in the archive | Records |
| --- | --- |
| `inventory.csv` | Every inventory item: land, residential, multifamily |
| `inventory-<id>/tracts.csv` | The tracts under that inventory item |
| `inventory-<id>/notes.csv` | Notes on that inventory item |
| `inventory-<id>/tracts/<label>-<id>/notes.csv` | Notes on that individual tract |
| `inventory-<id>/tracts/<label>-<id>/owner.csv` | The owning client's entities, written only when the tract has an owner |
| `clients.csv` | Every client record |
| `clients/<name>-<id>.csv` | The entities (people and businesses) under each client |
| `loans.csv` | Every loan with its terms, balance, statuses, and key dates |
| `loans/<label>-<id>.csv` | The same loan record, one file each |

### What the archive does not contain

The archive is built from a fixed list of collections, and a great deal of your account is not on that list.

| Not included | Where to get it instead |
| --- | --- |
| Loan transactions and payment history | Per-loan transaction CSV, or the transaction list reports |
| Rentals and rental transactions | Rental Transaction List reports |
| Invoices and invoice payments | A/R Aging Report, Payments Summary report |
| Uploaded documents and files | Download individually from each record |
| Notes on loans and clients | No export; only inventory and tract notes are archived |
| Escrow entries, unapplied payments, developments | No export |
| Letters, mail, conversations, calls, messages | No export |
| Users, roles, document templates, fillable PDFs | No export |
| Amortization schedules | Download per loan from the loan page |

:::warning
The archive is not a restorable backup. It is a flat dump of records with internal IDs as the only links between files. Nothing in Lendiom reads it back in, and it does not carry the ledger — the transaction history behind every balance lives entirely outside it.
:::

### Who can generate it

The server requires the wildcard action on the `setting` feature, which in practice means the **admin** role. The **Import/Export** tab carries no permission check of its own — it appears for anyone who can open Settings at all, which takes only read access to the organization. The **Exports & Backups** section inside it is the part gated on update access to settings, so a member on a custom role can see the **Export** button, click it, and get a permission error in the new tab. [Roles and Permissions](../security/roles-and-permissions.md) explains why the permission matrix cannot grant this.

## Per-Loan Transaction CSVs

The ledger is what the archive misses, so this is usually the export that matters most.

Open a loan, expand the **Transactions** panel, and use the **Download Transactions** split button in the panel header. The button itself gives you the simple file; the dropdown arrow offers **Simple CSV** and **Detailed CSV**. The loans list also has a **Download Transactions** row action, which always produces the simple version.

![A loan detail page with the Transactions panel expanded and the Download Transactions split button beside it](/img/docs/app/guides/exporting-your-data/02.png)

Neither file is a superset of the other.

| Version | Columns |
| --- | --- |
| Simple | date, type, status, amount, to interest, to unpaid interest, to principal, to fees, to platform |
| Detailed | internal and user-facing IDs, loan ID, org ID, date, status, method, type, adjustment type, processor and its transaction ID and auth code, amount, total amount, total to platform, loan balance, loan interest balance, days of interest, comments, reversal reason and comments, unapplied payment IDs, files, created at |

The detailed file carries the identifiers, the processor references, and the running balances — but **not** the split of each payment into interest, principal, fees, or escrow. Only the simple file has that breakdown. If you are reconstructing the ledger elsewhere, take both.

:::caution
Both versions download as `transactions_<date><minute>.csv` with no loan label or ID in the filename. Pull two loans within the same minute of the hour and you get two identically named files, distinguishable only by opening them. The detailed version at least contains a `loan_id` column; the simple version has no loan identifier at all. Rename each file as you download it.
:::

There is no bulk transaction export. One loan, one download, one at a time.

## The Reports Library

Go to **Reports**. Each row has a **Run** action and a **Download** action. Running generates a fresh file and opens it in a new tab; downloading pulls back the most recent stored copy without regenerating it. **Download** stays disabled until the report has run at least once.

![The Reports page, listing every report with its description and Last Ran At column](/img/docs/app/guides/exporting-your-data/03.png)

| Report | Period you choose | Output |
| --- | --- | --- |
| Yearly Installment Income | Year | Excel |
| Monthly Installment Income | Month | Excel |
| Yearly Transaction List | Year | Excel |
| Monthly Transaction List | Month | Excel |
| Yearly Rental Transaction List | Year | Excel |
| Monthly Rental Transaction List | Month | Excel |
| Monthly Journal Entry Report (Beta) | Month | Excel |
| Yearly 1098 Report | Year, plus your password | Excel |
| Payments Summary | Start and end date | Excel |
| Client List | Client statuses | Excel |
| Portfolio Report (Beta) | None | Excel |
| Client Address Labels | Client statuses | PDF for Avery 1" x 2 5/8" labels |

Results are kept in your organization's files under a **Report Results** folder, which is why **Download** hands back an old run instantly. For the year-end sequence, see [Year-End Close and Tax Season](./year-end-close.md).

Reports are the only export Lendiom sends on a schedule. Under **Settings → Scheduled Reports** you can have a payments summary digest emailed daily, weekly, or monthly to up to ten recipients, with the Monthly Transaction List, Monthly Installment Income, or Monthly Journal Entry attached on monthly schedules. The archive cannot be scheduled by any means.

## The PayArc Deposit Export

If you process payments through [PayArc](../payment-processing/payarc.md), open **PayArc → Deposits**, pick a month, and use the **Export** button. Despite the name people usually give it, the file is an Excel workbook named `PayArc-Deposits-<year>-<month>.xlsx`, not a CSV.

It is built for reconciliation. The first block summarises every settlement batch in the month — settlement date, batch reference, gross total, net amount, refund amount, transaction count, plus a totals row. Below that, each deposit gets its own block listing the line items with date, type, amount, client, related loan or rental, internal transaction ID, any unapplied payment, and a **Matched** column. Line items Lendiom cannot tie back to an internal record are flagged **UNMATCHED** in red.

![The PayArc Deposits page, with its month picker above the settlement batches](/img/docs/app/guides/exporting-your-data/02.png)

Building the workbook calls PayArc for each batch's line items, five batches at a time, so a busy month takes noticeably longer than a quiet one.

## Other Downloads

- **A/R Aging Report** — the button on the Invoices page and the dashboard's aging tab produces an Excel workbook of outstanding invoice balances.
- **Filed 1098 forms** — after e-filing, the 1098 INTs tab offers a per-borrower PDF and a **Download All** zip of every filed form for the year. See [E-Filing 1098 INTs](./e-filing-1098s.md).
- **Custom field definitions** — the **Export** button on the custom fields settings tab saves your field definitions as JSON. Definitions only; no values.

## Constraints to Plan Around

**Everything is generated while you wait.** The archive, the transaction CSVs, the reports, and the PayArc workbook are all built on demand and held in memory before a single byte reaches you. There is no job queue and no "we will email it when it's ready." A large organization can sit on a spinning tab long enough for the connection to time out, and the retry starts from zero. If the archive times out repeatedly, contact [support@lendiom.com](mailto:support@lendiom.com) rather than hammering the button.

**Download links expire in about a minute.** Report results and other stored files are handed to your browser as short-lived authorized links. A link that sits in a tab for a few minutes before you click it will fail. Use **Download** again to mint a fresh one.

**One button never works.** The **Download Internal Backup** row under Exports & Backups describes an unstructured backup the server generates every Monday morning. Its button is permanently disabled and there is no endpoint behind it. That backup is not something you can retrieve yourself.

**Billing status disables exports before cancellation does.** Run, Download, and Download Transactions are all disabled when your subscription is not active, trialing, or incomplete — a past-due account loses them. The archive export is not gated this way and keeps working.

<!-- screenshot: a loan page for an organization whose subscription is past due, with the "Download Transactions" split button visibly greyed out and a tooltip explaining the billing status -->

:::warning
**Once a subscription is cancelled, the exports go away.** Lendiom keeps working normally for ten days after the cancellation date. After that, the navigation menu disappears and every page is replaced by a single "Subscription Cancelled" screen with a Contact Us button. Reports, transaction CSVs, the archive, and the PayArc export all become unreachable at the same moment.

If you are leaving, pull everything **before** you cancel, or at the very least inside those ten days.
:::

## A Departure Checklist

1. Generate the archive in both CSV and JSON. The JSON preserves nested structure the CSV flattens.
2. Download both the simple and detailed transaction CSV for every loan, renaming each file with the loan label as you go.
3. Run the Yearly Transaction List and Yearly Installment Income for every year you have been on Lendiom, plus the Yearly Rental Transaction List if you have rentals.
4. Run the Client List, the Portfolio Report, and the Payments Summary across your full date range. Export the A/R Aging Report if you invoice.
5. Export every month of PayArc deposits you need for reconciliation.
6. Download the documents you care about from each record — nothing bulk-exports them.
7. Only then cancel.

If something on this list will not produce what you need, email [support@lendiom.com](mailto:support@lendiom.com) before you cancel, while your account is still reachable.
