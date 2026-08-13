---
id: choosing-an-interest-schedule
title: Choosing an Interest Schedule
---

Every loan carries an **interest schedule**. It decides how Lendiom computes interest, what the borrower's payment covers, and whether the loan has a fixed end date. You pick it in step 3 of the new loan wizard, it is required, and it is the one term you cannot edit later.

There are three: **Follows Payment Schedule**, **Accrues Daily**, and **Interest Only**. All three work on monthly, biweekly, and weekly cadences.

<!-- screenshot: Step 3 (How Much) of the new loan wizard with the Interest Schedule dropdown open, showing its three options — Accrues Daily, Follows Payment Schedule, Interest Only — and the Interest Rate and Length fields filled in above it. -->

## Side by side

| | Follows Payment Schedule | Accrues Daily | Interest Only |
| --- | --- | --- | --- |
| Borrower's payment | One fixed amount for the whole term | One fixed amount, computed the same way | Whatever interest the period accrued |
| Each payment covers | Interest and principal, split by the schedule | Interest owed to date first, principal with the rest | Interest only |
| Interest per period | Remaining principal × (annual rate ÷ payments per year) | Remaining principal × daily rate × days since the last payment | Same day-count math as Accrues Daily |
| Days late change the interest | No | Yes | Yes |
| Principal falls on its own | Yes, every payment | Yes, whatever is left after interest | No |
| Number of payments | Fixed by the length you enter | Floats — the schedule runs until principal reaches zero | Fixed, indefinite, or ends in a balloon |
| Unpaid interest | Rolls forward on the schedule | Held as an interest balance, collected first next time | Held as an interest balance, or capitalized |
| Can be recast | Yes | Yes | No — error 2606 |

## Follows Payment Schedule

This is classic amortization. Lendiom computes one payment from the amount financed, the rate, and the number of periods, then builds a table of exactly that many rows. Each row's interest is the remaining principal times the rate divided by payments per year, and the rest of the payment goes to principal.

The calendar does not enter into it. A payment received eleven days late is split exactly as the schedule says — the borrower pays [late fees](./late-fees.md), not extra interest. Because the row count is fixed, the last payment date on the schedule is the real last payment date as long as the borrower pays as agreed.

Pick this when your contract states a term and a payment and the amortization table is the agreement.

## Accrues Daily

The payment amount is computed the same way, but the interest owed is not. Lendiom counts the days since the last payment and multiplies by a daily rate drawn from the **Interest Formula** you choose — 30/360, Actual/360, or Actual/365. Pay early and more of the payment lands on principal; pay late and interest eats more of it, with anything left over held as an unpaid interest balance that is collected before principal next time.

That makes the term elastic. The length field is labelled **Based on Length** here, and it does exactly what the label says: it sizes the payment. The schedule keeps generating rows until the principal reaches zero, so consistent late payments push the payoff date out. Generation is capped rather than endless: a length entered in **years** runs to that many years of payments plus at least another ten, scaled to the cadence, while a length entered in **months** is capped as if it were thirty years no matter what number you entered. A loan whose payment is too small to retire the balance runs all the way to that cap, and everything still owed folds into an oversized final row.

The formulas, the daily interest math, and the differences between the three accrual methods are covered in detail in [Interest Accrues Daily](./interest-accrues-daily.md).

<!-- screenshot: Step 3 of the new loan wizard with Accrues Daily selected, revealing the Interest Formula dropdown (set to Actual / 365) and the Finance Start dropdown below it, with the Length field relabelled "Based on Length". -->

Pick this when your contract says interest accrues daily on the unpaid balance, or when you want early payments to genuinely save the borrower money.

## Interest Only

The scheduled payment covers the period's interest and nothing else. Principal does not move unless the borrower pays more than the payment or you record a [principal-only payment](../guides/principal-only-payments.md). Interest is computed by day count using the same Interest Formula options as Accrues Daily.

Two extra decisions come with it.

**Compound Unpaid Interest** decides what happens to interest the borrower does not pay. Leave it off and interest is charged on principal alone. Turn it on and unpaid interest is capitalized into the principal balance the next time a payment is applied, and every day of interest after that is charged on the larger number.

**Term Type** decides how the loan ends:

| Term type | What the schedule looks like |
| --- | --- |
| Indefinite (Month to Month) | No length at all. Lendiom keeps twelve payment periods visible ahead of what has been recorded, and there is no maturity date. |
| Fixed Period | Interest-only payments for the length you enter, then the schedule stops. |
| Balloon | Interest-only payments for the length you enter, then a final row. **Called Due** makes that row the whole remaining balance plus its accrued interest. **Convert to Amortized** replaces it with a full amortization run at its own length and unit — and that tail is amortized per period, so the daily formula stops applying once the interest-only phase ends. |

