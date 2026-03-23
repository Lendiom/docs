---
id: what-is-document-builder
title: What is Document Builder?
---

Document Builder is a DOCX template editor built into Lendiom that lets you create reusable document templates containing dynamic data fields. When you generate a document from a template, those fields are automatically replaced with real data from your loans, clients, tracts, and organization, producing a ready-to-send document in seconds.

:::note Beta Feature

Document Builder is currently in beta. You may encounter bugs or unexpected behavior while we continue to develop and refine the feature. Please report any issues to [support@lendiom.com](mailto:support@lendiom.com).

:::

## Key Concepts

### Templates

A template is a DOCX document that serves as the blueprint for generated documents. You create templates using the built-in editor (or by uploading an existing `.docx` file) and embed template variables wherever you want dynamic data to appear.

### Template Types

Every template has a type that determines which data fields are available. The available types are:

- **General** - Only includes User, Organization, and Date fields. Useful for documents that do not reference a specific loan or client.
- **Cash Loan** - Includes Loan, Client, User, Organization, and Date fields.
- **Tract Loan** - Includes Inventory, Tracts Info, Loan, Client, User, Organization, and Date fields.
- **Client** - Includes Client, User, Organization, and Date fields.
- **Tract** - Includes Inventory, Tract, User, Organization, and Date fields.

### Template Variables

Template variables are placeholders written in the format `{{category.field}}` (for example, `{{client.primaryEntity.fullName}}` or `{{loan.daysLate}}`). When a document is generated, each variable is replaced with the corresponding real data.

### Default Signing User

Templates can include `user.*` variables (e.g., `{{user.fullName}}`) to insert the name and contact information of the person sending the document. When you generate a document manually, these variables are filled with your own information. However, when documents are generated automatically via [Document Automation](./document-automation-loans), there is no logged-in user.

To handle this, you can configure a **Default Signing User** from the Document Builder page under **Settings > Default Signing User**. This is the team member whose information will populate `user.*` variables in any automatically generated document. If no default signing user is configured, user variables will be left blank in automated documents.

### Status

Templates have a lifecycle with two primary statuses:

- **Draft** - The template is still being edited. You can change the name, description, and type while in this status.
- **Active** - The template has been published and is available for generating documents, sending notices, and use in document automation rules.

## Use Cases

- **Late Payment Notices** - Generate and mail personalized late notices that include the borrower's name, amount due, days late, and your organization's contact information.
- **Default Notices** - Produce formal default or in-default letters populated with loan terms and balances.
- **General Correspondence** - Create any recurring letter or notice that benefits from pre-filled data fields.
- **Document Automation** - Pair templates with automation rules so that notices are generated and mailed automatically when a loan's status changes (e.g., moves to Late or In Default).

## Pricing

Document Builder is a paid addon that costs **$10 per month**. You can enable it from **Settings > Billing > Addons**.

## Next Steps

- [Creating a Document Template](./creating-a-document-template) - Step-by-step guide to building your first template.
- [Setting Up Document Automation for Loans](./document-automation-loans) - Automatically generate and mail documents when loan statuses change.
- [Sending Notices from Document Templates](./sending-notices-from-templates) - Manually send physical mail notices from your templates.
