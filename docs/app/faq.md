---
id: faq
title: FAQ
description: Frequently asked questions about Lendiom
---

## Introduction

Welcome to the Lendiom FAQ section! This document provides answers to the most common questions about using Lendiom, including managing inventory, client interactions, financing, payment processing, reporting, and user permissions. 

Whether you're just getting started or looking for specific details about a feature, this FAQ is designed to help you navigate the platform with ease. If you don't find the answer you're looking for, please refer to the detailed documentation or contact our support team.

## Terminology

### Organization
An organization represents a business.

### Inventory
An inventory represents anything you have for sale or rent. Could be a residential house, a multifamily building, raw land, or anything else. Within a land inventory, you have tracts. Within a multifamily building, you have units.

Inventory categories are:
* Land
  > Raw, unimproved property that is split up into tracts.
* Residential House
  > A residential property that has a single family house on it.
* Multifamily
  > A building that has support for multiple families renting it out.

Inventory types are:
* Finance
  > Owner financing the land or residential house
* Rental
  > Renting the residential house or multifamily building
* Other (disabled for now)

### Client
A client represents a buyer or a tenant, at a grouping level. Inside the client you will have individuals, aka entities, that represent each member of the client. If you have a family, then you have one client and multiple entities in that client.

### Loan
A loan (sometimes called Contract) in Lendiom represents a **financing agreement** between a client and an organization. It outlines the terms, payment schedule, interest rates (if applicable), and any penalties for late payments.

### Payment Schedule
A payment schedule defines the frequency and due dates for payments under a contract. It ensures structured loan or rental payment tracking.

### Communication Portal
The Communication Portal is where all **client interactions** (text messages, calls, and emails) are managed. It enables businesses to send automated payment reminders, bulk messages, and respond to client inquiries.

### Lendiom Pay
Lendiom Pay is the **tenant and buyer-facing portal** where clients can:
- View their contracts.
- Make payments via ACH or credit card.
- See past payment history.

## Does Lendiom have automated text, calls and emails?
The short answer is yes to text and emails. Calls are not automated at this point in time. For more information about automated messages, please see the [communication portal](./communication.md) information.

## How do I check the version of Lendiom I am using? {#check-version}
You can check the version of Lendiom you are using by clicking on your name, then clicking on "About". You will see the following screen:

![about lendiom screenshot](../../static/img/docs/app/faq/about-screenshot.png)

## General Usage & Features

### How do I add a new property to my inventory?
You can add a new property by navigating to the Inventory section, selecting the appropriate category (Land, Residential House, Multifamily), and filling out the necessary details. Make sure to specify if it's for financing or rental. See the [getting started guide](./getting-started.md).

### Can I import my existing inventory from another system?
Lendiom currently does not support direct imports, but you can manually add inventory or work with our team for bulk data migration solutions.

### How do I track contract payments inside Lendiom?
Once a client has an active contract, you can monitor their payment history and upcoming dues in the Loan Management section. Automated reminders can also be enabled to notify clients of due dates.

### Can I integrate Lendiom with my accounting software?
Currently, Lendiom does not offer direct integrations with accounting software like QuickBooks or Xero. However, you can export transaction data as a CSV file for manual import.

## Client Management & Communication

### What are these Unknown clients? How do they keep appearing?
Unknown clients are created whenever someone contacts your [communication portal](./communication.md) phone number **and** the phone number they are contacting you from is not saved inside of Lendiom. You can delete them and it will remove the conversation from the [communication portal](./communication.md). Or you can update them if they are a prospective customer of yours.

### How do I convert an unknown client into a saved client?
If an unknown client appears in the system due to a new incoming call or text, you can go to the Clients section and update their details.

### Can I send automated payment reminders to clients?
Yes, Lendiom supports automated text and email reminders for upcoming or late payments. You must enable the [communication portal](./communication.md) first.

### Can I send bulk messages to my clients?
Yes, Lendiom allows you to send bulk SMS updates to your clients from the Communication Portal, provided they have consented to receive such messages.

## Financing & Payment Processing

### How does Lendiom handle delinquent payments?
Lendiom tracks delinquent payments and can send automated reminders. You can also flag accounts for further action, such as repossession tracking.

### Does Lendiom support ACH payments or credit card processing?
Yes, through Lendiom Pay, clients can make ACH or card payments. Transaction fees may apply depending on the payment method used. For more information on enabling online payment processing, please see [Onboarding: PayArc](./payment-processing/onboarding-payarc.md).

