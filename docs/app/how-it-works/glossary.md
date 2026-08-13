---
id: glossary
title: Glossary of Lendiom Terms
---

Several words in Lendiom mean something narrower than they do in everyday conversation, and a few pairs that sound interchangeable are not. This page defines the terms as the software actually uses them.

## Property and Inventory

**Inventory** — The top-level record for something you own: a land development, a single house, a multifamily building, a commercial property, or "other." Every tract, unit, and property tax bill hangs off an inventory record. Its **category** (land, residential, multifamily, commercial, other) decides which details it can hold; its **type** is finance, rental, or other.

**Tract** — A numbered piece of land inside a land inventory record. Each tract carries its own acreage, cost, status, and payment option, and a single loan can cover several tracts at once. See [Working with Tracts](../guides/working-with-tracts.md).

**Parcel number** — The county assessor's identifier for a property, stored as free text on a tract or an inventory record. Lendiom never validates it and never calculates with it; it exists so you can match a Lendiom record to a county record. One tract can hold several parcel numbers.

**Unit** — An individually rentable space inside a multifamily inventory record, with its own number, bed and bath counts, square footage, market rent, and tenant. Units exist only on multifamily; a single-family rental *is* the inventory record. See [Units on Multifamily](../guides/units-on-multifamily.md).

**Development** — The everyday word for a land inventory record, and the noun Deal Analysis uses when tracking itemized costs and development loans against one.

## People

**Client** — The account you do business with: the buyer, borrower, or tenant side. The client holds the account number, the online payment setup, portal access, and the list of people on the account. See [Managing Clients](../guides/managing-clients.md).

**Entity** — A person attached to a client. Names, addresses, email, phone numbers, birth date, and tax information live on the entity, never on the client itself. One client can have several entities — a married couple is one client with two entities.

**Primary entity** — The single entity Lendiom treats as the contact of record. It supplies the mailing address used for 1098s and letters, the phone number that receives the Lendiom Pay welcome text, and the identity used during impersonation. The first entity you add becomes primary; you can change it later.

**Account number** — The random, case-sensitive string that identifies a client in Lendiom Pay. It is effectively the buyer's username, and only your organization can supply it — Lendiom Support cannot look it up for them. See [Inviting a Client to Lendiom Pay](../guides/inviting-a-client-to-lendiom-pay.md).

**Impersonation** — Opening Lendiom Pay as one of your clients, from their client record, so you can see and do what they can. Every transaction created that way is stamped with who was impersonating, and an organization can switch impersonation off entirely in its preferences.

## Loans and Terms

**Loan** — Lendiom's record for financing: an owner-financed tract, an owner-financed house, or a straight cash loan. It owns the terms, the balances, the schedule, the transactions, and the status.

**Contract** — Not an object in Lendiom. The owner-financing agreement *is* the loan record; the signed paper lives under [Document Signing](../guides/document-signing.md). "Under contract" is a separate thing — a tract status meaning the tract is spoken for but its loan is not yet running.

**Amount financed** — Sales price, minus the down payment, plus adjustments. The app labels it **Loan Amount**, and it is what the amortization runs on — not the sales price.

**Adjustment (loan terms)** — A one-time figure folded into the amount financed when the loan is created, used on residential loans for closing items such as prorated taxes. A positive value increases the financed amount; a negative one reduces it.

**Adjustment (transaction)** — A transaction type that reduces a balance with no money changing hands. The amount is always entered as a negative, and it comes in three kinds: interest (allowed only on accrues-daily and interest-only loans, and it draws down unpaid interest), principal, and payment (which credits specific scheduled payments).

**Interest anchor** — The date daily interest is measured from on accrues-daily and interest-only loans. It is the date interest was last settled into the balance — which advances whenever principal changes mid-period, such as a principal-only payment — falling back to the last payment received, and then to the down payment or closing date.

**Per diem** — One day of interest: the daily rate (the annual rate over 360 or 365, depending on the interest formula) times the current principal. The loan overview shows it as **Interest per Day**, and a payoff quote multiplies it by the days since the interest anchor. It changes every time principal changes. See [Interest Accrues Daily](./interest-accrues-daily.md).

**Balloon** — A term type available on interest-only loans: the borrower pays interest only until the term ends, and a balloon action then decides what happens to the principal. The other interest-only term types are fixed and indefinite, and amortized loans in Lendiom have no balloon setting.

**Called due** — One of the two things that can happen when a balloon interest-only term ends. Called due adds a single final schedule line for the remaining principal plus that period's interest; the alternative, convert-to-amortized, turns the loan into a regular amortizing loan for a length and frequency you choose.

## Changing a Loan After It Starts

**Recast** — Re-amortizing the loan you already have, in place: same record, same history, with only the unpaid tail of the schedule rebuilt from an effective date. You pick how balances are handled — leave as-is (dates shift only), re-amortize (recompute the payment from current principal), or capitalize (fold unpaid interest, late fees, and other fees into principal first). Property tax always stays where it is. See [Recasting a Loan](../guides/recasting-a-loan.md).

**Refinance** — Replacing the loan with a new one. The outstanding balances roll into the new loan and the original keeps the **Refinanced** status permanently as a read-only record — no more transactions, no waivers, no recast. See [Refinancing a Loan](../guides/refinancing-a-loan.md).

**Move due date** — Pushing the next payment out (or pulling it in) and regenerating every payment after it at the same frequency. It is not a one-month holiday, and the optional move-to-end checkboxes add accrued interest, unpaid interest, late fees, and other fees onto principal. See [Moving a Payment Due Date](../guides/moving-a-due-date.md).

## Fees, Escrow, and Taxes

