---
id: signing-in
title: Signing In and Recovering Your Account
---

This page covers signing in to the Lendiom app at [https://app.lendiom.com/auth/login](https://app.lendiom.com/auth/login) — the staff side, used by you and the people you [invite to your organization](../guides/adding-users-to-your-organization.md). Clients do not sign in here; they use Lendiom Pay, which has [its own sign-in](../../pay/logging-in.md).

## Signing in

1. Open the sign-in page.
2. Enter your email address and password.
3. Choose **Login**.

Your email address is matched without regard to capitalization or spaces, so `Jane.Doe@example.com` and `jane.doe@example.com` reach the same account. The password is matched exactly.

If your browser supports passkeys, a **Sign in with passkey** button appears above the Remember me row. It works with the email field empty, so you can go straight to your device's biometrics or PIN. See [Passkey](./passkey.md) for setting one up.

Once you are in, Lendiom selects your first organization and opens its inventories page. If you followed a link into the app before signing in, you land on that page instead. If your account belongs to no organization yet, you are sent to organization creation.

Every successful sign-in — by password or by passkey — sends a **New Login Detected** email and creates an in-app notification. The email lists the time, the sign-in method, the browser, the operating system, and the IP address, and it says whether a two-factor code or a recovery code was used. If one of those arrives and it was not you, reset your password immediately using the steps further down this page.

![The Lendiom sign-in screen with email, password, passkey and Remember me](/img/docs/app/security/signing-in/01.png)

:::caution The Remember me checkbox does nothing

**Remember me** is checked by default and is never sent anywhere. Clearing it changes nothing, and leaving it checked extends nothing. Your session length is fixed: the token issued at sign-in is good for 14 days in that browser, after which you are asked to sign in again. There is no "sign out everywhere" control — a token stays valid on the device that holds it until those 14 days run out.

:::

If sign-in is rejected, the message tells you which part failed:

| Message | What it means |
| --- | --- |
| `Invalid password.` | The password did not match — or no account exists for that email. Both cases return the same message on purpose, so a stranger cannot use the sign-in page to discover who has an account. Check the address before you assume the password is wrong. |
| `Invalid authentication code. Please try again.` | The six-digit code was wrong or has already rolled over. |
| `Recovery code not recognized or already used.` | Recovery codes work once each. Try another from your list. |
| `Two-factor authentication is not configured for this account.` | Two-factor is switched on but its secret is missing. Contact support. |
| `Internal error while logging in.` | Anything else. See [Error Messages in Lendiom](../how-it-works/error-messages.md). |

If the page sits and does nothing, a **Trouble logging in?** link appears after ten seconds. It clears the browser storage for the site and reloads, which resolves a stale session left behind by an older version of the app.

## When two-factor authentication is enabled

Two-factor uses an authenticator app (TOTP) and is turned on under **Account Settings → Security → Two-Factor Authentication**. With it enabled, sign-in becomes two steps.

After your email and password are accepted, a **Two-factor verification** dialog opens. It has no close button and cannot be dismissed by clicking outside it — the only ways out are a valid code or reloading the page.

| What you enter | Notes |
| --- | --- |
| Authentication code | The six digits from your authenticator app. Codes rotate every 30 seconds, and Lendiom accepts the code from one cycle either side of the current one, so a phone clock that is a few seconds off still works. |
| Recovery code | Choose **Enter recovery code** in the dialog. You get 10 codes when you enroll; each one works once and is consumed when used. |

![The two-factor verification dialog over the sign-in page, with its notice above the six-box authentication code input, the verify button, and the recovery code link beneath](/img/docs/app/security/signing-in/03.png)

Regenerate your recovery codes from the same Security card — that replaces all 10 at once, and the previous set stops working. Regenerating requires your current password, as does turning two-factor off.

:::tip Write your recovery codes down before you need them

Recovery codes are the only way back in if you lose the phone holding your authenticator, and they are shown once, when they are generated. Keep them somewhere separate from your Lendiom password.

:::

## There is no in-app password change

**Account Settings → Security → Additional Security** lists two rows, **Account Password** ("Change your account password") and **Security Questions**. Both have a **Coming Soon** button that is permanently disabled.

![The Additional Security card in Account Settings, covering the account password and security questions](/img/docs/app/security/signing-in/02.png)

:::caution Those two rows do nothing today

Neither button is clickable, and no screen behind them exists. There is no security-questions feature on the account at all. The forgot-password email is the **only** way to set a new password — including when you know your current password and want to change it as routine hygiene.

:::

Your current password is still required in three places, so keep it where you can find it:

- Changing the email address you sign in with.
- Turning off two-factor authentication.
- Regenerating your recovery codes.

## Resetting your password

1. On the sign-in page, choose **Forgot your password?**.
2. Enter your email address and choose **Request Reset**.
3. Open the **Lendiom Password Reset** email and follow its link, which carries the token and your email address and opens the form with both filled in. You can instead copy the token out of the email into the **Password Reset Token** field on the page you already have open.
4. Enter the new password twice and choose **Reset Password**.

The confirmation message after step 2 is the same whether or not an account exists for that address: "Password request sent. If an account was found with the provided address, you will receive an email." Nothing on that screen tells you the address was right, so check the inbox and the spam folder before requesting again.

![The Forgot Password page after a reset has been requested, the email address filled in and greyed above the reset token, new password and confirmation fields and the Reset Password button](/img/docs/app/security/signing-in/04.png)

Reset tokens expire **24 hours** after they are issued and work once. Requesting another reset replaces the previous token, so if you clicked **Request Reset** twice, only the newest email works — an older link returns "Invalid token. It may have expired." When that happens, choose **Invalid token? Request reset again** to start over.

A successful reset signs you straight in and sends a **Password Successfully Reset** email.

:::info Opening the forgot-password page signs you out

The page logs you out of the browser you opened it in, before you type anything. Lendiom refuses to process a reset for a signed-in session, so this is deliberate — but it does mean that clicking the link out of curiosity ends your session.

:::

:::caution With two-factor on, a successful reset reports an error

If your account has two-factor enabled, the reset itself works and your new password is saved, but the automatic sign-in that follows cannot complete without a code. The page reports "An unknown error occurred while resetting the password." Ignore it. Go to the sign-in page and sign in with the new password and your authenticator code — do not request a second reset, which would invalidate the password you set.

:::

## Password requirements

Lendiom enforces one rule on the password itself: it cannot be empty. The form additionally requires the **Password** and **Confirm Password** fields to match. There is no minimum length, no character-class requirement, no check against previous passwords, and no expiration.

:::tip

Because nothing stops a weak password, the strength of a Lendiom account is whatever you choose to make it. Use a long, unique passphrase from a password manager, and add [a passkey](./passkey.md) or two-factor authentication. A [role](./roles-and-permissions.md) limits what a compromised account can reach, but does not stop the sign-in itself.

:::

## Verifying your email address

A new account starts unverified, and changing your sign-in email address makes the account unverified again.

While your address is unverified, every page in the app bounces you to the verification screen — the dashboard, loans, clients, and reports all redirect, keeping the page you wanted in the address so you return there afterward. The app is unusable until you verify.

![The Email Verification screen, its notes banner offering to resend the message above the greyed-out email address, the verification token box and the Verify Email button](/img/docs/app/security/signing-in/05.png)

The verification email contains a link that fills in the token and submits it for you. You can also paste the token into the field by hand. Verification tokens last **three days**. If yours expired, choose **Click here and we will resend it** on the verification screen — that issues a fresh token and retires the old one, so use the newest email.

After verifying, brand-new accounts continue to the welcome and onboarding flow; everyone else lands back on Account Settings.

:::warning Changing your sign-in email locks you out until you verify the new address

Under **Account Settings → Basic**, changing the email address prompts for your current password and then marks the account unverified. You are redirected to the verification screen and stay there until the new address is confirmed — so make sure you can receive mail at the new address before you save the change.

:::
