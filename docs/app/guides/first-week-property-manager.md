---
id: first-week-property-manager
title: Your First Week as a Property Manager
---

This is the rental side of Lendiom in the order the software expects it. Each record hangs off the one before it: a lease cannot exist without a property, a property cannot hold units until it is the right category, and a balance cannot be right until the transactions under it are right. Work the route top to bottom and you will not have to unpick anything later.

Every step below is a short explanation of why it comes where it does, plus the article that covers it in full. Read the linked article before you do the step on a live record — several of these choices cannot be changed afterward.

:::tip Who this is for
Managing leases: houses, duplexes, apartment complexes. If you are selling land or houses with owner financing, that is the lending route and it starts from the same inventory record. Steps 1, 2, and 7 apply to you as well.
:::

## The route

| # | Step | Article |
| --- | --- | --- |
| 0 | Organization, roles, clients | Setup, below |
| 1 | Inventory and property categories | [Adding and Managing Properties](./managing-properties.md) |
| 2 | Tracts (land only) | [Working with Tracts](./working-with-tracts.md) |
| 3 | Units (multifamily only) | [Units on a Multifamily Property](./units-on-multifamily.md) |
| 4 | Creating a rental | [Creating a Rental](./creating-a-rental.md) |
| 5 | Rental transactions and fees | [Recording Rental Transactions](./recording-rental-transactions.md) |
| 6 | How rental balances are calculated | [How Rental Balances Are Calculated](../how-it-works/rental-balances.md) |
| 7 | Property tax | [Property Taxes](./property-taxes.md) |
| 8 | Ending a lease | [Ending a Lease](./ending-a-lease.md) |

## Step 0: Before you add anything

Three things gate the rest of the week.

**Your organization.** Everything — inventory, clients, rentals, documents — belongs to an organization, and the wizard that creates one also records your terms acceptance, billing customer, and payment method. See [Setting Up Your Lendiom Business](./setting-up-your-business.md). If you are brand new to the product, [the Getting Started Guide](../getting-started.md) is the shorter orientation.

**Roles.** Every person holds exactly one role, and that role decides what they can open and change. The rental route touches the `rental`, `rental::transactions`, `inventory`, and `unit` features. Get this right before you invite anyone: see [Roles and Permissions](../security/roles-and-permissions.md).

**Clients.** A rental points at a client that already exists — Lendiom looks the client up while creating the lease and refuses if it is not there. Enter your tenants first, with a primary entity and a working phone number, per [Adding and Managing Clients and Contacts](./managing-clients.md).

The Rentals area itself is an add-on. It is enabled for every organization and has no self-service switch; [Add-Ons](../billing/add-ons.md) explains what it covers and what disappears without it.

## Step 1: Inventory and property categories

The inventory record is the anchor for everything else, and its **category** decides what you are allowed to do next. Land takes tracts. Residential is rented as a whole. Multifamily takes units. The **type** matters just as much: a lease can only be attached to inventory typed **Rental**, and anything else is refused with *"inventory type must be a rental"*.

Get category and type right the first time — they steer the rest of the route.

Full detail, including the fields, the disabled categories, and what editing a record quietly drops: [Adding and Managing Properties](./managing-properties.md).

<!-- screenshot: the Inventory list filtered to rental properties, showing Name, Category, Status, and Type columns with a mix of Residential and Multifamily rows -->

## Step 2: Tracts, on land only

A tract is one sellable parcel inside a land development. Tracts exist only under a land inventory — Lendiom answers *"inventory type must be land to operate on tracts"* anywhere else — and they are what loans and property tax records attach to, not the development as a whole.

Each tract carries its own acreage, status, and a **tax reimbursement eligibility** flag that step 7 reads directly. If you are only managing leases, skip to step 3.

Full detail: [Working with Tracts](./working-with-tracts.md).

## Step 3: Units, on multifamily only

