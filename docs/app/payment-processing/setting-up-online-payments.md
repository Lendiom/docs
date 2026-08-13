---
id: setting-up-online-payments
title: Setting Up Online Payments
---

Online payments let a client pay a loan, a rental, or an invoice from the client portal using a saved card or bank account. Nothing is charged until you turn online payments on for that specific record, and each record carries its own configuration — a loan can accept online payments while a rental for the same client does not.

## Before you start

Online payments run through PayArc. Three things have to be true before the configuration fields appear anywhere in Lendiom:

| Requirement | What it means | Where to check |
| --- | --- | --- |
| A PayArc merchant account exists | Your organization has a merchant ID issued by PayArc | PayArc → Merchant |
| Merchant setup is complete | PayArc approved the application and Lendiom has your processing credentials | PayArc → Merchant → Overview |
| ACH is enabled (only if you want bank payments) | PayArc enabled ACH on your merchant account as a separate product | PayArc → Merchant → Overview, "ACH Enabled" |

Until a merchant ID exists, the loan and rental forms show a notice pointing you at the PayArc merchant page instead of the online payment fields. Once the merchant ID exists but setup is unfinished, the notice asks you to finish the application. Only when both are in place does the **Online Payments** question appear.

<!-- screenshot: The loan creation wizard's online payment step for an organization without a PayArc merchant account, showing the blue "Online Payments" informational alert with the "apply for a merchant account with PayArc" link and no online payment fields below it. -->

Card processing and ACH processing are approved separately. If ACH is not enabled on your merchant account, clients can still pay by card, but they will not be offered a bank account.

:::info
Applying is covered step by step in [Onboarding: PayArc](onboarding-payarc.md), and the rate and fee structure is in [Processor: PayArc](payarc.md).
:::

You also need the **Update** permission on the record type you are configuring — loans, rentals, or invoices — since the configuration lives on the record itself.

## Turning online payments on

| Record | Where to configure it | When it can be changed |
| --- | --- | --- |
| Loan | Loan page → Actions → **Online Payments**, or the online payments step of the loan creation wizard | Any time the loan's action menu is available |
| Rental | Rental page → Actions → **Online Payments**, or the communication step of the rental creation wizard | Any status except **Terminated** |
| Invoice | Invoice page → **Payment Settings** panel, or the invoice creation form | While the invoice is a **Draft**; after that the panel shows the settings read-only |

![The Online Payments configuration modal on a loan](/img/docs/app/payment-processing/setting-up-online-payments/02.png)

Each record type has a few extra switches once online payments are on:

- **Loans** add *Allow Principal Only* (lets the buyer submit a principal-only payment as its own transaction), *Allow Auto Draft*, and *Extra Application* — the default destination for anything paid above the scheduled payment.
- **Rentals** add *Allow Auto Pay*.
- **Invoices** add *Partial Payments*, which controls whether the client may pay less than the full balance.

:::caution
A Terminated rental's online payment configuration cannot be changed at all. The save is rejected with "can not change the online payment config of a terminated rental." Change the rental's status first if you need to adjust it.
:::

Enabling the configuration is not the only gate on the client's side. A loan will not accept an online payment while it is Draft, Inactive, Repossessed, Paid Off, Canceled, Refinanced, or Pending Payoff, regardless of what the configuration says.

## Who pays the processing fee

The processing fee is configured **separately for cards and for ACH**, because the two cost very different amounts. Both settings live in the same place as the enable switch.

| Setting | Label on loans / rentals | Label on invoices | What the client is charged |
| --- | --- | --- | --- |
| Buyer | Buyer / Renter | Client pays fee | The payment amount grossed up so you receive the full amount |
| Both | Both 50/50 Split | Split fee | The payment amount plus half the fee; you absorb the other half |
| Seller | Seller / Owner | Organization pays fee | Exactly the payment amount; you absorb the whole fee |

Lendiom picks the ACH setting when the client pays from a bank account and the card setting when they pay with a card. The gross-up is calculated from your organization's PayArc rates: the payment amount plus the per-transaction fee, divided by one minus the percentage rate. ACH uses a $0.30 per-transaction component; the card per-transaction fee comes from your negotiated rates. Look your own rates up in the PayArc section of Lendiom — [Processor: PayArc](payarc.md) documents the ceilings Lendiom guarantees you will not exceed.

