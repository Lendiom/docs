---
id: reports-library
title: The Reports Library
---

Lendiom ships a fixed set of reports. You cannot build your own, and you cannot change the columns — each one is a purpose-built export that pulls from the data you have already entered. This page lists every report, what goes into it, what you choose before it runs, and when to reach for it.

## Running a report

Open **Reports** from the main menu. The Reports tab lists every report with its description, the date it was last run, and an actions menu holding **Run** and **Download**.

<!-- screenshot: the Reports page on the Reports tab, table listing all twelve reports with Name, Description, Last Ran At, and Actions columns, one row's actions menu open showing Run and Download -->

Choosing **Run** opens a modal that asks for whatever that report needs — a month, a year, a date range, a set of client statuses, or nothing at all. Fill it in, choose **Run!**, and the finished file opens in a new browser tab.

Every run is kept. The **Last Ran At** column shows when the report last produced a file for your organization, and the **Download** action pulls that stored copy back without regenerating anything. Download stays greyed out until a report has been run at least once.

<!-- screenshot: the Run Report modal titled "Run Report: Monthly Journal Entry Report" with a month picker showing March 2026 and the helper text "The date in which to run the report against." -->

:::info
Where a description has a question mark beside it, hover it. The tooltip holds details that do not fit in the description — the Avery label numbers, the "one tab per status" note, and the beta warnings.
:::

## Every report

| Report | You choose | Format | Covers |
| --- | --- | --- | --- |
| Yearly Installment Income | Year | Excel, one sheet named for the year | Tract loans, consolidated per loan for the whole year |
| Monthly Installment Income | Month | Excel, one sheet ("March 2026 Installment") | The same tract-loan math, cut to a single month |
| Yearly Transaction List | Year | Excel, twelve sheets, one per month | Every loan transaction, month by month |
| Monthly Transaction List | Month | Excel, one sheet ("March 2026 Transactions") | Every loan transaction in the month |
| Yearly Rental Transaction List | Year | Excel, twelve sheets ("March 2026 Rent Txns") | Rental transactions, month by month |
| Monthly Rental Transaction List | Month | Excel, one sheet | Rental transactions in the month |
| Monthly Journal Entry Report | Month | Excel, six sheets | Month-end totals plus every supporting sheet |
| Payments Summary | Start and end date | Excel, two sheets | Loans, rentals, and invoices together |
| Yearly 1098 Report | Year, plus your password | Excel, one sheet named for the year | Tract loans, the numbers behind Form 1098 |
| Portfolio Report | Nothing | Excel, one sheet dated today | Every tract, as it stands right now |
| Client List | One or more client statuses | Excel, one tab per status | Clients and their contact details |
| Client Address Labels | One or more client statuses | PDF | Mailing addresses, laid out for label sheets |

Only the Client Address Labels report produces a PDF. Everything else is an `.xlsx` workbook.

## The installment income pair

Both installment income reports work on tract loans only, and both skip loans that are draft, inactive, or canceled. They also drop loans that were repossessed, refinanced, or paid off before the period began — those collected nothing during it.

The yearly version gives you one row per loan with purchase price, cost of tract, gross profit and gross profit percentage, principal and interest split between prior years and the current year, accounts receivable, and deferred installment income. The monthly version carries the same shape but splits the current year further, so you see prior-months principal, current-month principal, and the year-to-date total side by side. Run the yearly one for your CPA at year end; run the monthly one when you are closing a single month.

## The transaction lists

The transaction lists are the raw ledger. Each row is one transaction with its date, type, status, payment method, total collected, and the split across interest, principal, fees, platform, escrow, and previously accrued interest. Late fees are left out on purpose — a late fee puts the borrower in debt, it is not money you received. Negative "other fee" entries are excluded for the same reason.

Three things beyond ordinary payments show up here. Cash tract sales appear as a fabricated row with the type **Tract Sold**. Money still held from a reversal appears as an **Unapplied Payment** row carrying only the portion not yet drawn down. And repossessed or refinanced loans get their client name annotated and colored so you can see at a glance why a row stops partway through the year.

The rental lists are narrower, because rentals have no amortization: client, rental, inventory, unit, date, type, status, method, total collected, total, to platform, to balance, to fees, and comments.

<!-- screenshot: an open Excel workbook showing the March 2026 Transactions sheet with the fifteen column headers frozen and a mix of Payment, Property Tax, Tract Sold, and Unapplied Payment rows -->

## Monthly Journal Entry Report