On a multifamily property the lease attaches to a specific unit, not to the building, so the units have to exist before the lease does. The unit also has to be **Available** — attaching a rental to a unit in any other status is rejected.

Creating the lease then flips that unit to **Rented** and records the tenant on it. On a residential property there are no units: the lease attaches to the property itself, which moves to **Rented** and takes the lease payment as its rent figure.

Full detail: [Units on a Multifamily Property](./units-on-multifamily.md).

## Step 4: Creating the rental

The lease record is where the money rules are set, and most of them are set once. Rent is monthly — Lendiom stores every rental as a monthly frequency. A **First Payment Date** is required and becomes the anchor for every calculation in step 6. Exactly one late fee tier is required, even if you intend to apply late fees by hand.

Full detail: [Creating a Rental](./creating-a-rental.md).

The charges configured alongside rent — the late fee tier, the security deposit, recurring fees — each behave differently after the lease is live. Read [Rental Late Fees, Recurring Fees and Deposits](../how-it-works/rental-fees.md) **before** the creation wizard, not after.

:::warning Do not add recurring fees to a lease you intend to collect on
A recurring fee is added to the rental's balance on every charge date and is included in Total Due, but no transaction type pays one down and no screen removes one. Total Due climbs every month, indefinitely. Charge repeating amounts as an **Other Fee** transaction each period instead.
:::

:::tip Create it as a Draft while you catch up on history
The nightly job leaves Draft rentals alone — no status changes, no due-date rolls, no late fees — so you can back-enter existing transactions before making the lease active.
:::

## Step 5: Rental transactions and fees

Every exchange of money is a transaction. Seven types exist and only three of them move a balance: **Regular Payment**, **Late Fee**, and **Other Fee**. The other four are saved to history and change nothing a tenant owes. On the two fee types, a negative amount charges the tenant and a positive amount pays the charge down.

Full detail on each type, how a payment splits between late fees and rent, and what you can change after saving: [Recording Rental Transactions](./recording-rental-transactions.md). For late fee tiers generally, see [Late Fees](../how-it-works/late-fees.md); for money you are holding from a reversed online payment, see [Unapplied Payments](../how-it-works/unapplied-payments.md).

## Step 6: How the balance is calculated

Read this one even if you skip the others. A rental's **Balance Due** is not a running figure you adjust — it is derived. A job named **Rental Data Integrity** runs every night at 00:45 US Central, counts one full rent payment for every due date reached since the First Payment Date, subtracts what has been applied to the balance, floors the result at zero, and overwrites whatever was there.

That is why an opening balance typed into the wizard does not survive the night, why prepayments need no special handling, and why the balance never shows as negative.

Full detail: [How Rental Balances Are Calculated](../how-it-works/rental-balances.md).

## Step 7: Property tax

Property tax in Lendiom is reimbursement on a land development you are financing: one record per year per development, split across the tracts flagged eligible, with each tract's share landing on that tract's loan as **Property Tax Due** when you finalize. It is not part of a rental balance.

Build the record with [Property Taxes](./property-taxes.md), then work the collection year with [Collecting Property Tax After You Finalize](./collecting-property-tax.md). Pure rental portfolios can skip this step entirely.

## Step 8: Ending a lease

A rental does not stop on its own. The lease length you entered is recorded and displayed, and nothing acts on it — rent keeps accruing one payment per month from the First Payment Date until you change the status yourself.

Settle the money **first**, then change the status. Ending a lease freezes the balance; it does not clear it.

Full detail on which status actually releases the property, what happens to the deposit, and when to delete instead of end: [Ending a Lease](./ending-a-lease.md).

## After the first week

- Take rent online: [Setting Up Online Payments](../payment-processing/setting-up-online-payments.md), then [Automatic Payments](../how-it-works/automatic-payments.md) to let tenants schedule their own drafts.
- Know what your tenants are receiving without anyone clicking send: [Automated Borrower Messages](../communication/automated-messages.md).
- Pull the numbers back out: [The Reports Library](./reports-library.md).
