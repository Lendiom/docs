---
id: moving-a-due-date
title: Moving a Payment Due Date
---

Moving a payment due date pushes a loan's next payment out (or pulls it in) and rebuilds every payment after it. It is the only deferment mechanism in Lendiom. If a borrower needs a month of breathing room, a hardship accommodation, or a corrected first payment date, this is the tool.

It is also the tool that quietly makes a loan more expensive. Read the [Move-to-End Options](#move-to-end-options) section before you use it on a live loan.

## Before You Start

Three things gate the action:

| Requirement | What happens if it is missing |
| --- | --- |
| The loan has an amortization schedule | The **Move Due Date** menu item is disabled with the tooltip *This loan does not have a payment schedule.* The server rejects the request with error code `2401`. |
| Your role has **Loan → Update** permission | The entire **Actions** button is disabled. |
| The loan is in a workable status | The menu item is disabled while the loan is *Inactive*, *Pending Payoff*, *Paid Off*, *Repossessed*, *Canceled*, or *Refinanced*. See [Loan Status](../how-it-works/loan-status.md). |

Every loan created in Lendiom is given a schedule, so the first requirement only bites on older records that predate schedules.

## Moving the Date

1. Open the loan and click the **Actions** button.
2. Under **Primary Actions**, click **Move Due Date**.
3. Pick the new date, check any move-to-end options you want, write a reason, and click **Save**.

![A loan page with the Actions dropdown open, showing the primary actions group](/img/docs/app/guides/moving-a-due-date/01.png)

The modal is titled **New Due Date** and opens with a blue notice: *Please note that when changing a due date, all future payments will follow the new date structure.* That notice is literal — the move is not a one-payment holiday. Every remaining payment is regenerated from the new date at the loan's payment frequency.

![The Move Due Date modal on a loan, with the current and new due date fields](/img/docs/app/guides/moving-a-due-date/02.png)

## What Happens to the Schedule

What the move touches depends on the loan's payment history:

| Payment history | Result |
| --- | --- |
| No payments recorded yet | The new date becomes the loan's first payment date and the whole schedule is rebuilt from it. If the loan was entered as a pre-existing loan, its recorded next payment date is updated to match. |
| Payments recorded, none partially paid | The next unpaid payment gets the new due date. Its original due date is stored, it is flagged as changed with a timestamp, and it is marked partially paid so the schedule generator honors the new date. |
| A partially paid payment exists | That partially paid payment gets the new due date and the same change flags. |

In every case the payments after it are regenerated, spaced at the loan's normal payment frequency starting from the new date.

![The amortization schedule after a due date move, the affected payment carrying its new due date and every payment after it shifted by the same amount](/img/docs/app/guides/moving-a-due-date/05.png)

:::caution
There is no undo. Reversing a move means running the action again with the old date, and that does not pull any capitalized balances back out of the principal.
:::

## Move-to-End Options {#move-to-end-options}

The checkboxes only appear when the loan actually carries the balance in question:

| Option | Appears when | What it moves |
| --- | --- | --- |
| Move Accrued Interest to End of Loan | Interest schedule is **Accrues Daily** and accrued interest is not zero | Interest accrued since the last payment |
| Move Unpaid Interest to End of Loan | Interest schedule is **Accrues Daily** and the unpaid interest balance is not zero | Interest carried over unpaid from earlier periods |
| Move Late Fees to End of Loan | Late fees are configured and not disabled, and the late fee balance is not zero | The outstanding [late fee](../how-it-works/late-fees.md) balance |
| Move Any Other Fees to End of Loan | Other fees or flexible late fees are not zero | Other fees plus flexible (balance-based) late fees, combined |

Each checked option does the same thing: the balance is zeroed out and its amount is added to the loan's **principal balance**. The modal tells you the exact dollar amount under each checkbox before you commit.

:::warning
Every one of these options increases the total cost of the loan, and none of them are optional extras — they change the money.

The moved balance stops being a fee or an interest balance and becomes principal. Principal earns interest for the entire remaining life of the loan. Late fees and other fees never earned interest before you moved them; after the move they do. Accrued and unpaid interest become interest-bearing too, which is interest charged on interest.

On top of that, the regular payment amount does not change. A larger principal paid at the same installment means the schedule is rebuilt with more payments than before, so the borrower pays longer as well as paying more. Lendiom caps how far a schedule may run past its term; a loan already near that cap folds the extra balance into a larger final payment instead of adding installments.
:::

When the loan already has recorded payments, the total that was rolled forward is also recorded on the affected payment as an applied adjustment, so the schedule math stays consistent across future regenerations. On a loan with no payments yet there is no such payment to mark — the amount lands in the principal balance only, and the whole schedule is rebuilt from it.

## Accrues Daily Loans

Two of the four options — accrued interest and unpaid interest — only exist for loans whose interest schedule is [Accrues Daily](../how-it-works/interest-accrues-daily.md). On any other interest schedule the checkboxes are not rendered, and the server ignores those two flags even if they are sent.

Accrues Daily loans get one more behavior that is easy to miss.

**The interest anchor resets.** When the move is saved, Lendiom sets the loan's last transaction date, last transaction modified date, and last payment received date to just before the current time. The last-interest-settled date advances to the same point, but only forward — a move never drags the anchor backwards behind interest that was already settled.

**What that forgives.** Accrued interest is derived from the anchor, not stored as a running ledger. Once the anchor moves to today, daily accrual restarts from today. Interest that had built up between the borrower's last payment and the moment of the move is simply not charged.

:::caution
On an Accrues Daily loan, leaving **Move Accrued Interest to End of Loan** unchecked writes off the interest that accrued since the last payment. That is real revenue you will not collect, and there is no prompt warning you about it.

Check the box if you want that interest preserved. It is capitalized into the principal balance first, and only then does accrual restart. The modal's own helper text says so: *Additional interest will start accruing from today's date.*
:::

![The New Due Date modal on a daily-accrual loan, including the adjust-interest choice](/img/docs/app/guides/moving-a-due-date/02.png)

## The Reason Is Required and Permanent

The **Reason** field is not optional. An empty reason is rejected with error code `889`. Any HTML you paste in is stripped before it is stored.

When the move succeeds, Lendiom writes an auto-generated system note to the loan's **Notes** card, on the timeline. The note records who moved the date, the new date, the previous date, the principal adjustment amount if anything was rolled forward, and your reason verbatim.

System notes cannot be edited. Treat the reason as the permanent record of why this loan's terms changed, because that is exactly what it is — write it for the auditor, the borrower, or the attorney who reads it two years from now, not for yourself today.

![The Notes card on a loan, showing the system notes Lendiom writes as things change](/img/docs/app/guides/moving-a-due-date/03.png)

## Date Limits and Errors

The date picker disables every date before the later of the loan's closing date and its last transaction date. There is no upper limit — you can move a due date arbitrarily far into the future. The date you pick is interpreted in your organization's time zone.

The server enforces its own checks:

| Code | Message | Cause |
| --- | --- | --- |
| `888` | invalid next due date | No date was supplied. |
| `889` | reason must be provided | The reason was empty. |
| `2401` | only loans with a schedule can have their due date adjusted, for now | The loan has no amortization schedule. |
| `340` | can not adjust the next due date to be before the closing date | The chosen date precedes the loan's closing date. |
| `340` | can not adjust the next due date to be before the last transaction date | The chosen date precedes the most recent transaction on the loan. |
| `9991` | can not adjust the next due date for a loan with no more payments required | Every payment in the schedule is already fully or partially paid. |

![The New Due Date dialog with its calendar open, dates before the loan’s last transaction greyed out and unselectable](/img/docs/app/guides/moving-a-due-date/04.png)

:::info
Moving a due date is a change to the payment schedule, not a payment. If you need to record money received, use [Adding a Transaction](./adding-a-transaction.md). If the borrower is settling the loan in full, use [Recording a Loan Payoff](./recording-a-loan-payoff.md).
:::
