---
id: setting-up-your-business
title: Setting Up Your Lendiom Business
---

Everything in Lendiom hangs off an organization: your inventory, your clients, your loans, your documents. You create one in a three-step wizard the first time you log in, and again any time you add a second business.

The wizard collects more than a name. It records your acceptance of the terms, creates your billing customer, takes a payment method, and starts your trial. Until that last step finishes, the organization is half-built, and Lendiom keeps pulling you back to finish it.

:::tip Before you start

Have your business mailing address, a contact phone number and email, and a payment method ready. Verify your email address first — the login and welcome screens route you to the verification page until you do.

:::

## The three steps

| Step | What it collects | What gets saved when you click Next |
| --- | --- | --- |
| Company Info | Name, phone, email, website, mailing address, terms acceptance | Nothing yet. It's held in the form. |
| Billing Details | Billing address and a payment method | The organization record is created, then the payment method is attached |
| Plan Selection | Monthly or yearly, optional coupon | The subscription starts and setup is marked complete |

The important line is between steps two and three. Your organization does not exist on the server until you click **Next** on Billing Details, and it isn't finished until you click **Start Trial**.

![Step one of the organization creation wizard, with the 31 day trial notice above the company details](/img/docs/app/guides/setting-up-your-business/01.png)

## Step 1: Company Info

| Field | Required | Notes |
| --- | --- | --- |
| Organization name | Yes | The business name your clients see |
| Phone number | Yes | US numbers only, tagged as **Mobile** or **Office** |
| Contact email | Yes | Must be a valid address |
| Website | No | A tooltip offers to generate one for you if you don't have one |
| Mailing street, city, state | Yes | A second street line is optional |
| Mailing zip | Yes | Exactly five digits |

The last item on the step is a checkbox agreeing to the Terms of Service and the Privacy Policy. It is not optional in either direction: the form won't advance without it, and the server rejects an organization created without it. When the organization record is written, Lendiom stamps it with the moment you agreed, alongside the account that created it. That timestamp is stored on the organization permanently.

The red button at the bottom of this step changes depending on your situation. If this is your first organization, it reads **Log out**. If you already belong to one, it reads **Cancel** and takes you back where you came from.

## Step 2: Billing Details

The **Same as mailing** switch copies the mailing address you entered on step one into the billing fields. Turn it off to enter a different one.

Underneath, choose **Card** or **Bank Account (ACH)**.

**Card** asks for the name on the card and the card details. The card fields are hosted by Stripe, so the numbers never touch Lendiom's form.

**Bank Account (ACH)** asks for the account holder's name. Clicking **Next** opens a secure Stripe window where you sign in to your bank, which verifies the account instantly. Lendiom then shows an **Authorize Bank Debits** dialog with the ACH mandate. Choosing **Disagree**, or closing the bank window without linking an account, cancels the attempt and leaves you on this step to try again.

![Step two of the wizard, with the billing address and the same-as-mailing switch](/img/docs/app/guides/setting-up-your-business/02.png)

:::caution An unverified bank account can't start your trial

During signup, the bank option only accepts accounts that verify instantly through your bank login. A bank account that would need micro-deposits is deliberately blocked from becoming the trial's default payment method — it can't be charged yet, so the subscription would fail. If your bank isn't supported, pay with a card and add the bank account afterward from **Org Settings → Billing**.

Bank accounts added later go through micro-deposits: two small deposits arrive in one to two business days, and you enter the code from your statement using **Verify Bank Account** in the billing settings. Until that finishes, the account shows as pending and **Set as Default** stays unavailable.

:::

<!-- screenshot: The "Authorize Bank Debits" modal over the wizard, showing the ACH mandate text with Agree and Disagree buttons -->

## Step 3: Plan Selection

Two cards, monthly and yearly. The prices are printed on the cards; the yearly price is twelve months of the monthly rate, so the choice is about how often you're invoiced rather than a discount. Both plans carry the same limits:

| Included | Amount |
| --- | --- |
| Trial | 31 days |
| Inventories | Unlimited |
| Clients | Unlimited |
| Active loans | 100 |
| Data storage | 50GB |

