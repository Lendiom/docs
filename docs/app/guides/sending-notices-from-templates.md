---
id: sending-notices-from-templates
title: Sending Notices from Document Templates
---

When a loan enters a past-due or default status, Lendiom displays action buttons at the top of the loan page that let you send physical mail notices directly. This guide covers how to use Document Builder templates to send those notices, as an alternative to uploading a PDF.

:::tip When to Use This vs. Document Automation

This guide covers **manual, one-off** notice sending, where you click a button and walk through the process for a single loan. If you want notices to be generated and mailed **automatically** whenever a loan's status changes, see [Setting Up Document Automation for Loans](./document-automation-loans) instead.

:::

## Prerequisites

- The **Document Builder addon** must be enabled ($10/month from **Settings > Billing > Addons**).
- You need at least one **published (Active) template** that matches the loan type. For example, a Tract Loan template for tract loans, or a Cash Loan template for cash loans. General templates are also available for all loan types.

## Notice Types

Depending on the loan's current status, a different notice button appears in the loan header:

| Loan Status | Button Label | Notice Description |
|-------------|-------------|-------------------|
| **Late** | Send Late Notice | A late payment notice to the borrower. |
| **In Default** | Send In-Default Notice | A formal in-default notice to the borrower. |
| **Defaulted** | Send Repossession Notice | A repossession or final default notice to the borrower. |

Each button is a dropdown with two options:

- **From Document Template** - Uses a Document Builder template to generate and mail the notice (covered in this guide).
- **Upload PDF** - Lets you upload your own PDF to mail instead (see [Sending a Physical Letter](./sending-a-letter)).

## Sending a Notice from a Template

### Step 1: Select "From Document Template"

On the loan page, click the notice dropdown button (e.g., **Send Late Notice**) and select **From Document Template**.

### Step 2: Pick a Template

A template picker modal will appear showing all published (Active) templates that match the loan type. Select the template you want to use and click it.

### Step 3: Configure Mail Options

After selecting a template, the **Send Document via Mail** modal opens. Configure the following options:

#### Recipient

Select the recipient from the dropdown. Only entities associated with the client that have a **deliverable address** are selectable. Entities without an address or with an undeliverable address will be shown but disabled.

#### Color and Sides

- **Color** - Toggle between **Black & White** and **Color Pages**. Color printing costs slightly more per page.
- **Single or Double Sided** - Toggle between **Single Sided** and **Double Sided**. Use double-sided for multi-page documents to reduce postage costs.

#### Address Placement

Choose where the recipient's address appears on the document:

- **Top First Page** - The address is printed at the top of the first page, visible through a standard envelope window.
- **Insert Blank Page** - A separate page with the address is inserted before the document. This is automatically selected when using certified or registered mail.

#### Mail Class

- **First Class** - Faster delivery with tracking options.
- **Standard** - More cost-effective for non-urgent mail.

#### Extra Service

Only available when the mail class is **First Class**:

- **None** - No extra service.
- **Certified** - Proof of mailing and delivery tracking.
- **Certified Return Receipt** - Includes a return receipt for proof of delivery.

:::note Automatic Address Placement

When you select an extra service (Certified or Certified Return Receipt), the address placement is automatically changed to **Insert Blank Page** as required by the postal service for certified mail.

:::

### Step 4: Send

Review your selections and click **Send**. The system will:

1. Generate the document from the template, replacing all template variables with the loan's actual data. Any `user.*` variables will be populated with **your** information (the logged-in user who clicked Send).
2. Submit the generated document to the mail service with the configured options.
3. Display a success message once the mail has been queued.

:::note User Variables

When sending manually, `user.*` template variables (e.g., `{{user.fullName}}`) are always populated with your own name and contact information. This is different from [Document Automation](./document-automation-loans), which uses the organization's configured [Default Signing User](./what-is-document-builder#default-signing-user).

:::

You can track the letter's delivery status in the **Client Mail** section of the client's page.

## Pricing

Mailing costs depend on the options you select. Refer to the [Sending a Physical Letter](./sending-a-letter) guide for the full pricing table. The document generation itself has no additional cost beyond the Document Builder addon subscription.

## Common Workflow

A typical manual notice workflow looks like this:

1. A loan becomes **Late** and the system (or you) marks it accordingly.
2. You open the loan and click **Send Late Notice > From Document Template**.
3. You select your "Late Payment Notice" template.
4. You choose the borrower entity, set the mail to First Class with Black & White printing, and click **Send**.
5. If the loan later moves to **In Default**, you repeat the process with the **Send In-Default Notice** button and an "In-Default Notice" template, this time selecting **Certified** as the extra service.

For organizations that send notices frequently, consider setting up [Document Automation](./document-automation-loans) to handle this process automatically.
