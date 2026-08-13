---
id: files-and-storage
title: Files and Storage
---

Every document your organization uploads or Lendiom generates lands in one file store. The **Files** page shows all of it at once; the **Files** card on a client, property, tract, or loan shows the slice belonging to that record. Both are the same browser over the same data — a PDF you drag onto a loan is the same PDF you find under **Loans → that loan** on the Files page.

This page covers what is in there, which folders Lendiom builds on its own, what uploading and deleting really do, and what the storage figure on your dashboard means.

## Opening Files

**Files** sits in the main menu below Reports. It needs the `file` feature's read action; without it the page returns 403. The per-record cards are gated separately by `client::files`, `inventory::files`, `tract::files`, `loan::files`, and `rental::files`. See [Roles and Permissions](../security/roles-and-permissions.md).

![The Files page at its top level, showing the automatically created folders](/img/docs/app/how-it-works/files-and-storage/01.png)

## What the top level holds

| Entry | What is inside | Can you upload here? |
| --- | --- | --- |
| **Files** | Organization-level uploads — anything not tied to a specific record | Yes |
| **Inventories** | A folder per property, and a **Tracts** subfolder on properties you finance, holding a folder per tract | Only inside a property or tract |
| **Loans** | A folder per loan, named with the loan label | Only inside a loan |
| **Clients** | A folder per client, named with the client's display name | Only inside a client |
| **Fillable PDFs** | A folder per [fillable PDF](../guides/adding-fillable-pdf.md) you have set up | No |
| **Reports** | A folder per report in the [reports library](../guides/reports-library.md) | No |

The five grouping folders are scaffolding, not real folders. You cannot rename them, color them, drop files on them, or delete them — the toolbar inside them offers only **Refresh** and **Download**. The same read-only treatment applies everywhere under **Fillable PDFs** and **Reports**, since those files are produced by Lendiom and are meant to be pulled, not edited.

:::info
Rentals have no folder on the Files page. Files attached to a rental exist in the store and are reachable through the API, but nothing in the Files page lists them.
:::

## Folders Lendiom creates for you

You never make these. Lendiom creates each one the first time it has something to put in it, then reuses it.

| Folder | Appears on | Filled by |
| --- | --- | --- |
| **Letters** | The loan | Payoff letters (`Pay Off - <date>.pdf`) and successful-payment letters (`Successful Transaction - <date>.pdf`) |
| **Schedules** | The loan | Printable amortization schedules (`Amortization Schedule - <date>.pdf`) |
| **Imported from MoneyLender** | The loan | Attachments and the source-transaction PDF from a [data import](../guides/data-import.md) |
| **Generated Documents** | The loan, tract, client, or the organization's own **Files** folder | Document Builder, each time you generate a PDF from a template |
| **Invoices** | The client | Invoice PDFs, as [invoices](./invoices-overview.md) are issued |
| **Notices** | The client | [Property tax](../guides/collecting-property-tax.md) notice letters |
| **Letters (mail)** | The client | Physical mail sent to that client |
| **Conversations** | The client | A subfolder per person or company on the client |
| **Filled PDFs** | The fillable PDF | Each filled copy you produce |
| **Report Results** | The report | The file from every run of that report |

![The Files card on a loan, with its folders and the create-folder and upload controls](/img/docs/app/how-it-works/files-and-storage/05.png)

Generated folders on a loan or client behave like normal folders: you can rename them, recolor them, and delete what is inside. That cuts both ways — deleting a payoff letter removes the only stored copy, and regenerating it later produces a letter with today's balances, not the old ones.

:::caution
Two generated areas do not fill in. The **Conversations** subfolders (`Jane Doe's Attachments`) stay empty no matter how many attachments a conversation carries — read those in the [conversations inbox](../communication/conversations-inbox.md) instead. And documents generated for a rental are stored but never surface anywhere in Files.
:::

## Uploading

Open a folder that accepts uploads, choose **Upload Files**, then drag files onto the dropzone or click it to browse. Queued names are listed below the dropzone with a **cancel** link each; **Upload** sends them all at once.

Files land in the folder you were standing in when you opened the modal, attached to the record that folder belongs to. The name Lendiom stores is the file's own name — there is no rename step during upload.

Lendiom applies no size limit of its own on these uploads. Very large files are held back only by your connection and the browser. Two other upload paths in the app are capped: data-import CSVs at 200 MB per file, and signature-request attachments at 50 MB per file with 150 MB across a package and 20 attachments maximum.

Uploaded PDFs are inspected once on the way in. If a PDF is letter size, it becomes eligible for [physical mail](../guides/sending-a-letter.md) and picks up a **Snail Mail** action in the file browser, along with a page count used to price the send.

:::caution
**Snail Mail** appears on any letter-size PDF, but only works from a loan, client, or tract. On an organization-level file it opens and immediately reports that sending is not supported for that type. On a tract, the tract needs an owner set, or the send is refused.
:::

![The Upload Files modal, with its click-or-drag dropzone](/img/docs/app/how-it-works/files-and-storage/02.png)

## Renaming, moving, coloring, and new folders

**New Folder** asks for a name in a plain browser prompt and creates the folder where you are standing. **Rename** and **Change Color** each open a small modal; color applies to folders only and tints the icon.

Drag a file onto another folder to move it. Lendiom asks to confirm and warns that the move is not reversible, which really means there is no undo — the file is fine, it is just somewhere else.

:::caution
Rename changes the display name only. The download uses exactly the name you typed, so dropping the `.pdf` off the end produces a downloaded file with no extension. Keep the extension in the name.
:::

## Deleting

Select a file or folder and choose **Delete**. The confirmation warns that the action is not reversible, and when the selection contains a folder with contents, it says so explicitly.

There is no trash and no restore. Deleting a folder deletes everything nested beneath it, recursively, and each stored file is removed from the underlying object storage. A deleted file cannot be recovered by support.

<!-- screenshot: the delete confirmation dialog reading "Are you sure you want to delete?" with the bold warning about folders containing files -->

## Downloading

**Download File** works on one or more selected files, folders excluded. Each download asks the server for a fresh, signed link that is valid for one minute, then starts the transfer. The link is single-purpose and short-lived by design — copying it out of the browser to share later will not work.

## The storage allowance

Signup advertises **50GB data storage** on both the monthly and yearly plans.

:::caution
Nothing enforces it. No upload is checked against the 50GB figure, no warning is raised as you approach it, and no upload is refused for being over it. The number is a plan description, not a quota. If you are storing far more than 50GB, contact support before assuming it will stay that way.
:::

Your actual consumption is on the [dashboard](./dashboard.md) Overview tab, in the **Usage Info** card: **Folders**, **Files**, and **Space Used**. Space Used sums the byte size of every stored file record in the organization, including files Lendiom keeps behind the scenes that never appear in the Files browser — Document Builder templates, signature packages, conversation attachments. It is always rendered in megabytes, so a large account reads as a five-digit MB figure rather than gigabytes.

![The dashboard Usage Info card, showing Folders, Files and Space Used](/img/docs/app/how-it-works/files-and-storage/04.png)

## Two things that switch the browser off

If your subscription is past due or canceled, the browser keeps listing what you have but loses its entire toolbar — including **Download**. Restoring the subscription brings the actions back. See [Canceling a Subscription](../billing/canceling-a-subscription.md).

If the stored bytes have gone missing behind a file record, the download fails with a message saying the file no longer exists in storage rather than handing you an empty file. Report that one.
