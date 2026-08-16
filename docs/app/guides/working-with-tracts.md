---
id: working-with-tracts
title: Working with Tracts
---

A tract is one sellable parcel inside a land inventory. Tracts only exist under an inventory whose category is **Land** — anywhere else, Lendiom returns *"inventory type must be land to operate on tracts"*.

Open **Inventories**, pick a land inventory, and use the **Tracts** panel. The table lists every tract sorted by its number, with a summary row totalling acres, price, cost, and payments. If the tract acres do not add up to the inventory's total acres, the summary shows a warning icon.

![The Tracts panel on a land inventory, showing each tract with its status tag and the Add Tract button](/img/docs/app/guides/working-with-tracts/01.png)

## Adding a tract

Select **Add Tract** in the table header. A drawer opens titled *New Tract for: {inventory name}*.

| Field | Required | Notes |
| --- | --- | --- |
| Label | Yes | Free text. Appears in the table, loan labels, and documents. |
| Number | Yes | Whole number, 1 or greater. Sorting only; uniqueness is not enforced. |
| Acres | Yes | Drives every per-acre calculation. Must be above zero before a tract can be sold. |
| Status | Yes | See [Tract statuses](#tract-statuses) below. |
| Owner | No | Does not save. See the caution below. |
| Eligible for Property Tax Reimbursement | No | On by default. Feeds [property taxes](./property-taxes.md). |
| Parcel Numbers | No | Type a number and press enter; add as many as you need. |
| Total Cost / Per Acre Cost of Development | No | Tick the checkbox on whichever one you type; Lendiom calculates the other from the acreage. Leave the total at `0.00` to pull the per-acre cost from the inventory. |
| Pricing | No | Toggle **Add Pricing**, then choose **Financed** or **Cash Price**. |
| Location | No | Latitude, longitude, and zoom level, with a map preview. |

With **Add Pricing** on, tick the checkbox on either Sales Price or Price per Acre and Lendiom derives the other from the acreage. A financed tract also takes Down Payment, Years, and Interest Rate; Amount Financed, Monthly Payment, and Total of Payments are calculated and read-only. This pricing is a quote, not a contract — it pre-fills the numbers when you [create a loan](./creating-a-loan).

![The New Tract drawer, showing the tract details and the financed pricing fields](/img/docs/app/guides/working-with-tracts/02.png)

:::caution Two controls in this drawer do not work
The **Owner** field never saves. Picking a client, or clearing one, has no effect when you press Save — no error appears, the change is silently dropped. Set a tract's owner by creating a loan or by using **Mark Sold** instead.

The **Location** switch offers Address or Coordinates, but only Coordinates works. Switching to Address shows *"This feature is not yet implemented."* and no fields at all.

Both are bugs in Lendiom, not something you are doing wrong.
:::

## Adding tracts in bulk

There is no bulk tract creator and no CSV upload for tracts. The closest thing is **Duplicate** in the row actions menu, which copies one tract at a time — everything except the owner and the attached loan. Build one tract with the acreage and pricing you use most, duplicate it as many times as you need, then rename each copy. The data import does not create tracts either; it matches loans onto tracts that already exist, so create the tracts first.

:::caution Duplicates carry the original's label, number, and status
Every copy arrives with the same label and number as its source, so they sort together and are hard to tell apart. Fix each with **Rename**. Watch the status too: duplicating a tract that has a loan produces a copy stuck at **Sold** with no loan behind it, and a copy of a paid-off tract arrives as **Paid Off**. Set it back to **Available** before you sell it.
:::

## Tract statuses {#tract-statuses}

| Status | What it means | Who sets it |
| --- | --- | --- |
| Available | No loan, no cash sale. Ready to sell. | You, or Lendiom on release |
| Under Contract | Paperwork is out with a buyer. | You only |
| Pending | Whatever "waiting" means to your office. | You only |
| Resend Contract | The contract needs to go out again. | You only |
| Sold | A loan is attached, or a cash sale was recorded. | Lendiom only |
| Late | The attached loan is late. | You, or Lendiom from the loan |
| In Default | The attached loan is In Default or Defaulted. | You, or Lendiom from the loan |
| Paid Off | The attached loan is paid off. | You, or Lendiom from the loan |

Under Contract, Pending, and Resend Contract are labels for your own tracking. Lendiom never sets them, never clears them, and no automation keys off them. **Sold** is the only status you cannot choose yourself — it is greyed out in the Status dropdown on purpose, so use **Mark Sold** for a cash sale, or create a loan for a financed one.

Late, In Default, and Paid Off are normally written by the loan cascade, but the Status dropdown does offer them, so you can set any of the three by hand in the drawer or in **Quick Edit**. That only works on a tract with no loan attached — once a loan is on the tract, editing is blocked and the cascade owns the status.

## What happens when a loan is attached

The moment you create a tract loan, Lendiom writes back to every tract on it:

- Status becomes **Sold** immediately — even though the loan itself starts as a Draft.
- The borrower becomes the tract's owner, and the tract joins that client's associated items.
- The pricing block is overwritten from the loan terms, divided across every tract on the loan.
- The tract is locked. **Quick Edit** shows an **Active Loan** warning with every input disabled, and saving anyway is refused with *"can not update a tract which has a loan associated with it"*. **Delete** and **Mark Sold** are blocked too, and the **Edit** button on the tract page opens the Administrative Fields modal instead of the drawer.

Still editable: **Rename**, **Adjust Cost**, **Adjust Acres**, **Edit Administrative Fields** (tax eligibility and parcel numbers), **Custom Fields**, the description, notes, files, and the timeline. Adjusting acres also updates the acreage cached on the loan, and cost and acre changes leave an automatic note.

![A tract detail page, showing its status tag, acreage, legal description and the buyer information card](/img/docs/app/guides/working-with-tracts/03.png)

## How loan status cascades to tract status

| Loan status | Tract status becomes |
| --- | --- |
| Pending, Current, Grace Period, Pending Payoff | Sold |
| Late | Late |
| In Default, Defaulted | In Default |
| Paid Off | Paid Off, and tax reimbursement eligibility is switched off |
| Inactive, Canceled, Repossessed | Available, with the owner and loan link cleared |

The overnight integrity run drives most of this — and it runs again whenever a payment is recorded, reversed, or waived: to **Late** when the loan goes late, to **In Default** when the default clock runs out, and back to **Sold** when a late loan is brought current again.

The cascade does **not** run in these cases:

- **While the loan is still a Draft.** The tract went to Sold at creation, so promoting a Draft loan to Pending or Current does not touch it again.
- **Back to your own labels.** The cascade only writes Sold, Late, In Default, Paid Off, or Available. A tract you marked Under Contract or Pending never returns to that label on its own.
- **Paid Off does not release anything.** The tract keeps its loan link and its owner.

## Releasing a tract when a loan ends

| Situation | What to do | Result |
| --- | --- | --- |
| Loan is still a Draft and was a mistake | Delete the loan, or set it to **Canceled** | Tract returns to Available, owner and loan link cleared |
| You took the land back from the buyer | Loan actions → Status → **Repossessed**, then supply the repossession date | Tract returns to Available, owner cleared, client marked inactive |
| Loan was paid off | Nothing releases it | Tract stays **Paid Off** with the loan still attached |

Repossession is the intended path once a loan has gone live: deleting a loan is only allowed while it is a Draft, and **Inactive** is no longer offered for tract loans. Repossession cannot be reverted. See [loan status](../how-it-works/loan-status) for the loan side.

:::warning A paid-off tract is locked for good
When a loan pays off, the tract goes to **Paid Off** but keeps pointing at the loan. A tract with a loan attached cannot be edited, deleted, marked sold, or picked for a new loan — and a Paid Off loan has every status action disabled — so nothing returns that record to Available. If the same ground comes back later, add a new tract.
:::

## Tract owners

A tract's owner is a client record, shown in the **Buyer Information** card and reachable through **View Owner**. Lendiom sets it in exactly two places: **creating a loan** (the borrower becomes owner) and **Mark Sold** (the buyer you pick becomes owner). It is cleared when a loan is deleted, canceled, deactivated, or repossessed. Every change writes an automatic note naming the client, their entities, and who made the change.

**Mark Sold** records an outright cash sale. It needs a buyer, sale date, payment method, comment, and a sale price; you can attach a signed document. The cost of sale must be zero or positive, the sale date cannot be more than 45 days out, and the tract must have acreage above zero.

<!-- screenshot: the "Mark Sold" modal for a tract, with the buyer autocomplete filled in with "Jane Doe", a sale date, payment method set to Cash, a cost of sale, a document upload button, and the comment editor with a note about the sale -->

:::caution A cash sale cannot be undone
Once **Mark Sold** records a real sale date, the tract is frozen: Quick Edit is disabled, Duplicate and the Calculator disappear, and Edit Administrative Fields is greyed out. Re-running **Edit Cash Sale** lets you correct the buyer, date, price, or method — but nothing clears the cash sale or moves the tract off **Sold**. If one was recorded in error, the only way out is to delete the tract and rebuild it.
:::

## What Lendiom does not do

These operations do not exist anywhere in Lendiom — not in the app, not in the API. If you are hunting for them, stop looking:

- **No split or subdivide.** You cannot cut a 40-acre tract into four 10-acre tracts. Adjust the original's acreage down and add the new tracts yourself.
- **No combine or merge.** Two adjacent tracts cannot be joined. Delete them and create one replacement, or put both on the same loan — a loan carries several tracts and divides the price, down payment, and payment across them.
- **No bulk renumbering.** Numbers change one tract at a time through **Rename**.
- **No moving a tract to a different inventory.** A tract belongs to the inventory it was created under.

![The tract row actions menu open on a tract that already has a loan, with Delete and Mark Sold greyed out](/img/docs/app/guides/working-with-tracts/05.png)

All of this is governed by the **Tract** permission, with separate permissions for tract notes, files, and timeline. See [roles and permissions](../security/roles-and-permissions.md).
