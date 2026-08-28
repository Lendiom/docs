---
id: when-things-run
title: When Things Run
---

## Why this page exists

Most of what Lendiom does on its own happens on a fixed daily timetable. Late fees, status changes, reminder texts, auto drafts, invoice reminders, and payment reconciliation are not triggered the moment a date passes — they are triggered when the job that handles them next runs. When you are asking "why hasn't this loan gone late yet?" or "why hasn't my borrower gotten the text?", the answer is almost always a time on this page.

## Every time on this page is Central

The scheduler runs in the **America/Chicago** timezone. That is Central Time, and it follows US daylight saving, so 3:00 AM is 3:00 AM in Chicago in both January and July.

:::caution
The scheduler's timezone is **not configurable**. There is no way to move a job to a different hour. If your business runs on Pacific time, the 3:00 AM Auto Draft job runs at 1:00 AM your time.
:::

Your organization is on Central as well. Every organization in Lendiom runs on **America/Chicago**, and nothing changes it — there is no timezone setting on any screen and no way to request a different one through the app. Several jobs compare "is today the due date?" before acting, and they use that same Central day. So the hour a check happens and the day a record counts as due are both Central. See [Org Settings Map](./org-settings-map.md) if a date on your records looks off by a day.

## The overnight quiet window

Lendiom does not text and email your clients in the middle of the night. Any automated message generated between **10:00 PM and 7:59 AM Central** goes into an overnight queue instead of being sent, and the 8:00 AM and 8:05 AM jobs empty that queue.

This is the most common reason a message looks stuck. The 2:30 AM due-today reminder does not send a text at 2:30 AM — it writes one into the overnight queue, and the borrower's phone buzzes just after 8:00 AM. Messages you send by hand from the Conversations inbox bypass the queue entirely.

## Daily jobs, in order

| Time (Central) | Job | What it does |
| --- | --- | --- |
| 12:01 AM | Brand & Campaign Status Checker | Re-checks your 10DLC [brand](../communication/what-is-a-brand.md) and [campaign](../communication/what-is-a-campaign.md) registration with the carrier and updates the status shown in Lendiom. This is the job that flips you from pending to verified. |
| 12:05 AM | Call Status Checker | Pulls the final carrier cost for calls that do not have a price recorded yet. After five straight failures on one call, Lendiom stops asking and absorbs the cost. |
| 12:30 AM | Loan Data Integrity | The big one. For every loan that is not draft, inactive, or repossessed: recalculates the schedule and interest, recomputes the balance due, applies [late fees](./late-fees.md), moves the loan between Current, Grace Period, and Late, marks it paid off once the principal drops below a cent, updates the related tract status, and adds a late note. A loan with a payment being recorded at that moment is skipped and picked up the next night. |
| 12:45 AM | Rental Data Integrity | The same pass for rentals: recalculates what the tenant owes from the first payment date forward, adds any recurring fee whose next charge date is today, and moves the rental between Current and Late. A status change here also fires document automation. |
| 12:55 AM | Entity Phone Number Validation | Looks up client phone numbers that have never been validated, confirms the number is real, decides whether it is a cell, and writes the result as a note on the client. Lendiom refuses to text a number until it is confirmed cellular, so a contact added today generally cannot receive a text until after this run. |
| 1:00 AM | Message Price Updater | Fetches the carrier price for each sent message that does not have one yet. Until this runs, messaging usage does not show a cost — see [Communication Portal Costs](../billing/communication-portal-costs.md). |
| 1:15 AM | Entity Optin Status Checker | Asks the carrier whether each contact's number has opted out of your texts. Numbers already flagged invalid are skipped. |
| 2:00 AM | Billing Active Loan Counter | Records today's active loan count for every organization with an active subscription. This is the number your subscription is billed on — see [Billing Cycles](../billing/billing-cycles.md). |
| 2:15 AM | Check For Overdue Invoices | Moves invoices past their due date into Overdue status and writes an audit entry on each one. See [Invoices Overview](./invoices-overview.md). |
| 2:30 AM | SMS Payment Due Today Reminder | For loans with automated communication on whose next due date is today in Central time, generates the due-today reminder. It lands in the overnight queue and goes out at 8:00 AM. |
| 2:45 AM | Rental Payment Due Today Reminder | The same reminder for rentals whose next due date is today. |
| 3:00 AM | Auto Draft Loan | Charges the borrower's saved payment method on loans with auto draft enabled whose next draft date is today, plus any loan whose deferred retry date has arrived. See [Automatic Payments](./automatic-payments.md). |
| 3:30 AM | Auto Draft Rental | The same charge run for rentals with auto pay enabled. |
| 8:00 AM | Process Overnight SMS Queue | Sends every text held since 10:00 PM. |
| 8:05 AM | Process Overnight Email Queue | Sends every Lendiom Pay email held since 10:00 PM. |
| 8:30 AM | Late Payment Reminder | Notifies borrowers whose previous scheduled payment is now marked late and not fully paid. Sent once per payment. Balloon maturity payments are excluded — they get their own reminder at 9:15 AM. |
| 8:35 AM | Invoice Due Date Reminders | Sends "due in N days" invoice reminders on the days-before values you configured on the invoice, once per value. |
| 8:40 AM | Invoice Overdue Reminders | Sends "N days past due" invoice reminders on the days-after values you configured, once per value. Requires overdue reminders to be enabled on that invoice. |
| 8:45 AM | Rental Late Payment Reminder | Fires on the exact day a late rental's grace period ends, not every day afterward. See [Rental Balances](./rental-balances.md). |
| 9:00 AM | Upcoming Loan Payment Reminder | Notifies borrowers seven days before their next due date, once per scheduled payment. |
| 9:15 AM | Balloon Maturity Reminder | For interest-only loans with a called-due balloon, notifies the borrower at 30 days out, 7 days out, and on the maturity date. Each tier sends once, and stops once the balloon is paid. |
| 9:30 AM | SMS Property Tax Reminder | Texts clients on the day a property tax bill is due, for in-progress tax records with a balance still owed. Your messaging setup has to be complete. See [Collecting Property Tax](../guides/collecting-property-tax.md). |
| 9:45 AM | Address Update Reminder | Asks buyers to confirm their mailing address on the cadence your organization chose — every 6 or 12 months from the loan's closing date. Off unless you turn it on. |
| 10:00 AM | Sync PayArc Card Transactions | Checks every pending card charge on loans, rentals, and invoices against [PayArc](../payment-processing/payarc.md). Settled charges become successful transactions; declined ones are marked failed. |
| 10:30 AM | Payment Reminder Document Automation | Generates documents from your automation rules keyed to days since the last payment, for loans and rentals with a balance due. |
| 10:35 AM | Upcoming Payment Document Automation | Generates documents from automation rules keyed to days remaining until the next due date. |
| 11:05 AM | Sync PayArc ACH Transactions | The ACH equivalent of the card sync. Settled bank payments become successful; rejected ones are marked failed. |
| 1:30 PM | Communication Portal Registration Reminders | Emails the people on your team who can manage communication when your messaging registration is incomplete, one email per stage. See [Registration Timelines](../communication/registration-timelines.md). |
| 8:00 PM | Sync PayArc Card Transactions | Second card reconciliation pass of the day. |
| 9:05 PM | Sync PayArc ACH Transactions | Second ACH reconciliation pass of the day. |

