---
id: recording-a-cash-sale
title: Recording a Cash Sale on a Tract
---

Some tracts sell outright. The buyer hands over the money, you hand over the deed, and there is nothing left to collect. Lendiom records that with the **Mark Sold** action on the tract, which writes a cash sale onto the tract itself instead of creating a loan.

## Cash Sale vs. Creating a Loan

These are two different paths and they are not interchangeable. The Mark Sold dialog says so directly: it is for cash sales only, and a financed sale belongs in the loan feature.

| | Cash sale (Mark Sold) | [Financed sale](./creating-a-loan) |
| --- | --- | --- |
| What is created | Fields on the tract | A separate loan record |
| Transactions | None — no transaction is created | Every payment is a transaction |
| Ongoing balance | None | Principal, interest, fees, escrow |
| Payment schedule | None | Amortization schedule |
| Buyer statements, Lendiom Pay, 1098s | Not applicable | Available |
| Tract status afterward | Sold | Driven by the loan |

A tract can only take one of these. If a loan is already attached, Mark Sold refuses with "can not mark a tract as sold with a loan attached", and the menu item is disabled in the tract list. In the other direction, a tract already marked sold cannot be picked when creating a loan — it shows as disabled with the tooltip "The tract is marked as sold."

## Before You Start

- The tract must have **no loan attached**.
- The tract's **acres must be greater than zero**. Price per acre is derived from acreage, so a zero-acre tract is rejected.
- The **buyer must already exist as a client**. The purchaser field searches your existing clients.

## Recording the Sale

Open the development, expand the **Tracts** section, then use the actions menu on the tract's row and choose **Mark Sold**. The action lives on the tract list, not on the tract detail page.

![A tract row on the development page with its Actions menu open, listing View Details, Quick Edit, Calculator, Delete, Duplicate, Mark Sold, Adjust Cost and Adjust Acres](/img/docs/app/guides/recording-a-cash-sale/01.png)

| Field | Required | Notes |
| --- | --- | --- |
| Purchaser | Yes | An existing client. This becomes the tract's owner |
| Date Sold | Yes | Cannot be more than 45 days in the future |
| Sale Price | Yes | What the tract sold for |
| Cost of Sale | Yes | Commissions, fees, closing costs. Enter `0` if there were none |
| Payment Method | Yes | Cash, Check, Bank Transfer, Wire, Money Order, Cashier's Check, Zelle, Credit/Debit Card, Cash App, PayPal, Venmo, Barter, or Other |
| Sale Document | No | Uploaded to the tract's files |
| Comment | Yes | Cannot be blank; posted to the tract's timeline |

![The Mark Tract as Sold dialog, its cash-sales-only notice above the purchaser, date sold, sale price, cost of sale, payment method, sale document upload and comment fields, all filled in](/img/docs/app/guides/recording-a-cash-sale/02.png)

## What Gets Recorded

Saving the dialog writes all of this to the tract at once:

| What | Effect |
| --- | --- |
| Owner | Set to the purchaser you selected |
| Status | Set to **Sold** |
| Cash sale date | The date you entered |
| Cash sale payment method | The method you selected |
| Cost of sale | The amount you entered |
| Sales price | The amount you entered |
| Price per acre | Recalculated as sale price ÷ acres |
| Financing flag | Set to not financed |
| Timeline note | Your comment, posted to the tract's timeline |

No transaction, payment, or invoice is created. A cash sale is a state on the tract, nothing more.

:::caution
Marking a tract sold **replaces the entire pricing block**. Any down payment, term length, interest rate, monthly payment, or total-of-payments you had entered for a prospective financed deal is wiped and replaced with a cash-only pricing record. There is no warning before this happens and no way to get those figures back.
:::

Once saved, the tract detail page shows three new fields — **Cost of Sale**, **Cash Sale Date**, and **Cash Sale Payment Method** — alongside the sales price and price per acre.

![The detail grid of a sold tract, its status reading Sold alongside the sales price, cost of sale, cash sale date and cash sale payment method](/img/docs/app/guides/recording-a-cash-sale/03.png)

## What Happens to the Tract

A tract with a recorded cash sale is locked down in the interface:

| Action | State after a cash sale |
| --- | --- |
| Edit (full tract drawer) | Disabled, with a "Sold Tract" warning |
| Quick Edit | Disabled |
| Edit Administrative Fields | Disabled |
| Calculator | Hidden |
| Duplicate | Hidden |
| Mark Sold | Relabelled **Edit Cash Sale** |
| Rename, Adjust Cost, Adjust Acres | Still available |
| Delete | Still available |

The status dropdown in the tract editor also shows **Sold** as permanently disabled, with the note "use Mark Sold action".

