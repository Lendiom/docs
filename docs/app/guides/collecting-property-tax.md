---
id: collecting-property-tax
title: Collecting Property Tax After You Finalize
---

Building the property tax record is the first half of the job. The second half — the balance landing on each loan, the borrower paying it, and the year settling out — is what this guide covers. For creating the record, per-acre calculation, prorating a tract, and the finalize screen itself, see the [Property Taxes guide](./property-taxes).

## What Finalize Does to Each Loan

Finalize claims the record first, moving the year from `Draft` to `Finalizing` in one atomic step, so a second click gets `property tax not found or already being finalized` instead of billing everyone twice. Then, for every tract:

| Tract | What happens at finalize |
| --- | --- |
| Part of the bill, has a loan | Client note and timeline entry, the amount owed is added to the loan's **Property Tax Due**, the loan's property tax due date is set, and a loan note records the before/increase/after balance |
| Part of the bill, no loan attached | Notices go out, but there is no client note, no timeline entry, and no balance — the balance lives on a loan |
| Not part of the bill, or not eligible for reimbursement | Nothing. No note, no notice, no balance |

The increase is rounded to two decimal places before it is added, and the loan note spells out the arithmetic: *Balance before update / Balance increased by / Balance after update*.

Then notices go out, the year flips to `In Progress`, and you get a notification titled *&lt;Inventory&gt;'s &lt;Year&gt; Property Tax Finalized*.

![The Property Tax per Year section on an inventory, with the year, its status and the totals](/img/docs/app/guides/collecting-property-tax/01.png)

:::caution Partial finalize is silent
If Lendiom cannot load or save one tract's loan, it logs the failure, skips that tract, and keeps going — the year still finishes as `In Progress`. Afterward, check that each borrower's loan shows a Property Tax Due. A missing loan note means that loan was never billed.
:::

## How the Amount Appears as Due

The amount shows up as a **Property Tax Due** row on the loan's Overview and Details tabs. It is deliberately not part of **Total Due**, which covers late fees, other fees, and the balance due.

![The loan details balances with the Total Due tooltip open, explaining that the figure excludes property tax, above a separate property tax due row](/img/docs/app/guides/collecting-property-tax/02.png)

A loan carries **one** property tax balance and **one** property tax due date, not one per year. Finalizing 2026 while 2025 is unpaid adds to the same balance and overwrites the displayed due date with 2026's. Per-year detail lives on the inventory's `Property Tax per Year` tab.

In Lendiom Pay the borrower sees a Property Tax Due card on their dashboard and a yellow alert on the loan with the amount, the date, and a **Pay Property Taxes Due** button — shown whenever the balance is above zero and the loan is not paid off, pending payoff, or refinanced.

<!-- screenshot: the Lendiom Pay loan page with the yellow "Property Tax Due" alert showing the amount and remit-by date, and the green "Pay Property Taxes Due" button in the bottom right of the alert -->

## How Borrowers Pay

**In Lendiom Pay.** The borrower picks a saved payment method and pays the whole balance — there is no partial amount field. The platform fee follows the loan's fee payee setting. See the [Paying Property Taxes guide](../../pay/guides/paying-property-taxes).

**Recorded by you.** On the inventory's `Property Tax per Year` tab, expand the year and use `Record Payment` on the tract's actions menu. That opens the loan transaction modal with the type set to **Property Tax** and the amount pre-filled. This is the only route to it: the loan's own `New Transaction` modal does not offer **Property Tax** in its type list.

![A property tax year expanded to its per-tract rows, each with the amount owed and what has been paid](/img/docs/app/guides/collecting-property-tax/03.png)

Either way the money is applied the same: oldest year first, across every `In Progress` year for that inventory, but only to tracts on that loan **and** whose recorded client matches the loan's client. That client check stops a payment from settling a prior owner's tax after a repossession and resale. The transaction comment lists every year it touched.

| Message | What it means |
| --- | --- |
| `tax payment is greater than amount due` | The amount exceeds the loan's Property Tax Due |
| `no property tax record found to apply towards` | No `In Progress` year had a matching tract, a matching client, and something still owed |
| `the loan type must be tract to pay property tax` | Property tax only applies to tract loans |
| `property tax payments can only be paid to in progress taxes` | The year is `Draft`, `Finalizing`, `Reimbursed`, or `Error` |

Reversing a property tax transaction gives the money back — newest year first — and returns the amount to the loan. See [Reversing a Transaction](./reversing-a-transaction).

:::caution A tract with no loan cannot be marked paid
A tract with no loan never gets a client recorded on the tax record, so its Client column stays blank and both `Record Payment` and `Remind` are hidden on its row. There is no other way in the app to record its payment. It still counts as owing, so the year can never reach `Reimbursed` — voiding the tract is the only way to clear it.
:::

