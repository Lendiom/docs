---
id: using-lendiom-on-your-phone
title: Using Lendiom on Your Phone
---

Lendiom is two separate web apps, and they treat phones very differently. The lender app at **app.lendiom.com** is a desktop tool that shrinks; a handful of controls are removed outright when it detects a phone. [Lendiom Pay](../../pay/what-is-pay.md) at **pay.lendiom.com**, the portal your clients use, was built phone-first and behaves the same at every width. This page covers what changes, what disappears, and what you cannot do from a phone at all.

Neither app is available in the App Store or Google Play. Both run in the browser, and both can be added to a home screen.

## The lender app on a phone

### Two different tests, two different results

The app makes two independent decisions about your device, and confusing them explains most "why is that button missing" reports.

| Test | How it decides | What it controls |
| --- | --- | --- |
| Phone | Reads the browser's user agent. True on phones only — **not** tablets, and **not** a desktop browser you dragged narrow | Whether specific buttons and controls exist at all |
| Narrow | Measures the viewport. Anything **767px wide or less** counts | The page shell: sidebar, header, settings tabs |

So an iPad gets the full desktop app no matter how you hold it. A desktop window pulled in to 700px gets the collapsed shell but keeps every button. Only a phone gets both.

:::info
This is why "request desktop site" on a phone does not bring the missing buttons back. That setting changes the reported width, not the device the browser identifies as.
:::

### Controls hidden on phones

These are removed on a phone. They are not disabled or greyed out — they are absent, with no tooltip explaining why.

| Control | Where it lives | What to do instead |
| --- | --- | --- |
| **Charge Client** | Loan page header | Charge from a desktop or tablet. See [Charging a Loan Transaction](../guides/charging-a-loan-transaction.md) |
| **Download Transactions** (Simple CSV / Detailed CSV) | Transactions panel on a loan | Use the org-level export. See [Exporting Your Data](../guides/exporting-your-data.md) |
| **Download Schedule** | Amortization Schedule panel on a loan | Read the schedule on screen, or download it from a larger device. See [Amortization Schedule](./amortization-schedule.md) |
| Due-date presets | Record Transaction modal on loans and rentals | Pick the date manually in the calendar |
| **Add Transaction** button | Tract page header | Still there, moved into the **…** menu beside Timeline |
| Table search and filter panel | Inventories, Rentals, Document Requests | Sort and page through the list |
| Drag-and-drop upload | File browser | Use the upload button |
| Help Scout beacon | Bottom-right of every page | Email support, or open the beacon from a desktop |

The presets that vanish from the transaction modal are the shortcuts — *Today*, *Next Due Date*, *Last Due Date*, *Last Payment Date*, *Down Payment Date*, *Closing Date* on a loan, and the rental equivalents. The date field itself works normally. Note that the presets are also suppressed when you open the modal to charge a client, on any device.

<!-- screenshot: The loan page at phone width, showing the header without a Charge Client button, and the Transactions panel header with no Download Transactions split button on its right edge. -->

### Notifications fold into an Actions dropdown

On a full-width screen the header carries the global search bar in the middle, then the notification bell and the Help icon on the right. Below 768px all of that collapses:

- The search bar is replaced by a magnifying-glass button that opens the same search as a full-screen overlay.
- The bell and Help are moved inside a single dropdown whose trigger is a chevron.
- The dropdown is headed by a disabled **Actions** label and a divider, then the items.
- Your unread count moves onto the dropdown trigger as a badge, capped at 99+, so you still see there is something waiting without opening it.

Open the dropdown and the bell item reads **Notifications**; tapping it opens the same three-tab panel you get on a desktop — Notifications, Reminders, and Messages, each with a count and a Clear action.

<!-- screenshot: The Lendiom header at phone width with the Actions dropdown open, showing the disabled "Actions" label, a divider, the Notifications bell with its unread badge, and the Help link. -->

### Settings tabs reflow below 768px

Organization Settings and Account Settings both use a left-hand tab rail. That rail moves to the top of the content when either of these is true:

| Condition | Result |
| --- | --- |
| The settings container is narrower than 641px | Tabs move to the top |
| The browser window is narrower than 768px (and the container is over 400px) | Tabs move to the top |

The tab list is unchanged — Basic Settings, Billing, Invoices, Import/Export, Members, Roles, Fillable PDFs, Scheduled Reports, and Custom Fields are all still reachable. They become a single horizontal strip instead of a vertical column, and the ones that do not fit move behind the overflow control at the end of the strip. The position is recalculated on every window resize, so rotating the phone re-runs the check.

Each tab is its own URL, so a bookmark or a link straight to a tab still lands correctly on a phone.

<!-- screenshot: Organization Settings at phone width, with the tab rail rendered as a horizontal scrolling strip above the Basic Settings form instead of a column on the left. -->

