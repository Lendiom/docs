---
id: managing-properties
title: Adding and Managing Properties
---

Everything you sell or rent lives in the **Inventory** section. The record is the anchor — tracts, units, loans, rentals, property taxes, notes, and files hang off it — so the choices you make when creating one are hard to change later.

![The Inventory list, showing each property with its category, type and status](/img/docs/app/guides/managing-properties/01.png)

## Categories

Pick the category first. It decides which fields you get, what you add afterward, and which type you may use.

| Category | Available? | What you add afterward |
| --- | --- | --- |
| Land | Yes | Tracts — each tract is its own salable piece |
| Residential | Yes | Nothing; the record is itself the salable unit |
| Multifamily | Yes | Units — each apartment or condo in the building |
| Commercial | **Disabled** | — |
| Other | **Disabled** | — |

Commercial and Other appear in the dropdown but cannot be selected. Commercial also appears in the list's Category filter even though you cannot create one.

## Types

| Type | Meaning | Availability |
| --- | --- | --- |
| Finance | Selling it, usually with owner financing | Land and Residential; disabled for Multifamily |
| Rental | Leasing it out | Residential and Multifamily; disabled for Land |
| Other | Reserved | **Disabled everywhere** |

Choosing Land sets the type to Finance for you; choosing Multifamily sets it to Rental. Residential is the only category where you make the call.

## Creating a property

Click **Add New** and work through three steps: **Basic Data**, **Details**, then **Save**, a review screen plus any custom fields your organization has defined. Next stays disabled until the current step's required fields are filled in. Status at creation is limited to Idea, Ready, In Progress, or Completed.

![Step one of the new inventory wizard, with the category dropdown open above the Finance/Rental type choice](/img/docs/app/guides/managing-properties/02.png)

The fields worth getting right the first time:

- **Name** — visible to your clients and used on the list, breadcrumbs, and notices. For Residential it fills in from the street address as you type.
- **County and State** — required everywhere; used by reports and tax records.
- **Parcel Numbers** — free-form tags; type one and press Enter.
- **Total Acres** (Land) — feeds the per-acre math, reports, and deal analysis.
- **Units and Year Built** (Multifamily) — both required; the year must be after 1000.
- **Sales Price** (Residential) — shown in the list's Total Cost/Price column.

## Land details, cost, and deal analysis

Land records carry a **Cost of Development** block: Total Cost and Per Acre Cost, each with a checkbox in front of it. The checkbox picks which one you type; the other is calculated from Total Acres. Both stay disabled until Total Acres has a value, so enter the acreage first.

![The new inventory wizard, where a land property records its cost of development](/img/docs/app/guides/managing-properties/01.png)

Those two numbers are a fallback, not the whole story. To work out what the land cost, Lendiom goes tract by tract and takes the first value it finds: the tract's own total cost, then the tract's per-acre cost times its acres, then the development's per-acre cost times that tract's acres. Only if none of that yields a figure does it fall back to the development's Total Cost as a lump sum. Acreage works the same way — Total Acres wins, the sum of tract acres is the fallback.

Deal analysis adds your itemized development costs, subtracts offsets such as timber sales, and produces a cost basis, a real cost per acre with 2x and 3x targets, and a projected net profit after debt service.

:::caution Syncing deal analysis back is a one-way door
**Sync to Inventory** writes the computed cost basis into Total Dev Cost and Cost Per Acre, converting whatever the land details were contributing into an itemized Land Acquisition entry so nothing disappears. From then on those two fields are display copies: editing them changes what the header and reports show, but deal analysis ignores them. Nothing undoes a sync, and nothing tells you a record has been synced.
:::

The edit drawer adds an **Update Tracts?** switch for land. It does not push your new cost down — it zeroes each tract's own cost figures so every tract falls through to the development's per-acre number.

## The Financed switch

With the Deal Analysis add-on enabled, creating a land record shows a **Financed?** switch. Turn it on to record the loan that funded the development: name, lender, original principal, annual rate, term in months, and first payment date. Lendiom derives the monthly payment from principal, rate, and term, creates the loan as Active, and counts its remaining debt service against your projected profit.

This is your borrowing, not a client's. If the loan fails to save, the property is still created and you get an error; add the loan from the Deal Analysis panel afterward.

## Editing

**Edit** opens a drawer with the detail fields. The name is not in it — renaming has side effects, so it lives under **Operation → Rename**. Saving a Residential or Multifamily record re-derives the name from the street address anyway and clears the address verification, so re-run **Verify Address** afterward.

![The Edit drawer over a property, showing the address and property detail fields](/img/docs/app/guides/managing-properties/04.png)

:::warning Editing a residential property drops its links
Saving this drawer replaces the whole details block, and the buyer, loan, and rental links are not part of what the screen sends back. Afterward the Buyer's Information card is empty and the View Client, View Loan, and View Rental shortcuts vanish from the Operation menu. The loan or lease itself still works from its own page. When a loan is attached the fields grey out, but Save stays live — leave with Cancel.
:::

:::warning Editing a multifamily property clears its address
Saving blanks the street address, city, and zip code, and renames the complex to the street address you typed. Re-enter the address in the same drawer, then use **Operation → Rename** to put the complex name back.
:::

## Statuses

Rentals move the status for you: creating a lease sets the property to Rented and copies the lease payment into Rent; terminating or evicting sets it back to Available and removes the tenant.

:::caution Several statuses are half-wired
**Operation → Status** always offers Idea, Ready, In Progress, Completed, and Archived, whatever the category and type. On a Residential property Ready is rejected; on a Residential rental In Progress and Completed are rejected too. Those clicks fail silently — no error, no change. Available and Rented are never offered even though rentals use them, so a rental you archive can only come back as Idea. Late, Eviction, and Evicted exist with their own colored tags, but nothing ever sets them; a late tenant does not change the property's status.
:::

:::caution The rent figure is never cleared
The Rent Amount you enter when creating a residential rental drives nothing. Creating a lease overwrites it with the lease's payment. Ending that lease removes the tenant and the rental link but leaves the rent at the old lease's amount indefinitely. Edit it by hand if the number matters to you.
:::

## The list and its columns

The table shows Name, Category, Status, and Type, and hides Total Acres, Total Cost/Price, Created At, Created By, Updated At, and Updated By behind the column settings icon. Total Cost/Price shows total development cost for land, sales price for a house, and a dash for multifamily. Filtering by a specific status turns off **Exclude Archived** and disables it, since Lendiom cannot include and exclude at once.

<!-- screenshot: The Inventory list with the column settings dropdown open, the six optional columns unticked by default -->

:::info Column choices follow the browser, not the account
Your column selection and last-used filters are saved in the browser you are using. They will not follow you to another computer, browser, or private window, and clearing site data resets them.
:::

## Archiving and deleting

Archiving is the safe option: **Operation → Status → Archived**, confirm, and the record drops out of the list while everything attached stays intact.

![The Operation dropdown open on a land inventory page](/img/docs/app/guides/managing-properties/06.png)

Deleting is permanent. **Operation → Delete** removes the property with its tracts, property tax records, development costs, and development loans. Lendiom refuses when any tract still has a loan attached — cancel or delete those loans first.

:::caution Residential properties cannot be deleted from the menu
Delete is greyed out on every Residential record, including ones with no loan and no lease. Archive it instead, or contact support if it has to go.
:::

Property taxes for a land development are managed from the same page — see [Property Taxes](./property-taxes.md).
