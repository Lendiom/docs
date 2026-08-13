---
id: payoff-quote
title: Calculating a Payoff Quote and Sending a Payoff Letter
---

A payoff quote answers one question: how much money closes this loan out on a specific day? Lendiom builds that number from the loan's live balances plus interest counted up to the date you choose, and turns it into a printable payoff letter for the borrower, their attorney, or a title company.

The calculator is read-only. It does not post transactions, change the loan's status, or hold the quoted amount. When the money arrives, you record the payoff separately — see [Recording a Loan Payoff](./recording-a-loan-payoff.md).

## Generating a Quote

1. Open the loan.
2. Click **Actions**.
3. Under **Primary Actions**, click **Calculate Payoff**.

<!-- screenshot: loan detail page with the Actions dropdown open, the "Primary Actions" group visible, and the "Calculate Payoff" item (calculator icon) hovered -->

The **Pay Off Calculator** modal opens, loads the quote for today, and shows the breakdown under **Pay Off Details**.

<!-- screenshot: Pay Off Calculator modal for a daily-accrual loan showing the Select Pay Off Date field set to today and the bordered Pay Off Details table with Total, Principal, Interest, Unpaid Interest, Fees, Other Fees, Property Tax and Escrow rows -->

To quote a different day, pick a new date in **Select Pay Off Date**. The quote reloads on its own — there is no recalculate button.

:::info
**Calculate Payoff** is unavailable while the loan is Inactive, Pending Payoff, Paid Off, Repossessed, Canceled, or Refinanced. The Actions menu explains why in a tooltip on the disabled item. See [Loan Status](../how-it-works/loan-status.md) for what each status means.
:::

## The Good-Through Date and Why It Matters

The date you pick is the good-through date: the quote is only correct if the funds are dated that day.

Interest is counted from the loan's interest anchor — the point through which interest has already been settled. That is normally the last payment received date, but a mid-period principal reduction moves it forward, and a loan that has never taken a payment counts from its down payment date or closing date. Lendiom takes the number of days between that anchor and your chosen date, rounds **up** to a whole day, and multiplies by the daily interest amount.

The daily rate depends on the loan's terms:

| Interest schedule | Days in year used |
|---|---|
| Follows payments | 365 |
| Accrues daily or interest-only, 30/360 formula | 360 |
| Accrues daily or interest-only, Actual/360 formula | 360 |
| Accrues daily or interest-only, Actual/365 formula | 365 |

On a loan where [interest accrues daily](../how-it-works/interest-accrues-daily.md), every day of delay adds another day of interest to the total. A quote good through the 10th that is paid on the 17th is short by seven days of interest, and the shortfall will block you from recording the payoff. That is why the payoff letter prints the next ten days' amounts alongside the quoted figure — the closing agent can pay on any of those dates and still send the right amount.

:::caution
The date picker refuses any date earlier than the current moment, not the start of today. Today's cell can therefore appear greyed out even though the modal opened with today's quote already loaded. If you change the date and want today's figures back, close and reopen the calculator.
:::

## What the Quote Includes

<!-- screenshot: close-up of the Pay Off Details table on a loan with escrow, each row labeled and populated with dollar amounts -->

| Line | What it is |
|---|---|
| **Principal** | The loan's current principal balance. |
| **Interest** | Interest for the days between the interest anchor and the good-through date, at the loan's daily rate. |
| **Unpaid Interest** | Interest already accrued and carried on the balance from earlier periods. The modal prints this row only when the interest schedule is *accrues daily*, but the amount is always part of the total. |
| **Fees** | The late fee balance. See [Late Fees](../how-it-works/late-fees.md). |
| **Other Fees** | The other-fees balance plus the flex late fee balance. See [Other Fees](../how-it-works/loan-other-fees.md). |
| **Property Tax** | The property tax balance. See [Collecting Property Tax](./collecting-property-tax.md). |
| **Escrow** | The escrow portion of scheduled payments that are already due on or before the good-through date and not yet fully paid. Shown only when the loan has [escrow](../how-it-works/loan-escrow.md). |
| **Total** | Principal, interest, unpaid interest, fees, other fees, property tax and escrow — including the unpaid interest balance even on loans where the modal hides that row. |

:::caution
The escrow line covers escrow on payments that have come due, not the escrow for the rest of the loan's original term. Payments due after the good-through date are excluded.
:::

