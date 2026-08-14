---
id: joining-an-organization
title: Joining an Organization You Were Invited To
---

Someone at a Lendiom organization has invited you to collaborate with them. This page is your side of that process: what arrives in your inbox, what the link does, and what changes the moment you accept.

If you are the one *sending* invitations, see [Adding Users to Your Organization](../guides/adding-users-to-your-organization.md) instead.

## The invitation email

Lendiom sends the invitation to the exact email address the inviter typed. The subject line reads **Invited to Lendiom by _First Last_ for _Organization Name_!**, and the body opens with "Hi _YourFirstName_ 🎉" followed by the organization name and the full name of the person who invited you. The button in the middle is labeled **Accept invitation**.

The email closes by telling you to accept if you know the person and the organization, and to ignore it if you do not. Ignoring is a valid outcome: there is no **Decline** button anywhere in Lendiom, so an unwanted invitation is handled by doing nothing and asking the sender to remove it.

<!-- screenshot: the Lendiom invitation email open in an inbox, showing the "Hi Jane 🎉" greeting, the organization name and inviter name stacked in the middle, and the blue "Accept invitation" button -->

If you already had an active Lendiom account before the invitation was sent, you also get an in-app notification titled **Invitation to _Organization Name_** in the notification bell the next time you sign in. If the invitation created a brand-new account for you, there is no bell notification — the email is the only signal.

## The accept link

The **Accept invitation** button points at a URL shaped like this:

`https://app.lendiom.com/auth/invite-accept/<invite-code>/<your-email>`

Both pieces matter. Lendiom looks up the invitation by the code, then checks that the email in the link matches the account the invitation was created for. A mismatch returns `invalid invite code` with a `404` status — the same error a nonexistent code produces.

:::caution

Do not retype, shorten, or hand-edit the link. The code is long and random, and the email segment is URL-encoded, so `jane@example.com` appears as `jane%40example.com`. Forwarding the email to another address does not help either; the link still only works for the original address.

:::

The invite code has no expiration date, so an invitation from months ago still opens — unless someone removed the pending member from the organization's Members table, which deletes the record and kills the link immediately.

## What happens depends on how you arrive

| Your state when you open the link | What Lendiom does |
| --- | --- |
| Signed in as the invited account | Accepts the invitation for you, with no form to fill in, and drops you into the organization |
| Signed in as a *different* Lendiom account | Blocks with an **Invite for Someone Else** dialog naming both people, then sends you back to the app |
| Signed out, and the invitation created your account | Shows a sign-up form where you set your name and a new password |
| Signed out, and you already had a Lendiom account | Shows the same form, but asks for your **existing** password so it can sign you in afterward |

Most signed-out pages in Lendiom redirect you into the app when you already have a session. The accept page is one of the few that does not, which is what makes the first row of the table work.

![The Accept Invite page, with the email and invite code pre-filled and locked and the name and password fields to complete](/img/docs/app/security/joining-an-organization/02.png)

## Accepting while already signed in

If you are signed in as the invited account, there is nothing to click. The form appears greyed out under a "Loading..." spinner while Lendiom accepts the invitation, refreshes your profile, switches your active organization, and lands you on that organization's **Inventory** page. The **Sign Up** and **Log In** buttons are not rendered at all in this state.

If you are signed in as someone else, you get a dialog reading *"The invite you are attempting to accept is for someone other than you"*, naming both the invited person and you. Its only button is **Whoopies!**, which returns you to the app. Sign out and open the link again, or open it in a private window.

## When the invitation created your account

If you had never used Lendiom before, the inviter's action created a shell account: your name and email exist, but there is no password on it and it cannot be signed into. That shell is what the accept form completes.

1. Open the link from the email.
2. **Email** and **Invite Code** are filled in and locked. You cannot change them here.
3. **First name** and **Last name** are pre-filled with what the inviter typed. Correct them if they are wrong — on this path, your edits are saved.
4. Enter a **Password**, then repeat it in **Confirm Password**. Neither field can be left empty. Lendiom enforces no length or complexity rule here, so pick a strong one.
5. Click **Sign Up**.

Lendiom sets that password on your account, marks your email address as verified, and signs you in. You never receive a separate "verify your email" message — accepting the invitation is the verification.

:::caution

