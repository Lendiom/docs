<!-- import InterestAccrualExample from '@site/src/components/interestAccrualExample'; -->

---
id: interest-accrues-daily
title: Interest Accrues Daily
description: When a loan's interest schedule accrues daily, how does it work? What are the formulas?
---

## Brief Introduction
Prior to Lendiom v0.28.0, interest followed the payment schedule. Now, with the ability to select the loan's interest schedule, the interest and payments can be calculated different and not restricted to an amortization schedule.

## Interest Accrual Methods
Whenever the loan is created and the interest schedule of accruing daily is selected, there is another data point which must be provided. That field is named **Accrual Method**. The three options are:

* 30 / 360
* Actual / 360
* Actual / 365

The difference between the three choices is minor, however, it can result in several dollars to even several thousand dollars in interest paid through the course of the loan. As a result, it is important to be aware of the differences but even more important, to select the one which your contract states it is.

We will work through all three of them with the same example loan information. 

| Data Point   | Value       |
| -----------  | ----------- |
| Financed Amount | $100,000 |
| Interest Rate   | 10%      |
| Payments a Year | 12       |
| Monthly Payment | $877.57  |
| Based on Length | 30 Years |

Additionally, when you see math formulas below, the variables are defined as:

* `A` = Accrued interest
* `P` = Principal Due
* `I` = Interest Rate
* `Y` = Days in the Year (360, 365)
* `M` = Days in the Month (30, 28, 29, 31)
* `D` = Days since Last Payment
* `d` = Daily interest rate

### 30 / 360
The method of 30/360 is the easiest method. It assumes there are 30 days in a month and that there are 360 days in the year. As a result, calculating the accrued interest is very straight forward.

1. Calculate the Daily Interest Rate: $\frac I Y$ Take the interest rate, 10%, and divide it by 360: $\frac {0.1} {360}={0.0277778}\%$
2. Calculate the Accrued Interest: $P*d*D$ Multiply the principal due, \$100,000, by the daily interest rate, 0.0277778\%, by the days since last payment, 30. ${100000}*{0.0277778\%}*30={833.33}$

Using this method, \$833.33 of the first month's payment goes to interest and the remaining $44.24 goes towards principal. Assuming the buyer paid on the due date every month and not later, the buyer would pay $215,925.20 in interest if on a fixed length loan.

### Actual / 360
This method is similar but just different enough to warrant some explanation. Instead of assuming there are 30 days in every month, it takes the actual amount of days in each month to calculate the accrued interest.

1. Calculate the Daily Interest Rate: $\frac I Y$ Take the interest rate, 10%, and divide it by 360: $\frac {0.1} {360}={0.0277778}\%$
2. Calculate the Accrued: $d*M$ Multiply principal due, \$100,000\, by the daily interest rate, 0.0277778\%, by the *actual* number of days in the month, so 31 for January. ${100000}*{0.0277778}\%*{31}={861.11}$

Using this method, \$861.11 of the first month's payment goes to interest and the remaining \$16.46 goes towards principal. Assuming the buyer paid on the due date every month, and there are no leap years (which is false and cause the value to go up), the buyer would pay \$239,409.25 in interest if on a fixed length loan.

### Actual / 365
While very similar to both examples, this method causes the interest rate per day to be slightly lower due to using 365 compared to 360. It is similar to the previous method in that it uses the actual days per month instead of assuming 30 days per month.

1. Calculate the Daily Interest Rate: $\frac I Y$ Take the interest rate, 10%, and divide it by 365: $\frac {0.1} {365}={0.0273972602739726}\%$
2. Calculate the Accrued: $d*M$ Multiply principal due, \$100,000\, by the daily interest rate, 0.0273972602739726\%, by the *actual* number of days in the month, so 31 for January. ${100000}*{0.0273972602739726}\%*{31}={849.32}$

Using this method, \$849.32 of the first month's payment goes to interest and the remaining \$28.26 goes towards principal. Assuming the buyer/borrower paid on the due date every month, and there are no leap years (which is false and cause the value to go up), the buyer would pay $215,489.65 in interest if on a fixed length loan (more if not).

## Daily Interest Calculation
The accrual methods tell us, and anyone else, how to calculate the daily interest based on the remaining principal balance. The examples assumed the buyer/borrower paid on the due date and not one day past then. Since you are on the interest accrues daily, the accrued interest is higher when they pay after the due date. As a result, we use the days since last payment to determine how much interest is accrued in conjunction with the accrual method to determine the daily interest rate.

### Example

The remaining principal balance is \$100,000 with an interest rate of 10% and a monthly payment of \$877.57. The buyer pays their payment 5 days after the due date. The formula for calculating interest due is:

$A=P*\frac I Y*D$

Here is the amount of interest due using the different accrual methods:
* 30 / 360: \$972.22
* Actual / 360: \$972.22
* Actual / 365: \$958.90

## Nightly Loan Integrity Worker
After, or around, midnight central time (coming soon: nightly job in each timezone), there is a nightly job that kicks off to ensure everything is calculated correctly. This includes daily interest due, any late fees and paid off calculations.

## Word of Caution
Please note, Lendiom only facilitates the management of loans, we do not manage them. It is your responsibility to ensure you are in compliance with all laws and clearly disclose how the interest is calculated. Several banks have landed in court but they prevailed since they disclosed how interest was calculated in their contract. [See here for more details](https://www.martindale.com/banking-financial-services/article_Lerch-Early-Brewer-Chartered_1610522.htm).

<!-- ## Interactive Example
TODO: this
<InterestAccrualExample /> -->
