---
id: late-fees
title: Late Fees
description: How do late fees and tiers work?
author: Bradley Hilton
---

## Introduction
Late fees in Lendiom have evolved to handle more complex scenarios with the introduction of **late fee tiers** in Lendiom v0.36.0. This article explains how late fees are calculated, applied, and managed, including advanced features such as multiple tiers, grace periods, and flexible balances.

:::info
Currently, rentals only support a single late fee tier.
:::

## Late Fee Tiers
A late fee tier defines a specific charge for being late, independent of other tiers. Each tier operates on its own logic and is configured individually.

### Tier Configuration
Each tier has the following configurable options:
- **Days**: The number of days after the due date when this late fee tier is applied.
- **Application**: How the late fee is applied (e.g., to principal, balance, or next payment).
- **Charge Type**: How the late fee is calculated (e.g., fixed or percentage).
- **Fixed and Percentage Amounts**: Includes optional minimum and maximum limits for percentage-based fees.

### Additional Tier Controls
- **Disabled**: When enabled, late fees will not be applied to any payments.
- **Tier Added Date**: Tracks when a new tier is introduced, ensuring it does not retroactively affect previous payments.

### Days (Grace Period)
The `Days` value defines the grace period for each tier. For example:
- If the due date is the 1st of the month and the grace period is 10 days, the late fee applies starting on the 11th.
- Grace periods only include calendar days, not the due date itself.

### Application
Defines how the late fee is applied:
1. **First Part of Next Payment**:
   - The late fee is deducted first from the next payment made.
   - Payments are allocated in the following order: Late Fee → Interest → Principal.
2. **Added to Late Fee Balance**:
   - Late fees are added to the `Flex Late Fee Balance` and never deducted automatically.
3. **Added to Principal**:
   - Late fees are appended to the remaining principal balance (available for loans only).

### Charge Type
Determines how the late fee amount is calculated:
- **Fixed**: A preset amount that remains constant.
- **Percentage**: A percentage of the balance due, with minimum and maximum values.

#### Example: Percentage Late Fee
- Percent: 4%
- Minimum: $10
- Maximum: $50

If the balance due is $800:
- Fee = $800 × 4% = $32 (between the min/max range).

If the balance due is $200:
- Fee = $200 × 4% = $8 (below the minimum, so the fee is $10).

## Late Fee Balances
Lendiom uses two types of late fee balances:
1. **Late Fee Balance**:
   - Contains fees deducted automatically with payments.
   - Cleared as part of the regular payment process when the application is "First Part of Next Payment."
2. **Flex Late Fee Balance**:
   - Contains fees that are manually managed.
   - Requires explicit user actions to clear, such as recording a late fee payment.

## Applying Late Fees
Late fees are applied using the following logic:
1. **Status Check**: Late fees are only applied to loans with active statuses. Loans or Rentals in `Draft` mode are excluded.
2. **Grace Period Enforcement**: A late fee is applied only after the grace period has elapsed.
3. **Transaction Association**: Each late fee is tied to a specific transaction for accurate reversals.
4. **Duplicate Prevention**: The system prevents the same tier from being applied multiple times for the same grace period. However, if recording late fees manually, it is possible to create duplicate late fees.

:::tip
If a payment is made after a late fee has already been applied, the late fee will remain tied to the original transaction. This ensures integrity when reversing payments or recalculating late fees.
:::

### Example
- Due Date: January 1st.
- Grace Period: 10 days.
- Payment Made: January 15th.
- Late Fee Application: 
  - Grace period ends January 11th.
  - A late fee is applied on January 12th.

---

## Updating Late Fee Tiers
Late fee tiers can be updated during a loan's or rental's lifecycle, but with the following restrictions:
1. **No Tier Removal**: Tiers cannot be removed once applied to payments. This ensures integrity for existing transactions.
2. **Adding New Tiers**: New tiers can be added at any time, but they will only apply to payments due after their addition date (`Tier Added Date`).

:::info
When a tier is updated, all new late fees applied will use the updated configuration. Existing fees tied to prior transactions will remain unchanged.
:::

---

## Grace Period and Multi-Tier Handling
When multiple tiers exist, each tier operates independently:
- **Grace Period Overlap**: If a payment qualifies for multiple tiers (e.g., 10-day and 20-day grace periods), the system applies each tier sequentially as its grace period ends.
- **Tier Independence**: Higher tiers (e.g., Tier 2) do not depend on the conditions of lower tiers (e.g., Tier 1) nor do they replace the lower tiers.

---

## Reversing Late Fees
When payments are reversed, associated late fees are also reversed:
- Fees tied to specific tiers and transactions will be recalculated automatically.
- Reversals respect the original tier logic to ensure accurate balances.

---

## Example Scenarios

### Scenario 1: Single Tier with Fixed Fee
- **Configuration**:
  - Days: 10
  - Application: First Part of Next Payment
  - Charge Type: Fixed ($50)
- **Outcome**:
  - A payment due on January 1st has a $50 late fee created on January 11th and dated January 10th.

### Scenario 2: Multiple Tiers with Percentage Fee
- **Configuration**:
  - Tier 1: Days = 10, Application = Balance, Charge Type = Percentage (4%, Min: $10, Max: $50)
  - Tier 2: Days = 20, Application = Balance, Charge Type = Percentage (5%, Min: $20, Max: $100)
- **Outcome**:
  - Payment due on January 1st incurs:
    - Tier 1 fee on January 11th.
    - Tier 2 fee on January 21st if still unpaid.