:::caution
Rename, Adjust Cost, and Adjust Acres stay enabled on a sold tract, and **Adjust Acres does not recalculate the price per acre**. Change the acreage after recording a cash sale and the tract keeps the price per acre from the original sale, which will no longer match sale price ÷ acres. If you must correct acreage after a sale, re-run **Edit Cash Sale** afterward so the per-acre figure is recomputed.
:::

If the tract is part of a development with property tax records, the property tax screen flags it: sold and paid-off tracts get a warning asking you to verify the tract is still eligible for tax reimbursement. See [Property Taxes](./property-taxes) for how that reimbursement works.

## How It Shows Up in Reports

Cash sales are stitched into the transaction reports as a synthetic row even though no transaction exists.

| Report | How the cash sale appears |
| --- | --- |
| Monthly Transaction List | One row with Type **Tract Sold**, status Success, the payment method, and the **sale price** in Total Collected. Interest, principal, fees, escrow, and platform columns are all zero. The comment column reads "Cash sale of tract" |
| Yearly Transaction List | Same row, placed in the month of the sale date |
| Monthly Journal Entry | The **Cash Land Sales** line sums the Total Collected of every Tract Sold row for the month. The inventory tab also counts the tract's acres toward acres sold |

Rows are matched to a reporting period by the **cash sale date** and sorted in with the real transactions. These reports pull the sale price, not the cost of sale, so their numbers are the ones to trust.

:::info
Because rows are matched on the sale date, a sale dated in the future — the form allows up to 45 days out — will not appear until you run the report for that month. Cash sales recorded before Lendiom stored a sale date have no date at all; those still count toward acres sold on the journal entry report, but they never produce a transaction row.
:::

For the wider reporting workflow, see [Year-End Close](./year-end-close).

## Deal Analysis and the Dashboard

If your organization has the Deal Analysis add-on, sold tracts feed the **Deal Analysis** tab on the development. Sold tracts count toward **Sold / Acre**, drop out of **Asking / Acre**, and contribute to **Expected Revenue** and therefore **Projected Net Profit**.

![The Deal Analysis section on a development, projecting revenue, cost basis and net profit](/img/docs/app/guides/recording-a-cash-sale/04.png)

:::warning
Deal Analysis reads the wrong field for cash sales. When a tract has a **non-zero Cost of Sale**, Deal Analysis uses that cost-of-sale amount as both the tract's sale price and its expected revenue, instead of the actual sale price. A tract sold for $50,000 with $2,000 in commissions is counted as a $2,000 tract, which understates **Sold / Acre**, **Expected Revenue**, and **Projected Net Profit**.

This is a defect in Lendiom, not something you configured wrong. Until it is fixed, the transaction and journal entry reports are the accurate source for cash sale revenue. Recording a Cost of Sale of `0` sidesteps the problem — Deal Analysis then falls back to the real sale price — at the cost of not tracking your selling expenses.

The dashboard's **Recent Events** card is affected the same way: the "sold for cash" entry shows the cost-of-sale amount next to it rather than the sale price.
:::

## If You Recorded It in Error

There is no undo. Lendiom has no action that clears a cash sale or returns the tract to Available, and the stored cash sale is never removed once written — even re-running the action only overwrites the values.

:::warning
A tract that has been marked sold can never be returned to **Available**. The Sold status is permanently disabled in the status dropdown, and no other action clears the cash sale record. Plan accordingly before saving the dialog.
:::

What you can actually do:

| Situation | What to do |
| --- | --- |
| Wrong price, date, cost of sale, payment method, buyer, or document | Use **Edit Cash Sale** from the tract's actions menu. It reopens the same dialog pre-filled and overwrites the values |
| Wrong tract entirely | Delete the tract and recreate it. Delete is still available on a sold tract, but it is permanent and takes the notes, timeline, and files with it |
| Sale fell through | Record the reversal in a comment on the tract, then delete and recreate it if it is going back on the market |

Every **Edit Cash Sale** run posts another comment to the tract's timeline, so the correction history stays visible even though the previous values do not.

![A sold tract’s notes panel, with the mark-sold comment and the later Edit Cash Sale correction above it, each showing its author and how long ago it was posted](/img/docs/app/guides/recording-a-cash-sale/04.png)

:::tip
Because there is no way back, treat the Comment field as your audit trail. Write down the purchase agreement number, the closing date, and who handled the sale. It is the only part of the record you control after the fact.
:::

The uploaded sale document is stored against the sale and also lands in the tract's **Files** section, which is where you retrieve it later. Nothing in the tract's details links directly back to it from the cash sale fields.