If you have a coupon code, enter it in the field at the bottom. Lendiom checks it as you type and shows the discounted price on both cards, with a note about how long the discount lasts. An invalid code blocks **Start Trial** until you clear or correct it.

![Step three of the wizard with the monthly plan selected, the coupon box at the bottom left and Start Trial at the bottom right](/img/docs/app/guides/setting-up-your-business/04.png)

Click **Start Trial**. Your trial runs 31 days, and the first invoice is anchored to the first of the month after it ends. Cancel before the trial ends and you are not charged. Lendiom drops a notification with your exact trial end date, and you land on your new organization's inventory page, ready to add properties.

Behind the scenes, three roles are created for the organization — **admin**, **property-manager**, and **viewer** — and you are made an admin of it. See [Adding Users to Your Organization](adding-users-to-your-organization) for inviting your team into those roles.

## Leaving and coming back

The wizard is resumable. If you close the tab partway through, Lendiom puts you back into it and skips ahead to where you stopped:

| What you already finished | Where you resume |
| --- | --- |
| Company Info only, never clicked Next on Billing | Nothing was saved; start over |
| The organization was created, no payment method attached | Billing Details |
| A payment method is attached | Plan Selection |

Your company details are read back out of the saved organization, so the fields are filled in when you return. One thing to know: on a resumed run, edits you make to the company information or the billing address are not sent back to the server. The wizard only creates an organization once, and after that its **Next** button does payment work. Change those details afterward under **Org Settings → Basic Settings** and **Org Settings → Billing**.

There is also no way back from Plan Selection. Once the organization and its payment method exist, that step has no **Previous** button.

## The trap: an unfinished organization follows you

:::warning

An organization that was created but never subscribed is not inert. It counts as one of your organizations, and Lendiom refuses to render any page while it is the selected one — dashboard, loans, settings, all of it — and redirects you into the wizard instead.

:::

This is the failure people hit: they click **Next** on Billing Details, then abandon the plan step. The organization exists with setup incomplete. On the next login, Lendiom selects the first organization on the account, sees the unfinished setup, and bounces you to the wizard from wherever you tried to go. If the unfinished organization happens to be first in your list, you can't reach the finished one either.

The only exit from inside the app is to finish the wizard: pick a plan and click **Start Trial**. If you don't want that organization at all, contact [Lendiom Support](mailto:support@lendiom.com).

## Belonging to more than one organization

Nothing stops you from running several businesses in Lendiom, or from being invited into someone else's. A few things behave differently once you do.

**Every URL is keyed to an organization.** App addresses look like `/<organization>/loans/<loan>`, with an identifier for the organization in the first segment. The only pages outside that pattern are your personal account settings and the admin pages. A link to a loan is therefore a link to a loan *in a specific organization*, which matters when you paste one to a colleague who may not be a member of it.

**Switching rewrites the address you're on.** Open the avatar menu in the top right, then **Organizations**, and pick one. Lendiom swaps the organization segment of your current URL and keeps the rest of the path, so switching while you're looking at `/<org-a>/loans/<loan>` lands you on `/<org-b>/loans/<loan>` — the same path, pointing at a record the new organization does not have. Go to that organization's dashboard or list page and navigate from there. Switching from your account settings takes you to the new organization's dashboard instead.

**Your role is per organization.** Permissions are loaded and enforced per organization, not per account. You can be an admin in the business you created and a viewer in one you were invited to, and the menus and buttons you see change as you switch. If something you expect is missing, check which organization is selected before assuming a permissions problem.

![The avatar menu expanded to the Organizations submenu, listing the organizations you belong to and New Organization](/img/docs/app/guides/setting-up-your-business/05.png)

**Adding another one** is the **New Organization** item at the bottom of that same submenu, which drops you back into this wizard with its own terms acceptance, payment method, and trial. Every organization is billed separately.

<!-- screenshot: Org Settings Billing tab showing the payment methods table with a card marked Default and a bank account row labeled pending verification, with its actions menu open and "Set as Default" greyed out -->

## Related

- [Getting Started Guide](../getting-started) for what to do after setup: inventory, clients, and your first contract
- [Adding Users to Your Organization](adding-users-to-your-organization) for inviting your team
- [Registering for Online Payments](../payment-processing/onboarding-payarc) for collecting payments from clients
