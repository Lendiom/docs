---
id: scheduled-reports
title: Scheduled Report Emails
---

A scheduled report emails your payments summary on a recurring cadence — daily, weekly, or monthly — to a list of addresses you choose. The recipients do not need a Lendiom login. Each send covers the period that just ended, carries a spreadsheet of every transaction behind the numbers, and is recorded in a history you can inspect and resend.

## Where to find it

Open **Org Settings → Scheduled Reports**, or go straight to `/{your-org}/settings/scheduled-reports`. The tab has two cards: your schedules on top, the delivery history below.

The whole tab requires the `organization` `update` permission. Without it the tab returns a 403 — see [Roles and Permissions](../security/roles-and-permissions.md).

![The Scheduled Reports tab of Org Settings, showing the Scheduled Report Emails card](/img/docs/app/guides/scheduled-reports/01.png)

## What gets sent

Every schedule sends the same thing: the **Payments Summary** for the period, as an email plus an XLSX attachment.

The email body is built from one snapshot of the period, so the email and the spreadsheet cannot disagree. Sections appear only when they have data:

| Section | What it shows |
| --- | --- |
| Totals | Payments received and total collected, the prior period's comparison and percent change, net to organization, platform fees, and the net deposit estimate |
| Expected vs Received | Payments due in the period, how much came in against them, and what is still outstanding |
| By Payment Method | Collected totals split by rail — ACH, card, cash, check, and so on |
| By Source | Collected totals split across loans, rentals, and invoices |
| PayArc Deposits Settled | Each settlement batch's date, transaction count, and net, plus the total net deposited |
| Needs Attention | Pending, failed ACH, reversed ACH, reapplied held funds, and payments awaiting deposit |

The attachment is named `Payments Summary - 2026.07.01 to 2026.07.31.xlsx` and has two sheets: **Payments Summary**, which mirrors the email's sections, and **Transactions**, which lists every transaction the summary counted — client, inventory, date, type, status, payment method, the amount splits, comments, source, and (for card payments) the settled-on date and deposit batch.

:::info
The PayArc deposit lines cover card settlement batches only. ACH, cash, checks, and other methods never appear in them. See [PayArc](../payment-processing/payarc.md) for how settlement timing works.
:::

## Creating a schedule

Click **Add Schedule**. The form opens with sensible defaults — Daily, 6:00 AM, enabled.

![The New Scheduled Report modal, with the report, frequency and recipient fields](/img/docs/app/guides/scheduled-reports/02.png)

| Field | Notes |
| --- | --- |
| Frequency | Daily, Weekly, or Monthly on the 1st |
| Day of the Week | Weekly only. Any day, Sunday through Saturday |
| Send Time | On the hour, 12:00 AM through 11:00 PM, in your organization's timezone |
| Recipients | Type an address and press enter, or paste a list separated by commas or spaces. One to ten addresses |
| Also Attach | Monthly only. Extra reports generated for the same month |
| Enabled | Turn a schedule off without deleting it. A disabled schedule shows `-` for its next send |

Monthly schedules can attach any of three additional reports alongside the summary, each generated fresh for the same month:

| Extra report | What it contains |
| --- | --- |
| Monthly Transaction List | The month's tract loan transactions aggregated into one report |
| Monthly Installment Income | The month's loan transactions aggregated as installment income |
| Monthly Journal Entry | The month's interest, principal, and late fee totals received, with a sheet per supporting report |

Attachments are monthly-only by design. If you switch a monthly schedule to daily or weekly, the extra reports are cleared.

<!-- screenshot: the "New Scheduled Report" modal with Frequency set to "Monthly on the 1st — covers the prior month", revealing the "Also Attach" checkbox group with Monthly Transaction List, Monthly Installment Income, and Monthly Journal Entry, with Monthly Journal Entry checked -->

## Cadence and the period each send covers

Each frequency covers the period that ended at local midnight before the send. Nothing partial, nothing overlapping the current day.

| Frequency | Fires | Covers |
| --- | --- | --- |
| Daily | Every day at the send hour | The day that just ended, midnight to midnight |
| Weekly | On the chosen weekday at the send hour | The prior seven days, ending at midnight of the send day |
| Monthly | The 1st of the month at the send hour | The whole prior calendar month |