## Jobs that run more often than once a day

| Interval | Job | What it does |
| --- | --- | --- |
| Every 60 seconds | Send Email For Missed SMS | Emails team members with communication access when a client has texted in and nobody has opened the conversation. It waits five minutes after the message arrives and sends one email per unread batch, not one per message. Only users with the client notification preference turned on receive it. |
| Every hour | Scheduled Report Delivery | Delivers any [scheduled report](../guides/scheduled-reports.md) whose next run time has passed. The next run is stamped before delivery is attempted, so a failed delivery waits for the following occurrence instead of retrying in a loop. Organizations without an active subscription keep their schedules but stop receiving deliveries. |
| Every 2 hours | Expired Document Signature Requests | Expires [signature requests](../guides/document-signing.md) past their expiration date and notifies the signer. With a grace period configured, it sends one grace reminder per day until the grace deadline, then expires the request. |

## Answering "why hasn't X happened yet"

**A payment is past due but the loan still says Current.** Loan Data Integrity runs at 12:30 AM. A loan whose grace period ended today will not show Late until that job runs tonight. See [Loan Status](./loan-status.md) and [Late Fees](./late-fees.md).

**The late fee is missing.** Same job, same timing. The fee's transaction date is backdated to the last day of the grace window even though the record is created overnight.

**The borrower did not get the reminder.** Check three things in order: automated communication is enabled on that loan or rental, the reminder's own job has run for today, and the message is not still in the overnight queue waiting for 8:00 AM. [Automated Messages](../communication/automated-messages.md) covers what each message is and when it fires.

**The auto draft did not run.** The loan run is 3:00 AM and the rental run is 3:30 AM, and both only pick up records whose next draft date is today in Central time. A charge deferred after a processor block runs on its retry day instead.

**A card or bank payment still shows pending.** Card charges reconcile at 10:00 AM and 8:00 PM; ACH at 11:05 AM and 9:05 PM. ACH also takes days to settle at the bank, so several passes with no change is normal.

**Interest looks wrong for today.** Interest is recalculated during the 12:30 AM pass, so intraday you are looking at last night's figures. [Interest Accrues Daily](./interest-accrues-daily.md) explains the math.

:::tip
If a job's window has passed and the thing you expected still has not happened, the cause is usually a setting on the record rather than the schedule — automated communication switched off, a client with no validated cell number, or a rule whose day count does not match today. [Error Messages](./error-messages.md) covers what Lendiom reports back when a send is refused.
:::
