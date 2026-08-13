---
id: two-factor
title: Two-Factor Authentication and Recovery Codes
---

Two-factor authentication adds a second step to your sign-in: your password, then a six-digit code from an authenticator app on your phone. Lendiom pairs it with a set of ten single-use recovery codes for the day your phone is not in your hand. Both live in **Account Settings → Security Settings**, in the **Two-Factor Authentication** card.

Two-factor is per person and opt-in. Nobody in your organization can require it for you, and no administrator can turn it on, reset it, or remove it from another member's account.

<!-- screenshot: Account Settings → Security Settings, the Two-Factor Authentication card in the disabled state, showing the orange "Two-factor authentication is currently disabled." alert and the "Set up authenticator" button -->

## Turn on an authenticator app

1. Open **Account Settings → Security Settings**.
2. In the **Two-Factor Authentication** card, choose **Set up authenticator**.
3. Scan the QR code with your authenticator app — Google Authenticator, 1Password, Authy, and anything else that supports standard TOTP all work.
4. Choose **Next**, type the six-digit code the app is showing, and choose **Confirm**.
5. Save the ten recovery codes that appear. This is the only time you will see them.

The entry your app creates is issued by **Lendiom** and named with your email address, so it is easy to find in a list of accounts.

If the camera will not cooperate, choose **Can't scan? Show setup key** on the QR step. That reveals the same secret as text, with a copy button, for apps that let you type a key in by hand. The QR code and the setup key are two forms of the same secret — use one or the other, not both.

<!-- screenshot: the "Set up your authenticator app" modal showing the QR code, the account line reading the user's email and "Lendiom", and the "Can't scan? Show setup key" link -->

Lendiom expects a standard six-digit code on a 30-second cycle and accepts the code from one cycle either side of the current one, so a phone clock that is a few seconds off still works. A phone clock that is minutes off does not — if every code is rejected, turn on automatic time on the device first.

:::caution
Closing the setup modal before you confirm leaves the enrollment half-finished. The card then reads "Enrollment pending confirmation", but there is no way to resume it: **Set up authenticator** starts over and issues a brand-new secret. Scan the new QR code and delete the old, dead Lendiom entry from your authenticator app so you do not type codes from it later.
:::

Once confirmed, the card shows the status and the dates for enrollment, confirmation, and last verification, and Lendiom sends a "Lendiom: Two-Factor Authentication Enabled" email plus a matching in-app notification, recording the browser, operating system, and IP address behind the change. These security emails always send — there is no preference that turns them off. It also ticks the "Set up two-factor authentication" item on the getting-started checklist.

## Recovery codes

| Detail | How it works |
| --- | --- |
| How many | Ten, generated the moment you confirm enrollment |
| Format | Four groups of four characters, like `A2BC-DEFG-H3JK-LMN4`, using uppercase A–Z and the digits 2–7 |
| Typing them | Case and separators are ignored — `a2bcdefgh3jklmn4` is accepted as readily as the dashed form |
| Reuse | None. Each code works exactly once and is discarded after it is accepted |
| Visibility | Shown once, at generation. Lendiom stores only hashes and cannot show them again |

Use **Copy all codes** and put them somewhere you can reach without your phone: a password manager, a printed sheet in a safe, or both. When you close the codes screen, Lendiom asks "Have you saved your recovery codes?" — that prompt is your last chance.

<!-- screenshot: the "Recovery codes" step of the enrollment modal, ten dashed codes listed in the monospace box, with the "Copy all codes" button below -->

:::caution
Lendiom never tells you how many recovery codes you have left. The count is not on the security card and is not returned by the API, so track your own usage: after you use one, assume the set is thinner than you remember and regenerate.
:::

## Sign in with two-factor turned on

Enter your email and password as usual. Instead of landing in the app, you get a **Two-factor verification** window asking for the six-digit code. Type it and choose **Verify sign-in**.

That window cannot be dismissed or clicked away from — finish it, or reload the page to start over. A wrong code raises "Invalid authentication code. Please try again.", clears the field, and leaves the window open, so you can wait for the next code and retry.

