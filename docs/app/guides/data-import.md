---
id: data-import
title: Importing Your Existing Portfolio
---

If you are moving to Lendiom from MoneyLender Professional 3, the import wizard brings your borrowers, loans, payment history, servicing notes, and attachments over in one guided run: export from MoneyLender, upload the files, review how every loan lines up against your existing inventory, then commit.

It lives at **Org Settings → Import/Export**, where each import is its own record. Five steps: Source, Upload, Analyze, Review, Import.

![The Data Imports section of the Import/Export tab, listing each import session](/img/docs/app/guides/data-import/01.png)

## Before you start

- **Your inventory must already exist in Lendiom.** The import matches each loan to a tract you already have — it never creates developments or tracts.
- **You need the `data-import` permission.** `read` opens the tab, `create` starts an import and runs the upload, analyze, commit, and resume actions, `update` saves your review decisions, and `delete` removes an unfinished import. Of the seeded roles, only `admin` holds it. See [Roles and Permissions](../security/roles-and-permissions.md).
- **One import runs at a time per organization.** Starting a second analysis or commit while one is running is refused.

## Step 1 — Export from MoneyLender and upload

In MoneyLender, choose **File → Export Portfolio Data…** and pick a folder. MoneyLender writes one CSV per table into it.

Drop every one of those CSVs into the uploader. Keep the original file names — the wizard recognizes files by name and rejects anything that is not a known MoneyLender table. Each file must be under 200 MB, and uploads run one at a time, so leave the page open until the batch finishes.

The right-hand checklist turns each name green as it stages. Fourteen are required before **Analyze the export** unlocks: `Lender.csv`, `Borrower.csv`, `Loan.csv`, `LoanAccount.csv`, `LoanTransaction.csv`, `Payment.csv`, `LoanAdjustment.csv`, `LoanInterestSetting.csv`, `LoanPaymentSetting.csv`, `LoanLateFeeSetting.csv`, `LoanLenderSetting.csv`, `LoanPrincipalSetting.csv`, `LoanBorrowerSetting.csv`, and `InventoryItem.csv`.

`QuickNote.csv` (servicing notes), `LoanSpecialSetting.csv` (forbearance), `Attachment.csv`, and `BinaryBlock.csv` are optional. The last two hold your documents; leave them out and your documents stay in MoneyLender while everything else imports.

Choose how much history to bring, too. **Full history replay** recreates every payment, late fee, and adjustment; a loan that cannot be reconciled falls back to balances only and is flagged. **Balances only** creates each loan from its current balance snapshot with no history in Lendiom. You can change this on the confirmation screen.

## Step 2 — Analyze

Analysis runs in the background. It reads the files, parses each MoneyLender account number into a subdivision, tract number, and acreage, matches that against your inventory, groups borrowers, and builds a reviewable plan. It usually takes under a minute, and nothing is written to your organization yet. If it fails, re-running it is safe.

![The Analyze step, with a progress bar partway across and the file currently being processed named beneath it](/img/docs/app/guides/data-import/03.png)

## Step 3 — Review and adjust the matches

This is where the work is. Nothing has been created yet, and every change autosaves.

### Matching & settings

The collapsible panel at the top holds the decisions that apply to the whole import:

- **Subdivision aliases.** MoneyLender abbreviates development names. Map each abbreviation to the matching Lendiom inventory and click **Save & re-run matching** — one alias can resolve dozens of unmatched loans at once, and the wizard reports how the count changed.
- **Late fee grace period (days).** The export does not carry this, so you confirm it (1–90). It applies to every imported loan.
- **Default late fee.** Shown only when your organization has no usable default. Each loan uses its own MoneyLender amount first, then your organization default, then this one; if none resolve, the loan imports with late fees off. See [how late fees work](../how-it-works/late-fees.md).
- **Daily interest day-count.** Shown only when a loan accrues daily. Actual/365 matches MoneyLender's default.

### The Loans tab

Every loan shows its matched inventory and tract, acreage, principal, source status, and a **Match** confidence tag:

| Tag | Meaning | Blocks the import? |
| --- | --- | --- |
| **Exact** | Development, tract number, and acreage all matched | No |
| **Likely** | Matched by name similarity or lot number alone, or the acreage did not line up | No — confirm it is right |
| **Conflict** | The tract is already claimed by another loan in this import, or by an existing loan or unavailable tract | **Yes** |
| **Unmatched** | No tract could be proposed | **Yes** |
| **Manual** | You picked the tract yourself | No |

Three actions sit on each row. **Fix match** opens a picker for the development and every tract the loan covers. **Down payment** lets you pick between the amounts MoneyLender recorded in different places — the loan record, the payments, the principal settings, the sale notes — or type your own. **Skip** leaves the loan out. Select several rows to **Assign to development…**, skip, or unskip in bulk.

Expand a row for its payment, fee, adjustment, and payoff counts, its term, and every down-payment source side by side. Flags are grouped into one alert per class at the top of the review, and each group links to the loans it affects.

![The Review step of the import, grouping every flagged loan for checking before anything is written](/img/docs/app/guides/data-import/02.png)

