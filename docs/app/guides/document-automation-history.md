---
id: document-automation-history
title: Document Automation History
---

Document automation mails a document without anyone clicking send, so the only way to know what it did is the record it leaves behind. Every time a rule is considered, Lendiom writes one history row: sent, skipped, or failed. This guide covers where those rows live, what each records, and how to tell a rule that never fired from one that fired and broke.

Rules themselves are built from a loan's actions menu under **Document Automation**, or organization-wide from **Default Document Automation** on the Loans and Rentals pages. See [Default Settings](../how-it-works/default-settings.md) for how status-driven rules fit the default chain.

## Where to see what fired

Two views show the same records.

**Organization-wide.** **Documents → Automation History** in the left menu: every automation job across every loan and rental, newest first, with filters for outcome, loan or rental, and a date range.

**Per loan or rental.** The **Document Automation History** panel below the transactions on that record. Same rows, scoped to one record, no filters.

Both views require the **Document Builder** add-on; without it you get the enable screen ([Add-Ons](../billing/add-ons.md)). Both also follow read access on loans and rentals ([Roles and Permissions](../security/roles-and-permissions.md)).

![The Document Automation History page, with its filter row above the job table](/img/docs/app/guides/document-automation-history/01.png)

An empty table reads "No automation rules have been triggered yet."

## What each row records

| Column | What it holds |
| --- | --- |
| When | The moment the evaluation finished |
| Outcome | Sent, Skipped, or Failed |
| Trigger | What caused the evaluation, plus the detail (`Current → Late`, `Tier #2`, `5 day(s) until due`) |
| Template | The template name as it read when the rule ran |
| Related | The loan or rental the rule fired against — organization-wide view only |
| Reason / Error | The skip reason or error text. Hidden by default; turn it on with the settings icon above the table |
| Download | On Sent rows, the exact PDF that was mailed |

Expand a row for the rest: **Started** and **Completed** timestamps, the **Mail ID**, a link to the template, and the full skip reason or error message.

Because the template name is captured at run time, a row still tells you what was sent after the template is renamed. Rows are written once and never edited or removed.

<!-- screenshot: A single history row expanded to show the Started, Completed, Mail ID, and Template fields with a Skip Reason spanning the bottom -->

Five things can trigger an evaluation:

| Trigger | Fires when | Detail shown |
| --- | --- | --- |
| Status Change | A loan moves into Late, In Default, Defaulted, or Repossessed; a rental moves into Late, Eviction, Evicted, or Terminated | `Current → Late` |
| Late Fee Tier | A late fee tier is applied to a loan ([Late Fees](../how-it-works/late-fees.md)) | `Tier #2` |
| Upcoming Payment | A daily scan finds the days until the next due date match the rule's day count | `5 day(s) until due` |
| Payment Reminder | A daily scan finds the days since the last payment received — or the first payment date, if none has landed — match the rule's day count | `30 day(s) overdue` |
| Successful Payment | A regular or principal-only payment posts on a loan, or a regular payment on a rental | `Payment received` |

## The three outcomes

| Outcome | Meaning | What to do |
| --- | --- | --- |
| Sent | The document was generated, converted to PDF, and handed to the mail service. The row carries a Mail ID and a Download button | Nothing — the letter is in the mail stream ([Sending a Physical Letter](./sending-a-letter.md)) |
| Skipped | The rule matched, but the template it points at could not be used | Fix the template, then re-check the rule |
| Failed | The rule matched and the send was attempted, but something went wrong | Read the error, fix the cause, and send that client's document by hand |

A Sent row also writes a system note on the loan or rental, beginning *Auto generated:* and naming the template and the trigger. Rules built on a general-purpose template put that note on the client instead. Skipped and failed evaluations write no note, which is why the history table is the only complete record.

## Why an automation is skipped

A skip always comes down to the template — there are exactly three reasons:

| Skip reason | What happened |
| --- | --- |
| Template is inactive | The template is in draft or archived status. Only active templates can be sent |
| Template type no longer matches | The template's type does not fit the record it fired against |
| Template no longer exists | The rule points at a template that is gone |

The third is rare — Lendiom refuses to delete a template while any organization default, loan, or rental rule still references it. The second catches a case the rule editor lets through: a cash-loan template saved on a tract loan validates fine, because the type is only compared against the actual record when the rule fires.

:::tip
A skipped row is a configuration problem, not a delivery problem. Nothing was mailed and nothing was charged, and the rule will skip again on every trigger until the template is active and its type matches.
:::

## "Did not trigger" versus "triggered and failed"

**Every rule that becomes a candidate produces exactly one row** — sent, skipped, or failed. A rule that was never a candidate produces nothing at all. An absent row is therefore not a silent failure; it means the conditions were never met.

Nothing is recorded when:

- Automation is off on that loan or rental, or the record carries no rules. Organization defaults are copied onto a record when it is created — changing the defaults later does not reach existing records unless you use **Apply to All**.
- The status did not change, or the new status is not an automation status ([Loan Status](../how-it-works/loan-status.md)). A loan going from Late back to Current triggers nothing.
- The trigger and the rule do not pair up. Tier rules never fire on a plain status change, and status rules never fire when a tier is applied.
- The daily scans pass the record over. They skip draft, evicted, and terminated rentals, and draft, inactive, repossessed, canceled, refinanced, and paid-off loans. Payment reminders also need a balance due above zero and a reference date; upcoming-payment rules need a next due date.
- A payment posts that is not a regular or principal-only payment, or posts on a draft record.

![The Document Automation History panel on a loan, listing each job and its outcome](/img/docs/app/guides/document-automation-history/02.png)

A **Failed** row is the opposite case: the rule matched, the document was built, and the send was rejected. Most failures come from the mailing address — "entity has no addresses" and "entity address is not verified; can not send mail to an unverified address". The rest come from template rendering or PDF conversion. Expand the row to read the exact text.

:::caution
Day-based rules match an exact count, not a range. A payment reminder set to 30 days fires only on the day the count reads exactly 30. If the loan is paid off before then, no row appears, and there is no catch-up the following day.
:::

## How a paused automation resumes

Committing a [data import](./data-import.md) flips dozens of loans through status changes and late-fee assessments at once. To stop that mailing a stack of letters, the import pauses your organization's **loan** automation defaults for the length of the run and restores them when it finishes. The review step says so with an info notice.

Two details matter afterward:

- Only the organization-level loan defaults are paused. Rules already saved on individual loans and rentals are untouched, so history rows can still appear while an import runs.
- If the restore fails, the import parks as **Interrupted** instead of Completed, saying the pause could not be undone. Resuming re-attempts the restore; deleting a failed or interrupted import does the same on its way out.

:::warning
If someone reconfigures loan automation while an import is running, the saved copy is discarded rather than written over the new configuration, and the import records that as a skipped system row on its results. After an import that ended Failed or Interrupted, open **Default Document Automation** on the Loans page and confirm your rules are still there.
:::

## Verifying a rule you just built

1. Open the specific loan or rental — not the organization defaults — and confirm the rule is listed there with automation enabled.
2. Cause the trigger. A status change is easiest to force; day-based rules mean waiting for the daily scan.
3. Reload and open the **Document Automation History** panel on that record.
4. On a Sent row, click **Download**. It is the file that was mailed, so it also catches data fields that resolved to blanks.
5. Check the record's notes for the matching *Auto generated* note.

Sends, skips, and failures also surface in the Recent Events feed on the [dashboard](../how-it-works/dashboard.md) — the fastest way to notice a rule that started failing.

<!-- screenshot: The dashboard Recent Events feed with an "Automation failed" entry alongside loan and invoice entries -->