<!-- screenshot: Step 3 of the new loan wizard with Interest Only selected, showing the Compound Unpaid Interest switch, Term Type set to Balloon, the Balloon Action dropdown set to Convert to Amortized, and the Amortized Period length and unit inputs below it. -->

:::caution The amortized tail is always monthly

The wizard asks for a length and a unit for the amortized phase and nothing else — it never asks for a payment frequency, and Lendiom defaults it to **monthly**. A weekly or biweekly interest-only loan with **Convert to Amortized** selected switches to monthly payments once the amortizing phase begins.

:::

Interest-only loans are also the only ones where a negative principal payment is allowed, which is how you increase a balance on a draw-style note.

:::info On monthly loans the payment shown is an average

Under 30/360 the stored payment amount and each scheduled row agree exactly. Under Actual/360 or Actual/365 they do not: a monthly loan's **Payment Amount** is the rate divided by twelve, while each row in the schedule is billed for the actual days in that period. The wizard says as much — it labels the calculated figure **First Monthly Payment**, not *Monthly Payment*. Weekly and biweekly interest-only payments are computed on a fixed 7 or 14 days, so they match.

:::

Pick this for land contracts and bridge notes where the borrower services interest and settles principal later, or where there is no amortization to speak of.

## What each schedule asks you for

| Field | Follows Payment Schedule | Accrues Daily | Interest Only |
| --- | --- | --- | --- |
| Interest Formula | Not shown, and cleared when the loan is saved | Required | Required |
| Finance Start | Not shown, and cleared when the loan is saved | Required | Required |
| Length | Required — sets the number of payments | Required — sizes the payment only | Required, except for Indefinite |
| Interest-only structure | — | — | Required |
| Extra Payment Application | Your choice: Principal or Next Payment | Forced to Principal | Forced to Principal |

**Finance Start** is the anchor for the first period's interest: **Down Payment Date** (which then requires a down payment date on the loan), **Closing Date**, or **Full Month**. Full Month is offered only on monthly loans — the server rejects it on weekly and biweekly, where a month-long first period would be wrong.

:::caution Extra Payment Application is inert on two of the three

The selector still appears on Accrues Daily and Interest Only loans, but it is disabled and always reads **Principal**. On those schedules extra money is applied against the balance and there is no way to make it prepay the next installment. Only Follows Payment Schedule loans honor the **Next Payment** setting.

:::

:::caution Interest-only loans do not display their formula

A loan's **Details** tab shows the Interest Formula and Finance Start rows only when the schedule is Accrues Daily. Interest-only loans store both values and use them for every calculation, but neither is shown anywhere in the loan view. Record what you selected — the **Interest per Day** figure on the Overview tab is the only visible trace of it.

:::

<!-- screenshot: The Overview tab of an interest-only loan showing the Payment Amount, Remaining Principal, Interest Rate, Interest per Day, Accrued Interest, Unpaid Interest, Compounding ("Simple") and Term Type ("balloon") rows in the details grid. -->

## The choice is permanent

There is no way to edit a loan's terms after it is created. Lendiom has no endpoint that changes the interest schedule, the rate, or the length in place, and no edit screen for them — the only way to move a live loan onto a different schedule is to [refinance it](../guides/refinancing-a-loan.md), which freezes the original loan in a terminal **Refinanced** status and creates a successor.

Even then, conversion is one-directional and narrow:

| From | To | Allowed? |
| --- | --- | --- |
| Interest Only | Follows Payment Schedule | Yes |
| Interest Only | Accrues Daily | Yes |
| Interest Only | Interest Only | No — error 2511 |
| Follows Payment Schedule | Anything else | No — error 2510 |
| Accrues Daily | Anything else | No — error 2510 |

A refinance of a Follows Payment Schedule or Accrues Daily loan can change the rate, the term, and the cadence, but it carries the original interest schedule forward. [Recasting](../guides/recasting-a-loan.md) never changes the schedule either, and interest-only loans cannot be recast at all.

<!-- screenshot: The Refinance Loan modal on an interest-only loan, with the required New Interest Schedule dropdown expanded showing its only two choices, Follows Payments and Accrues Daily. -->

So the decision is worth making carefully at creation. If the loan is still in **Draft** and the schedule is wrong, delete it and create it again — that is far cheaper than a refinance. See [Creating a Loan](../guides/creating-a-loan.md) for the rest of step 3, and [Loan Status](./loan-status.md) for what Draft and Refinanced mean.

:::warning Your contract governs

Lendiom computes what you configure. Whether the schedule you select matches the note the borrower signed is your responsibility, and the difference between the three is real money over a full term.

:::
