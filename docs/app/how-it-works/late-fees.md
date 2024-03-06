---
id: late-fees
title: Late Fees
description: How do late fees and tiers work?
author: Bradley Hilton
---

## Introduction
Late fees in Lendiom have previously been simple and straightforward, without a lot of flexibility. With Lendiom v0.36.0, the system has evolved to accommodate more complex scenarios. This article outlines how late fee tiers work within Lendiom.

:::info

Rentals currently only have support for one late fee tier. 

:::

## Tiers
A late fee tier can be considered a single charge for being late, without considering any other late fee tiers. Each tier is set up separately and isn't affected by any other late fee tiers.

## Tier Definition
Each tier has the following baseline configuration options:

* Days: the amount of days after the due date when this late fee tier is applied
* Application: how the late fee is applied (principal, next payment, balance)
* Charge Type: the formula for calculating the late fee (fixed or percentage)

### Days
The value of the days is like a grace period. Therefore, if buyers have a 10-day grace period before being charged a late fee, then the late fee is charged starting from the 11th day of the month, provided the due date is the 1st of the month. The 10-day grace period implies that the due date is not included in the calculation of the late fee. In other words, the late fee is charged exclusively starting from the 11th day of the month, which means the 1st day of the month is not part of the late fee period.

### Application
The application value tells Lendiom how to apply the late fee. Currently, there are three options (two on rentals):

* First Part of Next Payment: the late fee is took out first of the next payment
* Added to Late Fee Balance: the late fee is added to the flex late fee balance and is never automatically paid
* Added to Principal: the late fee is appended to the remaining principal balance (*note:* this only works on loans)

:::tip

If your contract states that the late fee will be paid first out of the next payment that comes in, then select the **First Part of Next Payment**. Payments which come in with this selected with result in a payment allocation as follows:

1. Late Fee
2. Interest
3. Principal

:::

### Charge Type
The charge type instructs Lendiom how much to charge for the late fee. At the moment, there are three options:

* Fixed: the amount is fixed and doesn't change
* Percentage: the amount is based on the balance due, with support for a min and max amount

#### Fixed
A preset value that does change. The only value required for fixed charge type is the amount to charge for being late.

#### Percentage
Lendiom will take their balance due and multiply it by the percentage provided. If the result is less than the minimum amount, then Lendiom will charge the configured minimum amount. If the result is more than the configured maximum amount, the Lendiom will charge the maximum amount. Three fields are required when using percentage:

* Percent (ex: 4%)
* Minimum (ex: $10)
* Maximum (ex: $50)

That's it! With these three pieces of information, Lendiom will charge the appropriate late fee amount based on the balance due. And don't worry, Lendiom rounds up to the nearest cent, so you won't have to worry about any weird fractional amounts.

## Late Fee Balances
With the introduction of late fee tiers, a new late fee balance was introduced `Flex Late Fees`. This late fee balance will hold any late fees accrued from tiers which have the application `Late Fee Balance`. With this introduction, there are now two different late fee balances:

* `Late Fee Balance` contains the amount of late fees which get paid automatically
* `Flex Late Fee Balance` contains the amount of late fees which never get automatically paid

When making a payment and at least one tier contains the `First Part of Next Payment` application, the late fee balance will be took out first. The only way to bring the `Flex Late Fee` balance down is to manually record a positive late fee payment.

## Updating Late Fee Tiers
During the course of the life of a loan, generally the late fee configuration stays the same. If you ever want to update a late fee configuration, and tiers, you absolutely can! However, the number of tiers must at least stay the same. Meaning, you can not remove a tier but you can add a tier.

Why? Because when making a payment, or when a payment is late, we associate the late fee tier applied to the payment so that if, or when, the payment is reversed then the proper late fee tier is also reversed.
