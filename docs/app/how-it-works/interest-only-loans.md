---
id: interest-only-loans
title: Interest-Only Loans
---

An interest-only loan is one where the scheduled payment covers the interest for the period and nothing else. The principal balance sits still until someone deliberately pays it down or the loan matures. In Lendiom this is a third choice in the **Interest Schedule** field on step 3 of the [new loan wizard](../guides/creating-a-loan.md#step3-interest-schedule), alongside Accrues Daily and Follows Payment Schedule.

Interest-only loans always use daily interest accrual, so the **Interest Formula** and **Finance Start** fields become required the moment you pick Interest Only. The math for each period is the same day-count math described in [Interest Accrues Daily](./interest-accrues-daily.md).

![Step 3 of the new loan wizard with Interest Only selected, showing the Interest Formula, Finance Start, Compound Unpaid Interest switch and Term Type](/img/docs/app/how-it-works/interest-only-loans/01.png)

## The fields you set

| Field | What it does |
| --- | --- |
| Interest Formula | 30 / 360, Actual / 360, or Actual / 365. Required. Drives the daily rate. |
| Finance Start | Closing Date, Down Payment Date, or Full Month. The anchor for the first period's interest. Full Month is monthly-cadence only. |
| Compound Unpaid Interest | A switch reading **Compound** or **Simple**. Controls whether unpaid interest becomes principal. |
| Term Type | Indefinite (Month to Month), Fixed Period, or Balloon. |
| Interest-Only Period | The length, in months or years. Hidden and not required for Indefinite. |
| Balloon Action | Balloon only: Called Due (Full Balance Due) or Convert to Amortized Loan. |
| Amortized Period Length | Convert to Amortized only: how long the amortizing phase runs. |

Extra Payment Application is locked to **Principal** on interest-only loans and cannot be changed in the wizard, because the regular payment covers only interest — anything above it has nowhere else to go.

The calculated payment is labeled **First Monthly Payment** rather than Monthly Payment, and it is exactly that: an estimate of the first period's interest. Later periods move with the balance, the day count, and the formula.

## How the schedule differs

| | Amortized loan | Interest-only loan |
| --- | --- | --- |
| Payment amount | Fixed for the life of the loan | Recalculated each period from the balance, the day count, and the formula |
| Principal in each row | Rises over the term | Zero, unless you overrode the payment or made a principal payment |
| Balance column | Falls every row | Flat |
| Row count | The full term | The full term, or a rolling window on indefinite loans |
| Total of Payments / Total Interest | Shown on the review step, but only when interest follows the payment schedule | Not shown — there is no fixed total to quote |

The **Amortization Schedule** section carries an **Interest Only Loan** notice explaining that the rows assume payments land exactly on their due dates. On the loan itself the table also gains an **Unpaid Interest** column, which the wizard's review-step preview does not show. Escrow, if the loan collects it, is added on top of the interest figure in each row exactly as it is on any other loan — see [Escrow on Loans](./loan-escrow.md).

![The Amortization Schedule of an interest-only loan, with the Interest Only Loan notice above a table whose Principal column is zero and whose Balance repeats](/img/docs/app/how-it-works/interest-only-loans/02.png)

## Indefinite, fixed, and balloon

| Term type | What Lendiom generates |
| --- | --- |
| Indefinite (Month to Month) | A rolling window of rows. No end date, no length field. |
| Fixed Period | Exactly the number of periods in the term you entered, all interest-only. |
| Balloon | The full interest-only term, then one or more extra rows determined by the Balloon Action. |

### The rolling window on indefinite loans

An indefinite loan has no end, so Lendiom cannot draw a complete schedule. Instead it renders **twelve unpaid periods beyond whatever has already been paid**. A loan with six paid or partially paid periods shows eighteen rows; a brand-new one shows twelve.

The window advances on its own. The schedule is regenerated every time the nightly integrity job runs and every time a transaction posts, so as payments come in the paid rows are kept and twelve fresh projections are appended past them. There is nothing to click and no way to ask for more rows.

:::caution
A fixed-period interest-only loan stops after its last interest-only row. Lendiom does not append a principal payment at the end — the balance is still outstanding and the schedule simply runs out. If the balance is contractually meant to come due at term end, choose **Balloon** with **Called Due**, not Fixed Period.
:::

## Compounding unpaid interest

The Compound Unpaid Interest switch decides what happens to interest a borrower does not pay.

| Setting | Behavior |
| --- | --- |
| Simple | Unpaid interest sits in the loan's Unpaid Interest balance. It is settled first out of the next payment, and it never earns interest itself. Interest accrues on the principal balance only. |
| Compound | Before a regular payment is applied, the whole Unpaid Interest balance is capitalized into principal and zeroed. Every day after that, interest accrues on the larger principal. |

Compounding is not a one-time event. Each shortfall that survives to the next payment is folded into principal, so a borrower who chronically underpays on a compound loan watches the balance climb. The projected schedule reflects this too: a partially paid row's shortfall is added to the balance the projection carries forward.

The current setting is visible on the loan's overview card as **Compounding**, next to **Term Type** and, on balloon loans, **Balloon Action**.

![The overview card of an interest-only loan, showing Interest per Day, Accrued Interest, Unpaid Interest, Compounding and Term Type](/img/docs/app/how-it-works/interest-only-loans/03.png)

## Paying the principal down

Two things move principal on an interest-only loan:

- A [principal-only payment](../guides/principal-only-payments.md). On interest-only loans this is also the only place a *negative* amount is accepted, which increases the balance and requires a comment.
- A regular payment larger than the interest due. The excess goes to principal, since Extra Payment Application is locked there.

You can also set a fixed payment at creation with the **Overwrite** button. The field then reads *Fixed Monthly Payment* — or whichever cadence the loan uses — and each period the amount above that period's interest reduces principal while any amount below it accrues as unpaid interest. A fixed payment comfortably above the interest will eventually retire even an indefinite loan.

:::caution
The **Payment Amount** on the loan overview is derived from the original amount financed, not the current balance. It does not fall as principal is paid down. The per-period figures in the schedule do reflect the real balance.
:::

## The balloon and calling the loan due

Choosing **Balloon** adds a final act to the schedule once the interest-only term is over.

**Called Due (Full Balance Due)** appends a single row, dated one period after the last interest-only payment, for the entire remaining principal plus that period's interest. That row is the maturity. There is no separate button anywhere in Lendiom to call a loan due early — maturity is the term you set when the loan was created.

Lendiom treats that row differently from a normal payment for messaging. The ordinary upcoming, due-today, and late reminders skip it, and a dedicated balloon maturity reminder goes out at 30 days, 7 days, and on the due date. See [Automated Borrower Messages](../communication/automated-messages.md) for the full catalog and the send times.

**Convert to Amortized Loan** instead appends a full amortizing schedule for the remaining balance, using the Amortized Period Length you set. Payment numbering continues unbroken from the interest-only rows.

:::caution
The wizard does not ask for a payment frequency for the amortized phase, and Lendiom defaults it to **monthly**. A loan on a weekly or biweekly interest-only cadence with Convert to Amortized selected will switch to monthly payments once the amortizing phase begins.
:::

<!-- screenshot: Step 3 of the new loan wizard with Term Type "Balloon", Balloon Action "Convert to Amortized Loan", and the Amortized Period Length field showing 15 Years. -->

## Converting an existing loan to amortized

You cannot change the interest schedule on a loan that already exists. Terms are fixed at creation, and neither the loan edit screens nor [Recast](../guides/recasting-a-loan.md) can move a loan off Interest Only — recast is rejected outright on interest-only loans (error 2606).

The one supported path is a [refinance](../guides/refinancing-a-loan.md). The refinance window on an interest-only loan adds a required **New Interest Schedule** field offering Follows Payments or Accrues Daily, and requires a term length. It closes the original loan with a status of `Refinanced` and creates a successor carrying the balance forward. An interest-only loan cannot be refinanced into another interest-only loan.

Note that the Convert to Amortized balloon action is not the same thing. That is a term you commit to at creation, baked into the schedule from day one — not a conversion you can apply later.

![The Refinance Loan modal on an interest-only loan, requiring a new interest schedule](/img/docs/app/how-it-works/interest-only-loans/02.png)

## Related reading

- [Interest Accrues Daily](./interest-accrues-daily.md) — the day-count formulas every interest-only loan uses
- [Refinancing a Loan](../guides/refinancing-a-loan.md) — the only route off an interest-only schedule
- [Principal-Only Payments](../guides/principal-only-payments.md) — how principal moves on these loans
- [Recording a Loan Payoff](../guides/recording-a-loan-payoff.md) — settling the balance before maturity