### Tables become lists

Four of the heaviest tables swap to a card list on a phone rather than scrolling sideways: **Loans**, **Clients**, the entities list on a client record, and a loan's **Transactions**. The list shows fewer fields than the table by design; tap a row to open the same detail view.

<!-- screenshot: The Loans page at phone width rendered as a stacked card list rather than a table, with the collapsed sidebar hamburger visible in the header. -->


Everywhere a table stays a table, it scrolls horizontally inside its own panel. Detail blocks — the summary rows at the top of a loan, rental, tract, inventory, or client — drop from three columns side-by-side to two columns stacked, with each label above its value. Drawers and modals open at full screen width instead of a fixed panel.

:::caution
The Communications inbox has a hard minimum width of 700px on its conversation layout, so it scrolls sideways on a phone and the conversation list cannot be collapsed out of the way. Reading a thread works; managing the inbox is painful. See [Communication Portal](../communication.md).
:::

### The document editor blocks you first

Opening a document builder template on a phone raises a modal titled **Not Optimized for Phones**, offering **Go Back** or **Continue Anyway**. The editor is built for desktop and tablet screens. Tablets get no warning.

## Lendiom Pay on a phone

Lendiom Pay is the client-facing side, and it is the one that was designed for a phone. Its stylesheet has no desktop layout at all — the phone layout is the layout, and the only breakpoints below it shrink type further on small and very small screens. On a laptop it renders as the same tall single column.

The whole app is a fixed top bar with a back arrow and a hamburger, and content underneath. The hamburger opens a full-height panel with the client's name, account number, balance due, and links to Home, Account, Payment Methods, Help, a language toggle, and Logout. The English/Spanish choice is remembered across visits.

<!-- screenshot: Lendiom Pay at phone width with the side menu open, showing the account name and number, the Balance Due amount, and the Menu list: Home, Account, Payment Methods, Help, Spanish, Logout. -->

### Adding it to a home screen

Lendiom Pay ships a web app manifest that names it **Lendiom Pay**, supplies 192px and 512px icons, and declares standalone display — so once it is added to a home screen it opens in its own window without browser chrome.

| Browser | How |
| --- | --- |
| Safari on iOS | Share button → **Add to Home Screen** |
| Chrome on Android | Menu → **Add to Home screen** or **Install app** |

The app never prompts for this. Tell clients about it, or it will not happen.

:::tip
Have the client tick **Remember Me** when they sign in. It is on by default. Left on, the session is stored persistently and survives closing the app; turned off, it is stored for that browser session only and they will be re-texted a code every time. The sign-in code field is marked as a one-time code, so phones offer to fill it straight from the text message. See [How Do I Log Into Lendiom Pay?](../../pay/logging-in.md).
:::

Neither app registers a service worker, so neither works offline. On a dead signal the page fails to load rather than showing a cached copy.

### There are no push notifications

Lendiom Pay never asks for notification permission, and with no service worker there is nothing to receive a push. A home-screen icon does not change that. Every proactive message to a client therefore goes out over text or email:

| You want the client to know | How it reaches them |
| --- | --- |
| A payment is coming due, is due today, or is late | SMS and/or email, per the loan's communication preferences |
| A payment succeeded, failed, or is pending | SMS and/or email, immediately |
| Anything you send by hand | SMS, email, or a mailed letter |
| Anything at all | Never a phone notification from the app |

Which channels fire, and the three conditions that have to line up first, are covered in [Automated Borrower Messages](../communication/automated-messages.md). If a client says they "didn't get a notification", they mean a text or an email — check the entity's opt-in status, not their phone settings.

### Accessibility limits worth knowing

| Limitation | Effect |
| --- | --- |
| Both apps declare `maximum-scale=1.0` and `user-scalable=0` | Pinch-to-zoom is suppressed. Lendiom Pay reinforces this by restricting page touch gestures to panning only, so the pinch never reaches the browser |
| Lendiom Pay sizes some text in viewport-width units below 576px | That text scales with screen width instead of with the reader's chosen font size, so making system text larger does not enlarge it |
| The page language stays `en` when Spanish is selected | Screen readers keep applying English pronunciation to translated Spanish text |

A client who needs to magnify the screen should use their operating system's own zoom or magnifier, which sits above the page and is not affected by any of this.

## What to move to a desktop

| Task | Why |
| --- | --- |
| Charging a client | The button does not exist on a phone |
| Downloading a loan's transactions or amortization schedule | Both download controls are removed |
| Editing a document builder template | The editor warns you off |
| Working the Communications inbox | It scrolls sideways and the list will not collapse |
| Filtering large inventory or rental lists | The search panel is removed |

Everything else — recording a payment, reading a loan, approving a change request, checking the [dashboard](./dashboard.md) — works on a phone.
