---
id: creating-a-pre-existing-loan
title: Creating a Pre-Existing Loan
---

Creating a loan in the system based on an existing loan requires five additional steps.

The information required depends on which interest schedule you are using.

When the interest schedule follows the payment schedule, the math formula variables require specific input. Due to the complexity of the amortization and starting a schedule in the middle of it, without entering the details for each payment made in the past, we require four new data points which will enable us to calculate the correct amortization schedule. [Jump to more information](#interest-follows-payment-schedule).

However, when the interest accrues daily, we a completely different set of data since interest accruing daily does not follow an amorization schedule. [Jump to more inforamtion](#interest-accrues-daily).

:::tip

If you know the details about each payment and have the time, or have the resources, to enter the information in, we highly recommend going this route so that you and the client have the history easily accessible inside Lendiom. To do this, you will create a new loan with the status as draft. Once all the information is entered, then you can mark it as active.

:::

## Interest Follows Payment Schedule
First step is to gather the prerequisites, then enter the original loan terms, then the new fields and verify the amortization schedule is correct.

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

### How It Works
Whenever a loan is created based on a pre-existing one, we take the values provided and instead of generating the amortization schedule on the original terms we generate a new one based on the remaining principal.

The system takes the provided original sales price, subtracts the down payments to get how much principal was originally due. Then, it takes that amount and subtracts the amount of principal paid already to get the balance due.

## Interest Accrues Daily
First step is to gather the prerequisites, enter the original loan terms, then enter the new fields and finally, verify the information displayed on the review screen is correct.

### Prerequisites
Before creating a pre-existing loan in the Lendiom system, the following pieces of information are required:

* Original Loan Terms
* First Payment Date
* **Total Principal Paid**
* **Total Interest Paid**
* **Unpaid Interest Balance**
* **Last Payment Date**
* **Next Due Date**

#### Principal Paid
This value is the sum total of the principal which has been paid, **including** any partial payments. Also, **exclude** the down payment as that information was entered and is took into account already.

#### Interest Paid
This value is the sum total of how much interest has been paid, **including** any partial payments.

#### Unpaid Interest Balance
How much unpaid interest do they have on the balance sheet that will be paid next payment? Do not include the amount since last payment, that will be handled automatically. Only include the amount which is remaining from their previous payment.

#### Last Payment Date
When did they last make their payment? We will use this to calculate the interest due on any future payments.

#### Next Due Date
The date when the next payment is due, excluding the grace period.

### Verification
On the last step of creating a new loan, [the review step](./creating-a-loan#step5), review all of the information you entered is correct and doesn't contain any extra zeros or other numbers. Double check yourself and Lendiom.

### How It Works
The system takes the provided original sales price, subtracts the down payments to get how much principal was originally due. Then, it takes that amount and subtracts the amount of principal paid already to get the balance due. It then stores the last payment date and the unpaid interest balance. Once the buyer pays their next payment, we calculate the days since last payment to get the new interest due and add the unpaid interest balance to get how much should be applied towards interest and principal.
