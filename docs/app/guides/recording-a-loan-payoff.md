---
id: recording-a-loan-payoff
title: Recording a Loan Payoff
---

Since version 0.41.0, Lendiom has a dedicated feature to record when a borrower pays off their loan early.

## What is a Loan Payoff?
A loan payoff happens when the borrower pays the entire loan amount at once, which can occur at any time during the loan period.
When you record a loan payoff, the loan is marked as paid in full and the loan balance becomes zero.

## Recording Loan Payoff Overview

To record a loan payoff, follow these steps:

1. Click on the `Actions` button.
2. Then, click on the `Record Pay Off` button.

![Record Pay Off Button Screenshot](/img/docs/app/guides/recording-loan-payoff/record-payoff-button.png)

A modal window will appear where you can enter the details about the early payoff. Here's what it looks like:

![Record Pay Off Modal Screenshot](/img/docs/app/guides/recording-loan-payoff/record-payoff-modal.png)

## Input Descriptions

### Payoff Date
Enter the date when the payoff was received.
The system will calculate how much the borrower needs to pay based on this date.

### Status
Select `Pending` to mark the loan as pending payoff.
Once the payment clears your bank account, you can update the status to `Success`, which will mark the loan as paid off.

Select `Success` to mark the loan as paid off.

### Payment Method
Choose the method of payment used by the borrower. This can be any of the payment methods listed on the [adding a transaction page](./adding-a-transaction#input-payment-method).

### Amount Paid
Enter the amount of money received from the borrower.

### Adjustment Amount
If the amount paid and the payoff amount due don't match, you'll need to make an adjustment.
This can happen if there are fees, discounts, or credits involved.

### Comment
Since this is a significant event for the loan, you're required to add a comment.
We recommend including payment method details, especially if it's a check, cashier's check, or money order, to help your accountant balance your books.

## Mismatch Amount Warning
If the payoff amount due and the amount paid don't match, the system will display a warning about a mismatch amount.
Lendiom calculates the difference in real-time.
Here's an example:

![Record Pay Off Mismatch Amount Warning Screenshot](/img/docs/app/guides/recording-loan-payoff/record-payoff-mismatch.png)
