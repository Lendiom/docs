---
id: creating-a-loan
title: Creating a Loan
---

A loan in the Lendiom system represents a real loan. This resource contains all of the characteristics and configurations which make up the loan. The loan can represent an owner financed loan, a cash loan or anything else where a sum of money is owed that is expected to be paid back with (or without) interest.

As of the release *v0.15.0*, pre-existing loans can now be created in the system. By pre-existing, we mean that you can enter the details of how much principal and interest has already been paid along with when the next due date when creating a loan. The information provided then allows us to create a loan and correctly generate the amortization and payment schedule.

The current process for creating a loan consists of five steps. We will describe each step below and what each input (configuration option) means.

## Step 1: What & Who {#step1}
The first step consists of telling the system what the loan is for and who the loan is for, plus a few more details.

### Loan Status {#step1-status}
When creating a loan, the status will always be in the **Draft** status. After you save the loan, you will be able to make it active in the Action Center of the loan. For more details about the possible statuses of a loan, please see the [how it works page](../how-it-works/loan-status).

:::info Why Draft?

Starting in v0.37.0, all loans will be saved as a **Draft**. We made this change as you can now collect down payments via Lendiom. But we also made this change to give people more time to review the details of a loan they created. 

:::

### Loan Type {#step1-type}
The type of loan determines what can be attached to the loan.

* **Cash** - Only need to select a client, basically a hard money loan
* **Tract of Land** - Enables selecting one or more tracts of land
* **Residential** - Enables selecting a residential (house) inventory

//TODO: fix the following section!

### Loan Tract Selection {#step1-tract-selection}
Whenever the [loan type](#step1-type) is a tract of land, the tract must be selected. It will drop down a list of the developments and the tracts in each development. For a tract to be selectable, it must be available and no other active loan can be against the tract of land (can not be marked as sold).

### Client Selection {#step1-client}
Who is the loan for? The client must exist in the system already.

### Loan Label {#step1-label}
The loan label is for your reference and the client's reference (when using [Lendiom Pay](/pay/)). The system auto generates a label based upon the loan type, tract of land selection and the client. We highly recommend customizing the label for you and your client to easily recognize it.

### Step 1 Screenshot
![img](../../../static/img/docs/app/guides/creating-a-loan/first-step.png)


## Step 2: Terms {#step2}
The third step is for setting the terms of the loan. So, when the due date is and how late fees are charged.

### Closing Date {#step2-closing-date}
The closing date is when the papers are going to be signed or were signed. This is primarily for your record keeping and does not effect any loan calculations.

### First Payment Date {#step2-first-payment-date}
The first day the payment is due. This date then sets whenever the following due dates are. For example, if the due date is the March 1st, 2021 then the due date will be the first of each month that follows until the loan is paid in full.

### Days Until Default {#step2-days-until-default}
How many days after their due date (exclusive of it) until the loan is considered to be in default? The checkbox disables automatically moving the loan to a status of in default.

### Late Fees Applied
Whether or not you want the late fees applied automatically or manually.

### Late Fee Tiers
A late fee tier tells Lendiom how and when to apply a late fee or multiple late fees. For more information, please see the [how late fees works page](../how-it-works/late-fees).

### Step 2 Screenshot
![img](../../../static/img/docs/app/guides/creating-a-loan/terms-step.png)


## Step 3: How Much {#step3}
The second step consists of telling the system how much the loan is for and several details surrounding the pricing.

### Sales Price {#step3-price}
Sales price refers to how much they agreed to pay prior to putting any money down. Or, if doing a cash loan, how much they agreed to borrow before putting any money down.

### Down Payment {#step3-downpayment}
Down payment is the amount of money the Client (buyer) is putting down against the principal as part of the initial agreement.

Since February 2024, you can now natively collect the down payment from within Lendiom. The button **Collect via Lendiom** will open a modal asking for more details.

:::info PayArc Requirement

You must be setup to process payments via PayArc to collect down payments via Lendiom.

:::

### Amount Financed {#step3-amt-financed}
This input is a calculated value based upon the previous two inputs. It subtracts the down payment from the sales price.

### Years {#step3-years}
How long the loan will be financed for in terms of years.

### Interest Rate {#step3-rate}
The rate at which the loan is charged interest. Currently Lendiom only supports a fixed interest rate (for now).

### Interest Schedule {#step3-interest-schedule}
There are a few ways interest can be calculated. At the moment, Lendiom only supports two of them:

* Accrues Daily
* Follows Payment Schedule

When you select **Accrues Daily**, the interest needed is based on the remaining principal balance and the amount of days since their last payment. When the amount of interest needed is more than the current payment amount, the unpaid interest is added to a interest balance and is required to be paid first on the next payment.

:::note Example of Accrues Daily

The remaining principal balance is \$29,000 with an interest rate of 10% and a monthly payment of \$254.50. The buyer pays their payment 5 days after the due date. The amount towards interest would be $281.94. The formula for calculating interest due is:

$A=P*\frac I Y*D$

`A` = Accrued interest

`P` = Principal Due

`I` = Interest Rate

`Y` = Days in the Year (360, 365)

`D` = Days since Last Payment

:::

When you select **Follows Payment Schedule**, the interest needed is based on the payment schedule (also known as amortization schedule). When the buyer pays their payment, the interest needed is based on how much the payment schedule determines it is.

### Monthly Payment {#step3-payment}
How much the monthly payment will be based upon the provided terms. This is a calculated value. Should this value ever be anything different than what you expected, please get with support and include how you calculated your monthly payment.

### Extra Payment Application {#step3-extra-application}
When extra is paid on a payment, this value determines where the extra amount should be applied to. There are currently two options:

* Principal
* Next Payment

The **Principal** option applies the extra paid amount directly to the principal.

:::note Example of Principal

The monthly payment is $475.00 but they pay $500. When the extra payment application is *Principal* then the extra $25 will go towards the loan's principal.

:::

The **Next Payment** option applies any extra paid amount to the next month's payment. This means that if someone was to pay a few dollars extra every month then eventually they will have paid an extra month ahead as it does roll over.

:::note Example of Next Payment

Let's say that the monthly payment is $225. We have a client who pays a $250 every month, which is $25 extra. The extra will be applied to next month's payment. This means that after 9 months of doing this the client will be one month ahead.

:::

### New or Existing Loan {#step3-new-or-existing}
Whenever you create creating an existing loan, this value enables the extra inputs for creating a loan based on an existing one. For more information about creating an existing loan, please see: [Creating a Pre-Existing Loan](./creating-a-pre-existing-loan)

### Step 3 Screenshot
![img](../../../static/img/docs/app/guides/creating-a-loan/how-much-step.png)


## Step 4: Communication {#step4}
In step four, you configure whether or not the communication with the client is automated and what their preference is.

### Automated Communication {#step4-auto-communication}
Should the communication to the client be automated or manual?

### Communication Preference {#step4-communication-pref}
Currently the only supported preference is SMS (aka text messages). At the moment Lendiom sends them messages about an upcoming payment due date, past due dates and more. However, the client must have a mobile number in the system.

### Step 4 Screenshot
![img](../../../static/img/docs/app/guides/creating-a-loan/fourth-step.png)

## Step 5: Review {#step5}
The fifth, and final, step is to review all of the data which you have entered before saving it. The review also includes an amortization schedule. Once you have reviewed all of the data and double checked it is correct, click the **Save** button and you are done creating the loan!

### Step 5 Screenshot
![img](../../../static/img/docs/app/guides/creating-a-loan/fifth-step.png)
