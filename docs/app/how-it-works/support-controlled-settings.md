---
id: support-controlled-settings
title: Settings Your Lendiom Contact Controls
---

Most of what Lendiom does is yours to configure under **Org Settings**. A handful of things are not. Most of these are set on Lendiom's side, per organization, and several of them have no screen, no switch, and no menu item anywhere in the app — so if you are hunting for the toggle, you will not find one.

This page lists those settings, what each one changes, what the app looks like when it is off, and how to get it changed.

## The Settings

| Setting | What it controls | Where you can see its state |
| --- | --- | --- |
| Charging clients | The **Charge Client** button on a loan | The button itself, greyed out |
| Voice assistant | The floating microphone button in the app | Nowhere — the button is either there or it is not |
| Client impersonation | Opening Lendiom Pay as one of your clients | Nowhere |
| ACH (bank) payments | Whether bank accounts work at all for your merchant account | **PayArc → Merchant**, read-only |
| Processing rates | Your card and ACH rates, reserve, settlement days | **PayArc → Merchant**, read-only |
| Rentals add-on | The whole Rentals section | The Rentals page, and the absence of a row in the Addons card |
| Custom Website and Communication Portal add-ons | See [Add-Ons](../billing/add-ons.md) | **Org Settings → Billing**, Addons card |

Two of these are missing from the interface rather than locked away from you. The *switched on* half of charging, and the voice assistant, have no screen, no menu entry, and no button anywhere in the app — but the server does accept a change to either one from a role holding **organization update**. The sections below say where that line falls.

## Charging Clients

Charging lets your staff run a charge against a client's saved default payment method straight from a loan, rather than waiting for the client to pay. It is a loan-only feature — there is no equivalent action on a rental or an invoice. The mechanics are covered in [Charging a Loan Transaction](../guides/charging-a-loan-transaction.md).

There are actually two flags behind it, and they are not equally out of reach. The first records whether Lendiom has made charging *available* to your organization at all. It is never sent to the app, so it is invisible even to your admins, and nothing anywhere in Lendiom writes it — we set it, and only we can.

The second records whether charging is switched *on*, and that one your organization can change. The server accepts it from anyone whose role holds **organization update**. No page in the app sends that change, so you will not stumble onto it by clicking, but it is not sealed the way availability is. It also only goes so far: if Lendiom has not made charging available to you, switching it on comes back as `charging is not available for this organization` under code `3939`.

When charging is off and PayArc is set up, the **Charge Client** button on a loan is rendered but disabled, and hovering it shows a popover titled **Charging Not Enabled** telling you to contact support. If PayArc is not set up, the button is not rendered at all, and the same goes for draft loans and for phones — the button is hidden on mobile devices regardless of your settings.

If a charge request reaches the server anyway, it comes back as `the ability to charge a client is not enabled for this organization` under code `19484`. See [Error Messages](./error-messages.md) for how to read that.

:::info

Lendiom asks for proof before enabling charging: a signed contract or addendum in which your clients authorize you to charge the payment method they have on file. We cannot recommend the wording for you — that is a question for your attorney.

:::

## Voice Assistant

The voice assistant is the floating microphone button that lets you talk to Lendiom about what is on screen. It is off by default, and in practice Lendiom is who turns it on — but it is not ours to hold. Unlike charging, there is no availability flag behind it, and the server accepts the change from anyone whose role holds **organization update**. What is missing is the interface: nothing in the app sends it, which is why emailing us is the practical route rather than the required one.

When it is off there is nothing to see. The button is not rendered, there is no menu entry, and no page shows an "enable" screen the way the self-service add-ons do. An organization with it off and an organization that has never heard of it look identical.

The gate is enforced twice on the server: a voice session cannot be created for an organization that does not have it on, and every individual voice action re-checks the organization before it runs.

## Client Impersonation

Impersonation is the **Log in as client** action on a client record. It opens [Lendiom Pay](../../pay/what-is-pay.md) as that client so you can see and do what they see and do. It is on by default for every organization, and Lendiom can turn it off for yours on request — this is the one setting on this page where the default is the permissive one.

Anyone whose role holds **client update** can use it, so if you want to limit it to certain people rather than remove it entirely, adjust the role instead. See [Roles and Permissions](../security/roles-and-permissions.md).

:::caution

Turning impersonation off does not hide the button. **Log in as client** stays in the menu, still opens the "Impersonating Warning" confirmation, and only fails after you click **Yes, continue** — at which point you get a red permission error reading `impersonation is disabled for your organization`. Nothing in the interface tells your team the feature is gone until they try it. Tell them yourself.

:::

## ACH, Rates, and Everything Else on Your Merchant Account

ACH is a separate capability on your PayArc merchant account, applied for and approved through PayArc. It is not something Lendiom can flip on demand, and it is not something you can request from inside the app.

When ACH is off:

- **PayArc → Merchant** shows **ACH Enabled: No**, and the ACH Rate row is not displayed.
- **PayArc → Transactions** has the **ACH Transactions** tab disabled.
- The bank charges view shows a result card titled **ACH Capabilities Not Enabled**, pointing you at Lendiom support and noting that if you have already applied, you are waiting on approval.
- In Lendiom Pay, your clients are not offered the bank account option.

:::caution

You can tick **Bank Accounts** under a client's Allowed Payment Methods, and it will save without complaint — but if ACH is off for your merchant account, that client still will not see a bank option in Lendiom Pay. The per-client setting is real; it just cannot grant a capability your organization does not have.

:::

Your rates are on the same page and are equally read-only: card rate and per-transaction fee, ACH rate when ACH is on, plus reserve amount, settlement days, high ticket, average ticket, monthly volume, and batch hold when PayArc has supplied them. These are negotiated, not configured. Lendiom guarantees a ceiling on them, which is documented on the [PayArc](../payment-processing/payarc.md) page.

## Rentals

Rentals is an add-on, but unlike Document Builder or Document Signing it has no switch in the Addons card. Every organization created through the normal signup flow gets it enabled automatically, so most people never notice. If yours is off, only Lendiom can turn it back on.

When it is off, the Rentals page shows a **Coming soon** screen instead of your rentals, creating a rental is refused with `rental addon is not enabled` under code `198415`, invoices cannot be attached to a rental, and rental figures drop out of the dashboard and your expected payments. Nothing is deleted.

## How to Get One Changed

Email [Lendiom Support](mailto:support@lendiom.com) from an address on your account and include:

1. Your organization's name.
2. Which setting you want changed, and in which direction.
3. For charging, the signed authorization language your clients agreed to.
4. For ACH, whether you have already applied through PayArc.

Once a setting is changed on our side, reload the app. Your organization's state is delivered to open browser sessions as it changes, but a reload is the reliable way to be sure the interface has caught up.

:::tip

Before you email, check whether the thing you are missing is actually a role problem rather than an organization setting. A missing button is far more often a permission your role does not hold. [Roles and Permissions](../security/roles-and-permissions.md) walks through how to tell the difference, and [Add-Ons](../billing/add-ons.md) covers the features you can switch on yourself.

:::
