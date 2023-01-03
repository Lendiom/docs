---
id: creating-a-pre-existing-loan
title: Creating a Pre-Existing Loan
---

Creating a loan in the system based on an existing loan requires five additional steps. Due to the complexity of the amortization and starting a loan in the middle of it without entering the details about each payment which has been made in the past, we require four new data points which will enable us to calculate the correct amortization schedule.

:::tip

If you know the details about each payment and have the time, or have the resources, to enter the information in, we highly recommend going this route so that you and the client have the history easily accessible inside Lendiom. To do this, you will create a new loan with the status as draft. Once all the information is entered, then you can mark it as active.

:::

## How to Create It
First step is to gather the prerequisites, then enter the original loan terms, then the four new fields and verify the amortization schedule is correct.

### Prerequisites
Before creating a pre-existing loan in the Lendiom system, the following pieces of information are required:

* Original Loan Terms
* First Payment Date
* **Total Principal Paid**
* **Total Interest Paid**
* **Last Paid in Full Payment Number**
* **Next Due Date**

:::warning

When entering the interest paid and principal paid, please **exclude** any partial payments made to the next payment due! Doing so will cause the amortization to be incorrectly calculated.

:::

### Information
On the third step of the loan creation, [see here for more information](./creating-a-loan#step3), toggle the **[New or Existing Loan](./creating-a-loan#step3-new-or-existing)** field so it says `Existing`. Once that is done, four new fields will appear.

#### Principal Paid
This value is the sum total of how much of the principal has been paid, **excluding** any partial payments. Also, exclude the down payment as that information was entered and is taken into account.

#### Interest Paid
This value is the sum total of how much interest has been paid, **excluding** any partial payments.

#### Last Paid In Full Payment Number
The payment number of the last paid in full payment. This value is used to calculate the payment number of the next payment due.

#### Next Due Date
The date when the next payment is due, excluding the grace period.

### Verification
On the last step of creating a new loan, [the review step](./creating-a-loan#step5), please double check the generated amortization schedule. Verify that the next payment number is correct, the next payment due date is correct, and the amounts to the interest and principal are correct.

## How It Works
Whenever a loan is created based on a pre-existing one, we take the values provided and instead of generating the amortization schedule on the original terms we generate a new one based on the remaining principal.

The system takes the provided original sales price, subtracts the down payments to get how much principal was originally due. Then, it takes that amount and subtracts the amount of principal paid already to get the balance due.
