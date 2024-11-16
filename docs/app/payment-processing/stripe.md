---
id: stripe
title: "Processor: Stripe"
description: Information about the transition from Stripe to PayArc
---

## Introduction
Lendiom initially partnered with **Stripe** for payment processing due to its ease of integration. However, as of **Q4 2023**, Stripe is no longer accepting new Lendiom merchants. Existing customers are also subject to new requirements to continue processing payments.

To ensure uninterrupted payment processing, we strongly recommend migrating to **PayArc**, our new preferred payment processor.

:::warning
Stripe support will end in **2025**. Please migrate to PayArc as soon as possible to avoid service disruptions.
:::

## Stripe Fees
Stripe charges the following fees for payment processing:
- **Card Transactions**: 3.5% + $0.30 per transaction
- **ACH Transactions**: 1.4%

## Migrating Away from Stripe
Migrating from Stripe to PayArc is straightforward but requires careful coordination. Follow the steps below to ensure a smooth transition.

### Steps to Migrate
1. **Request a PAN Data Export from Stripe**  
   Use Stripe’s [PAN export process](https://stripe.com/docs/payments/account/data-migrations/pan-export) to retrieve your data. When Stripe prompts you for details, respond as follows:
   
   - **Type of Data Migration**:  
     > Export data out of Stripe to a third party
   - **Processor Export Data To**:  
     > PayArc
   - **Payment Types**:  
     > Cards and ACH
   - **File Format**:  
     > CSV
   - **Full or Subset**:  
     > Full
   - **Additional Information**:  
     > GPG public encryption key is located here: [PayArc Public Encryption Key](https://docs.payarc.net/docs/pgp-key)

2. **Onboard with PayArc**  
   Complete the [PayArc onboarding process](onboarding-payarc) to set up your new payment processing account.

3. **Confirm Export with Stripe**  
   - Stripe will email you to confirm your request for a data export. Respond promptly to approve the export.

4. **Provide Stripe Migration Details**  
   - Stripe may request additional confirmation about your data migration. Review and confirm the details they provide.

5. **Send Encrypted Message to PayArc**  
   - Stripe will send an email with an encrypted message containing your data. Forward this email to:
     - **Primary Recipient**: `support@payarc.com`
     - **CC**: `support@lendiom.com`

---

## Need Help?
If you have questions or run into any issues during the migration process:
- Contact Stripe Support via their [Support Portal](https://support.stripe.com/).
- Reach out to [PayArc Support](mailto:support@payarc.com) for assistance with onboarding and data handling.
- For Lendiom-specific concerns, email [support@lendiom.com](mailto:support@lendiom.com).
