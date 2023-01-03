---
id: property-taxes
title: Property Taxes
---

Since v0.21.0 of Lendiom, keeping record of property taxes is now possible. The following is a guide with detailed descriptions of the various inputs and what the expected result will be. If you want a high level overview, we recommend reading the [blog post first](../../../blog/property-tax).

## Property Tax Section Overview

![Property Tax Section Overview Screenshot](/img/docs/app/guides/property-tax/property-tax-overview.png)

## Property Tax Status Flow

Once created, a property tax defaults to the `Draft` status. When finished and ready to send off, the property tax is `Finalizing` which means that Lendiom is sending off notices. After the notices are sent off, the property tax is set to `In Progress`. Finally, when every tract tax is paid or marked as paid, the property tax status changes to `Reimbursed`.

## New Property Tax Creation

Below is a screenshot of the screen where you create a new property tax record.

![New Property Tax Screenshot](/img/docs/app/guides/property-tax/new-property-tax-example.png)

## Input Descriptions
While a property tax is in the `Draft` status, any of these inputs can be changed. However, once finalized none of the values can be changed.

### Tax Year {#input-year}
The year in which you, the seller, have been billed for the property taxes. We only allow one property tax per year per development.

### Total Owed {#input-total}
How much property tax you owe and how much you need to be reimbursed for.

### Tax Per Acre {#input-per-acre}
The amount of tax owed per acre. We calculate this based on the number of acres the project has and the [total owed](#input-total). The calculated amount will have several decimal places and we **highly** recommend keeping it as auto calculated.

### Due Date {#input-due-date}
When must the buyers have paid/reimbursed the property tax by? Lendiom will include this date in the notices and will send an automated reminder on the due date if the buyer has not paid it yet.


### Tracts Table {#tracts-table}
Underneath the top inputs is a list of all the tracts in the development. The columns are:

* Checkbox
* Tract Label
* Tract Acres
* Taxes Owed
* Edit Button

The checkbox indicates whether or not that tract is included as part of the property tax bill. When this is unchecked, no notices will be sent to the tract's owner nor will we expect any payment from them. If a tract has the option *Eligible for Property Tax Reimbursement* set to `Not Eligible` then that tract will not be included as part of the tax bill. By default, every tract has this enabled and can be disabled manually on a tract by tract basis.

The taxes owed are automatically calculated based on the tax per acre and the amount of acres the tract has. However, this can be a custom amount if you click the *Edit button*.

At the bottom of the tracts table is the summary row. The first value there has two numbers, for example: `29.38 (29.38)`. The first amount is the acres which have been included in the taxes owed. The second amount is the total amount of acres for the development. The second value on the summary row is the sum of the taxes owed per tract.

### Custom Tract Tax Amount {#input-custom-amount}
Whenever you click the *Edit button* on a tract, a simple editor will pop up and you can enter the custom amount.

![Custom Property Tax Amount Editor Screenshot](/img/docs/app/guides/property-tax/custom-amount-editor.png)

Once you have a custom amount, a *Reset button* will appear. This allows you to easily remove the custom amount you applied and resets the taxes owed for the tract to be the per acre calculated amount.

![Tract with Custom Property Tax Amount Screenshot](/img/docs/app/guides/property-tax/tract-with-custom-amount.png)

## Finalizing Screen {#finalize-screen}
After you have created the property tax, you will need to finalize the property tax so that the buyers can pay you and you get reimbursed. The following is a screenshot of the finalize screen:

![Finalize Property Tax Screenshot](/img/docs/app/guides/property-tax/finalize-screen.png)

### Send SMS {#finalize-sms}
The `Send SMS` option enables Lendiom to send text message notices to the buyers of each tract if they have a valid phone number. As this is outside of their loan and this is not an automated message, we will send the message regardless of their [automated messaging choice on the loan](./creating-a-loan#step4). The following is a screenshot of the text message the buyer will get. (note: if the buyer does not have a loan in the system, they will not have the option to pay online)

![Notice Text Message Screenshot](/img/docs/app/guides/property-tax/notice-text-message.jpeg)

### Send Mail {#finalize-mail}
The `Send Mail` option enables Lendiom to send a notice letter via the mail to the buyer of each tract if they have a valid address on file. The following is a screenshot of the notice letter sent to the client.

:::warning Return Address

The return address printed on the notice letter will be the Mailing Address address you have configured in the Organization Settings underneath the Basic section. Please verify this is the value you want printed on the notice letters.

:::

![Notice Letter Screenshot](/img/docs/app/guides/property-tax/notice-letter-rendered.png)

### Name in Signature {#finalize-signature}
If the [Send Mail](#finalize-mail) option is enabled, then you will need to input the name that goes in the signature position on the letter.


## Customer Paying
For customers who have a loan inside of Lendiom, they will be able to pay inside of Lendiom Pay. Please see the [Lendiom Pay guide related to Paying Property Taxes](../../pay/guides/paying-property-taxes).