## It Is Never Rolled Into the Loan Balance

Property tax is a reimbursement you are owed, not money you financed. Nothing capitalizes it.

| Event | What happens to the property tax balance |
| --- | --- |
| Regular or principal payment | Untouched. It is not in the payment waterfall |
| [Recast](./recasting-a-loan) with *Capitalize* | Untouched. Only interest, late fees, and other fees roll into principal |
| [Refinance](./refinancing-a-loan) | Moved to the new loan as a property tax balance, never into principal; the tax record is re-pointed at the new loan |
| [Payoff](./recording-a-loan-payoff) | Paid as its own **Property Tax** transaction, posted immediately before the payoff transaction |

## Reminders

| Reminder | When | Conditions |
| --- | --- | --- |
| Initial notice (text, letter, or both) | At finalize | Letters need a validated address, texts a cellular number that has not opted out |
| Automatic text | 9:30 AM Central **on the due date itself** | Year is `In Progress`, org messaging is set up, the tract still owes something, and its loan has automated communication with SMS enabled |
| Manual `Remind` | When you click it on a tract row | Year is `In Progress` and the tract has a client |

There is one automatic reminder and it fires only on the due date. Anything past due is yours to chase with `Remind`, which also fills in an empty *Notice Text Date*.

:::caution The tract label is missing from property tax texts
Both the finalize notice and the due-date reminder render without the tract label: "the 2026 Real Estate Property Tax for Demo Ranch  (10.5 acres) is due", with a gap where the tract should be. Mailed notice letters are not affected. Borrowers with more than one tract cannot tell which one a text refers to.
:::

## Tax Year Statuses

| Status | Meaning |
| --- | --- |
| `Draft` | Editable. Nothing has been billed to any loan |
| `Finalizing` | Claimed for finalize; notices are going out |
| `In Progress` | Billed and collecting |
| `Reimbursed` | Every tract in the bill is paid or voided |
| `Error` | Finalize failed after the record was claimed |

A year reaches `Error` when a step after the claim fails, most often a save. Everyone in your organization gets an urgent notification titled *&lt;Year&gt; Property Tax Finalization Failed*, and the tab shows a red banner.

:::warning An errored year has no self-service fix
Every action on it is refused with *property tax is in an error state, please contact support* — edit, mark draft, delete, validate, void, record payment, remind. The `Add Property Tax` button for that inventory is disabled too, so you cannot start next year until it clears, and any loan balances added before the failure stay put. Open the Help Scout bubble.
:::

## Correcting a Finalized Year

| Action | Available when | What it does |
| --- | --- | --- |
| `Mark Draft` | Nothing collected on any tract | Subtracts every billed amount back off the loans, clears the due date where the balance hits zero, notes it on the inventory timeline, and reopens the year for editing |
| `Delete` | Nothing collected on any tract | Same balance reversal, then removes the record |
| `Void Property Tax` (per tract) | Year is `In Progress`, tract not fully paid | Zeroes that tract's amount owed, subtracts it from the loan, marks it uncollectible. Refunds nothing already paid |
| `Validate` | Year is `In Progress` | Recalculates Total Expected and Total Collected, settling the year to `Reimbursed` if everything is covered |

The practical rule: **once one buyer pays, the year is frozen for everyone.** `Mark Draft` and `Delete` both require every tract to have zero paid; after that, `Void` is your only correction tool. `Validate` also settles a year with nothing to collect — finalize always leaves the record at `In Progress`, even when every tract is excluded or ineligible.

:::caution Validate does not touch loan balances
If a tract became ineligible, or its loan was reassigned to a different client, `Validate` zeroes that tract's amount owed on the tax record — but the borrower's loan keeps showing the Property Tax Due, and paying it fails with *no property tax record found to apply towards*. Use `Void Property Tax` instead: it is the only per-tract action that reduces the loan balance.
:::

## Watching Collection

On the `Property Tax per Year` tab, **Total Owed** is what the county billed you, **Total Expected** is what you can collect back, and **Outstanding Due** is Total Expected minus Total Collected.

:::caution The Dashboard column does not match
The Dashboard's `Property Tax` tab computes Outstanding Due as Total Owed minus Total Collected. Whenever tracts are excluded, voided, or ineligible — which is common — it shows an outstanding amount on a year you have fully collected. Trust the inventory tab.
:::

One last gap: when a borrower makes the final payment through Lendiom Pay, the *Property Tax Paid* notification is addressed to the borrower rather than your team, so no staff member sees it. Check the year's status on the tab instead of waiting for a notification.
