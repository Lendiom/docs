---
id: rental-balances
title: How Rental Balances Are Calculated
---

## The balance you type in will not survive the night

When you add a rental that already existed before you started using Lendiom, the wizard asks for the tenant's **Unpaid Balance**. That number is written to the rental, and then it is thrown away.

Lendiom does not keep a rental's balance due as a running figure you nudge up and down. It recalculates the balance from scratch — from the **First Payment Date** forward — and overwrites whatever was there. That happens the moment you save the rental, and again every night. A landlord who enters "$450 owed" and comes back the next morning finds a different number, with nothing in the interface explaining why.

The number you typed is not lost. It is preserved on the **Existing** tab, which appears only on rentals flagged as pre-existing. But it is a record of what you told us, not the live balance.

![The How Much step of the new rental wizard switched to Existing, showing the unpaid balance, late fee balance, other fee balance and next payment date](/img/docs/app/how-it-works/rental-balances/01.png)

![A rental on its Overview tab, showing Balance Due beside the Payment Amount and the next due date](/img/docs/app/how-it-works/rental-balances/02.png)

:::caution
There is no supported way to set a rental's opening balance and have Lendiom keep it. If the tenant owes an amount that does not equal rent-since-the-first-payment-date, the balance due field cannot represent it. The **Late Fee Balance** and **Other Fee Balance** you enter do survive, because neither is recalculated.
:::

## What the calculation actually is

The job walks forward one month at a time from the rental's **First Payment Date**, adding one full rent payment for each due date that has already arrived. That total is the amount expected to date. From it, it subtracts everything that has been paid toward the balance. The result — floored at zero — becomes the balance due.

```
Balance Due = (rent × due dates reached) − (amounts applied to balance)
```

Both sides are cumulative from day one, which is why prepayments are handled correctly without any special logic: a tenant who pays three months ahead shows a zero balance now, and the balance simply does not reappear until the expected side catches up.

Rental payments are always monthly — the frequency is not configurable, and the calculation always steps forward one calendar month.

Rental dates are stored at noon in your organization's timezone and the job runs at 12:45 AM Central, so rent for a due date is added to the expected total on the **following** morning's run, not on the due date itself.

## Which transactions count

Only some transactions reduce the balance due, and only some of each transaction's money counts.

| Transaction type | Counts toward balance due? |
| --- | --- |
| Regular Payment | Yes |
| Deposit | No |
| Late Fee | No — applies to the late fee balance |
| Other Fee | No — applies to the other fee balance |
| Maintenance Fee | No |
| Documentation Fee | No |
| Early Termination Fee | No |

| Transaction status | Counts toward balance due? |
| --- | --- |
| Success | Yes |
| Pending | Yes |
| Failure | No |
| Reversed | No |

Online payments are created as **pending** and become **success** when the processor confirms. Because pending counts, an online payment reduces the balance immediately rather than days later when the ACH clears. If it later fails or is reversed, the next recalculation puts the money back.

Within a qualifying payment, only the portion that landed on the balance counts. If a $900 payment covered $100 of late fees first, only $800 reduces the balance due.

![The rental Transactions list, with regular payments and their success status](/img/docs/app/how-it-works/rental-balances/03.png)

## When it runs

The **Rental Data Integrity** job runs once a day at **12:45 AM America/Chicago**, regardless of where your organization is. The schedule is fixed and there is no way to trigger it on demand.

It processes every rental whose status is **Current**, **Late**, or **Eviction**. Rentals in **Draft**, **Evicted**, or **Terminated** are never loaded and are never touched.

:::info
Draft is the escape hatch. While a rental is a draft, the nightly job leaves it alone entirely — no balance recalculation, no due date movement, no late fees — so you can enter historical transactions in peace before the rental goes live.
:::

Draft protection covers only the nightly sweep. The same routine also runs when you save a new rental, add or change a transaction, or update the online payment configuration, and in those cases the balance is recalculated even on a draft. What a draft is spared there is the status change, the due date advance, and the late fee.

## Status changes, and the document automation they fire

After the balance is recomputed, the job decides whether the rental is late.

Once the due date plus the grace period has passed:

- Balance due rounds to zero → status becomes **Current**, and **Next Due Date** advances one month.
- Balance due is anything else → status becomes **Late**, Next Due Date advances one month, and a late fee is applied unless late fees are switched off on that rental.

Inside the grace window, the job is more conservative: a zero balance sets **Current**, a balance larger than one full rent payment sets **Late**, and anything in between leaves the status alone. A partially paid tenant stays Late until the balance reaches zero.

A status change made by this job fires document automation exactly as a manual status change would — but only for transitions **into** Late, Eviction, Evicted, or Terminated. A rental going from Late back to Current does not trigger anything. So a tenant who falls behind can receive an automated notice generated at one in the morning, with no person in the loop.

<!-- screenshot: the rental Document Automation history tab showing a job entry with trigger "status change", previous status "current" and new status "late", timestamped shortly after 12:45 AM -->

:::warning
Automation runs on the rental's own rules, which are copied from your organization defaults when the rental is created. Changing the defaults later does not change rentals that already exist.
:::

## Entering an old lease generates a run of late fees

The job advances **Next Due Date** by one month per run and applies at most one late fee per run. A rental entered with a First Payment Date several months in the past therefore catches up one month per night — and produces one late fee per night as it goes.

:::caution
The **Next Payment Date** field in the Existing Rental section of the wizard is stored and shown on the Existing tab, but it is never used. Next Due Date is always set to the **First Payment Date**, whatever you enter. This is the field most likely to cause a surprise late fee run-up on a lease you are migrating in.

Until it is fixed: set **First Payment Date** to the date you want the schedule to start from, and switch late fees off on the rental until the balance settles where you expect.
:::

Percentage-based late fees are calculated against the recomputed balance due — the entire arrears, not one month's rent. On a rental six months behind, a 5% late fee is 5% of six months of rent.

![The rental Transactions list, showing the system-generated late fees alongside the rent payments](/img/docs/app/how-it-works/rental-balances/03.png)

## Late fees, other fees, and recurring fees are separate

Only the balance due is recalculated. The other three figures behave differently:

| Figure | Behaviour |
| --- | --- |
| Balance Due | Recomputed from scratch every run |
| Late Fees Due | Running total; increased by late fees, reduced by late fee transactions |
| Other Fees Due | Running total; never touched by the nightly job |
| Deposit | Recorded only; never part of what is owed |

**Total Due** on the Overview tab is the sum of balance due, late fees, other fees, and any unpaid recurring fees.

:::caution
Charged recurring fees are added to the rental's balance and counted in **Total Due**, but there is no transaction type that pays them off and nothing that ever clears them. They also do not appear as their own line on the Overview tab. The result is a Total Due larger than Balance Due plus Late Fees plus Other Fees, with no visible explanation and no way to close the gap. If your Total Due does not add up, this is why.

Two related limits on recurring fees: a fee with **First Charge Period** set to *Specific Date* cannot currently be saved at all — the rental is rejected with "invalid recurring fee, the first charge date is required". And *Contract Start* is rejected on any lease whose start date is in the past, which means every pre-existing lease.
:::

An overpaid other fee balance goes negative and stays negative. It is displayed as a negative Other Fees Due, is excluded from Total Due, and is never applied to rent. Treat it as a note to yourself, not a credit.

For how grace periods, tiers, and fee amounts are configured, see [Late Fees](./late-fees.md). For the separate nightly job that pulls payments, see [Automatic Payments](./automatic-payments.md).
