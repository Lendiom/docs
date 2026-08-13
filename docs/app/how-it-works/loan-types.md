---
id: loan-types
title: Tract, Residential and Cash Loans
---

Loan Type is the first thing you pick in the new loan wizard, and it is the one choice you cannot revise later. It decides what the loan can be attached to, what happens to that property as the loan moves through its life, which transactions the loan will accept, and which reports it appears in.

## The Three Types

| Type | What you attach | Requirements |
| --- | --- | --- |
| **Cash** | Nothing but a client | A client and a loan label |
| **Tract of Land** | One land development, then one or more tracts inside it | The inventory's category must be **Land**; every tract must belong to that same development, and tracts that already carry a loan or that are marked Sold or Paid Off are disabled in the picker with a tooltip explaining why |
| **Residential** | Exactly one residential property | The inventory's category must be **Residential** with its house details filled in; properties that already have a loan are greyed out in the picker |

Both property pickers are limited to inventory whose type is **Finance**. Rental inventory and multifamily inventory cannot back a loan — see [Adding and Managing Properties](../guides/managing-properties).

Lendiom writes the loan label for you from the type: *Jane Doe's loan for Sunrise Ranch Tracts 4, 5* for a tract loan, *Jane Doe's loan for 100 Main St* for a residential loan, and *Jane Doe's cash loan* for a cash loan. Change it to whatever you and the borrower will recognize.

![Step 1 of the new loan wizard, with the Loan Type radio group and the inventory selector](/img/docs/app/how-it-works/loan-types/01.png)

## What Gets Written Back When You Save

Every type creates the loan, links it to the client, and leaves an automatic note and timeline entry on the client. Beyond that, the types diverge sharply.

| Type | What the save does to the property |
| --- | --- |
| **Tract** | Every tract goes to **Sold** immediately — even though the loan itself starts as a Draft. The borrower becomes the tract's owner, the tract joins the client's associated items, and the loan terms are copied down: price per acre is the sales price divided by total acres, while down payment, monthly payment, total of payments, and total interest are each divided by the number of tracts. Each tract gets its own note and timeline entry. |
| **Residential** | The property's status becomes **In Progress**, its price is set from the sales price, and the loan and owner are recorded on it. The property joins the client's associated items and gets a note and timeline entry. |
| **Cash** | Nothing. There is no property, so the only note written is the one on the client. |

## Fields That Only Some Types Get

**Total Adjustments** appears on step 3 for residential loans only. It covers the taxes and closing adjustments folded into a house closing: a positive value adds to the amount financed, a negative value subtracts. The financed amount is always sales price minus down payment plus adjustments.

<!-- screenshot: step 3 of the new loan wizard on a residential loan, showing Sales Price, Down Payment, the Total Adjustments field with its explanatory helper text, and the calculated Amount Financed below them -->

**Document automation** on step 4 offers loan-type templates: Tract Loan templates for a tract loan, Cash Loan templates for a cash loan, and — for a residential loan — only your General templates.

:::caution Residential loans sit between the two template categories
Lendiom has no "Residential Loan" template category. The wizard's document automation step offers a residential loan nothing but General templates, yet once the loan exists, **Generate Document** and the notice buttons on that same loan draw from your **Cash Loan** templates. If you want automation on a residential loan, build the template as a Cash Loan template and attach the rule after the loan is created.
:::

Escrow, down payment collection, setup fees, late fee tiers, minimum payments, refinancing, and recasting behave identically on all three types.

## Property Tax Is Tract-Only

Property tax records are built per land development, per year, and billed per tract. That makes the whole feature unreachable from the other two types. A **Property Tax** transaction on a cash or residential loan is rejected with *the loan type must be tract to pay property tax*, and the type never appears in the transaction picker for them — it only shows up when you open the transaction modal from a property tax year's tract row.

Cash and residential loans therefore always show a Property Tax Due of zero, and there is no supported way to raise it. For the tract workflow, see [Property Taxes](../guides/property-taxes) and [Collecting Property Tax After You Finalize](../guides/collecting-property-tax).

![The New Transaction modal on a cash loan, with the transaction Type selector](/img/docs/app/how-it-works/loan-types/03.png)

## Loan Status Cascades to Tracts, and Only to Tracts

