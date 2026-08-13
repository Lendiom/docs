---
id: ending-a-lease
title: Ending a Lease
---

A rental in Lendiom does not stop on its own. The **Payment Terms** you entered when [creating the rental](./creating-a-rental) — 12 months, 24 months — are shown on the Overview and Details tabs and are used for nothing else. Rent keeps accruing one payment per month from the First Payment Date forward, indefinitely, until you change the rental's status yourself.

This article covers what actually happens when you end one, what the deposit and early termination fee controls really do, and when to delete a rental instead.

<!-- screenshot: A rental's Overview tab for an active tenancy, showing Payment Amount, Balance Due, Late Fees Due, Other Fees Due, Total Due, Last Payment Date, Next Due Date, and Payment Terms reading "12 months" -->

## The statuses a rental can hold

Status lives in the actions menu at the top right of the rental, under **Status**. Changing it requires Update permission on Rentals.

| Status | What it means to Lendiom |
| --- | --- |
| Draft | Not workable. No rent accrues, no late fees, no status changes. The only status that can be deleted. |
| Current | Active. Rent accrues, late fees apply, the tenant sees it in Lendiom Pay. |
| Late | Active. Set automatically by the nightly job when the grace period passes with a balance owing. |
| Eviction | Active. A label only — rent and late fees keep running exactly as they do on Current. |
| Evicted | Ended. Releases the property and stops everything. |
| Terminated | Intended to end the rental. Does not work from the app today — see below. |

:::caution

**Eviction does not stick.** Because Lendiom treats it as an active status, the nightly job re-evaluates the rental and overwrites it — back to Current if the balance is clear, or to Late if rent is owed. Set it and it will usually be gone by morning. Lendiom has no eviction case tracking; the status is a flag and nothing more.

:::

:::caution

**The Terminated option does nothing.** Choosing **Status → Terminated** on a rental page returns immediately without sending anything to Lendiom. The dialog that was supposed to collect the termination date was never built, and the code that would open it has been commented out since 2023. Nothing saves, nothing errors, and the status tag stays exactly where it was.

The server side of this is real — it would set a Terminated Date, release the property, and lock the rental permanently — but it rejects any request without a termination date, and the app never sends one. So there is no way to reach it from the Lendiom interface. Until this is finished, use **Evicted** to end a rental, regardless of why the tenancy ended.

:::

## Ending a rental with Evicted

**Evicted** is the only status that actually closes out a tenancy from the app. Despite the name, it is what you have to use for a normal move-out, a mutual termination, or a lease that ran its course.

When you set it, Lendiom:

- Sets the property back to **Available** and clears the tenant off it, so it can be rented again. On a multifamily property it is the unit that goes back to **Available**, and only the rental link is cleared — the tenant stays on the unit.
- Removes the property or unit from the client's list of associated items. The rental itself stays attached to the client.
- Stops the nightly integrity job from touching the rental. No further rent accrues, no late fees are assessed, and the status stops flipping between Current and Late.
- Stops auto-pay. The nightly draft job skips ended rentals, so no further card or bank draft is attempted.
- Drops the rental out of the tenant's Lendiom Pay dashboard.

Transactions, notes, and files stay on the rental. You can still open it and read the whole history.

<!-- screenshot: The rental page actions menu open with the Status submenu expanded, showing Draft, Current, Late, Eviction, Evicted, and Terminated -->

:::warning

Setting Evicted is one-way from the interface. Once the status is Evicted, the entire actions menu greys out — including the Status submenu — so you cannot move the rental back to Current. Confirm the move-out date and the final balance before you set it.

:::

:::caution

The **Evicted Date** field that appears on the Overview and Details tabs after you set the status is never written to. Nothing in Lendiom records the date an eviction or move-out completed, so the field renders blank on every ended rental. Put the real date in a note on the rental if you need it for your records.

:::

:::caution

**On multifamily, the old tenant stays on the unit.** Ending the rental frees the unit and clears its rental link, but the tenant recorded when the rental was created is left in place, and there is no screen or control that can remove it. A property-wide mass communication still counts that former tenant as a recipient. See [Units on a Multifamily Property](./units-on-multifamily.md) for the full picture.

:::

## Recording the final numbers

Do the money before you change the status. Ending the rental does not settle anything — it freezes the balance where it stands.

:::warning

Recording a transaction on an already-ended rental recalculates the balance due as **one full rent payment for every month between the First Payment Date and today**, with no stop at the date the tenancy ended. Record a settlement payment three months after a move-out and the balance jumps by three months of rent. The **Record Transaction** button stays enabled on ended rentals, so this is easy to trip over. Finish every transaction while the rental is still Current, Late, or Eviction.

