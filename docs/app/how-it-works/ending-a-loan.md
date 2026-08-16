---
id: ending-a-loan
title: Ending a Loan Without a Payoff
---

Some contracts never reach a payoff. The buyer walks away, the paperwork falls apart before anyone signs, or you take the land back. Lendiom has four exits for those loans — **Repossessed**, **Inactive**, **Canceled**, and deleting the record — and they are not interchangeable. Three are effectively one-way, and one destroys data permanently.

This page is the procedure. For what each status means, read [Loan Status](./loan-status). If the borrower is paying off early, use [Recording a Loan Payoff](../guides/recording-a-loan-payoff); if you are rewriting the terms, use [Refinancing a Loan](../guides/refinancing-a-loan). For rentals, see [Ending a Lease](../guides/ending-a-lease).

## Which exit is offered

| Exit | Offered for | Where you start it | Reversible |
| --- | --- | --- | --- |
| **Repossessed** | Tract loans, plus any loan sitting in Defaulted | **Actions → Status → Repossessed**, or **Mark Repossessed** in a Defaulted loan's Action Center | No. The server refuses every later status change |
| **Inactive** | Residential and cash loans only | **Actions → Status → Inactive**, or **Mark as Inactive** in a draft's Action Center | Not from inside the app |
| **Canceled** | Loans still in **Draft** | **Actions → Status → Canceled**, or **Mark as Canceled** in the Action Center | Not from inside the app |
| **Delete** | Loans still in **Draft** | **Actions → Danger Zone → Delete** | No. The record and everything attached to it are gone |

Tract loans are never offered **Inactive**, and non-tract loans are never offered **Repossessed** from the Status menu. Everything here sits behind the loan's **Actions** button, which needs Update permission on loans ([Roles and Permissions](../security/roles-and-permissions)).

![The loan Actions dropdown with the Status submenu expanded, listing the lifecycle statuses](/img/docs/app/how-it-works/ending-a-loan/01.png)

## What all three ending statuses do

Repossessed, Inactive, and Canceled share the same teardown. The moment the status is saved, Lendiom:

- **Releases the property.** A tract's owner and loan link are cleared, its status returns to **Available**, and a note is written on the tract. On a residential loan, the property's owner and loan link are cleared. See [Working with Tracts](../guides/working-with-tracts).
- **Unlinks the client.** The tract or property is removed from the client's related items. The loan itself stays on the client record.
- **Turns off automatic payments.** Any active auto draft is disabled and a loan note records the reason, for example *"Loan status changed to Repo."* on a repossession — the note uses the stored status value, so Repossessed appears as *Repo*, while Inactive and Canceled read as you would expect. The borrower is **not** texted about it.
- **Blocks online payments.** No card or bank payment can be taken afterward, by you or by the borrower.
- **Removes it from nightly processing.** The integrity job skips ended loans: no more late fees, no status escalation, no automated reminders or notices. See [Late Fees](./late-fees).
- **Drops it from the dashboard** and out of the active loan count used for [billing](../billing/billing-cycles), from the next daily usage snapshot on.
- **Hides it in Lendiom Pay.** The loan disappears from the borrower's [Lendiom Pay](/pay/) dashboard.

:::caution
Ending a loan does not write off the balance. Lendiom records no transaction and zeroes nothing — principal, interest, fees, and property tax stay exactly as they were. If the ledger needs to show a write-off, record it before you change the status.
:::

:::info
Notes, files, the timeline, and **Custom Fields** stay usable on an ended loan. The money actions are what grey out: Record Transaction, Reverse, [Waive](../guides/waiving-late-fees), Record Payoff, Refinance, Recast, and Move Due Date.
:::

## Repossessing a loan

This is the exit to use whenever you actually got the property back, and the only one that reports correctly at year end.

1. Open the loan and choose **Actions → Status → Repossessed**, or **Mark Repossessed** in a Defaulted loan's Action Center. The same dialog opens either way, and it is the only way to set the status.
2. Enter the **Date of Repossession**. It is required, it is stored in your organization's timezone, and the picker rejects any date before the loan's last transaction or more than one day into the future.
3. Confirm. The dialog warns you before it saves.

![The Mark as Repossessed dialog, warning that the loan will be disassociated from the tract and that the action cannot be reverted, above the date of repossession picker](/img/docs/app/how-it-works/ending-a-loan/02.png)

On top of the shared teardown, repossession records the repossession date on the loan, sets the **client** to Inactive, and fires any document automation rules configured for the Repossessed status.

:::warning
Repossession is final in two ways. The loan can never leave the Repossessed status — the server rejects every later status change on it. And marking the client Inactive locks that person out of Lendiom Pay entirely, other loans included, because an inactive client cannot request or redeem a sign-in code. If the buyer is still paying you on a second contract, set them back to Active on the client record ([Managing Clients](../guides/managing-clients)).
:::