:::caution
**On an [interest-only loan](../how-it-works/interest-only-loans.md), the total is larger than the lines you can add up.** These loans carry unpaid interest by design, and that balance is always part of the total — but the **Unpaid Interest** row only appears when the interest schedule is *accrues daily*, so nothing on screen accounts for the difference. The gap is exactly the loan's unpaid interest balance. To see the figure, generate the payoff letter: its **Total Interest Due** is the interest for the quoted days plus the accrued unpaid interest. This is not a miscalculation, and the total is the amount to collect.
:::

### Unapplied Payment Credits

If the borrower has [unapplied payments](../how-it-works/unapplied-payments.md) sitting on this loan, the calculator shows a blue banner with the count and dollar total, then adds a **Net Payoff Due** line — the total minus those credits, floored at zero.

<!-- screenshot: Pay Off Calculator modal showing the blue "2 unapplied payment(s) totaling $1,250.00 available as credit" banner above a single-row table reading Net Payoff Due -->

:::warning
Net Payoff Due is a courtesy figure for the borrower. Lendiom will not let you record a payoff while unapplied payments are still available on the loan — apply or refund them first, then record the payoff against the full total.
:::

## The Payoff Letter

Click **Generate Letter**. Lendiom re-runs the quote for the date currently selected, renders a US Letter–sized PDF, saves it to the loan, and downloads it to your browser as `PayOffLetter.pdf`.

The letter is written for someone outside your office and contains more than the modal does:

| Section | Contents |
|---|---|
| Header | The account or property, and a banner reading either INTEREST ACCRUES DAILY or REGULAR SIMPLE INTEREST. |
| Dates | Payoff date, "Start Calculating Days From", and the paid-thru date. |
| Pay To | Your organization's name, mailing address, and phone number. |
| Loan facts | Payment amount (labeled monthly, biweekly, or weekly to match the loan), interest rate, current principal balance. |
| Amounts due | Late fees, other fees, property tax, escrow (when the loan has escrow), and the total payoff amount. |
| Interest detail | Days of interest due, the daily interest amount, the interest calculated for those days, the accrued unpaid interest balance on daily-accrual loans, and total interest due. |
| Postings | A breakdown of the principal-only, interest-only, fees-only, property tax–only, and escrow-only postings that clear the account, plus the credits and Net Payoff Due when credits exist. |
| Borrower | Name, address, and phone number from the client's primary entity. |
| Ten-day table | The payoff amount for each of the ten days following the good-through date. |

<!-- screenshot: first page of a generated payoff letter PDF for "Demo Land Company", showing the INTEREST ACCRUES DAILY banner, the amounts-due column, the postings block, and the ten-day payoff table in the lower right -->

The same PDF is filed on the loan under **Files**, in a **Letters** folder, named `Pay Off - <date>.pdf`. Reach for that copy later instead of regenerating — the download link the browser used expires after ten minutes, and a regenerated letter reflects balances as they are then, not as they were.

:::caution
"Start Calculating Days From" prints the loan's last payment received date. If a mid-period principal reduction has since settled interest forward, the day count actually starts later than that printed date. **Days of Interest Due** on the letter is the authoritative figure.
:::

### Sending It

The generated PDF is already US Letter size with no landscape pages, so it is ready for [Sending a Physical Letter](./sending-a-letter.md): download it from the loan's Files card, open the client's **Mail** action, and upload it there. Choose **Insert Blank Page** for address placement if you are sending certified or registered mail.

## Quoting vs. Recording

These two actions live next to each other in the Actions menu and do very different things.

| | Calculate Payoff | Record Payoff |
|---|---|---|
| What it does | Computes and displays the amount | Posts the money and closes the loan out |
| Changes the balance | No | Yes |
| Creates transactions | No | Yes — property tax, any adjustment, and the payoff itself |
| Changes loan status | No | Yes — Pending Payoff, then Paid Off |
| Writes to the loan | Only the letter PDF, when you generate one | Transactions and a system note on the timeline |
| Reversible | Nothing to reverse | Requires reversing transactions |

:::tip
Quote first, then record. When you record the payoff, the amount paid plus any adjustment has to match the calculated total for that date to the cent — Lendiom rejects a mismatch and tells you the difference. Running the calculator for the date the funds are dated gives you the number to enter.
:::

Borrowers see a version of this too: on a loan with a payment schedule, Lendiom Pay shows a **Pay Off Balance** calculated seven days out with that date beside it (see [Your Lendiom Pay Home Screen](../../pay/home-screen.md)). It is a convenience figure, not a quote you issued.
