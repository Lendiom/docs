---
id: first-week-servicing
title: Your First Week in Servicing and Collections
---

You have been handed a portfolio and a phone. This page is the order to learn things in. Each section explains why the piece matters and points at the article that covers it in full. Work top to bottom — later sections assume the earlier ones.

## 1. The loan page and what its status means

Everything in collections starts on a single loan. Open one and you get **Overview**, **Story** (beta), and **Details** tabs, plus **Existing** on loans that were migrated in mid-term.

When a loan needs something from you, one more tab appears in front of the others with a red alert icon: the **Action Center**. The page opens on it automatically. It surfaces for loans in Draft, Late, In Default, Defaulted, Repossessed, or Refinanced status, and for Pending or Current loans with an unpaid down payment. An unpaid setup fee adds a button too.

The buttons inside change with the status. Late offers **Send Late Notice** and recording a payment. In Default offers **Send In-Default Notice** and **Record Pay Off**. Defaulted offers **Send Repossession Notice** and **Mark Repossessed**. Read [Loan Action Center](../how-it-works/loan-action-center.md) for the overview.

<!-- screenshot: A loan page in Late status with the red-icon Action Center tab selected, showing the "Send Late Notice" dropdown button next to the record-payment button. -->

Then read [Loan Status](../how-it-works/loan-status.md) end to end. It is the vocabulary for the rest of the job — Grace Period, Late, In Default, Defaulted, and the terminal states. The distinction that will bite you first: six statuses shut the loan's **Actions** menu off entirely. Inactive, Pending Payoff, Paid Off, Repossessed, Canceled, and Refinanced loans accept no new transactions, no waivers, and no restructuring.

:::info
No Action Center tab means the loan is not asking for anything. That is a Current loan, not a broken page.
:::

To find which loans need you today, use the **Late** tab on the dashboard. It lists every loan in Late, In Default, or Defaulted status with days late, payments behind, and payoff balance. [Understanding Your Dashboard](../how-it-works/dashboard.md) covers what each figure counts.

## 2. Late fees, and waiving them

Late fees are automatic. The Loan Data Integrity job runs at 12:30 AM, flags payments that crossed their grace period, and applies the fee. Nobody clicks anything.

[Late Fees](../how-it-works/late-fees.md) explains tiers, grace days, fixed versus percentage charges, and how the fee is applied to the balance. Per-loan overrides live under **Late Fee Settings** in the loan's Actions menu.

You will spend more time removing fees than configuring them. Three different actions do that, and they are not interchangeable.

| Situation | Action | Read |
| --- | --- | --- |
| The fee is legitimate, you are forgiving it as a business decision | **Waive (Beta)** on the transaction row | [Waiving Late Fees](./waiving-late-fees.md) |
| The fee should never have been applied at all | **Reverse** on the transaction row | [Reversing a Transaction](./reversing-a-transaction.md) |
| A reversed fee is cluttering the history and you want it gone | **Delete** on the transaction row | [Deleting Late Fees](./deleting-late-fees.md) |

:::caution
Deleting a reversed late fee does not forgive it. If the payment is still overdue, the overnight job applies the fee again. Waiving is the only action that stops a fee from coming back.
:::

Waive appears only on late fees that are currently in effect, and only if you have update permission on loan transactions. See [Roles and Permissions](../security/roles-and-permissions.md) if the option is missing.

## 3. The default timeline

Escalation past Late is driven by two numbers, set under **Default Settings** in the loan's Actions menu. Your organization also carries a portfolio-wide setting with an **Apply to All Loans** switch that overwrites every loan's individual values.

| Setting | What it controls |
| --- | --- |
| Auto | Whether Lendiom escalates on its own. Off means the statuses only ever change by hand. |
| Days Until In-Default | Consecutive days after the missed due date, not counting the due date itself, before the loan moves to In Default. Accepts 1 to 365; the form opens at 30. |
| Defaults After | Days after the In Default move before the loan escalates to Defaulted. Accepts 1 to 365; the form opens at 10. Only shown when Auto is on. |

![The Defaulting Configuration modal, with the days-until-in-default field beside the automatic defaulting toggle](/img/docs/app/guides/first-week-servicing/02.png)

Both clocks run from the missed due date, so a loan with 30 and 10 reaches Defaulted 40 days past that date. Escalation only runs on loans that are already late, and only while Auto is on. When a loan escalates, Lendiom writes a note on the loan and on the related tract, property, or client, so the timeline is on the record.

:::warning
Repossession is never automatic. **Mark Repossessed** is a manual action on a Defaulted loan, and it releases the tract or property back into inventory as available for sale. Nothing undoes it.
:::

## 4. The conversations inbox and automated messages