Monthly always fires on the 1st — there is no day-of-month picker.

## Recipients

Recipients are free-form email addresses, not Lendiom users. Anyone you list receives your organization's financial data in their inbox whether or not they have an account.

Addresses are lowercased and de-duplicated when saved, and each one must parse as a real email address. Ten is the ceiling per schedule.

:::caution
Because recipients need no account and no permissions, adding an address is the whole of the access check. The email footer tells the reader it was configured by an administrator of your organization and to contact that administrator if it arrived in error.
:::

## When the job runs

The delivery job ticks once an hour. At each tick it picks up every enabled schedule whose next send has passed, so a schedule set for 6:00 AM goes out at or shortly after 6:00 AM — expect it within the hour, not to the minute.

**All local times are your organization's timezone**, not the recipient's and not the browser's. Organizations are created in `America/Chicago` (US Central) unless yours was set otherwise. The send hour, the weekday, and the midnight boundaries of each period are all evaluated there.

Two consequences worth knowing:

- **Daylight saving.** The send hour follows the wall clock. A 2:00 AM schedule on a spring-forward morning still fires that day, shifted to a neighboring hour, rather than being skipped.
- **Missed windows do not pile up.** If the job was down when a schedule was due, the caught-up run sends one email covering the most recently ended period. You do not get one delivery per missed window.

The next send is stamped before the email is attempted, so a restart mid-delivery cannot produce a duplicate. A delivery that fails is not retried in a loop — it is recorded and the schedule waits for its next occurrence.

Schedules belonging to an organization without an active subscription are skipped. The schedule is kept and its next send moves forward, but nothing is delivered and nothing is written to the history until the subscription is live again.

A real send is also treated as a report run: it appears on the **Reports** page with an updated **Last Ran At**, and the same spreadsheet can be downloaded there. Test sends do not.

## Test it before anyone else sees it

Open a schedule's **Actions** menu and choose **Send Test To Me**. Lendiom generates the report for the schedule's most recent period and emails it to the address on your own login — never to the schedule's recipients.

The subject is prefixed with `[Test]`, and the delivery shows in the history with a `test` tag. A test does not change the schedule's next send.

![A scheduled report row with its actions menu open, offering edit, a test send and delete](/img/docs/app/guides/scheduled-reports/02.png)

## Delivery history

The **Delivery History** card lists the 50 most recent deliveries, newest first, ten per page. Each row carries the send time, the subject, a tag per recipient, the status, and a **Resend** action.

**Resend** replays the stored subject, body, and attachments to the addresses the original went to. Nothing is regenerated, so the numbers can never drift from late-settling transactions — a resent July summary is byte-for-byte the July summary that first went out. The resend is logged as its own history row.

Deleting a schedule stops future sends and leaves the history intact.

<!-- screenshot: the Delivery History table with three rows — one green "sent", one orange "partial" with a red recipient tag, and one red "failed" — and the Resend link at the end of each row -->

## How failures surface

Delivery status settles from the per-recipient outcomes:

| Status | Meaning |
| --- | --- |
| `sent` | Every recipient was accepted by the mail provider |
| `partial` | Some recipients were accepted, others were rejected |
| `failed` | Nothing went out |

Hover a recipient tag to see why that address failed; failing tags are red. Accepted addresses show the confirmation instead.

A delivery can also fail before the email exists — the report itself could not be generated. That row is recorded as `failed` with no per-recipient error, which is how you tell the two cases apart: red tags mean the mail was rejected, no red tags on a failed row means the report never got built.

:::warning
Resend replays what was stored. A delivery that failed before its email was built has nothing to replay. To recover that period, run the **Payments Summary** report manually from the Reports page for the same date range.
:::

## The schedule you did not create

Every organization is opted into one monthly payments summary automatically: the 1st of the month at 6:00 AM, addressed to the organization's contact email (and the owner's address, if it differs), with the Monthly Journal Entry report attached.

That default is created once. Edit it, disable it, or delete it — a deleted default stays deleted.

## Limits

| Limit | Value |
| --- | --- |
| Schedules per organization | 10 |
| Recipients per schedule | 10 |
| Deliveries shown in history | 50 most recent |
| Send times | On the hour only |
| Extra attachments | Monthly schedules only |
