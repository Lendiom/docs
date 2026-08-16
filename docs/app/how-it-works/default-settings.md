---
id: default-settings
title: "Default Settings: When a Loan Goes Into Default"
---

## Introduction
Default Settings decide whether Lendiom escalates a late loan on its own, and how long it waits before doing so. There are only three values to set, but the way they are measured surprises people: the clock does **not** start on the day the loan was flagged Late. It starts on the due date the buyer missed.

## The Three Settings

| Setting | What it does | Range | Default shown |
| --- | --- | --- | --- |
| **Days Until In-Default** | Days measured from the missed due date before the loan moves to **In Default** | 1 to 365 | 30 |
| **Auto** (Enabled / Disabled) | Whether Lendiom performs the moves at all | On or off | Off |
| **Defaults After** | Additional days *after* the in-default mark before the loan moves to **Defaulted** | 1 to 365 | 10 |

**Defaults After** only appears when **Auto** is Enabled. Both day counts must be a whole number of calendar days.

![The Defaulting Configuration modal on a loan, with Days Until In-Default and the automatic-default options](/img/docs/app/how-it-works/default-settings/01.png)

## Where to Set Them

On a single loan: open the loan, then the actions menu, then **Default Settings**.

Organization-wide: go to the loans list and use the **Default Loan Settings** dropdown, then **Default Defaulting Terms**. That version of the form adds an **Apply to All Loans** switch. Leave it off and you are only setting the values new loans start with. Turn it on and Lendiom overwrites the defaulting configuration on every loan in the organization — including loans you had deliberately configured differently.

You can also set all three on the terms step of the new loan wizard. See [Creating a Loan](../guides/creating-a-loan).

![The loans list with the Default Loan Settings dropdown open, showing the Default Defaulting Terms entry](/img/docs/app/how-it-works/default-settings/02.png)

## Automatic vs. Manual

**Auto: Enabled** is the entire switch. With it on, the nightly job evaluates the loan and moves the status for you. With it off, nothing about defaulting happens automatically — you move the status yourself from the loan's actions menu under **Status**, choosing **In Default** or **Defaulted**.

:::caution
When **Auto** is Disabled, the **Days Until In-Default** value still saves, still shows on the loan's Details tab, and still appears in the system note — but nothing reads it. It has no effect on the loan until you turn Auto on. A loan sitting at "Days Until In-Default: 30, Automatic: No" will stay Late indefinitely.
:::

## The Countdown Runs From the Missed Due Date

This is the part worth reading twice.

Lendiom tracks a *previous due date* on every loan: the due date of the **oldest scheduled payment that is not fully paid**. That date, not the date the loan turned Late, is the anchor for both steps.

```
In-default date = missed due date + Days Until In-Default
Defaulted date  = missed due date + Days Until In-Default + Defaults After
```

The nightly Loan Data Integrity job runs at 12:30 AM Central and flags the loan the first time it runs after the computed date has passed. The date it records on the loan is the **computed** date, not the night the job noticed it, so the audit trail stays correct even if a run is delayed.

### Worked example

A payment is due January 1. The late fee tier's grace period is 10 days. Days Until In-Default is 30, and Defaults After is 10.

| Date | What happens |
| --- | --- |
| January 1 | Payment due, nothing paid |
| January 2 – 11 | Grace period; loan shows **Grace Period** |
| January 12 | Grace ends, loan moves to **Late**, late fee applied |
| January 31 | 30 days from **January 1** — loan moves to **In Default** |
| February 10 | 40 days from **January 1** — loan moves to **Defaulted** |

Notice that the loan reaches In Default 19 days after being flagged Late, not 30. The 10-day grace period is consumed inside the 30 days, because both are measured from January 1.

:::caution
A loan can only reach In Default if it first reaches **Late**, and lateness is driven entirely by your late fee tiers. A loan with **no late fee tiers configured** never becomes Late, so it never becomes In Default either — regardless of how the Default Settings are filled in. See [Late Fees](./late-fees) for how tier days are evaluated.
:::

## Defaults After Stacks on Top

**Defaults After** is not measured from the day the loan hit In Default. It is added to Days Until In-Default and measured from the same missed due date. Setting 30 and 10 means the loan defaults 40 days after the missed due date.

Two more behaviors to know:

- **The two steps never happen on the same night.** The nightly job stops after it moves a loan to In Default and picks the second step up on a later run. Even with a tiny Defaults After value, there is always at least one night between them.
- **Leaving Defaults After at zero pins the loan at In Default.** The escalation to Defaulted requires a value greater than zero. A loan with automatic defaulting on and Defaults After unset stays In Default until you move it yourself.

If a partial payment clears the oldest missed installment but a newer one is still unpaid, the anchor date advances to that newer due date and the countdown to Defaulted is recomputed from there.

## What a Curing Payment Does

Record a payment and Lendiom re-evaluates the loan immediately — you do not wait for the overnight run.

If the payment brings every past-due installment fully current, the loan returns to **Current**, and the stored in-default and defaulted dates are cleared off the loan entirely. On tract loans, the tract's status goes back to **Sold**. If the payment is short and the loan is still behind, the status stays where it is and the countdown continues from the same anchor date.

There is no status gate on recording payments: you can take a payment on a loan sitting at In Default or Defaulted the same way you would on any other loan. See [Adding a Transaction](../guides/adding-a-transaction).

![The Details tab of a loan, showing the Defaulting settings block](/img/docs/app/how-it-works/default-settings/03.png)

## What Is Sent at Each Step

| Step | System note on the loan | Note and timeline entry on the property or client | Document Automation | Text or email |
| --- | --- | --- | --- | --- |
| **Late** | No | Yes | Rules targeting Late, plus per-late-fee-tier rules | Late payment reminder, once per missed installment |
| **In Default** | Yes | Yes | Rules targeting In Default | None |
| **Defaulted** | Yes | Yes | Rules targeting Defaulted | None |
| **Repossessed** | No | Disassociation note on the tract | Rules targeting Repossessed | None |

:::caution
Reaching In Default or Defaulted does **not** send the buyer a text message or an email. The late payment reminder that goes out is tied to the missed installment and fires once, well before the default steps. If you want the buyer to receive a notice of default, you have to build it as a Document Automation rule targeting the In Default status — that is the only mechanism that generates and mails a document on a status change.
:::

Document Automation rules are configured from the loan's actions menu, or organization-wide from the **Default Loan Settings** dropdown. Each rule points at a document template and a mail configuration. When the status change fires, the document is generated, mailed to the client's primary entity, and recorded as a job you can inspect.

## Repossession Is Always Manual

Nothing in Lendiom ever sets a loan to **Repossessed** on its own. There is no timer and no setting that automates it. The chain stops at Defaulted and waits for you.

To repossess, open the loan's actions menu, choose **Status**, then **Repossessed**. Lendiom requires a date of repossession, and it cannot be earlier than the loan's last transaction. Tract loans moving over from an inactive state are also asked for the tract acreage and label.

:::warning
Repossession cannot be reversed. Marking the loan repossessed disassociates it from the tract or property, releases that property back to Available, turns off auto draft, and marks the client inactive. Once a loan is Repossessed, its status can never be changed again — the server rejects any further status change on it.
:::

![The Mark as Repossessed dialog, warning that the action cannot be reverted, above the required date of repossession](/img/docs/app/how-it-works/default-settings/04.png)

## Every Change Writes a System Note

Each of these events writes a note authored by **System** onto the loan, visible in the loan's Notes section:

- **Changing the Default Settings.** The note spells out the old values and the new ones — days, defaults-after, and whether it is automatic or manual — plus the name of the user who made the change. If the loan had no defaulting configuration before, the note records that it was added instead.
- **Moving to In Default automatically.** The note records the total balance due, the missed due date, the in-default date, and the number of days between them.
- **Moving to Defaulted automatically.** The note records the defaulted date, the balance, and the same missed due date.

System notes cannot be edited. Treat them as the audit trail when a buyer disputes a default date. Applying settings to all loans writes one of these notes on **every** loan it touches — worth knowing before you flip that switch on a large portfolio.

<!-- screenshot: The Notes section of a loan showing a red "IN DEFAULT" system note authored by System, reading "This loan automatically went IN DEFAULT with a balance of $1,450.00. The last due date was January 1st and no payment was received by January 31st (30 days later)." -->

## Related Articles
- [Loan Status](./loan-status) — every status a loan can hold
- [Late Fees](./late-fees) — the tier days that decide when a loan becomes Late
- [Creating a Loan](../guides/creating-a-loan) — setting defaulting terms at setup