**Escrow** — A per-loan account you fund with a set amount out of every payment and disburse from when a bill arrives. You choose where in the payment it comes out — before interest or after principal. (A third step, **Before Fees**, appears in the dropdown but is disabled.) Each entry is either a credit (money in) or a disbursement (money out). See [Loan Escrow](./loan-escrow.md).

**Property tax** — A separate feature from escrow: a tax year's bill recorded against an inventory record, split across its tracts by acreage or a custom amount, and billed to whoever bought each tract. The buyer's share sits in its own property tax balance on their loan. See [Collecting Property Tax](../guides/collecting-property-tax.md).

**Grace period** — The days after a due date before a late fee is charged, set by each late fee tier's **Days** value. Counting starts the day *after* the due date, in calendar days, in your organization's timezone. See [Late Fees](./late-fees.md).

**Late fee balance** — Fees from tiers set to *first part of next payment*. The next payment clears them before anything reaches interest or principal.

**Flex late fee balance** — Fees from tiers set to *added to late fee balance*. Nothing clears them automatically: they never come out of a regular payment and they are not part of the total due shown for the next payment. You clear them by recording a late fee payment, and they reappear on a payoff quote (grouped with other fees), on a refinance, and when you move a due date with the other-fees option ticked.

**Other fees** — Charges you add by hand that are never paid down automatically. See [Loan Other Fees](./loan-other-fees.md).

## Loan Status

Full definitions live in [Loan Status](./loan-status.md); these four are the ones customers most often mix up.

| Term | What it means |
| --- | --- |
| Grace Period | The due date has passed and no payment has arrived, but the grace window has not run out yet. |
| Late | The grace window elapsed on an unpaid scheduled payment. The payment is flagged late and that tier's late fee is created, dated the last day of grace. |
| In Default | The configured number of days has passed since the last due date. If automatic defaulting is on, this is where the default notice goes out and the repossession process begins. |
| Defaulted | A further configured number of days passed after In Default. No more payments can be taken unless someone manually moves the loan back to In Default. |

## Payments and Money

**Auto Draft / Auto Pay** — Lendiom pulling a payment on its own from a method the borrower saved in Lendiom Pay. It is called Auto Draft on loans and Auto Pay on rentals; the borrower enrolls, and you only control whether it is offered. See [Automatic Payments](./automatic-payments.md).

**Unapplied payment** — A formal record (numbered `UP-0001`, `UP-0002`, and so on) created when you reverse a *successful online payment* without refunding it. The money stays with you, must be reapplied to the exact same loan, rental, or invoice it came from, and one record can fund several transactions. See [Unapplied Payments](./unapplied-payments.md).

**Credit** — A loose word covering three different things in Lendiom: an unapplied payment, an escrow credit (an entry that adds to the escrow balance), and a negative other-fees balance. The last one is never applied to a regular payment automatically — Lendiom treats it as zero when totaling what is due so it cannot mask a real amount owed.

**Platform fee** — What Lendiom adds on top of an online payment so the payment nets out to the amount you meant to collect, calculated from your PayArc card and bank rates. Each transaction stores it and records who paid it: buyer, seller, or both (a 50/50 split), configurable separately for card and bank.

**Processing fee** — What PayArc charges your merchant account. Lendiom guarantees your rates will not exceed 3.4% + $0.35 on cards and 1.0% + $0.30 on ACH; monthly minimums, chargeback fees, and PCI non-compliance charges are also PayArc's and never appear as transactions inside Lendiom. See [Processor: PayArc](../payment-processing/payarc.md).

**Statement descriptor** — The text your buyer sees on their card or bank statement for a payment, set per loan and per rental. It must be 5 to 22 characters, contain at least one letter, and exclude `< > \ ' " *`; Lendiom uppercases it and defaults it to your organization's name.

**ACH NOC** — A Notification of Change. The receiving bank accepted the debit but is telling you to correct the account details (routing number, account number, account type) for future payments. NOC codes begin with `C`, and Lendiom does not fail a charge that carries only those; a single non-`C` return code means a genuine return and the payment fails.

## Messaging and Delivery

**10DLC** — A ten-digit long code: an ordinary phone number used to send application-to-person text messages. Carriers require registration before your organization can text anyone. See [Communication Portal](../communication.md).

**Brand** — Your business identity in that registration: legal name, doing-business-as name, EIN, and legal address. The legal name must match what the IRS has for your EIN, or verification fails and a revetting fee applies. See [What is a 10DLC Brand?](../communication/what-is-a-brand.md)

**Campaign** — The registered description of how you will use the number attached to your brand. Lendiom prefills it for the way most Lendiom customers operate. See [What is a 10DLC Campaign?](../communication/what-is-a-campaign.md)

**Deliverability** — Two related checks. On a postal address it is the USPS verdict after verification — deliverable, undeliverable, missing unit, or incorrect unit — and an undeliverable result will not change by verifying again; you need a different address. On an entity it describes whether an email can be sent at all: no address, unverified, or blocked all count as undeliverable.

## Access and Subscription

**Add-on** — An optional feature attached to your subscription: Deal Analysis, Document Builder, Document Signing, Custom Website, Rentals, and the Communication Portal. Turning one off hides its screens and refuses its API calls, but your data is kept, not deleted. See [Add-Ons](../billing/add-ons.md).

**Magic link (magic code)** — The 14-digit code Lendiom generates for each signer on a signature request. It is both the link the signer opens and the access code repeated in the email and text, and you can copy it from the signature request to read to someone over the phone. It has nothing to do with signing into Lendiom Pay, which uses an account number plus a texted code.

:::tip

When a word on screen looks like a synonym for one here — "credit," "adjustment," "fee" — check which of the meanings above applies. Most disagreements about a balance turn out to be disagreements about one of these words.

:::
