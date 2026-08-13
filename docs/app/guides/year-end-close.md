---
id: year-end-close
title: Year-End Close and Tax Season
---

January is the busiest month in Lendiom. You are pulling reports for your CPA, chasing missing paperwork, and e-filing Form 1098s — all at once, all against data you can no longer change. Most of the pain is avoidable. The work that makes January quick happens in December.

This guide is two checklists: what to clean up before the year closes, and what to run once it has.

## The December Checklist

Everything below affects what Lendiom can calculate and file for the year. Once January 1 passes, some of it becomes much harder to fix.

### Verify borrower mailing addresses

An address that has never been verified against USPS records will stop your 1098 filing. Lendiom uses the primary entity's first address as the mailing address for tax purposes, and checks three separate things: that it exists, that it has been verified, and that USPS marks it deliverable.

To verify one, open the client, find the person's row in the entities table, open the row's actions menu, and choose **Verify Address**. The action is disabled when the entity has no address, or when the address is already verified.

<!-- screenshot: a client detail page with the entities table row expanded, the row's actions menu open, and "Verify Address" visible among Edit, Make Primary, and View Tax ID -->

| Address state | Effect on e-filing |
| --- | --- |
| Missing entirely | Blocks e-filing; the e-file button stays disabled |
| Present but never verified | Blocks e-filing; the e-file button stays disabled |
| Verified, marked undeliverable | Does not block, but the confirmation dialog adds an acknowledgement that some forms may not arrive |
| Verified and deliverable | Ready |

An undeliverable result means USPS does not deliver mail to that address. Verifying it again will not change the answer — you need a different address from the borrower.

:::tip
Run the **Client List** report in December. It has an Address column and a Tax ID column, so one spreadsheet shows you every borrower who is missing either one.
:::

### Confirm every borrower has a tax identifier

The e-file button stays disabled until every listed borrower has a tax identifier. Collect it on a Form W-9, then add it to the primary entity through the entity's Edit drawer. Lendiom accepts three types, each with its own format:

| Type | Format |
| --- | --- |
| SSN | `123-45-6789` |
| ITIN | `912-34-5678` (starts with a 9) |
| EIN | `12-3456789` |

Tax identifiers are encrypted. Once saved, the interface shows only the last four digits, and viewing the full number requires your password.

### Clear unapplied payments

An unapplied payment is money you already collected that a reversal detached from its transaction. Until you apply it to a new transaction or refund it, it contributes nothing to the year's interest or principal totals.

Open **Unapplied Payments** from the main menu and work through anything still holding a balance. Only credits in the **Available** or **Partially Applied** status have funds left to draw against; **Applied** and **Refunded** credits are closed.

When you apply a credit, you choose the date of the new transaction it funds, and that date decides which tax year the interest lands in. The date cannot be earlier than the day the funds were received. A single credit can fund several transactions, so a large one can be split across more than one payment.

<!-- screenshot: the Unapplied Payments list showing several credits with their user-facing IDs, source loans, amounts, remaining balances, and a mix of Available and Partially Applied status tags -->

### Finish reversals before the year closes

Reversing a transaction sets its status to Reversed, and Lendiom's year-end math only counts transactions that are Pending or Successful. A reversal therefore pulls that payment's interest and principal straight out of the year's totals. When you reverse, you choose whether to refund the money to the customer or hold it as an unapplied payment — finish that decision in December so the totals are settled.

While you are here, record any payoffs that happened during the year: payoff transactions count toward the year's principal alongside regular and principal-only payments. See [Recording a Loan Payoff](./recording-a-loan-payoff.md).

:::warning
Reversing a transaction after you have e-filed does not change the form that was already filed. Lendiom has no correction or void flow.
:::

### Confirm your business legal information and EIN

Your organization's legal information is the payer side of every 1098, and Lendiom refuses to file until it is complete. You can fill it in from the 1098 INTs tab — when it is missing, that tab shows a warning with a **Complete it now** link. Lendiom checks for:

- Legal name, brand name (DBA), business type, and business structure
- A business EIN formatted exactly as `12-3456789`; anything else is rejected
- A physical business street address — not a PO Box
- Business phone number and email

You choose which address prints on the forms: your legal address or your mailing address. Whichever you pick, Lendiom verifies it with USPS at the moment you file and refuses the filing if it does not come back deliverable.

:::caution
Names are truncated to 40 characters on the filed form. If your legal name or a borrower's name runs longer than that, it will be cut short on the 1098.
:::

## The January Checklist

### Run the year-end reports

