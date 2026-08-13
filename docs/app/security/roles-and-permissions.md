---
id: roles-and-permissions
title: Roles and Permissions
---

Every person in your organization holds exactly one role, and that role decides what they can open, change, and delete. This page covers how those decisions are made, what the seeded roles allow, and how to build your own without quietly taking access away.

## How a permission is built

A permission is two parts: a **feature** and an **action**.

- The **feature** is the area being touched, such as `loan`, `client::notes`, or `billing`. Features with `::` in the name are sub-areas — `loan::transactions` is separate from `loan` itself.
- The **action** is one of `create`, `read`, `update`, or `delete`.

A role is a list of those pairs. When someone clicks a button, Lendiom checks whether their role holds the exact feature and action that button needs. A role with `loan read` but not `loan update` can open a loan and see everything on it, and cannot change a single field.

Every role is given `organization read` automatically, both when it is created and every time it is saved, so no role can be locked out of the organization itself.

![The Role Matrix in Org Settings, with a row per permission and a column per role](/img/docs/app/security/roles-and-permissions/01.png)

## The roles you start with

Every new organization is seeded with three roles. The person who creates the organization is assigned **admin**.

| Role | What it holds | In practice |
| --- | --- | --- |
| `admin` | The wildcard: every action on every feature | Full access. The only role that reaches billing, backups, the custom site, and the other areas described under [the wildcard trap](#the-wildcard-trap). |
| `property-manager` | All four actions on the day-to-day features: clients, entities, files, inventory, property tax, deal analysis, tracts, units, loans, transactions, escrow, rentals, notes, communication, document templates, and document signature | Runs the book of business. Cannot see Members, Roles, Billing, Invoices, imports, unapplied payments, client tax IDs, or Document Builder. |
| `viewer` | `read` only, on that same list of features | Look, do not touch. Every create, update, and delete control is disabled or hidden. |

:::info
Role names are normalized: they are lowercased and spaces become dashes. "Front Office" is stored as `front-office` and shown in the matrix as "front office".
:::

## Permissions quick reference

| Feature | What it gates | What disappears without it |
| --- | --- | --- |
| `organization` | Profile, legal, preferences, scheduled reports, custom fields, document automation config | `read` is always granted. Without `update`: Basic Settings is read-only, Scheduled Reports shows 403 |
| `member` | Invitations, role changes, member removal, role editing | The Members and Roles tabs both show 403 |
| `billing` | Subscription, payment methods, add-ons, organization invoices, PayArc onboarding, custom site | Billing and Invoices tabs show 403. Needs the wildcard — see below |
| `setting` | Document templates administration, fillable PDFs, organization backups | Fillable PDFs shows 403; backups are unreachable |
| `client` | Client records and statuses, client communication preferences | Clients shows 403; the dashboard Change Requests tab is blocked |
| `client::entities` | People and companies attached to a client | Entities cannot be listed or added |
| `client::secrets` | Revealing a stored SSN or EIN on an entity | The reveal control is hidden entirely |
| `client::files`, `client::notes`, `client::timeline` | Those sections of a client | Each refuses to load |
| `file` | The organization-wide Files page | The page shows 403 |
| `inventory` | Properties and projects, descriptions, addresses | Inventory shows 403 |
| `inventory::files`, `inventory::notes` | Files and notes on a property | Each refuses to load |
| `inventory::propertyTax` | Property tax records and the dashboard Taxes tab | Both are blocked |
| `inventory::dealAnalysis` | Development costs, development loans, profitability projections | The deal analysis controls are disabled |
| `tract` | Tracts: label, cost, acreage, sold status, owners | Tracts cannot be opened or edited |
| `tract::files`, `tract::notes`, `tract::timeline` | Those sections of a tract | Each refuses to load |
| `unit` | Units on multifamily and residential inventory | Units cannot be listed or created |
| `loan` | Loans, the dashboard Late tab, and the late fee, defaulting, communication, and minimum payment preferences | Loans shows 403; preference screens reject saves |
| `loan::transactions` | Recording, charging, reversing, and waiving on a loan | New Transaction and charge controls are disabled |
| `loan::escrow` | Escrow accounts and escrow transactions | The escrow section is blocked |
| `loan::notes`, `loan::files` | Notes and files on a loan | Each refuses to load |
| `rental` | Rentals and rental preferences | Rentals shows 403 |
| `rental::transactions`, `rental::notes`, `rental::files` | Those sections of a rental | Each is blocked |
| `invoice` | Invoices and the default tax rate preference | Invoices shows 403 |
| `unapplied-payment` | Unapplied payments and applying a held payment | The page shows 403 |
| `communication` | The [communication portal](../communication.md): conversations, messages, files, calls | Communication shows 403; number registration needs the wildcard |
| `document::templates` | Templates behind signature requests | No matrix row exists for this feature |
| `document::signature` | Creating, sending, reminding, extending, and deleting [signature requests](../guides/document-signing.md) | No matrix row exists for this feature |
| `document::builders` | Document Builder templates, generation, and sending | No matrix row exists for this feature |
| `data-import` | Running, resuming, and reverting a data import | The import half of Import/Export shows 403 |

## Creating a custom role

1. Go to **Org Settings → Roles**.
2. Click **New Role**.
3. Enter a **Name**.
4. Open **Access Selection** and check what you want. The tree groups every action under its feature, so you can take a whole feature or pick individual actions.
5. Click **Create**.

The role appears as a column in the matrix and becomes selectable when you [invite someone](../guides/adding-users-to-your-organization.md) or change a member's role. If the name is taken, Lendiom tells you to edit the existing role instead. Names cannot be changed later — saving under a new name creates a second role.

![The New Role modal with the access selection tree](/img/docs/app/security/roles-and-permissions/02.png)

## Editing a role in the matrix

The **Roles** tab is a grid: permissions down the left, one column per role. Check or uncheck boxes in a role's column, then click the **Save** button in that column's header. Each role saves independently.

The `admin` column has no Save button and its checkboxes are disabled. Lendiom refuses to update the admin role at all — it is the only role guaranteed to reach everything. The `organization` feature only has an "update" row, because read is granted to every role.

<!-- screenshot: the Role Matrix with the property manager column mid-edit, several checkboxes changed and the Save button in that column header showing a loading state -->

## The wildcard trap

Saving a role through the matrix **replaces that role's entire permission set** with exactly what the matrix sent. Anything the matrix cannot express is dropped.

Two things it cannot express:

**The "everything" action.** Four areas are gated on the wildcard action instead of `create`, `read`, `update`, or `delete`. The matrix only produces the four named actions, so those areas fall out: organization billing and invoices (`billing`), the custom Site (`billing`), organization backups (`setting`), and communication phone number registration (`communication`).

**Three features with no matrix row.** `document::templates`, `document::signature`, and `document::builders` are enforced by the server but appear nowhere in the matrix or the New Role tree.

:::warning
The seeded `property-manager` role holds the wildcard on communication, document templates, and document signature. The first time anyone saves that column — even after changing one unrelated checkbox — it loses phone number registration, document templates, and signature requests. The change is silent: the boxes still look checked, because a wildcard is displayed as all four actions checked.
:::

Billing produces a confusing half-state. The Billing and Invoices tabs open for anyone with `billing read`, but the data behind them needs the wildcard, so the tabs load and then fail. Anyone who needs billing needs the `admin` role.

If a role has already lost access this way, contact [Lendiom Support](mailto:support@lendiom.com) — a wildcard cannot be restored from the matrix.

<!-- screenshot: the Role Matrix scrolled to the communication rows, all four communication checkboxes checked on the property manager column, illustrating that a wildcard renders identically to four separate actions -->

## Roles cannot be deleted

There is no delete control and no way to remove a role once it exists. To retire one, uncheck every box in its column, save, and move anyone still assigned onto a different role. It keeps `organization read` regardless, so it stays in the matrix and the role picker.

## What someone sees when they lack a permission

Access is blocked in one of three ways.

- **An access-denied screen.** Whole pages and settings tabs show a 403 result: "Sorry, you are not authorized to access this page," followed by the exact action and feature that is missing, plus a **Back Home** button. Read the feature name off that screen — it is the permission to grant.
- **A disabled control.** Buttons stay visible but greyed out. Hovering one opens a "No Permission" popover naming the action and feature.
- **Nothing at all.** A few controls are removed rather than disabled, such as the tax ID reveal on an entity.

The left navigation is not filtered by role: menu entries stay visible and the 403 appears once the page opens, so a missing entry usually means an add-on is off rather than a permission problem. Requests blocked at the server return a `403` with error code `74` — see [Error Messages in Lendiom](../how-it-works/error-messages.md).

:::caution
Lendiom loads permissions when someone signs in and caches them for the session. After you change a role, that person keeps their old access until they reload Lendiom. If a fix does not seem to work, have them refresh or sign out and back in before you keep editing.
:::

<!-- screenshot: the 403 access-denied screen inside the app, with the subtitle naming a missing "update" permission on the "loan" feature and a Back Home button -->

## Removal and role-change blockers

Three things Lendiom will not let you do, no matter your role:

| Blocker | What happens | How to get past it |
| --- | --- | --- |
| Changing your own role | **Edit** is disabled on your own row, and the server rejects the request with "you can not update your own role" | Have another admin change it for you |
| Removing the last member | **Remove** is disabled when one member is left; the server rejects it with "can not remove the last member of an organization" | Invite the replacement first, then remove the person leaving |
| Removing the Document Builder default signing user | The removal is rejected: that person is set as the default signing user for document automation | Change the default signing user in Document Builder settings, then remove them |

Removing someone sends them an in-app notification naming who removed them. They can be invited back at any time.

## When an employee reports a 403

1. Have them read the feature and action off the access-denied screen, or hover the disabled button and read the popover.
2. Open **Org Settings → Roles** and confirm that row is checked in their role's column.
3. If it is checked and they still cannot get in, have them reload Lendiom — their session is holding cached permissions.
4. If the area is billing, backups, the custom site, number registration, document templates, signature requests, or Document Builder, the matrix cannot grant it. Move them to `admin` or contact support.
5. Confirm the feature is not an add-on that is switched off under **Org Settings → Billing → Add-ons**.
