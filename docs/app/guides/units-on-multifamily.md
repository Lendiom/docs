---
id: units-on-multifamily
title: Units on a Multifamily Property
---

A unit is one apartment, condo, or door inside a multifamily inventory. Units only exist on inventory whose category is **Multifamily** — land inventory uses tracts, and residential inventory is rented as a whole with no units at all.

Units are what you attach a rental to. On a residential property the rental attaches to the property itself; on a multifamily property the rental attaches to a specific unit, and that unit carries the market rent, the bed/bath counts, and its own occupancy status.

![A multifamily inventory page, with the address and property details in the header](/img/docs/app/guides/units-on-multifamily/01.png)

## Before you add units

You need a multifamily inventory first. When you create one, Lendiom asks for a **Total Units** count and a **Year Built** before it will save. That count is a description of the building — it is the number shown in the **Units** field in the page header. It is not a count of the unit records you create, and Lendiom never compares the two. You can have a complex declared as 24 units with 3 unit records in it, and nothing will complain.

Adding units requires the `unit` feature permission. Out of the box, `admin` and `property-manager` can create units and `viewer` can only read them. See [Roles and Permissions](../security/roles-and-permissions.md) for how to adjust that.

:::caution The Create Unit button is not permission-aware
Unlike most controls in Lendiom, the **Create Unit** button is shown to everyone who can see the property, including read-only members. A `viewer` can open the drawer and fill in the whole form, and only sees a permission error when they press Save. The block is real — nothing gets created — but the button should not have been offered.
:::

## Adding a unit

1. Open the multifamily inventory from **Inventories**.
2. Find the **Units** card. If no units exist yet, it shows "No units found." with a **Create Unit** button in the middle; otherwise use **Create Unit** in the top-right of the card.
3. Fill in the drawer that slides in from the right.
4. Press **Save**.

The unit appears in the table right away. Units are always listed in order by number, and there is no search box on the card — every unit on the property is in that one table.

<!-- screenshot: the Units card in its empty state, showing "No units found. Create one to start today:" with a blue Create Unit button beneath it -->

<!-- screenshot: the New Unit drawer open over the inventory page, titled "New Unit for: Demo Land Company Apartments", with Number, Status, Market Rent, Tenant, Bedrooms, Bathrooms, and Square Footage filled in -->

## The fields

| Field | Required | What it does |
| --- | --- | --- |
| Number | Yes | The unit's label — letters, numbers, or both (`4B`, `101`, `Cottage 2`). Sorts the table and prefills the rental's name. |
| Status | Yes | The unit's occupancy state. See the table below. |
| Market Rent | Yes | What you expect the unit to rent for. Prefills the payment amount when you create a rental on this unit. |
| Tenant | No | A client search. **Nothing is saved from this field.** |
| Bedrooms | Yes | Whole number. |
| Bathrooms | Yes | Allows one decimal, so `1.5` works. |
| Square Footage | Yes | Whole number. |

:::caution The Tenant field on the drawer does nothing
You can search for and select a client in **Tenant**, and the drawer will accept it, but the value is dropped before the unit is sent to Lendiom. The unit saves without a tenant and you get no warning. The only thing that ever sets a unit's tenant is creating a rental on that unit.
:::

There is no field for a unit-level street address or a description, so the mailing address of an individual unit cannot be recorded against the unit.

## Unit statuses

| Status | How it gets set | How it clears |
| --- | --- | --- |
| Available | Picked when you create the unit; also set automatically when a rental on the unit ends | Creating a rental on the unit |
| Rented | Set automatically when a rental is created on the unit; also pickable by hand | The rental being terminated, marked evicted, or deleted while still a draft |
| Pending | Only by picking it when you create the unit | Nothing clears it — permanently stuck |
| Eviction | Only by picking it when you create the unit | Nothing clears it — permanently stuck |
| Evicted | Only by picking it when you create the unit | Nothing clears it — permanently stuck |
| Late | Only by picking it when you create the unit | Nothing clears it — permanently stuck |

