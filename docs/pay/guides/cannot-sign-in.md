---
id: pay-cannot-sign-in
title: I Cannot Sign In
---

Signing in to Lendiom Pay takes two things: your account number, and a six-digit code we text to the
phone number on your account. If either one is not working, find your symptom below and follow the
fix for it.

<!-- screenshot: the Lendiom Pay sign-in screen at phone width, showing the "Account Number" field with the ID-card icon, the blue "Get Code" button, and the "I forgot my account number" link below it -->

:::info Who to ask for help

The company you buy or rent from set up your account. They own your account number, the phone number
and email on file, and whether your account is active. For anything on that list, contact them — not
Lendiom. Throughout this page, "the company you pay" means that company — whoever you send your
payments to.

:::

## "Invalid Account Number" after you press Get Code

The red box reads *"We could not find an account by the account number you provided."*

**First, check the capitalization.** Account numbers are case-sensitive. `A7bK2` and `a7Bk2` are two
different accounts, and only one of them exists. Extra spaces are ignored, so those are safe, but an
uppercase letter typed in lowercase will fail every time.

**Then check for look-alike characters.** Account numbers are letters and numbers only — never an
underscore, a hyphen, or any other punctuation. If you typed one of those, delete it. They also leave
out the letters `I`, `L`, and `O` in either case, precisely so nothing can be mistaken for `1` or
`0`, so a character that looks like one of those letters is really the digit. The pairs that do trip
people up are `5` versus `S`, `2` versus `Z`, `8` versus `B`, `6` versus `b`, and `9` versus `g` or
`q`. If the company you pay texted or emailed the account number to you, copy and paste rather than
retyping.

**If the account number is definitely correct, the problem is not you.** The same red box appears
when your account number is right but we still could not send the text — when the number on file is a
landline instead of a mobile phone, when no phone number is on file, or when the account has been
marked inactive. Nothing you can type will fix those. Contact the company you pay and ask them to
confirm the account number and the mobile number on your account.

## The text never arrives

Give it a minute; texts can lag. If it still has not shown up:

**Do not press "Didn't get the code?" right away.** For the first minute after a code is sent, that
button does nothing at all. The screen looks like it worked, but no second text goes out. Wait a full
minute, then press **Didn't get the code?** once. That sends a genuinely new code.

**Check the original text first.** The code from the first text stays valid for five minutes, so the
fastest fix is often finding the message you already received. It looks like this:

> Your Lendiom Pay temporary code is 510475
>
> Do not share this code with anyone. It expires in 5 minutes.

If a minute has passed, you pressed the button, and still nothing arrives, your phone may have opted
out of texts — see the next section.

## "We can't text your authorization code"

<!-- screenshot: the sign-in screen at phone width with the yellow "We can't text your authorization code" alert expanded, showing the two numbered steps and the yellow "Text START" button -->

This yellow panel means the phone number on your account cannot receive our texts. Almost always,
that phone replied **STOP** to a text at some point — sometimes years ago, sometimes by accident.
Carriers treat STOP as permanent until you undo it.

The panel gives you a **Text START** button and a number to text. That works when the STOP went to
Lendiom's code number, but there are two ways it can leave you stuck:

- **You replied STOP to that company's own texting number.** Payment reminders often come from their
  number, not Lendiom's. Texting START to the number shown on the panel will not undo a STOP sent to
  a different number. If START does not fix it, reply **START** to the most recent text thread you
  have from them.
- **The number on file is flagged as undeliverable.** The same yellow panel appears when texts to
  your number keep failing — a disconnected line, a mistyped digit. No amount of texting START will
  help. The company you pay has to correct the number.

:::caution Send START from the phone on file

Texting START from a different phone does nothing. It has to come from the exact number on your
account. If you no longer have that phone, skip straight to contacting the company you pay and ask
them to put your current mobile number on the account.

:::

After you text START, wait a moment, then press **Get Code** again.

## The code is rejected

<!-- screenshot: the sign-in screen at phone width with the "Auth Code" field filled in and a red toast notification across the top reading "auth token expired" -->

