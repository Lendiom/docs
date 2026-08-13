---
id: add-ons
title: Add-Ons
---

Add-ons are optional features you attach to your organization's existing Lendiom subscription. Each one unlocks a set of screens and actions across the app. When an add-on is off, the screens it powers either disappear from the navigation or show an enable page instead, and the matching API calls are refused.

Your existing data is never deleted when an add-on is turned off. It is put out of reach until the add-on is turned back on.

## Where to Find Your Add-Ons

Add-ons live in **Org Settings → Billing**, in the **Addons** card on the right-hand side of the page, below your payment methods.

<!-- screenshot: The Org Settings Billing tab with the subscription status descriptions and billing address form on the left, and on the right the payment method card above the "Addons" card listing Deal Analysis (Beta), Document Builder, Document Signing, and Custom Website, each with an Enable or Disable button -->

## Who Can Turn an Add-On On or Off

Two different permissions are involved, and they are set per role in **Org Settings → Roles**:

- To see the Billing tab at all, your role needs **billing read**.
- To enable or disable an add-on, your role needs **billing \*** — the "all" action on the Billing feature. Read access alone is not enough; the request is rejected before it reaches your subscription.

Switching one of the self-service add-ons on or off also posts an in-app notification to everyone in your organization whose role holds that add-on's own feature permission, so the rest of your team finds out that the feature appeared or went away.

:::info

Enabling an add-on and *using* it are separate permissions. Someone with **billing \*** can switch on Deal Analysis without being able to open it — that takes **inventory dealAnalysis read**. Plan on granting both.

:::

## The Add-Ons

| Add-on | What it unlocks | Price | Turned on by |
| --- | --- | --- | --- |
| Deal Analysis (Beta) | Per-development cost basis with itemized costs, development loans, profitability projections, the Deal Analysis tab on an inventory record, and the Deal Profitability card on the dashboard | Free while in beta | You, in the Billing tab |
| Document Builder | DOCX templates with dynamic data fields, the template editor, generating and mailing documents from a template, and document automation with its full job history | $10 per month | You, in the Billing tab |
| Document Signing | Uploading documents, building signature templates, and sending and tracking signature requests | $20 per month | You, in the Billing tab |
| Custom Website | A Lendiom-built website whose content updates automatically from your inventory | Not published in the app | Lendiom support |
| Rentals | The Rentals section, rental transactions, rental invoices, rental rows on the dashboard, and rental amounts in expected payments | Included | Lendiom support (already on for every organization) |
| Communication Portal | Billing for the communication portal: your organization's own 10DLC number, conversations, and every automated text and email Lendiom sends | Not published in the app | Lendiom support |

### Deal Analysis (Beta)

Deal Analysis adds a **Deal Analysis** tab to each inventory record, where you track that development's itemized costs and its development loans, and it adds a Deal Profitability card to the dashboard. It also lets you attach a development loan while creating a new inventory record, and it nets scheduled debt service against your expected payments.

Without it, the Deal Analysis tab is not rendered, the dashboard card is hidden, the development loan step is skipped during inventory creation, and the profitability rollup returns nothing. The costs and development loans you already recorded stay in place — nobody can see or change them until the add-on is back on.

The related permission is **inventory dealAnalysis**, with separate read, create, update, and delete actions.

<!-- screenshot: An inventory record page with the tab bar showing "Tracts" and "Deal Analysis" with a purple Beta tag, the Deal Analysis panel open below it showing itemized development costs and a development loans section -->

### Document Builder

Document Builder is the DOCX template system: you create templates with dynamic data fields, edit them in the drag-and-drop editor, and generate finished documents from loan, rental, client, or tract data. It is also the engine behind document automation — mailing documents automatically on status changes, late-fee tiers, and payment reminders — along with the audit trail of every send, skip, and failure.

Without it, the Document Builder page and the Document Automation history page both show an enable screen, the template pickers on loan and rental pages have nothing to offer, and the server refuses to create, edit, upload, preview, duplicate, generate, or send from a template. Existing templates are retained.

The related permission is **document builders**.

<!-- screenshot: The Document Builder page replaced by the enable screen — an info result titled "Document Builder" with the subtitle about DOCX templates with dynamic data fields, three green checkmark bullets, and Enable and "Go to the Dashboard" buttons -->

### Document Signing