<!-- screenshot: The invoice Payment Settings panel on a draft invoice, with Partial Payments on, Online Payments toggled on, and the ACH Fee Payee and Card Fee Payee dropdowns both visible. -->

Because the two settings are independent, you can absorb the card fee while passing the much cheaper ACH fee to the client, or the reverse.

## The statement descriptor

The statement descriptor is the text your client sees on their card statement next to the charge. It applies to **card charges on loans and rentals**; invoices do not have one.

- Between 5 and 22 characters
- Must contain at least one letter
- Cannot contain `<`, `>`, `\`, `'`, `"`, or `*`
- **Force-uppercased when saved** — whatever you type is converted to uppercase before it is stored and sent to PayArc

Lendiom pre-fills it with your organization name, stripped of punctuation and truncated to 22 characters. Change it to something a client will recognize on a statement they read three weeks later.

:::tip
Because the value is uppercased on save, the descriptor shown back to you on the loan or rental details panel will not match your casing. That is expected, not a bug.
:::

## Minimum and maximum payment amounts

Minimums are configured per loan and per rental through the **Minimum Payment** action, and organization-wide defaults live in your organization preferences with an option to apply them to every existing loan or rental.

| Rule | Minimum the client must pay |
| --- | --- |
| None | No minimum is enforced |
| Current Balance | The balance currently due |
| Current Late Balance | Everything owed — due, late fees, interest, and other fees |
| Regular Payment | The scheduled periodic payment amount |
| Fixed Amount | A dollar amount you set |

If the remaining balance is lower than the calculated minimum, the remaining balance is accepted instead, so a final payoff is never blocked by the rule.

<!-- screenshot: The Minimum Payment Configuration modal with Rule Type set to "Fixed Amount", the Fixed Amount field filled in, and the blue "What is this for?" explanatory alert above the form. -->

Maximums are not configured — they are enforced from the balance:

- **Loans**: a payment cannot exceed the total amount owed. A principal-only payment cannot exceed the remaining principal, and a payment against other fees cannot exceed the other-fees balance.
- **Invoices**: a payment cannot exceed the balance due. If *Partial Payments* is off, the client must pay the full balance in one payment.

Two further limits come from PayArc rather than from Lendiom. ACH charges are subject to a per-check ceiling on your merchant account — a payment above it is rejected with a message asking you to split the payment or have PayArc raise the limit. There is also a per-customer daily processing cap; that one resets each business day.

## Turning online payments off on a rental

Switching **Online Payments** to No — or leaving it on but switching **Allow Auto Pay** to No — while the tenant has auto-pay running does three things at once:

1. The tenant's auto-pay enrollment is cancelled.
2. A system note is written on the rental's timeline recording that automatic payments were disabled and **naming the staff member who did it**, for example "Automatic payments have been disabled. Online payment configuration disabled by Jane Doe."
3. The tenant is notified through their communication preferences. If SMS is one of them, they get a text telling them their automatic payments have stopped.

A timeline entry is added to the client, and an "Auto Pay Stopped" notification goes out to your organization's members naming the reason.

:::warning
The rental modal saves this immediately — there is no confirmation prompt, and it is not reversible from your side. Re-enrolling in auto-pay is something the tenant does from the client portal.
:::

<!-- screenshot: The rental Online Payments modal with Online Payments being switched from Yes to No while the rental's details panel behind it shows Auto Pay as enabled. -->

The same cascade applies to loans with auto draft: disabling online payments or turning off *Allow Auto Draft* cancels the buyer's auto draft and records who did it. The loan modal does warn you first — it shows an "Automatic Payments Enabled" alert while auto draft is running, and asks you to confirm before it saves.

## Confirming the setup

Open the loan's or rental's **Details** tab. When online payments are on you will see an **Online Payments: Enabled** row — hover it for the statement descriptor — plus the ACH Fee Payee and Card Fee Payee rows. Invoices show the same information in the Payment Settings panel. If the row reads Disabled, the client portal will not offer a payment option for that record.