Whatever the message says, the screen does the same thing first: the **Auth Code** box disappears and
the red **Invalid Account Number** banner opens, as though the account number were the problem. It is
not. A rejected code simply drops you back to the account-number step, so **Didn't get the code?** is
no longer on screen — the button that sends a new code is now **Get Code**, the same one you started
with. Your account number is still fine; leave it as it is.

From there, a few different messages can appear, and each one has a different fix.

**"auth token expired."** Codes are good for five minutes from the moment they are sent. Press
**Get Code** for a fresh one and enter it promptly.

**"invalid token, a new auth token was previously sent."** You are typing a code from an older text.
Requesting a new code retires the old one. Scroll to the newest message in the thread and use that
code.

**"authorization code already used."** Each code works once. If you signed in on another tab or
device, or tapped **Sign In** twice, press **Get Code** for a new one.

**"too many invalid authorization code attempts."** After five wrong entries, that code is thrown
out. Press **Get Code** at least a minute after the last code was sent — a new code resets the
counter and you are back to normal. You are not locked out of your account.

**"invalid token"** with no other detail is a plain typo. The code is six digits with no spaces or
dashes. Re-read the text and try again.

## You forgot your account number

On the sign-in screen, tap **I forgot my account number**, enter the phone number on your account,
and tap **Text Me My Account Number**. We text back your account number plus a link that signs you in
directly.

<!-- screenshot: the "Recover Your Account Number" screen at phone width, showing the phone number field and the "Text Me My Account Number" button -->

The confirmation reads the same whether or not we found a match — that is deliberate, so nobody can
use this page to fish for account numbers. If no text arrives, the number you entered is probably not
the one on the account. The same one-minute wait applies here, so tapping the button repeatedly will
not send more texts.

If that does not work, the company you pay can look up your account number for you. Lendiom Support
cannot.

## You get signed out constantly

When you sign in, the **Remember Me** checkbox is ticked by default. Leave it ticked and the sign-in
lasts about a month, even after you close your browser.

Untick it and two things change: the sign-in lasts only about a day, and it is tied to that browser
session, so closing the tab or the browser signs you out immediately. On a phone, where tabs get
recycled in the background, that can feel like being logged out at random.

If a **Session Expired** box appears while you are using the site, try **Refresh** first. If it comes
back, choose **Log Out** and sign in again.

## "Account Not Setup" on the Payment Methods page

<!-- screenshot: the Payment Methods page at phone width showing the yellow "Account Not Setup" alert and no payment method cards -->

This one is not a sign-in problem — you are signed in fine. Adding a card or bank account requires
both an **email address** and a **mailing address** on your account. If either is missing, the
Payment Methods page shows this warning and hides the buttons for adding one.

You cannot add these yourself. Give the company you pay your email address and mailing address, and
the buttons appear once they save them. See
[Adding a Payment Method](./adding-a-payment-method.md) for what comes next.

## The email verification link does not work

Verifying your email is separate from signing in — you can pay without it. It exists so Lendiom Pay
can email you reminders and status updates. Three things trip people up:

- **The link expires after three days.** If yours is older, request a new one from the **Account**
  page using the **Verify Email** button.
- **Only the newest link works.** Every time a new verification email is sent, all earlier links stop
  working. If you requested it more than once, open the most recent email.
- **The link only works on a device where you are already signed in.** Opening it in a different
  browser, or on a computer when you signed in on your phone, drops you at the sign-in screen without
  verifying anything. Sign in on that device first, then open the link there.

<!-- screenshot: the Account page at phone width showing the blue "Verify Email" header button and the email card below it -->

If the email never arrives at all, check your spam folder, then confirm with the company you pay that
the email address on your account is spelled correctly. See
[Updating Information](./updating-information.md) for how to request a change.

## Still stuck

Contact the company you pay — the company you buy or rent from. They can see your account, correct
your phone number, and confirm your account number. If they believe something is broken on Lendiom's
side, they can reach Lendiom Support themselves.

For a walkthrough of a normal sign-in, see [How do I log into Lendiom Pay?](../logging-in.md).
