---
id: minimum-payment
title: Minimum Payment Rules
---

## What a minimum payment rule does

A minimum payment rule sets the smallest amount a client is allowed to submit **through Lendiom Pay** on one loan or one rental. When the client submits a payment below the calculated minimum, the charge is never sent to the processor — the request is rejected first, and the client sees the amount they need to pay instead.

The rule is a gate on client-initiated regular payments and nothing else. It does not change how money is applied, it does not appear on statements or letters, and it does not stop you from taking any amount you want at the counter. Read [What the rule does not cover](#what-the-rule-does-not-cover) before you rely on it as a collections control.

## The five rules

| Rule | The minimum becomes | Where that number comes from |
| --- | --- | --- |
| None | Nothing is enforced | The default on every loan and rental |
| Current Balance | The balance currently due | The loan or rental **Balance Due** — late fees, other fees, and unpaid interest are excluded |
| Current Late Balance | Everything owed | **Total Due**. On a loan: balance due + late fees + other fees + unpaid interest. On a rental: balance due + late fees + other fees + every recurring fee entry |
| Regular Payment | The scheduled payment | The payment amount on the loan's terms, or the rent amount on a rental |
| Fixed Amount | A dollar amount you type | Must be greater than zero |

Two things are outside **Total Due** on a loan and therefore outside a Current Late Balance minimum: property tax collected through the [property tax feature](../guides/collecting-property-tax.md), and interest accrued since the last payment on a loan that [accrues interest daily](./interest-accrues-daily.md). A negative other-fees balance — a credit — is treated as zero rather than reducing the minimum.

![The Details tab of a loan, with the Minimum Payment row shown alongside the balance figures](/img/docs/app/how-it-works/minimum-payment/01.png)

## Where you set it

| Where | What it changes | How to get there |
| --- | --- | --- |
| New loan or rental wizard | The rule stored on that one record at creation | The terms step, **Minimum Payment Rule**. It is pre-filled from your organization default |
| One existing loan | The rule on that loan only | Loan page → actions menu → **Minimum Payment** |
| One existing rental | The rule on that rental only | Rental page → actions menu → **Minimum Payment** |
| Organization default | The wizard's starting value for new records, and optionally every existing record | Loans page → the **Default Loan Settings** dropdown, beside **Add New Loan** → **Default Minimum Payment**. Rentals has the same entry under **Default Rental Settings** |

Saving the rule on a single loan or rental writes a system note to its timeline naming you and the new rule, so a change is always traceable after the fact.

![The Loans page with the Default Loan Settings dropdown open, listing the organization-wide loan defaults](/img/docs/app/how-it-works/minimum-payment/02.png)

![The Minimum Payment Configuration modal, with the explanatory alert and the payment-rule options](/img/docs/app/how-it-works/minimum-payment/03.png)

The organization default on its own is only a starting value. Existing loans and rentals keep whatever they already have unless you turn on **Apply to All**, which pushes the configuration onto every loan (or every rental) in the organization and overwrites what is there.

:::caution
**Apply to All can partly fail without telling you.** Each record is updated one at a time, and a record that rejects the change — a **Fixed Amount** larger than that loan's or rental's total balance is rejected with code `105002` — is skipped and only written to the server log. The organization preference still saves, and the confirmation still reads "applied to all". Spot-check a few low-balance records afterward instead of trusting the message.

The global modal does not check the fixed amount against any balance, because there is no single balance to check it against. The per-loan and per-rental modal does, and blocks the save before it leaves your browser.
:::

Both screens are gated by permissions: the organization default needs **create** on the loan or rental feature, and the per-record action needs **update**. See [Roles and Permissions](../security/roles-and-permissions.md).

## The exception when the balance is smaller than the minimum

A minimum is never allowed to exceed what the client still owes. Before the comparison happens, the calculated minimum is capped at the remaining balance, then rounded to cents.

| Product | Remaining balance used for the cap |
| --- | --- |
| Loan | Total Due, minus the other-fees balance, plus the remaining principal |
| Rental | Total Due |

Other fees are deliberately dropped from the loan figure. Other fees are paid through a separate flow in Lendiom Pay and a regular payment can never consume them, so counting them here would raise the final-payment minimum above what the payment pipeline accepts and lock the borrower out of paying off online.

The rule is also skipped whenever the calculated minimum works out to zero or less — a **Current Balance** rule on a borrower who is paid ahead, for example, enforces nothing that month.

:::tip
A borrower is never blocked from paying a loan off online by their own minimum payment rule. If the rule computes to more than the payoff figure, the payoff figure is what gets enforced.
:::

## Error 105001

A payment below the minimum is rejected with HTTP `400` and code `105001`. The message is generated at the moment of rejection and carries the enforced number:

`payment amount is below the minimum of $250.00`

The dollar figure is the final enforced minimum — after the remaining-balance cap and after rounding to cents — so the amount in the message is the amount that will go through. It is not the raw rule value, and on a loan close to payoff it will be lower than the rule suggests.

The other codes in this area appear while you are configuring the rule, not while a client is paying:

| Code | Message | When |
| --- | --- | --- |
| `105001` | `payment amount is below the minimum of $X` | A client submitted too small a payment in Lendiom Pay |
| `105002` | `the fixed minimum payment amount cannot exceed the total balance due` | Saving a **Fixed Amount** larger than that loan's or rental's balance |
| `105003` | `invalid minimum payment configuration` | Creating a loan or rental with an unrecognized rule, or **Fixed Amount** at zero |
| `999` | `invalid minimum payment configuration` | The same problem, on an update or on the organization default |

More codes are catalogued in [Error Messages](./error-messages.md).

## What the rule does not cover

:::caution
The minimum is checked in exactly two places: a client's regular loan payment and a client's rental payment, both submitted from Lendiom Pay. Everything below ignores it entirely.

- **Staff-entered transactions.** A payment you record yourself is accepted at any amount, with no warning and no mention of the rule anywhere in the transaction form. See [Adding a Transaction](../guides/adding-a-transaction.md).
- **Auto Draft and Auto Pay.** The nightly job charges the enrolled amount. A borrower who enrolls below the minimum keeps drafting below it indefinitely — and nothing at enrollment time checks the amount against the rule either. See [Automatic Payments](./automatic-payments.md).
- **Other online payment types.** Principal-only payments, other-fee payments, property tax payments, online down payments, and setup fee payments all skip the check. A borrower blocked from a $250 regular payment can still send $25 as a [principal-only payment](../guides/principal-only-payments.md) if you allow that on the loan.
- **Invoices.** Invoices have no minimum payment setting at all.
:::

## Rentals

Rentals use the same five rules, the same modal, and the same error code. The one difference that matters is what **Total Due** contains, and it is a trap on rentals carrying recurring fees: the tenant's Lendiom Pay dashboard shows rent plus late fees, while a **Current Late Balance** minimum is computed from Total Due with every recurring fee entry included. The tenant is told to pay more than the balance they can see, and paying it does not clear the gap. [Rental Fees](./rental-fees.md) explains why, and [Rental Balances](./rental-balances.md) covers how the underlying balance is rebuilt each night.

![The rental Details tab, with the Minimum Payment row above the total owed](/img/docs/app/how-it-works/minimum-payment/05.png)

## Invoices

Invoices are unaffected. There is no minimum payment setting on an invoice, and the invoice payment path never consults a loan's or a rental's rule. The equivalent control is the **Partial Payments** switch: leave it off and the client pays the full balance in one payment. See [Invoices Overview](./invoices-overview.md).
