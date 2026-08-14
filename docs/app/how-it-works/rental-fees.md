---
id: rental-fees
title: Rental Late Fees, Recurring Fees and Deposits
---

Everything a rental charges on top of rent is entered in the New Rental wizard, and each charge behaves differently afterward. This article covers how late fees, security deposits, and recurring fees are configured, when Lendiom assesses them, and what you cannot change once the rental exists.

## Late fees

### Configuring the tier

Rental late fees are set on the **Terms** step of the wizard. Choose whether Lendiom applies them **Automatically** or **Manually**, then add a late fee tier. A tier is required either way, even when you pick Manually.

<!-- screenshot: The Terms step of the New Rental wizard, Late Fees Applied set to Automatically, with a single late fee tier tag under Late Fee Tiers next to the Add tier button -->

| Setting | What it controls |
| --- | --- |
| Days Until Applied | The grace period: full calendar days after the due date. The due date itself is not counted. |
| Application | **First Part of Next Payment** or **Added to Late Fee Balance**. See below. |
| Charge Type | **Fixed Amount** or **Percentage**. |
| Fixed Amount | The flat dollar charge, when the charge type is Fixed. |
| Percentage | A percent of the balance due at the moment of assessment. |
| Minimum Amount | Floor for percentage fees. A percent landing below it is raised to the minimum. |
| Maximum Amount | Cap for percentage fees. Leave it at zero for no cap. |

A percentage fee is calculated against the rental's **entire outstanding balance due**, not one month's rent, so on a rental several months behind the same percentage produces a much larger fee than it did the first month. **Added to Principal** is a loan-only option and is rejected on rentals.

:::caution
A rental accepts exactly one late fee tier. The **Add tier** button will let you add a second, and nothing warns you until the final save fails with `only one late fee tier is supported on rentals at the moment`. Return to the Terms step, remove the extra tier, and save again.
:::

:::caution
**Rental late fee configuration cannot be changed after the rental is created.** There is no edit screen, and the server endpoint that would accept the change is wired up but returns "not implemented". A wrong grace period, amount, or Application choice cannot be corrected in the app. Get the tier right in the wizard; if a live rental already has the wrong configuration, contact support rather than hunting for a setting that is not there.
:::

### When the fee is assessed

A scheduled job named **Rental Data Integrity** runs daily at 00:45 US Central and evaluates every rental. It recalculates the balance due, and if the full grace period after the next due date has elapsed and the balance is not zero, it sets the status to **Late** and rolls the next due date forward one month. When late fees are set to Automatically, it also records a **Late Fee** transaction dated the **last day of the grace window** rather than the day the job ran, so history stays accurate. The comment on it records the original due date and the grace days applied.

At most one late fee is charged per due-date cycle: Lendiom skips the grace date if a late fee already sits on it, including a reversed one, so a reversed late fee does not come back on the next nightly run.

Rentals in **Draft** are skipped entirely — no status change, no due-date roll, no late fee — so you can back-enter history before making the rental active. Evicted and Terminated rentals are skipped too.

![The rental Transactions table, with system-generated late fee rows among the rent payments](/img/docs/app/how-it-works/rental-fees/02.png)

### Clearing a late fee

What a rent payment does to the late fee balance depends on the tier's **Application** setting.

| Application | What a regular payment does |
| --- | --- |
| First Part of Next Payment | Pays the late fee balance first; only the remainder goes to rent. A banner in the Add a Transaction modal shows how much will be taken. |
| Added to Late Fee Balance | Goes entirely to rent. The late fee balance stays outstanding until you clear it separately. |

To move the balance by hand, add a transaction of type **Late Fee**. A **negative** amount adds to the late fee balance and needs no payment method. A **positive** amount pays it down, requires a payment method, and cannot exceed the balance outstanding. To undo a late fee that should never have been charged, reverse it from its row in the Transactions table — that removes it from the balance and stops the nightly job from re-adding it.

:::caution
Loans have a **Waive Late Fee** switch on the payment screen. Rentals do not — there is no waive control in the rental transaction modal and no waive action on a rental late fee row. Reversing the transaction is the only way to remove a rental late fee without collecting it.
:::