Document Signing lets you upload documents, build signature templates, and send signature requests to clients, then track and remind on them. It covers an unlimited number of signatures and templates. For the full workflow, see the [Document Signing guide](../guides/document-signing.md).

Without it, the Documents page shows an enable screen, and creating a document template or a signature request is refused.

The related permission is **document signature**.

### Custom Website

The Custom Website add-on is listed in the Addons card, but its button is disabled — you cannot switch it on yourself. Nothing in the app currently changes based on it. Contact [Lendiom Support](mailto:support@lendiom.com) if you want a website built from your inventory.

### Rentals

Rentals unlocks the Rentals section, rental transactions and invoices, rental rows on the dashboard, rental amounts in your expected payments, and rental-specific document templates. It is enabled for every organization, including new ones, and there is no self-service switch for it in the Billing tab.

Without it, the Rentals page shows a "coming soon" screen, creating a rental is refused, invoices cannot be linked to a rental, and rental figures drop out of the dashboard and expected payments entirely.

The related permissions are **rental**, plus **rental transactions**, **rental notes**, and **rental files** for those sub-areas.

### Communication Portal

The Communication Portal add-on is the billing side of your organization's own 10DLC phone number. Lendiom attaches it to your subscription; you complete the brand and campaign registration yourself on the Communications page. Read the [Communication Portal](../communication.md) page for what registration involves and why it is required.

Until the portal is set up, Lendiom sends no automated texts or emails on your behalf. If the add-on is removed, your messaging setup is marked incomplete and those automated messages stop.

The related permission is **communication**.

## What Happens to Your Subscription

Enabling an add-on does not create a second subscription and does not move your renewal date. Lendiom adds the add-on as a new line item on your live subscription right away, and the partial period between today and your next renewal is prorated. The prorated amount is settled on your next Lendiom invoice, which you can review under **Org Settings → Billing**.

Which price is used depends on your billing interval. If your subscription renews monthly, the monthly add-on price is used; if it renews yearly, the yearly add-on price is used instead. The dollar figures quoted in the app's confirmation dialogs are the monthly ones.

<!-- screenshot: The "Enable Document Builder" confirmation dialog reading "Are you sure you want to enable the document builder? It costs $10 per month." with "Yes, enable!" and Cancel buttons -->

:::caution

Deal Analysis is free while it is in beta, which means it currently adds nothing to your subscription. Once it leaves beta and a price is configured, enabling it will start adding a line item like every other add-on.

:::

## Turning an Add-On Off

Disabling works the same way in reverse: the line item is removed from your subscription and the unused portion of the period is prorated as a credit toward your next invoice. Removal takes effect immediately — the feature is gone as soon as you confirm.

<!-- screenshot: The "Disable Deal Analysis" confirmation dialog warning that recorded costs and development loans are kept but nobody will be able to see or change them until it is enabled again, with a red "Yes, disable" button -->

Each confirmation dialog spells out what you lose. Read it before confirming, particularly for Deal Analysis, where the data stays but becomes invisible to your whole team.

## Add-Ons Lendiom Enables for You

Custom Website, Rentals, and the Communication Portal have no working switch in the app. Lendiom support turns those on. Document Builder is also enabled manually for some customers; when it is, there is no subscription line item behind it, and disabling it later removes the feature without touching your subscription.

If you need one of these, email [Lendiom Support](mailto:support@lendiom.com) from the address on your account and name your organization.

## Troubleshooting

<!-- screenshot: The Roles table under Org Settings with permission rows down the left including "billing *" and "inventory dealAnalysis read", and checkbox columns for each role such as admin, manager, and viewer -->

**The Billing tab is missing.** Your role does not have **billing read**. Ask an admin to grant it under **Org Settings → Roles**.

**The Enable button returns a permission error.** Reading billing is not enough. Your role needs **billing \*** to add or remove an add-on.

**You get a message like "document builder addon is not enabled."** The feature you tried to use is gated by an add-on that is currently off. Check the Addons card, or ask someone with billing access to check it for you.

**The feature is still missing right after you enabled it.** Reload the page so the app picks up your organization's updated add-on state.

**You cannot enable anything.** Add-ons attach to a live subscription. If your subscription is canceled or unpaid, sort that out first — the Billing tab shows your current status and, when the subscription is canceled, a Contact Support button.