Nothing in Lendiom moves a unit into Pending, Eviction, Evicted, or Late on its own. A rental that goes past due does not make its unit Late, and a rental in eviction does not make its unit Eviction. Only rental creation and rental termination move a unit's status, and they only ever move it between Available and Rented.

:::warning Create every unit as "Available"
A rental can only be attached to a unit whose status is exactly **Available**. All five other statuses — Rented, Pending, Eviction, Evicted, and Late — are rejected when the rental is saved, with the error "unit is not available".

The rental wizard is not much help here. It greys out only the units that already have a rental attached or that are marked Rented, so a unit you created as Pending, Eviction, Evicted, or Late still looks selectable — you get all the way through the wizard and the failure lands on the final save.

Because a unit cannot be edited after it is created (see below), the status can never be changed back either. A unit created as anything other than Available is permanently unrentable. Unless a Lendiom rental already exists for the unit, create it as **Available**.
:::

## How a unit relates to a rental

Rentals need the Rentals add-on enabled on your organization.

On the first step of the rental wizard, choose the multifamily inventory. A **Unit** dropdown then appears and is required. Units that already have a rental attached, or whose status is Rented, are greyed out with a tooltip explaining why.

Selecting a unit prefills two fields for you, both of which you can still change:

- **Label** becomes `<Property name> Unit <number>`.
- **Payment** becomes the unit's Market Rent.

When the rental saves, Lendiom flips the unit to **Rented** and records the rental and the tenant on it. That happens even if the rental was saved as a Draft.

When you set the rental to **Terminated** or **Evicted**, or delete it while it is still a draft, the unit returns to **Available** and the rental link is cleared, freeing the unit for the next rental.

<!-- screenshot: step one of the New Rental wizard, the Unit dropdown open with three options, one greyed out and showing the "Unit is already rented out." tooltip -->

:::caution The old tenant is never removed from the unit
Ending a rental clears the unit's rental link and status, but leaves the previous tenant attached to the unit forever. There is no screen and no control that can remove it. This matters in two places: a mass communication sent to the whole multifamily property still includes that former tenant as a recipient, and the voice assistant still reads them out as the unit's tenant. Check the recipient list before sending a property-wide message on a complex that has had turnover.
:::

Two smaller gaps worth knowing about:

- The **Tenant** column in the Units table always shows a dash, even for a unit with an active rental and a tenant on it. To see who is in a unit, open the rental.
- On the review step of the rental wizard, the unit number is a link. There is no unit detail page in Lendiom, so that link opens a blank page.

![The Units table on a multifamily property, showing each unit with its status and tenant](/img/docs/app/guides/units-on-multifamily/05.png)

## Units cannot be edited or deleted

This is the limitation to plan around: **once a unit is created, nothing about it can be changed, and it cannot be removed.**

There is no edit control. Rows in the Units table show a pointer cursor as though they were clickable, but clicking one does nothing, and there is no edit action anywhere on the card. There is no delete control either, and no way to hide or archive a unit.

The number, market rent, bedroom and bathroom counts, and square footage you enter are the values that unit keeps. A typo in a unit number is permanent, and a market rent that goes up next year cannot be updated — you would set the new rent on the rental itself instead.

:::warning Before you save, check the number and the status
These are the two fields you cannot recover from. A wrong number is visible to anyone reading the unit list and the rental name; a wrong status can make the unit unrentable. The rest of the fields are cosmetic by comparison.
:::

If a unit is wrong, the practical workaround is to create a second, correct unit and leave the bad one alone. It will keep appearing in the Units table and in the rental wizard's dropdown. Contact support if you need one cleaned up.

:::caution Deleting the property does not delete its units
The confirmation for deleting an inventory says all of its content is removed from the platform. Unit records are an exception — they are left behind when the property is deleted, and they become unreachable rather than removed. Deletion is also not blocked by having units, or by those units having active rentals, so nothing stops you from deleting a complex that is still occupied. Terminate the rentals first.
:::
