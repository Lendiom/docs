---
id: loan-status
title: Loan Status
description: How do the various status of a loan work?
author: Bradley Hilton
---

## Introduction
Loans, owner financing contracts, go through a process on creation and throughout their lifecycle. This process is represented by the status of the loan. The status of a loan is a way to understand where the loan is in its lifecycle and what actions can be taken on the loan.

## Loan Statuses (or states)
* **Draft**: The loan is in the process of being created and is not yet active. As of v0.38.0, this is the initial status of a loan on creation. After creation, the loan be moved to a different status in the [Action Center](./loan-action-center). When this status is set, the following are true:
  * The loan is not visible to the buyer
  * The buyer can not make payments on the loan
  * The loan is not included in any reports
  * The loan is counted towards the active loan count
  * No late fees are calculated
  * No messages or reminders are sent to the buyer
* **Pending**: The loan is waiting on the buyer to take some action. This could be the buyer signing the loan documents, make the down payment, or any other action that is required by the buyer.
* **Current**: The loan is current and the buyer is making payments on the loan. This is the status that the loan will be in for the majority of its lifecycle. *This status used to be called Active*.
* **Grace Period**: The loan is in its grace period. This is a period of time after the due date of a payment where the buyer can still make the payment without being considered late. The loan automatically moves to this status after the due date of a payment and no payment has been made.
* **Late**: The loan is late. This is a status that the loan will move to if a payment is not made by the end of the grace period.
* **In Default**: The loan has not been paid after the configured amount of time for a loan to be considered in default. At this status, Lendiom will start the process of repossessing the property, if enabled. This includes sending the buyer a notice of default, via text (if the communication portal is enabled) and mail.
* **Defaulted**: The loan has not had a payment made on it after the notice was sent and the configured number of days after the default notice was sent has passed. At this status, the loan is considered defaulted and no more payments can be made on the loan unless the status is *manually* changed back to *In Default*.
* **Repossessed**: The property has been repossessed and the loan is no longer active. This status is set manually by the owner (or one of their employees). Upon changing the status to *Repossessed*, the inventory and/or tract associated with the loan will be released and available for sale.
* **Paying Off**: The buyer has initiated the process of paying off the loan. This status can be triggered when the buyer makes their final payment on the loan and the payment is still pending. This status can also be triggered manually by the owner (or one of their employees). When in this status, no further payments can be made to the principal balance of the loan.
* **Paid Off**: The loan has been paid off and is no longer active. This status is automatically set if the balance of the loan is zero and the transaction that paid it off is successful. This status can also be set manually by the owner (or one of their employees) when recording a payoff that was not done through Lendiom and with a payoff discount.
* **Inactive**: The loan is no longer active and no further payments can be made on the loan. This is a legacy status, and as of v0.38.0, this status is no longer used. The status *Paid Off* or *Repossessed* should be used instead.
* **Canceled**: The loan was called off rather than paid off or repossessed — typically because it never really got going. Canceled loans are excluded from analytics and from the yearly installment income report, and late fees cannot be waived on them.
* **Refinanced**: The loan was replaced by a new one through a refinance. The original keeps this status permanently as a read-only record: no further transactions, no late fee waivers, and no recast. It still appears in the buyer's Lendiom Pay account so they can see their history, but it is left out of their balance totals.

## Lifecycle of a Status

Most loans move through the statuses in this order:

1. **Draft** while you are still setting it up. A loan can always be moved back to Draft.
2. **Pending** if the buyer still owes an action, such as signing documents or paying the down payment.
3. **Current** once the loan is live and payments are being made. This is where a loan spends most of its life.
4. **Grace Period** automatically, once a due date passes without payment.
5. **Late** automatically, once the grace period ends.
6. **In Default** after the number of days you configured, which starts the repossession process if you have it enabled.
7. **Defaulted** after the configured number of days following the default notice.

A payment at any point in steps 4 through 7 returns the loan to **Current**. From **Defaulted** you can either move the status manually back to *In Default*, or on to **Repossessed**.

Loans that end well go **Paying Off** and then **Paid Off**. Loans that end another way land on **Repossessed**, **Canceled**, or **Refinanced**.


## Which Statuses Are Considered "Active"? {#active-statuses}
At the end of 2022, Lendiom changed the pricing model to include 100 active loans in the base price. After the 100 active loans, each additional 100 active loans will be an additional $50 per month. The following statuses are considered "active":

- Pending
- Current
- Grace Period
- Late
- In Default
- Defaulted
- Paying Off