**Confirm Password is not actually compared.** Both boxes must be filled in, but a mismatch does not stop the form — there is no "Passwords must match" error and **Sign Up** proceeds as if the two agreed. Whatever you typed in the **Password** box becomes your password; the **Confirm Password** value is discarded. Type carefully, because a typo in the top box is what you will have to log in with. If you cannot get back in afterwards, use **Forgot password** to set a new one.

:::

## When you already have a Lendiom account

If your email address was already on a Lendiom account, no new account is created. The invitation simply adds a membership to your existing login, and you keep your current password.

The form looks almost identical, with two differences that are easy to misread:

- The **Confirm Password** field is not shown. The single **Password** box wants the password you already use for Lendiom.
- Nothing you type here changes your password. Lendiom accepts the invitation first, then uses the password to sign you in.

:::caution

On this path the **First name** and **Last name** fields are editable but have no effect. Lendiom only writes those values back when the account was created by the invitation. If you already had an account, changes you make here are silently discarded — update your name in Account Settings after you sign in.

:::

:::warning

Because acceptance happens *before* sign-in, a wrong password produces a confusing result: you see **Invalid password.** and stay on the page, but you are already a member of the organization. The invite code has been consumed, so reopening the link now fails. Do not ask for a new invitation — go to the normal login page and sign in, and the organization will be there. If you cannot remember the password, use **Forgot password** first.

:::

## What acceptance changes

| Change | Detail |
| --- | --- |
| Your membership | Status moves from **Invited** to **Active** in the organization's Members table |
| Your email | Marked verified, and any pending verification token is cleared |
| The invite code | Erased from the record, which makes the link single-use |
| Your email inbox | You get **Welcome to Lendiom & _Org_!** for a new account, or **Invite Accepted to _Org_ on Lendiom** if you already had one |
| The inviter's inbox | They get **_Your Name_ Accepted Your Invite to _Org_ on Lendiom** |
| Notifications | You get an "Invite to _Org_ Accepted!" notification, plus a "Welcome to Lendiom!" one if the account was new. The inviter gets one naming you and your role |

After acceptance you land on the organization's **Inventory** page. The confirmation email's **Access Now** button points at that organization's dashboard instead.

<!-- screenshot: the Lendiom app immediately after accepting, showing the Inventory page with the newly joined organization selected in the organization switcher -->

Each organization's invitation is separate. If two companies invite you, you get two emails with two codes and accept each on its own. Both memberships hang off the same login, and you switch between them with the organization switcher.

## After you join

Your role was chosen by whoever invited you, and it decides what you can open and change — see [Roles and Permissions](./roles-and-permissions.md). You cannot change your own role; ask an administrator at that organization.

Once you are in, consider adding a [passkey](./passkey.md) so you can sign in without the password you just set.

## If acceptance fails

<!-- screenshot: the Accept Invite page with a red error notification in the top-right corner reading "invalid invite code" with the Status, Code, and Request ID line beneath it -->

Errors here appear as a red notification whose second line reads `Status: …, Code: …, Request ID: …`, a format covered in [Error Messages in Lendiom](../how-it-works/error-messages.md).

| What you see | Most likely cause | What to do |
| --- | --- | --- |
| `invalid invite code` with status `404` | The invitation was already accepted, the pending member was removed, or the link was altered | Ask the organization to check the Members table and send a fresh invitation |
| **Invite for Someone Else** dialog | A different Lendiom account is signed in on this browser | Sign out, or open the link in a private window |
| **Invalid password.** after clicking Sign Up | Wrong password for an account you already had | You are already a member. Sign in normally at the login page |
| **Unknown email provided, no account found.** | The sign-in step could not match the email | Contact support with the Request ID |

:::caution

If an error notification appeared the moment the page opened, the invitation never loaded and the **Sign Up** button stops working. You can fill in every field, click it, and nothing happens: no error, no progress, no navigation. This is not a slow request. Reload the page from the emailed link; if the error returns, the invitation itself is no longer valid.

:::

Lendiom has no resend button for invitations. If a link is dead, the organization must remove the pending member and invite you again, which generates a new code and a new email.

![The prompt shown when an invite is opened while signed in as a different person](/img/docs/app/security/joining-an-organization/05.png)

If none of the above applies, email [Lendiom Support](mailto:support@lendiom.com) with the exact message text and the Request ID from the notification.
