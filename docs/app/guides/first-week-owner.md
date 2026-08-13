---
id: first-week-owner
title: Your First Week as an Owner or Admin
---

Your trial runs 31 days, and most of what you set up in Lendiom takes minutes. Two things do not: the PayArc merchant application and the 10DLC registration behind the communication portal both go to outside reviewers, and neither of them cares how fast you filled the form out. This page is the order to work in so those clocks start early and nothing later blocks on something you skipped.

Each step below says why it sits where it does and points at the article that walks you through it. Work top to bottom.

## The week at a glance

| # | Step | Waits on anyone? |
| --- | --- | --- |
| 1 | Create the organization and finish the wizard | No |
| 2 | Choose your add-ons | No |
| 3 | Set up roles and invite your team | Your team accepting the invite |
| 4 | Apply for a PayArc merchant account | Yes, PayArc reviews it |
| 5 | Register the communication portal | Yes, brand and campaign review |
| 6 | Build your document templates | No |
| 7 | Create your first loan | No |

<!-- screenshot: The left navigation with Org Settings expanded, listing Basic, Billing, Roles, Members, Invoices, Scheduled Reports, Fillable PDFs, Custom Fields, and Import/Export -->

## 1. Create the organization and finish the wizard

Everything else in Lendiom hangs off an organization, so this comes first by necessity. The wizard has three steps — Company Info, Billing Details, Plan Selection — and it is not done until you click **Start Trial** on the last one. An organization that was created but never subscribed is worse than no organization at all: Lendiom refuses to render any page while it is selected and pushes you back into the wizard. Finish all three steps in one sitting.

Read [Setting Up Your Lendiom Business](setting-up-your-business.md) before you start, so you have your mailing address, contact details, and a payment method ready. [The Getting Started Guide](../getting-started.md) covers the sign-up and email verification that come before it.

## 2. Choose your add-ons

Do this second because the next three steps are shaped by what you turned on. Add-ons are per-organization switches in **Org Settings → Billing**, and each one unlocks a set of screens: Deal Analysis, Document Builder, and Document Signing are the ones you can enable yourself. Turning one on adds a line item to the subscription you started in step 1 rather than creating a second one, and the partial period is settled on your next Lendiom invoice.

Deciding now matters for two reasons. The roles you build in step 3 need to cover the features these add-ons unlock — enabling an add-on and using it are separate permissions. And step 6 exists only if you turn on the template add-ons here.

See [Add-Ons](../billing/add-ons.md) for what each one unlocks, what it costs, and which ones Lendiom support has to enable for you.

## 3. Set up roles and invite your team

Everything after this point is work somebody has to be allowed to do. Your new organization comes seeded with three roles — `admin`, `property-manager`, and `viewer` — and whoever created the organization is an admin. Review those before you invite anyone, because a role decides what each person can open, change, and delete, and role names cannot be changed later.

Two access facts change how you sequence the rest of the week. The PayArc application needs **billing update**, and the communication registration needs the wildcard on **communication** — in practice, an admin. Whoever is doing steps 4 and 5 needs to hold those permissions before they start.

Start with [Roles and Permissions](../security/roles-and-permissions.md), then [Adding Users to Your Organization](adding-users-to-your-organization.md) to send the invitations. While your team is accepting them, point them at [Passkey](../security/passkey.md) so their sign-ins are phishing-resistant from day one.

:::caution Read the wildcard section before touching the role matrix

Saving a role's column in the matrix replaces that role's entire permission set with exactly what the matrix sent. The seeded `property-manager` role holds wildcards the matrix cannot express, and it loses them the first time anyone saves that column — silently. The [Roles and Permissions](../security/roles-and-permissions.md) article spells out which areas are affected.

:::

## 4. Apply for a PayArc merchant account

This is the first step with someone else's clock on it, which is why it comes before the parts you can finish alone. Online payments run through PayArc, and until your merchant setup is complete, the online payment fields do not appear on loans, rentals, or invoices at all — the loan wizard shows an informational notice pointing at **PayArc → Merchant Info** instead. Applying takes a document hunt: owner identification, your EIN letter, incorporation details, a voided check, and two years of financials. Gather those before you open the application.

