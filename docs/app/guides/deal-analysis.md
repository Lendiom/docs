---
id: deal-analysis
title: Deal Analysis
---

A land deal really comes down to four numbers: what the land cost you, what you've spent getting it ready to sell, what you still owe on it, and what you expect to collect across every tract. Before v0.65.0, Lendiom didn't have a place to keep those numbers together, so most of us kept them in a spreadsheet that was out of date the day after we made it. The deal analysis fixes that. It lives on the development itself and recalculates every time you record a cost, a loan, or a sale.

It's in **beta** for now. It works, we use it, but it isn't finished. If something feels off or missing, tell us. That feedback is what decides where it goes next.

<!-- screenshot: deal analysis panel overview -->

## Turning It On

Deal analysis is an organization addon, and it's free while in beta. Head to **Org Settings → Billing** and enable it from the Addons card. Until it's enabled, nobody in the organization sees any of this.

## Where to Find It

Once the addon is on, open any land inventory and expand the **Deal Analysis** section right below the tracts table. It's also behind the *Inventory Deal Analysis* permission, so your team members only see it (or change it) if their role allows it.

## The Headline Figures

### Projected Net Profit {#projected-net-profit}
Expected revenue, less remaining debt service, less the cost basis. Green means the deal is projected to make money, red means it isn't. Keep in mind this is a projection: it assumes every buyer pays on time and every remaining tract sells at asking price. Reality is usually a little worse than that.

### Expected Revenue {#expected-revenue}
The total you expect to collect over the life of every tract. A financed tract counts the down payment plus every scheduled payment, including the interest you'll collect along the way. A cash sale counts the sale price and that's it.

### Remaining Debt Service {#remaining-debt-service}
Everything you still owe on the development loans recorded below, including any balloon created by an expected payoff date.

### Cost Basis {#cost-basis}
The acquisition cost, plus every recorded development cost, less every recorded offset. In plain terms: what this development has actually cost you so far.

## The Per Acre Metrics

* **Real Cost / Acre** is the cost basis spread over the development's total acres.
* **2x / Acre** and **3x / Acre** are just that number doubled and tripled. It's the old land developer gut-check: if you're selling at three times your real cost per acre, you're in good shape. Now you don't have to do the math on a napkin.
* **Asking / Acre** is what your unsold tracts are listed at, per acre.
* **Sold / Acre** is what the sold ones actually went for, per acre. Comparing these two tells you whether your asking prices are honest.

## Costs &amp; Offsets

This is the itemized ledger behind the cost basis. Use the **+ Cost** and **+ Offset** buttons to record entries as money moves.

<!-- screenshot: record cost modal -->

### Costs {#costs}
Money you put into the development. Categories include Land Acquisition, Survey, Clearing, Roads, Utilities, Permits &amp; Fees, Legal &amp; Closing, Marketing, and Other.

**Land Acquisition** is worth calling out. It records the purchase of the land itself, and it counts toward the acquisition figure rather than the development costs. Use it when the land purchase isn't already recorded on the tracts or on the development's land details.

### Offsets {#offsets}
Money you got back out of the development. Sold the timber before clearing? Mineral rights? A cost-share program? Those reduce your cost basis, and they belong in the record just as much as the costs do.

Every entry takes an amount, an optional date for when the money actually moved, and an optional description. You can edit or remove entries any time, and the analysis recalculates on the spot.

## Development Loans

This is the debt side of the deal, meaning money **you** borrowed against the development. It's completely separate from the owner financing you extend to your buyers. Lendiom has always tracked what your buyers owe you; this tracks what you owe the bank.

<!-- screenshot: record development loan modal -->

A development loan records the lender, the original principal, the annual rate, the term in months, and the first payment date. Lendiom derives the monthly payment from those. If your note was written for a rounded amount instead, fill in the monthly payment field and we'll use yours.

When you create a loan, there's a checkbox to **also record the borrowed amount as a development cost**. Check it when the borrowed money paid for things you're not going to itemize one by one. Just don't record both the loan proceeds and the individual expenses they paid for, because that counts the same money twice.

### Expected Payoff Date &amp; Balloons {#payoff-date}
Most of us don't ride a development note for the full term; we pay it off when tract sales come in. Set the expected payoff date and the schedule stops that month, with whatever principal remains coming due as a balloon. That balloon is included in the remaining debt service, so the projection stays honest about a note you plan to retire early.

### Amortization Schedule {#amortization-schedule}
The calendar icon on any loan opens the full amortization schedule: payment by payment interest, principal, running balance, and the balloon if a payoff date ends the loan early.

<!-- screenshot: amortization schedule drawer -->

## The Warnings

The analysis is only as honest as what you feed it, so it tells you when something's missing:

* **"These projections aren't real yet"** means no acquisition cost and no development costs are recorded. The cost basis is $0, so the projected profit is just revenue less debt service. That number looks great and means nothing.
* **"The acquisition cost isn't recorded"** means you've itemized costs but never recorded what the land itself cost. The profit is overstated by exactly that amount.
* **"No development costs are recorded"** means the acquisition is set but nothing you've spent improving the land is itemized yet.

## Syncing to the Inventory

The inventory header shows a **Total Dev Cost** and **Cost Per Acre**, and those are the figures the rest of Lendiom and your reports use. Once you start itemizing costs down in the deal analysis, those preset header numbers go stale. The **Sync to Inventory** button copies the computed cost basis up into them.

<!-- screenshot: sync confirmation -->

Two things to understand about how sync works:

1. **The deal analysis becomes the source of truth.** After the first sync, the inventory's cost figures are just a rollup written from the analysis; they no longer feed into it. When your entries change, sync again and the header follows.
2. **Nothing disappears unaudited.** If the land details were supplying an acquisition cost, say one you entered when you created the inventory, the first sync converts it into an itemized *Land Acquisition* entry in the ledger. You can see it, edit it, and recategorize it like anything else. We'd rather move a number somewhere visible than quietly overwrite it.

## Recording a Deal While Creating the Inventory

The new-inventory wizard already captures the acquisition cost through the land details' **Total Cost** or **Per Acre Cost**. If a loan funded the purchase, flip the **Financed?** switch in the details step and enter the note's terms. Lendiom records the development loan the moment the inventory is created, so the deal analysis means something from day one instead of starting empty.

<!-- screenshot: new inventory wizard financed switch -->

## The Dashboard View

Two places on the dashboard roll all of this up across your whole organization:

* **Deal Profitability** totals expected revenue, cost basis, remaining debt service, and projected net profit across every land development, and expands into the per-development analyses behind the totals.
* **Expected Payments** grows a **Debt Service** line whenever development loan payments fall in the selected month, along with an **Expected Net**: what your buyers owe you that month, less what you owe your lenders. That's the cash flow number a lot of us actually run the business on.

<!-- screenshot: deal profitability dashboard widget -->