### The Borrowers tab

Each borrower gets one of three actions: **Create new client**, **Match existing client** (pre-filled when an email matches an existing client), or **Skip**. Duplicate records from the export are folded together and marked *merged*, and **Skip all unattached & company** drops the loan-less and company-only rows at once.

## What blocks the import

**Continue** stays disabled, and the *Before you can continue* panel links each outstanding item to where it is fixed:

| Blocker | How you clear it |
| --- | --- |
| Loans that cannot be imported automatically | Tick the acknowledgement checkbox, which skips them |
| A loan with an **Unmatched** or **Conflict** tract | Fix the match, or skip the loan |
| Grace days not confirmed | Set them in Matching & settings |
| A required default late fee not set | Set it in Matching & settings |
| A borrower set to **Match existing** with no client chosen | Pick the client, or change the action |
| A subdivision alias row with no inventory | Pick the inventory, or remove the row |

Loans the engine cannot reproduce — an unsupported loan type or configuration, variable rates, an unrecognized lifecycle state, an unrecognized payment type — appear in their own red panel with the reason for each. They can only be skipped; everything else still imports.

## Committing

The confirmation screen totals what is about to happen: clients to create, match, and skip; loans by active, paid off, terminated, skipped, and unsupported; and the transaction and note counts. Re-confirm the history choice, click **Start the import**, and type `IMPORT`.

The run works through five stages — Clients, Loans, Notes, Files, Finalizing — and keeps going on the server even if you close the page. Lendiom sends an in-app notification and an email when it finishes. If the server restarts mid-run, the import parks as interrupted with a **Resume the import** button; nothing already imported is lost or duplicated.

![The Import step running, with the five stage bar on Clients, a progress bar partway across, and the imported, fell back and failed counters beneath it](/img/docs/app/guides/data-import/04.png)

:::caution
Committing creates real clients and loans in your organization. There is no one-click undo. Get the review right first.
:::

## What gets created

| Item | What lands in Lendiom |
| --- | --- |
| Clients | One per borrower, with name, email, phone numbers, addresses, birth date, and tax ID. A company borrower becomes a company client; co-borrowers become either their own client or another person on the primary's client. |
| Loans | A tract loan labeled with the MoneyLender account number, attached to the matched tract and client, carrying the source terms, rate, payment, escrow rider, and late fee tier. Paid-off loans are marked paid off; terminated contracts are canceled. |
| Transactions | On a full history replay, every payment, down payment, late fee, waive, adjustment, and payoff, in order. Customer-facing letters and welcome texts are suppressed throughout. |
| Notes | Each `QuickNote` becomes a loan note plus a timeline entry dated to the original note. Clients and loans also get an origin note naming the MoneyLender source record. |
| Files | Attachments land in an **Imported from MoneyLender** folder on the loan. |

Small reconciling adjustments are normal: MoneyLender computes interest daily behind the scenes even on amortized loans, while Lendiom uses standard monthly amortization, so the principal and interest splits differ slightly.

## The MoneyLender record on every loan

Every imported loan gets a PDF named **MoneyLender source transactions (pre-import).pdf** in its **Imported from MoneyLender** folder, listing the loan's MoneyLender payments (date, applied date, amount, principal, interest, escrow, fees, balance, type, returned flag, description) and its full ledger, oldest first.

It is a historical record of the data as it existed in MoneyLender, not a live ledger. Balances-only loans get one too, so the pre-import history is available even where the transactions were not replayed. Future-dated rows — MoneyLender pre-posts its projected finance charges and late fees years ahead — are omitted, with a count at the bottom.

![The Files card on an imported loan, with the Imported from MoneyLender folder open and the source transactions PDF alongside the loan’s own two documents](/img/docs/app/guides/data-import/05.png)

## After the import

The results screen lists every loan with its outcome — Imported, Balances Only (flagged), Failed, Blocked, or Skipped — plus the client, note, and file ledgers and a **Download results (CSV)** button. Loan names link into the app.

![The import results, with the clients, loans and extras summary cards above the loans table, each balances-only loan tagged in the outcome column](/img/docs/app/guides/data-import/06.png)

Work through this before you call the migration done:

1. **Review every loan flagged Balances Only.** Their balances are correct, but no transaction history came over.
2. **Check the rows where expected and actual principal differ,** or where *Extra activity* shows a count.
3. **Spot-check a few loans** — amortization schedule, balances, next due date, late fees, and [escrow](../how-it-works/loan-escrow.md).
4. **Turn on automated communication where you want it.** Imported loans arrive with automated messaging off. See the [communication portal guide](../communication.md).
5. **Re-invite your borrowers to Lendiom Pay.** Card and bank details never move over; borrowers re-enroll their own payment methods. See [setting up online payments](../payment-processing/setting-up-online-payments.md).

:::info
Loan document automation pauses automatically for the duration of the import and is restored when it finishes, so the bulk status changes do not fire your automations.
:::

A completed import stays in the list permanently as the record of what was brought in and cannot be deleted. An import you never committed can be deleted, which removes the uploaded export files only.