[Onboarding: PayArc](../payment-processing/onboarding-payarc.md) lists every document and the order of the application. [Processor: PayArc](../payment-processing/payarc.md) covers the rates and monthly fees so you know what you are agreeing to. Once you are approved, [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md) explains turning payments on per record and who absorbs the processing fee.

## 5. Register the communication portal

The 10DLC registration is the longest wait in the whole setup, so start it as soon as PayArc is submitted. Registration is three stages — brand, campaign, then buying your number — and each one gates the next. Brand verification can land in seconds or take days; campaign approval runs weeks. Submitting the brand also attaches the Communication Portal add-on to your subscription and bills the one-time brand and campaign registration charges.

It comes after PayArc rather than before because both collect your business's legal information through the same form and save it to the same record on your organization, and because the application in step 4 is the one holding up money movement.

Until the portal setup is complete, Lendiom sends no automated texts or emails on your behalf, and the Communication step of the loan wizard shows a notice instead of the automated communication fields.

| Read this | For |
| --- | --- |
| [Communication Portal](../communication.md) | The full three-stage walkthrough and what each field means |
| [What is a 10DLC Brand?](../communication/what-is-a-brand.md) | Getting your legal name and EIN to match, and avoiding a revetting fee |
| [What is a 10DLC Campaign?](../communication/what-is-a-campaign.md) | What Lendiom submits on your behalf |
| [Why is my Brand or Campaign taking so long?](../communication/registration-timelines.md) | Who reviews it and how long each stage runs |
| [Communication Portal Costs](../billing/communication-portal-costs.md) | Per-month and per-message pricing |
| [Automated Borrower Messages](../communication/automated-messages.md) | Every message the portal will start sending once it is live |

:::info Campaign registration is not self-service right now

Self-service campaign registration is disabled while the reviewing body works through a backlog. Contact [Lendiom Support](mailto:support@lendiom.com) to have your campaign registered — it is handled manually.

:::

## 6. Build your document templates

Templates come before your first loan because they pull their data from loans, rentals, clients, and tracts. Build them now and your first contract comes out of Lendiom already filled in, instead of being typed by hand and re-typed for every loan after it. There are three separate systems, and which ones you have depends on step 2:

| System | Where it lives | What it does |
| --- | --- | --- |
| **Document Builder** | Documents → Builder (Beta) | DOCX templates with dynamic data fields, plus automated generation and mailing on status changes |
| Document Signing | Documents → Signatures | Signature templates and signature requests sent to your clients' entities or your own team |
| Fillable PDFs | Org Settings → Fillable PDFs | An uploaded PDF form whose fields you map to loan, client, or tract data |

Follow the [Document Signing Guide](document-signing.md) to build a signature template and send your first request, and [Adding a Fillable PDF](adding-fillable-pdf.md) to upload a PDF form and map its fields.

## 7. Create your first loan

Last, because it consumes everything above. A loan needs an inventory record and a client to exist first, and its wizard has six steps — What & Who, Terms, How Much, Communication, Escrow, Review. The Communication step is where step 5 pays off, and the online payments question on that same step is where step 4 does.

Set up what a loan points at, then create it:

| Do this first | Article |
| --- | --- |
| Add the property or project | [Adding and Managing Properties](managing-properties.md) |
| Split land into sellable parcels | [Working with Tracts](working-with-tracts.md) |
| Add the buyer and their contacts | [Adding and Managing Clients and Contacts](managing-clients.md) |

Then work through [Creating a Loan](creating-a-loan.md). If the loan already has payment history from before Lendiom, use [Creating a Pre-Existing Loan](creating-a-pre-existing-loan.md) instead and gather the principal paid, interest paid, last paid-in-full payment number, and next due date first.

Every new loan saves as a **Draft**. Review it, then activate it from the loan's [Action Center](../how-it-works/loan-action-center.md). [Loan Status](../how-it-works/loan-status.md) explains what each status allows.

## What can wait until week two

- Moving an existing portfolio over in bulk: [Importing Your Existing Portfolio](data-import.md)
- Learning what each dashboard number counts: [Understanding Your Dashboard](../how-it-works/dashboard.md)
- Setting up recurring reporting: [Reports Library](reports-library.md)

If you get stuck on any step, email [Lendiom Support](mailto:support@lendiom.com) with your organization name.