## Security deposits

**Deposit Amount** is a required field on the **How Much** step. It is stored on the rental as a single number. It is not added to the amount due, and it is not a ledger — nothing in Lendiom debits it, credits it, or holds it against anything.

The Add a Transaction modal offers a **Deposit** type under the **Record Keeping** group, pre-filled with the deposit recorded at creation. That grouping is accurate: the transaction is written to history and changes no balance at all — not the deposit figure, not the balance due, not late fees, not other fees.

![The Add a Transaction modal on a rental, with the transaction type selector](/img/docs/app/how-it-works/rental-fees/03.png)

:::caution
Deposit handling is not finished. The **Deposit Tracking** panel on the rental page is present but disabled and labelled "Coming soon", the deposit amount cannot be edited after creation, and there is no return or deduction workflow — recording a Deposit transaction for a refund does not reduce the stored figure. Until deposit tracking ships, treat the amount as a reference note, hold the money wherever your state requires, and record deductions as **Other Fee** transactions so they land on a balance you can collect.
:::

## Recurring fees

Recurring fees cover charges that repeat alongside rent — pest control, trash, a parking spot. They are added on the **How Much** step.

<!-- screenshot: The New Recurring Fee modal with Fee Name, Description, Amount, Frequency set to Monthly, and the First Charge Period radio group showing Contract Start and Specific Date -->

| Field | Notes |
| --- | --- |
| Fee Name | Required. |
| Description | Required. |
| Amount | Required, greater than zero. |
| Frequency | Monthly is the only option. |
| First Charge Period | **Contract Start** uses the rental's start date. **Specific Date** lets you pick one. |

Once the rental is live, the nightly job checks each recurring fee. On the day its next charge date arrives, an entry is added to the rental's recurring fee balance and the next charge date moves forward one month. Every entry ever added is included in the rental's **Total Due**.

:::caution
**A recurring fee cannot be paid off, and it cannot be removed.** This is the software, not something you configured wrong.

No transaction type applies money to a recurring fee. Rent payments, online payments, and auto pay all record regular payments, which never touch it, and no screen edits or deletes one after creation. **Total Due therefore grows by the fee amount every month, indefinitely.**

The individual entries are invisible: the Details tab lists the fees you configured and a Total Due figure, with no line item explaining the gap, and the Total Due tooltip does not mention recurring fees.

A minimum payment rule makes it worse. Under **Current Late Balance**, the enforced minimum is the Total Due with recurring fees included, while the tenant's Lendiom Pay dashboard shows rent plus late fees only — so the tenant is told to pay more than the balance they can see, and paying it does not clear the difference.

**Do not add recurring fees to a rental you intend to collect on.** Charge the amount each period as an **Other Fee** transaction instead.
:::

:::caution
The first charge date has to be in the future, and the wizard does not say so up front. **Contract Start** on a rental whose start date has passed fails the save with `we currently do not support first charge date on recurring fees to be in the past`. **Specific Date** fails too: the date the wizard collects is not sent in the field the server reads, so the save is rejected with `invalid recurring fee, the first charge date is required` no matter which date you pick. If either blocks you, remove the recurring fee and save the rental without it.
:::

![The rental Details tab, showing Balance Due, Late Fees Due, Other Fees Due and Total Due](/img/docs/app/how-it-works/rental-fees/05.png)

## Where to put each kind of charge

| Charge | Use | Why |
| --- | --- | --- |
| Late payment penalty | The late fee tier, set at creation | Assessed automatically, dated correctly, reversible |
| Any charge you will collect, one-off or repeating | An **Other Fee** transaction each time | Other fee balances can be paid down; recurring fees cannot |
| Security deposit | The Deposit Amount field, plus your own trust records | Deposit tracking is not built yet |

For late fee tiers in general, including the multi-tier behaviour on loans, see [Late Fees](./late-fees.md). For how automatic rent drafting interacts with these balances, see [Automatic Payments](./automatic-payments.md).