### Can I manually record payments made outside of Lendiom?
Yes, you can manually log cash, check, or external bank transfer payments within the Loan Management section to keep records accurate.

## Reporting & Business Insights

### How do I generate reports on loan performance?
Lendiom provides built-in reports that allow you to analyze loan performance, delinquencies, and revenue trends. You can access these in the Reports section.

### How do I export my data from Lendiom?
You can export client data, payment history, and inventory details as CSV files for external use.

## Technical & Security

### How is my data secured in Lendiom?
Lendiom uses encryption for data at rest and in transit, ensuring that sensitive information is protected. Regular backups are performed to prevent data loss (multiple times a day).

### Can multiple users access my Lendiom account?
Yes, Lendiom supports multi-user access with role-based permissions, allowing team members to have different levels of control over data and operations.

### How do I reset my password if I forget it?
You can reset your password by clicking "Forgot Password" on the login screen and following the instructions sent to your email.

## Permissions & Roles

### How does the Lendiom permission system work?
Lendiom uses a **feature-action-based permission system**, where each role has specific permissions assigned to them. A permission consists of:
- **Feature:** What part of the system the user can access (e.g., `inventory`, `loan`, `client`, `communication`).
- **Action:** What they can do within that feature (e.g., `read`, `create`, `update`, `delete`).

Roles define which features and actions a user is allowed to perform. Please note, this permission only applies to Lendiom users. Lendiom Pay users (tenants and buyers) can only access their data via the Lendiom Pay portal.

### What are the default roles in Lendiom?
When an organization is created, **three default roles** are assigned:

1. **Admin**
   - Has **full access** to all features and actions.
2. **Property Manager**
   - Can manage clients, inventory, loans, rentals, documents, and communications.
   - Cannot modify organization-wide settings or billing.
3. **Viewer**
   - Has **read-only access** to most features but cannot make changes.

### Can I create custom roles?
Yes, you can create **custom roles** by defining a set of permissions for specific features and actions.

To create a custom role:
1. Navigate to **Org Settings -> Roles**.
2. Click the **+ New Role** button.
3. Give the new role a name.
4. Select the **features** (e.g., `loan`, `client`, `rental`).
5. Assign the **allowed actions** (`read`, `create`, `update`, `delete`).
6. Save the role.

### How can I limit access for specific users?
You can limit access by:
1. **Assigning a lower-privileged role** (e.g., Viewer).
2. **Creating a custom role** with only the necessary permissions.
3. **Restricting access to certain features** (e.g., allowing a user to manage inventory but not rental transactions).

### What happens if I remove a permission from a role?
If you remove a permission:
- Users with that role will **immediately lose access** to the affected feature or action.
- Any active sessions will **reflect the changes** the next time the user interacts with the system.

### Can I edit or delete the default roles?
- **Admin role** cannot be deleted or modified.
- **Property Manager and Viewer roles** can be modified, but be cautious as this may affect existing users.
- No roles, even custom roles, can be deleted at the present moment.

If the default roles do not fit your needs, it is recommended to **create custom roles** instead.

### What permissions control the information on the dashboard Overview tab?

The information displayed on the **Dashboard Overview tab** is controlled by specific permissions. Below is a breakdown of which permissions are required for each section:

| Card / Component | Required Feature | Required Action |
|------------------|-----------------|----------------|
| **Expected Payments Card** | `LoanTransaction` | `Read` |
| **Active Balances Card** | `LoanTransaction` | `Read` |
| **Upcoming Payments Card** | `Loan` | `Read` |
| **Recent Transactions Card** | `LoanTransaction` | `Read` |
| **Mailings Card** | `ClientEntities` | `Read` |
| **Storage Used Card** | *(No permissions check, always visible)* | N/A |

#### **Explanation of Permissions**
1. Users must have **`LoanTransaction.Read`** permission to see:
   - Expected Payments
   - Active Balances
   - Recent Transactions
2. Users must have **`Loan.Read`** permission to see:
   - Upcoming Payments
3. Users must have **`ClientEntities.Read`** permission to see:
   - Mailings
4. The **Storage Used** card does **not** require any permissions and is always visible.

#### **What Happens If a User Lacks Certain Permissions?**
- If a user **does not have** `LoanTransaction.Read`, they **will not see**:
  - Expected Payments
  - Active Balances
  - Recent Transactions
- If a user **does not have** `Loan.Read`, they **will not see**:
  - Upcoming Payments
- If a user **does not have** `ClientEntities.Read`, they **will not see**:
  - Mailings
- **Storage Used** is **always visible** regardless of permissions.