<!-- screenshot: the sign-in page with the "Two-factor verification" modal open, the six-digit code boxes empty, and the "Prefer to use a recovery code? Enter recovery code" link beneath the Verify sign-in button -->

## Use a recovery code

In that same window, choose **Enter recovery code**, paste one code, and verify. The link **Use an authenticator code** switches back.

A recovery code signs you in and is then gone — Lendiom removes it from your set. It does not turn two-factor off, does not re-prompt you to set up a new authenticator, and does not warn you when the set is running low. Every successful sign-in also sends a "New Login Detected" email that notes whether a two-factor challenge or a recovery code was used, which is your signal if it was not you.

## Regenerate your codes

Regenerate whenever you use a code, lose track of the printout, or suspect the list leaked.

1. In the **Two-Factor Authentication** card, choose **Regenerate recovery codes**.
2. Enter your account password to confirm.
3. Save the ten new codes.

The new set replaces the old one completely. Every previously issued code stops working the moment the new ones appear, including any you had not used yet. Lendiom sends a "Recovery Codes Regenerated" email with the count and the time.

The button only works while an authenticator is enrolled. With two-factor off, it is greyed out, and the API refuses the call with code `940106`.

<!-- screenshot: the "Confirm password to regenerate codes" modal with the Current password field focused and the Regenerate button beside Cancel -->

## Turn two-factor off

Choose **Disable** in the card, confirm the warning, and enter your account password. This removes the authenticator secret **and** all remaining recovery codes, and sends a "Two-Factor Authentication Disabled" email. Re-enrolling later produces a new QR code and a fresh set of ten codes; nothing from the old enrollment carries over.

## If you lose both your phone and your codes

There is no self-service reset. Password recovery does not help, because two-factor sits behind the password rather than beside it. What you have left:

- **A passkey.** Signing in with a passkey skips the six-digit prompt entirely, so a registered passkey is the most reliable way back into your own account. See [Passkey](./passkey.md).
- **Support.** Contact Lendiom to have two-factor cleared from your account.

:::caution
Resetting your password while two-factor is on does not clear two-factor, and the reset page does not handle the code prompt. Your new password is saved, but the automatic sign-in at the end of the reset fails with "An unknown error occurred while resetting the password." and an "Invalid token? Request reset again" button appears. Do not request another reset — the password already changed. Go to the sign-in page, use the new password, and enter your code when prompted.
:::

## How this sits alongside passkeys

Both features live in the same **Security Settings** tab, and either one satisfies the getting-started checklist, but they are independent:

| | Authenticator + recovery codes | Passkey |
| --- | --- | --- |
| What it protects | Password sign-in — the code is required after the password | Replaces the password sign-in entirely |
| Effect on the other | None. Enrolling an authenticator does not change your passkeys | Passkey sign-in skips the two-factor prompt, even with an authenticator enrolled |
| Adding one | No password needed to start enrollment | Requires your account password |
| Removing one | Disabling requires your account password | Removing a passkey requires your account password |

Because a passkey bypasses the code prompt, treat your registered devices with the same care as the codes themselves: remove a passkey as soon as its device is lost. Registration, device requirements, and troubleshooting are covered in [Passkey](./passkey.md).

## Errors you may see

| Code | What you see | Why it happens | What to do |
| --- | --- | --- | --- |
| `940100` | `Invalid authentication code. Please try again.` | The six digits are wrong, expired, or the device clock has drifted | Wait for the next code; enable automatic time on the phone |
| `940103` | `Recovery code not recognized or already used.` | Codes are single use, and regenerating invalidates the whole previous set | Try another code, then regenerate the set |
| `940106` | `Two-factor authentication is not configured for this account.`, or a refusal when regenerating codes | Two-factor is flagged on without a usable secret, or you asked for new codes with two-factor off | Enroll an authenticator; if you cannot sign in at all, contact support |
| `88` | `Invalid password.` | The password confirmation on disable, regenerate, or passkey removal did not match | Retype the password — the field is your Lendiom account password, not the six-digit code |

For the wider error reference, see [Error Messages in Lendiom](../how-it-works/error-messages.md).
