---
id: stripe
title: "Processor: Stripe"
description: Information about the previous integration with Stripe
---

## Introduction
Since the introduction of payment processing inside of Lendiom we opted to use Stripe due to the relative low effort lift to integrate with them. However, beginning in Q4 of 2023 and fully going in force in Q1 of 2024, Stripe is no longer accepting new Lendiom merchants (customers). Additionally, existing customers are facing new requirements in order to keep processing payments with them. Moving forward, we are encouraging all of our customers to make the switch to PayArc.

## Fees
* Card fees: 3.5% plus 30 cents
* ACH fees: 1.4%

## Migrating Away
Migrating away from Stripe is relatively easy but it does take time.

1. Request a PAN data export from Stripe ([see here for details](https://stripe.com/docs/payments/account/data-migrations/pan-export))
  * Stripe will ask you some questions, here are the answers:
    * Type of data migration:
    > Export data out of Stripe to a third party  
    * Processor export data to:
    > PayArc  
    * Payment types:
    > Cards and ACH  
    * File format:
    > CSV  
    * Full or subset:
    > Full  
    * Any other information:
    > GPG public encryption key is located here: `https://docs.payarc.net/?version=latest#c148d0b8-99ef-4da1-8d4f-99acfa67c9c3`
2. Onboard with [PayArc](onboarding-payarc)
3. Wait for Stripe to email you asking you to confirm you'd like to export Stripe data. Respond that yes you do want to.
4. Stripe will ask you to confirm details about migrating data from them, do so.
5. Stripe will send you an email with an encrypted message. Forward it to `support@payarc.com` and cc `bradley@lendiom.com`