### Repossessing a loan that is already Inactive

A tract loan someone previously marked Inactive can still be repossessed: its Actions menu carries a **Make Repossessed** item in the Lifecycle group. Deactivating already stripped the tract details off the loan, so the dialog asks for two more fields, both required.

| Field | Rule |
| --- | --- |
| **Tract Acres** | Greater than zero. Acreage drives the cost basis on the installment income reports |
| **Tract Label** | The tract's name, used on reports and on the released tract |

<!-- screenshot: The Mark as Repossessed modal opened from an inactive tract loan, showing the extra Tract Acres and Tract Label fields below the date picker -->

:::caution
On a loan covering several tracts, the acreage and label you type here are written to the **first** tract only. Check the remaining tracts on the inventory afterward and correct them by hand.
:::

## Marking a loan Inactive

**Inactive** is the legacy exit, offered only on residential and cash loans. Choose **Actions → Status → Inactive**, confirm the dialog, and the shared teardown runs.

There is no way back. Once the loan is Inactive the whole Status submenu is disabled, and the only forward move the app offers is **Make Repossessed** — which appears on tract loans only. Treat Inactive as permanent.

:::caution
Deactivating a residential loan clears the property's owner and loan link, but leaves the property's own status exactly where it was. Nothing moves it back for you — open the property afterward and set the status yourself.
:::

## Canceling a loan

**Canceled** is for a contract that never got going — the buyer backed out before the first payment, or the deal collapsed during signing. Lendiom offers it only while the loan is still a **Draft**, from either the Status submenu or the **Mark as Canceled** button in the draft's Action Center.

![A draft loan, offering the buttons that move it to pending, current or canceled](/img/docs/app/how-it-works/ending-a-loan/04.png)

Canceled runs the same teardown, releases the tract, and drops the loan out of the analytics that count originated contracts — a canceled draft never counts as a deal you wrote. Late fees on it can no longer be waived.

:::caution
The confirmation dialog you get from **Actions → Status → Canceled** is titled **Deactivate Loan** and its text talks about marking the loan *inactive*. The wording is wrong; the loan is canceled, not deactivated. The Action Center's **Mark as Canceled** button shows the correct wording.
:::

## Deleting a loan

Deletion is not a status. It removes the record, and only while the loan is a **Draft** — on anything else the menu item is hidden and the server answers *"loans must be in a draft state to be deleted."*

Choose **Actions → Danger Zone → Delete** and confirm. Lendiom destroys the amortization schedule, every transaction, every escrow entry, all notes, the timeline, all uploaded files and generated documents, and any snail mail tied to the loan; releases the tract back to **Available** and unlinks the client; and disassociates the loan from any property tax record ([Collecting Property Tax](../guides/collecting-property-tax)). You land back on the loans list.

![The Delete Loan confirmation, warning that every attached component goes with it](/img/docs/app/how-it-works/ending-a-loan/03.png)

:::warning
There is no undo and no recycle bin. If you want the deal history — who the buyer was, what was signed, what was collected — cancel the draft instead of deleting it.
:::

## What each exit does to your reports

| Report | Repossessed | Inactive | Canceled | Deleted |
| --- | --- | --- | --- | --- |
| Installment income (monthly and yearly) | Included for the period of the repossession, client name annotated **"- Repo M/D/YYYY"** in red and the remaining balance set to 0; drops out in later periods | Excluded | Excluded | Gone |
| 1098 data | Included if interest was collected that year | Excluded | Excluded | Gone |
| Transaction lists and payments summary | Included through the repossession date | Excluded | Excluded | Gone |
| Dashboard active balances | Excluded | Excluded | Excluded | Gone |
| Active loan count for billing | Counted as inactive | Counted as inactive | Counted as inactive | Gone |

This is the practical reason to repossess rather than deactivate: an Inactive loan vanishes from the income reports as though the year's collections never happened, while a repossessed one reports them and then stops. See [The Reports Library](../guides/reports-library) and [Year-End Close](../guides/year-end-close).

![A repossessed loan, with the notice explaining that nothing further can be recorded against it](/img/docs/app/how-it-works/ending-a-loan/06.png)

## Picking the right one

- You took the property back, any loan type: **Repossessed**. Set the real date; it drives the reports.
- The deal collapsed while the loan was still a draft: **Canceled** to keep the record, **Delete** to erase it.
- A residential or cash loan is over and no property came back: **Inactive**.
- You entered something wrong on a live loan: fix the transactions ([Reversing a Transaction](../guides/reversing-a-transaction)) rather than ending the loan, since none of these exits can be undone.
