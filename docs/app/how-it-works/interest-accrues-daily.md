---
id: interest-accrues-daily
title: Interest Accrues Daily
description: When a loan's interest schedule accrues daily, how does it work? What are the formulas?
---

## Brief Introduction
Prior to Lendiom v0.28.0, interest followed the payment schedule. Now, with the ability to select the loan's interest schedule, the interest and payments can be calculated differently and are not restricted to an amortization schedule.

## Interest Accrual Methods
Whenever the loan is created and the interest schedule of accruing daily is selected, there is another data point which must be provided. That field is named **Accrual Method**. The three options are:

* 30 / 360
* Actual / 360
* Actual / 365

The difference between the three choices is minor; however, it can result in several dollars to even several thousand dollars in interest paid through the course of the loan. It is essential to understand these differences and select the method defined in your contract.

We will work through all three of them with the same example loan information. 

| Data Point         | Value       |
| ------------------ | ----------- |
| Financed Amount    | $100,000    |
| Interest Rate      | 10%         |
| Payments a Year    | 12          |
| Monthly Payment    | $877.57     |
| Loan Length        | 30 Years    |

Additionally, when you see math formulas below, the variables are defined as:

* `A` = Accrued interest
* `P` = Principal Due
* `I` = Interest Rate
* `Y` = Days in the Year (360, 365)
* `M` = Days in the Month (30, 28, 29, 31)
* `D` = Days since Last Payment
* `d` = Daily interest rate

### 30 / 360
The 30/360 method assumes 30 days per month and 360 days per year. As a result, calculating accrued interest is straightforward.

1. **Calculate the Daily Interest Rate:**  
   $d = \frac{I}{Y}$  
   Example: $d = \frac{0.1}{360} = 0.0277778\%$

2. **Calculate the Accrued Interest:**  
   $A = P \cdot d \cdot D$  
   Example: $A = 100,000 \cdot 0.0277778\% \cdot 30 = 833.33$

Using this method, \$833.33 of the first month's payment goes to interest, with \$44.24 applied to the principal. Over the life of the loan, assuming payments are made on time, total interest paid would be \$215,925.20.

### Actual / 360
This method uses the actual number of days in a month but assumes a 360-day year.

1. **Calculate the Daily Interest Rate:**  
   Same as 30/360: $d = \frac{I}{360} = 0.0277778\%$

2. **Calculate the Accrued Interest:**  
   $A = P \cdot d \cdot M$  
   Example: January has 31 days: $A = 100,000 \cdot 0.0277778\% \cdot 31 = 861.11$

Using this method, \$861.11 of the first month's payment goes to interest, with \$16.46 applied to the principal. Total interest paid over 30 years increases to \$239,409.25 (excluding leap years).

### Actual / 365
This method uses the actual number of days in a month and a 365-day year.

1. **Calculate the Daily Interest Rate:**  
   $d = \frac{I}{365}$  
   Example: $d = \frac{0.1}{365} = 0.0273973\%$

2. **Calculate the Accrued Interest:**  
   $A = P \cdot d \cdot M$  
   Example: January has 31 days: $A = 100,000 \cdot 0.0273973\% \cdot 31 = 849.32$

Using this method, \$849.32 of the first month's payment goes to interest, with \$28.26 applied to the principal. Over 30 years, total interest paid is \$215,489.65.

## Daily Interest Calculation
Daily interest is determined by the remaining principal balance and the days since the last payment, applying the appropriate accrual method. 

For example, if the borrower pays 5 days late, the calculation is:  
$A = P \cdot \frac{I}{Y} \cdot D$

Using the earlier example:
- **30/360 and Actual/360:** \$972.22
- **Actual/365:** \$958.90

## Nightly Loan Integrity Worker
A nightly job ensures the loan data is consistent, recalculating daily accrued interest, late fees, and payoff details. Key functions include:

1. **Ensuring Integrity**: Verifies the schedule, interest owed, and any payment updates.
2. **Applying Late Fees**: Late fees are applied if the due date exceeds the grace period.
3. **Handling Edge Cases**: For loans not paid off within 10 years of their original term, safeguards prevent infinite loops in amortization schedules.

### Late Payment Calculation
When payments are late, the system:
- Checks the due date and grace period.
- Applies late fees based on the loan's configuration.
- Updates the loan's status (e.g., **Late**, **Grace Period**).

## Loan Payoff and Escrow Payments
- Escrow payments are added to monthly payments, ensuring accurate schedules.
- Payoff statements calculate the remaining balance, interest, fees, and escrow amounts. Any unpaid interest is adjusted in the final payment.

## Word of Caution
While Lendiom facilitates loan management, compliance with applicable laws remains your responsibility. Ensure contracts explicitly define interest calculations to avoid legal disputes. [Read more here.](https://www.martindale.com/banking-financial-services/article_Lerch-Early-Brewer-Chartered_1610522.htm)

<!-- ## Interactive Example
TODO: Add this
<InterestAccrualExample /> -->
