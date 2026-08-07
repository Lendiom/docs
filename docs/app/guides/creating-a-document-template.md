---
id: creating-a-document-template
title: Creating a Document Template
---

This guide walks through creating a document template in the Document Builder, using a Tract Loan late payment notice as an example. By the end, you will have a published template ready for generating documents or use with document automation.

:::tip Prerequisites

The Document Builder addon must be enabled for your organization. Everyone can see **Builder (Beta)** under **Documents** in the sidebar, but you will not be able to create or manage templates until the addon is enabled. To enable it, go to **Org Settings > Billing > Addons** and enable the Document Builder addon ($10/month).

:::

## Step 1: Navigate to Document Builder

Expand the **Documents** section in the left sidebar and click **Builder (Beta)**.

![Documents sidebar menu](/img/docs/app/guides/document-builder/documents-menu.png)

You will see the template list page. If this is your first time, the list will be empty.

![Template list page](/img/docs/app/guides/document-builder/template-list.png)

## Step 2: Create a New Template

1. Click the **New Template** button in the top right corner.
2. The **New Document Template** modal will appear.

![New template modal](/img/docs/app/guides/document-builder/new-template-modal.png)

3. Fill in the following fields:
   - **Template Name** - A descriptive name such as "Tract Late Payment Notice".
   - **Description** - A brief explanation of the template's purpose, e.g., "Sent to buyers when their tract loan payment is past due."
   - **Template For** - Select the type that matches the data you need. For this example, choose **Tract Loan**.

![Template type dropdown](/img/docs/app/guides/document-builder/template-type-dropdown.png)

![Filled new template form](/img/docs/app/guides/document-builder/new-template-filled.png)

4. **Starting Document** (optional) - If you have an existing `.docx` file you want to use as a starting point, drag and drop it here. Otherwise, leave this empty to start with a blank document.
5. Click **Create & Open Editor**.

## Step 3: Using the Editor

After creating the template, the editor opens with two main areas:

- **Document Editor** (center) - A full-featured DOCX editor with a toolbar for formatting text, inserting images, tables, hyperlinks, headers, footers, page numbers, and more.
- **Data Fields Sidebar** (left) - Where you browse and insert template variables.

![Blank editor with variable sidebar](/img/docs/app/guides/document-builder/editor-blank.png)

### Writing Your Document

Type your letter content directly in the editor. Use the toolbar to format headings, bold or italic text, set fonts, and adjust alignment just as you would in a word processor.

### Inserting Template Variables

Template variables are the core of Document Builder. They act as placeholders that get replaced with real data when you generate a document.

To insert a variable:

1. Place your cursor in the document where you want the data to appear.
2. In the **Data Fields** sidebar, click the cascader dropdown to browse the available categories.

![Variable picker showing categories](/img/docs/app/guides/document-builder/variable-picker-categories.png)

3. Navigate through the categories to find the specific field you need (e.g., **Client > Primary Entity > Full Name**).
4. Select a **field type** from the dropdown below the cascader:
   - **Text** - Displays the value as-is.
   - **Currency** - Formats the value as `$1,234.56`.
   - **Percentage** - Formats the value as `9.8%`.
   - **Date** - Enables an additional date format selector with the following options:
     - **Formal** - e.g., `May 15th, 2021`
     - **Full** - e.g., `5/15/2021`
     - **Year** - e.g., `2021`
     - **Day** - e.g., `15th`
5. Click **Insert at Cursor**.

The variable will appear in your document in the format `{{category.field}}`. For example, `{{client.primaryEntity.fullName}}`.

### Available Variable Categories

For a **Tract Loan** template, the following categories are available:

| Category | Description | Example Fields |
|----------|-------------|----------------|
| **Inventory** | Information about the land inventory | Name, Type, Status, Address (County, State) |
| **Tracts Info** | Aggregate tract data | Total Acres, Combined Label |
| **Loan** | Loan details, terms, balances, and dates | Label, Status, Sales Price, Financed Amount, Interest Rate, Payment Amount, Principal Balance, Days Late, Next Due Date |
| **Client** | Client and primary entity info | Account Number, Display Name, Full Name, Address |
| **User** | The logged-in user's info | Full Name, Email, Phone Number |
| **Organization** | Your organization's details | Name, Legal Name, Email, Phone, Address |
| **Date** | Dynamic date references | Today, Start/End of Year, Start/End of Month |

:::tip User Variables and Document Automation

When you generate a document manually, `user.*` variables (e.g., `{{user.fullName}}`) are filled with **your** information — the person who clicked Generate. When documents are generated automatically via [Document Automation](./document-automation-loans), these variables are filled with the **Default Signing User** configured in the Document Builder settings. If no default signing user is set, user variables will be blank in automated documents.

To configure this, go to **Documents > Builder > Settings > Default Signing User**.

:::

:::note Other Template Types

Cash Loan templates have the same fields as Tract Loan but without Inventory and Tracts Info. Client templates only include Client, User, Organization, and Date fields. General templates only include User, Organization, and Date fields.

:::

### Fields in Use

As you insert variables, they appear in the **Fields in Use** section below the sidebar. Each field is shown as a tag. You can click the close icon on a tag to remove that variable from both the sidebar list and all occurrences in the document.

![Editor with content and Fields in Use sidebar](/img/docs/app/guides/document-builder/editor-with-content.png)

## Step 4: Saving Your Template

### Manual Save

Click the **Save** button in the top right toolbar at any time. A tooltip displays the last saved timestamp when you hover over the button.

### Auto-Save

The editor automatically saves your work every 30 seconds when there are unsaved changes. You will see an "Auto-saving..." indicator next to the status tag when this occurs.

### Download

Click **Download** to export the current document as a `.docx` file to your computer.

:::caution Unsaved Changes

If you try to navigate away with unsaved changes, the editor will prompt you to confirm. Changes are also protected against accidental browser or tab closure.

:::

## Step 5: Publishing the Template

While in **Draft** status, the template is only available for editing and previewing. To make it available for generating documents, sending notices, and document automation:

1. Click the **Publish** button in the top right toolbar.
2. The editor will save your document and change the template status from **Draft** to **Active**.
3. You will be redirected back to the template list.

:::note Draft vs Active

- **Draft** templates can have their name, description, and type edited by clicking the template name in the editor header. Once published, these details are locked.
- **Active** templates can still be edited in the editor (content and fields), but the name, description, and type cannot be changed.

:::

## Step 6: Generating a Document

You can generate a filled document from any template, whether it is in Draft or Active status:

1. Click the **Generate** button in the editor toolbar (or use the **Preview** action from the template list).
2. In the modal that appears, search for and select the entity to populate the template with. For a Tract Loan template, search by loan label or client name.
3. Click **Generate**.
4. The system will produce a document with all template variables replaced by real data and download it automatically.

## Managing Templates

From the template list page, you can perform additional actions on any template via the **Actions** menu:

- **Edit Document** - Open the template in the editor.
- **Edit Details** - Change the name, description, or type (Draft templates only).
- **Preview** - Generate a filled document.
- **Download** - Download the raw template file.
- **Duplicate** - Create a copy of the template.
- **Delete** - Permanently remove the template and its document.

The list supports searching by name, filtering by type and status, and sorting by name or last updated date.