Most collections contact is a text message. [Using the Conversations Inbox](../communication/conversations-inbox.md) covers the layout, sending texts and pictures, placing calls, mass texts, opt-outs and STOP handling, and the overnight quiet-hours queue.

Before that works you need a registered brand, an approved campaign, and a purchased number. [Communication Portal](../communication.md) has the registration steps and the pricing.

[Automated Borrower Messages](../communication/automated-messages.md) is the catalog of what Lendiom sends without anyone clicking — upcoming payment, due today, late payment, payment pending, successful, and failed. Learn it early so you do not call a borrower about a notice they already received, or promise one that is never coming. Note the timing: the late reminder goes out at 8:30 AM and depends on the late flag set overnight, so a payment that crosses its grace period today gets its reminder tomorrow morning.

When something does not arrive, work [Automated Message Troubleshooting](../communication/message-troubleshooting.md) rather than guessing.

## 5. Notices and physical mail

The Action Center notice buttons each offer two paths: **From Document Template** builds the notice from one of your document builder templates and fills in the loan's details, or **Upload PDF** sends a file you already have. Both end at the same mail modal, where you pick which of the client's entities receives it.

[Sending a Physical Letter](./sending-a-letter.md) covers the general client-letter flow, the requirement that the client have a deliverable address, and the per-piece pricing.

You can also let notices go out on their own. **Document Automation**, in the loan's Actions menu or in your organization settings, holds rules that fire when a loan changes to Late, In Default, Defaulted, or Repossessed, or when a specific late fee tier is charged. Each rule names a template and its mail options — color, double-sided, mail class, extra service — generates the document, mails it, and adds a system note to the loan recording what was sent and why.

:::tip
Charging the borrower back for what a notice cost you is a separate step: use the charge modal, which records it as an other fee. See [Charging a Loan Transaction](./charging-a-loan-transaction.md) and [Loan Other Fees](../how-it-works/loan-other-fees.md).
:::

## 6. Restructuring: move the date, recast, or refinance

When a borrower cannot pay the current terms, you have three tools and they are not substitutes for one another.

| Tool | Use it when | What it does | Blocked on |
| --- | --- | --- | --- |
| [Move Due Date](./moving-a-due-date.md) | The borrower needs breathing room this month, or a first payment date was wrong | Pushes the next payment and rebuilds every payment after it. The only deferment mechanism in Lendiom | Loans with no schedule. The reason you type is required and permanent |
| [Recast](./recasting-a-loan.md) | A large principal prepayment landed, or unpaid interest and fees have stacked up and the remainder needs re-amortizing | Re-amortizes the unpaid remainder in place. Same loan, same ID, same status; paid history untouched | Draft, Pending, and interest-only loans; loans with no schedule |
| [Refinance](./refinancing-a-loan.md) | The terms themselves must change — rate, cadence, or re-papering a delinquent deal | Rolls everything owed into a new loan and freezes the original in a read-only Refinanced status | Draft and Pending loans; loans with no schedule |

Reach for the smallest tool that solves the problem. A one-month hardship is a due date move, not a refinance.

:::caution
A refinance cannot be undone. There is no revert and no way to move the original loan out of Refinanced. Run the preview, read every number, then commit.
:::

## 7. Payoffs

**Calculate Payoff** in the Actions menu opens the Pay Off Calculator. Pick a date — today or later, past dates are not selectable — and it breaks the figure into Total, Principal, Interest, Fees, Other Fees, and Property Tax, adding Unpaid Interest on loans where [interest accrues daily](../how-it-works/interest-accrues-daily.md) and Escrow on loans that carry it. If the borrower has [unapplied payments](../how-it-works/unapplied-payments.md) sitting as credit, a banner shows the count and total and a **Net Payoff Due** line nets them out. **Generate Letter** downloads the quote as a PDF you can send.

![The Pay Off Calculator modal, showing the payoff details table for the selected date](/img/docs/app/guides/first-week-servicing/03.png)

When the money arrives, **Record Payoff** posts it. [Recording a Loan Payoff](./recording-a-loan-payoff.md) walks the fields, including the choice between Pending and Success status, the adjustment amount when what arrived does not match what was quoted, and the required comment. Set it to Pending while the check clears and the loan sits in Pending Payoff, which blocks further payments to principal until you mark it Success.

## Where to go next

- [Adding a Loan Transaction](./adding-a-transaction.md) — recording the payment that actually cures the delinquency.
- [Principal-Only Payments](./principal-only-payments.md) — for the extra money a caught-up borrower sends.
- [Client Change Requests](./client-change-requests.md) — address and contact updates borrowers submit themselves, which is often why a notice bounced.
- [Reports Library](./reports-library.md) — the ledgers behind the numbers you quote on the phone.