When a tract loan changes status — whether you change it by hand or the overnight integrity run does — every tract on that loan is rewritten to match.

| Loan status | Tract status becomes |
| --- | --- |
| Pending, Current, Grace Period, Pending Payoff | Sold |
| Late | Late |
| In Default, Defaulted | In Default |
| Paid Off | Paid Off, and tax reimbursement eligibility is switched off |
| Inactive, Canceled, Repossessed | Available, owner and loan link cleared |

The cascade is keyed to the status the loan is leaving, not the one it is entering, so it does not run on any change out of Draft — including the Draft to Pending or Draft to Current move that activates the loan. The tracts went to Sold at creation, so nothing needs rewriting yet; the cascade takes over on the next status change after that. Full detail lives in [Working with Tracts](../guides/working-with-tracts).

Residential loans get two writes and no cascade: the property moves to **Completed** when the loan pays off, and the owner and loan link are cleared when the loan goes Inactive, Repossessed, or Canceled. Cash loans get nothing — there is no property to update. Late, in-default, and defaulted notes still land somewhere for every type: on the tracts for a tract loan, on the property for a residential loan, and on the client for a cash loan.

:::caution A released house keeps its In Progress status
When a residential loan is deactivated, canceled, or repossessed, Lendiom clears the owner and the loan link but leaves the property's status on **In Progress**. The property becomes selectable for a new loan again, so nothing is blocked — but the status is now wrong. Set it back yourself from the property's Edit drawer.
:::

## Ending a Loan: Repossessed vs. Inactive

The **Status** submenu on a loan offers **Repossessed** only for tract loans. Cash and residential loans get **Inactive** in that slot instead. In the other direction, the Action Center panel for a Draft tract loan hides **Mark as Inactive**, because a tract loan is meant to end in repossession rather than deactivation.

Repossession always asks for the repossession date, and asks for acreage and a tract label as well when you are moving a tract loan from Inactive to Repossessed. It marks the client inactive, and it is final — any later status change is refused with *can not change the status of a repossessed loan*.

![The loan Actions dropdown expanded, showing the available operations for a tract loan](/img/docs/app/how-it-works/loan-types/04.png)

:::warning Mark Repossessed appears on defaulted loans of every type
A cash or residential loan that reaches **Defaulted** shows a **Mark Repossessed** button in its [Action Center](./loan-action-center), even though the Status submenu deliberately withholds that status from those types. Using it records a repossession date and locks the loan permanently, but the Monthly Journal Entry report counts repossessions on tract loans only, so the loan disappears from that count. On a cash or residential loan, use **Inactive** or **Canceled** instead.
:::

## Reports and Documents That Assume Tract Loans

| Feature | Which types it covers |
| --- | --- |
| Yearly Installment Income, Monthly Installment Income | Tract loans only |
| 1098 INTs, in the report and in e-filing | Tract loans only |
| Monthly Journal Entry, Repossessions sheet | Tract loans only |
| Portfolio Report | Built one row per tract, so cash and residential loans never appear |
| Property tax transactions | Tract loans only |
| Monthly and Yearly Transaction List, Payments Summary | All three — cash rows read "Cash", residential rows carry the property name, tract rows read "Development - Tract N" |
| Payment receipts, payoff letters, amortization schedule letters, and text messages | All three; the property line is filled in for tract and residential loans and omitted for cash |

Read the [Reports Library](../guides/reports-library) with that first column in mind. If you finance houses or write hard-money notes, the installment income and 1098 reports will come back empty no matter how much you collected.

## The Type Is Permanent

Nothing in the app or the API changes a loan's type, its tracts, or its residential property after the loan is saved. Only the label, late fee settings, default settings, minimum payment, communication preferences, online payment settings, document automation, custom fields, and status can be changed afterward.

If you picked the wrong type, delete the loan and start over — and you can only do that while it is still a Draft; anything further along is refused with *loans must be in a draft state to be deleted*. A Draft tract loan deleted this way releases its tracts back to Available.

![The loans list, showing each loan with its status tag, balance due and next due date](/img/docs/app/how-it-works/loan-types/05.png)

The rest of the wizard — terms, amounts, communication, escrow, and review — is documented in [Creating a Loan](../guides/creating-a-loan). For what each status means once the loan is live, see [Loan Status](./loan-status).