This is the month-close workbook, and it is marked **Beta** — its tooltip says as much, and the numbers are still under review with CPAs. It builds six sheets for the month you pick: New Contracts, Repossessions, Inventory, Transactions, Installment, and the Monthly Journal sheet itself.

The Monthly Journal sheet is a thirteen-line summary — total payments, property tax, interest, principal, fees, escrow, customer-paid processing fees, cash land sales, installment income, accounts receivable, deferred installment income, and counts of new and repossessed contracts. Every one of those cells is a live formula pointing at the supporting sheets, so you can trace any total back to its source. Its Transactions sheet counts successful transactions only, which is what makes it differ from the standalone Monthly Transaction List.

## Payments Summary

The only report that spans loans, rentals, and invoices at once, and the only one that takes a free date range rather than a fixed month or year. Both days are inclusive, and the range cannot exceed one year.

The first sheet totals what came in: payments received, net to organization, platform fees, and a net deposit estimate, broken down **By Payment Method** and **By Source**. It compares against the equivalent preceding period — the same number of whole months when your range is aligned to month boundaries, otherwise the same number of days immediately before. Where expected-payment data exists it adds an **Expected vs Received** block showing what was due, what was collected against it, and what is still outstanding. Pending payments, failed ACH, and reversed ACH are listed separately and are deliberately not in the totals. If you process cards through PayArc, a deposits section lists the settlement batches that landed in the window. The second sheet lists every transaction the summary counted, with a Source column and, where PayArc reconciliation succeeded, a Settled On date and deposit batch.

:::caution
The net deposit estimate is total collected minus platform fees. It will not match your processor's settled deposits for the same window — card and ACH settlement timing varies, and deposits arrive with platform fees still included until the processor withdraws them at the start of the following month.
:::

This is also the report Lendiom can email you. In **Organization Settings → Scheduled Reports** you can schedule the payments summary daily, weekly, or monthly, and a monthly schedule can attach the Monthly Transaction List, Monthly Installment Income, or Monthly Journal Entry Report for the same month.

## Yearly 1098 Report

The only report that asks for your password, because it contains tax identifiers in the clear. It covers tract loans and gives you primary entity name, mailing address, tax identifier, inventory, tract label, closing date, interest paid, principal paid, and remaining principal.

One deliberate difference: this spreadsheet includes every qualifying loan regardless of amount, while the **1098 INTs** tab on the same page lists only the borrowers at or above the $600 IRS reporting threshold. Use the spreadsheet for the whole picture, the tab for what gets filed. See [E-Filing 1098 INTs](./e-filing-1098s.md) and [Year-End Close and Tax Season](./year-end-close.md).

## Portfolio Report

Also **Beta**. It takes no inputs at all — the Run modal shows nothing but the button, because the report is always "as of right now." One row per tract: inventory, tract, acres, status, buyer, purchase date, sales price, down payment, term and term remaining in years, interest rate, payment amount, remaining principal, days late, cost of tract, gross profit, profit percent, gross profit remaining, and gross profit percent remaining. A totals row sums the money columns and averages the rates and terms. Run it when someone asks what the book looks like today.

<!-- screenshot: the Run Report modal for the Portfolio Report showing no input fields, only the Cancel and Run! buttons -->

## The two client reports

Both ask which client statuses to include — Active, Prospect, Inactive, Do Not Contact — defaulting to Active and Prospect, and both read from each client's **primary entity**, as the modal tells you.

**Client List** gives you a spreadsheet with one tab per selected status, filters already applied, holding client name, account number, primary entity, phone, email, address, birthday, masked tax ID, and preferred language. It is the fastest way to spot who is missing an address or a tax ID.

**Client Address Labels** produces a PDF laid out for Avery 1" x 2 5/8" labels, 30 to a sheet — compatible with 5160, 8160, 5960, and dozens of other Avery numbers listed in the report's tooltip. Clients whose primary entity has no address are skipped silently, so the sheet count will not always match your client count.

<!-- screenshot: the Run Report modal for Client List showing the blue info alert about primary entities and the Client's Status multi-select with Active and Prospect chips selected -->

## Beta and disabled reports

Two reports carry an orange **Beta** tag in the Name column: the Monthly Journal Entry Report and the Portfolio Report. Beta means the shape of the output may still change — check the numbers before handing them to an accountant.

The library also has a disabled state. A report Lendiom has turned off still appears in the table with **(Disabled)** appended to its name, and both Run and Download stay greyed out. As of today, every report listed above ships enabled. Run and Download are also greyed out for everyone when the organization's billing is not active, incomplete, or trialing.