Go to **Reports**. Pick a report, choose **Run**, select the year, and the finished file opens in a new tab. Every report is an Excel workbook, and every run is stored — the **Last Ran At** column and the **Download** action pull the most recent copy back without regenerating it.

| Report | What you select | What it gives you |
| --- | --- | --- |
| Yearly Installment Income | Year | Every loan transaction over the year consolidated into one report |
| Yearly Transaction List | Year | All tract loan transactions for the year in one list |
| Yearly Rental Transaction List | Year | All monthly rental transactions for the year, aggregated |
| Yearly 1098 Report | Year, plus your password | The information behind Form 1098 — names, addresses, tax identifiers, interest, principal, remaining balance. Tract loans only |
| Payments Summary | Start and end date | Payments received across loans, rentals, and invoices, broken down by payment method and source, with platform fees and a net deposit estimate |
| Client List | Client statuses | Every client with address, masked tax ID, contact details, and account number, one tab per status |

Two more are marked Beta and may change: the **Monthly Journal Entry Report** (monthly interest, principal, and late fee totals) and the **Portfolio Report** (current status of all tracts).

<!-- screenshot: the Reports page on the Reports tab, table listing report names with descriptions, Last Ran At dates, and the actions menu open showing Run and Download -->

The **Yearly 1098 Report** requires your password because it contains tax identifiers. One deliberate difference: this spreadsheet includes every qualifying loan that collected any interest during the year, while the 1098 INTs tab lists only borrowers at or above the $600 IRS reporting threshold. Use the spreadsheet for the whole picture and the tab for what will actually be filed.

A loan appears in the year's 1098 data when it is a tract loan, is not draft, inactive, or canceled, closed before the year ended, and collected interest during the year. Loans repossessed, refinanced, or paid off before the year began drop out, since they collected nothing during it.

### Review the 1098 INTs tab

On the Reports page, switch to the **1098 INTs** tab. The year picker defaults to last year and will not let you select a future one.

Each row carries a status icon. A green unlock icon means the row is ready. A pink alert icon means something is missing — hover it and it names which of the four problems it is: missing mailing address, unverified address, undeliverable address, or missing tax information. Work the alerts until every row is green.

<!-- screenshot: the 1098 INTs tab showing the legal info card on the right, the preview table below with a mix of green unlock icons and pink alert icons, and one alert tooltip open reading "The mailing address has not been verified." -->

### E-file the 1098s

Read this before you click.

| Rule | What it means |
| --- | --- |
| One filing per year | Once a filing exists for a year, Lendiom rejects any further attempt and tells you the status of the existing one |
| Irreversible | There is no undo, no void, and no correction flow inside Lendiom |
| Current year not allowed | You cannot file for the current year or any future year — only for years that have finished |
| Password required | You re-enter your password at the final step so Lendiom can decrypt the tax identifiers |

Click **e-file** for the selected year. The first dialog states the per-form price — $10.00 at the time of writing, covering both e-filing and USPS mailing — and asks you to confirm you have verified names, addresses, tax identification numbers, amounts, and dates. If any address is undeliverable, this dialog adds an explicit acknowledgement of that risk.

The second dialog asks for your password and the address to print on the forms.

<!-- screenshot: the final e-file modal titled "eFile 2025's 1098" with the password field filled with dots and the Address dropdown showing Legal Address selected -->

Submitting takes a minute or two depending on how many forms are going out. When it finishes, Lendiom emails your organization confirming the filings were submitted.

If the filing provider rejects an individual form, its row shows a red **Rejected** tag with the provider's reason on hover. The filing for the year still exists at that point, so you cannot re-run it — contact [support@lendiom.com](mailto:support@lendiom.com) and we will check the status with the provider.

### Download the filed forms

Once at least one form has been accepted, a **Filed 1098** column appears in the table with a **Download** button on each accepted row, and a **Download All** button appears in the toolbar.

- **Download** on a row gives you one PDF containing every copy of that borrower's form — payer, recipient, and state — so you can hand the borrower their copy without downloading twice.
- **Download All** gives you a single zip of every filed form for the year. If one form fails to download, the whole archive fails rather than handing you an incomplete set. Try again.

Rejected rows have nothing to download.

<!-- screenshot: the 1098 INTs tab after a successful filing, green success banner reading "All 1098s for 2025 have been filed", Download buttons in the Filed 1098 column, and the Download All button in the toolbar -->

## Related

For a walkthrough focused purely on the filing itself, see [E-Filing 1098 INTs](./e-filing-1098s.md).

If you want to file voluntarily for borrowers below the $600 threshold, or something goes wrong mid-filing, reach out to [support@lendiom.com](mailto:support@lendiom.com).