:::

## The early termination fee

The **Add a Transaction** modal offers **Early Termination Fee** under the Fees group. Alongside it sit **Maintenance Fee** and, under Record Keeping, **Deposit** and **Documentation Fee**.

<!-- screenshot: The Add a Transaction modal with the Type select expanded, showing the Rent, Fees, and Record Keeping groups and all seven transaction types -->

:::caution

Only three of the seven transaction types move money on a rental: **Regular Payment**, **Late Fee**, and **Other Fee**. Early Termination Fee, Maintenance Fee, Deposit, and Documentation Fee are saved to the transaction history and change no balance at all — not Balance Due, not Late Fees Due, not Other Fees Due, and not Total Due. A tenant charged $800 through the Early Termination Fee type owes exactly what they owed before.

To actually charge an early termination fee, use **Other Fee** with a **negative** amount. On the Other Fee type a negative value adds to what the tenant owes and a positive value pays it down, and a comment is required. Put "early termination fee" in the comment so the history still reads correctly.

:::

| What you want | Type to use | Amount |
| --- | --- | --- |
| Charge an early termination fee | Other Fee | Negative |
| Tenant pays that fee | Other Fee | Positive |
| Charge damages found at move-out | Other Fee | Negative |
| Note the fee for the record without billing it | Early Termination Fee | Positive |

## Returning a deposit

The deposit amount is captured once, on the **How much?** step of the rental creation wizard. After that it is stored on the rental and never changes — no screen edits it, and no transaction adjusts it.

:::caution

Deposit handling is unfinished. The deposit amount does not appear anywhere on the rental page after creation — not on Overview, not on Details — and the **Deposit Tracking** panel at the bottom of the rental is disabled with a "Coming soon" tooltip. Recording a **Deposit** transaction prefills the amount from the rental but changes no balance and does not mark the deposit as returned. There is no way to clear or zero a deposit once it is set.

Track deposit refunds and withholdings outside the deposit field: charge withholdings as **Other Fee** with a negative amount and a comment, and record the refund itself in a note on the rental.

:::

If the deposit was collected online and shows a processor transaction, you do have a real refund path. Open the transaction's actions menu, choose **Reverse**, and pick **Refund to customer**. That pushes the refund back through the payment processor to the card or bank account it came from. Choosing **Hold as unapplied payment** instead keeps the money in Lendiom as a credit you can apply to a future transaction for that client.

<!-- screenshot: The rental Transactions table with the row actions menu open on a deposit transaction, showing View Details, Reverse, and Change Status -->

:::warning

A reversal refunds the full transaction amount. There is no partial refund, so a deposit where you are keeping $300 of $1,000 cannot be handled by reversing. Charge the $300 as an Other Fee and refund the deposit outside Lendiom, or reverse the whole thing and collect the $300 separately.

:::

## Deleting a rental versus ending it

These are different actions with different outcomes, and only one of them is available at any given time.

| | Delete | End (Evicted) |
| --- | --- | --- |
| Available when | Status is Draft only | Any active status |
| Permission | Rentals → Delete | Rentals → Update |
| Transaction history | Erased | Kept |
| Notes, files, letters | Erased | Kept |
| Property released | Yes | Yes |
| Appears in reports afterward | No — the record is gone | Yes |
| Reversible | No | Not from the interface |

The **Delete** item is hidden from the actions menu on anything that is not a Draft, and Lendiom rejects the request server-side as well. Delete is for a rental you entered by mistake and never activated. Anything a tenant actually lived under should be ended, not deleted — the transaction history is your record of what was charged and paid.

<!-- screenshot: The actions menu on a Draft rental, showing the Delete item present alongside View Client, View Inventory, Rename, and Status -->

Deleting removes the rental's files and folders from storage, its notes, its timeline entries, its snail mail records, and every transaction, then releases the property and unlinks the client. The confirmation dialog asks whether you are "100% certain" for good reason — nothing here is recoverable.

## After the rental ends

The property returns to **Available** and can be attached to a new rental right away.

<!-- screenshot: A residential property's detail page after its rental was ended, showing the status tag reading Available and no tenant listed -->

The client keeps the rental in their record, so the history stays reachable from the client page. Late fee configuration, [late fee tiers](../how-it-works/late-fees.md), recurring fees, and minimum payment settings all stop being evaluated. If the tenant still owes a balance when the rental ends, that number freezes as-is and Lendiom will not chase it — no reminders, no late fees, and no entry in the tenant's Lendiom Pay dashboard.
