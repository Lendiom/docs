---
id: waiving-late-fees
title: Waiving Late Fees
---

Sometimes forgiving a late fee is the right move: it can be the nudge that gets a client caught up and back on track. Lendiom now lets you waive a late fee at any point, even after the client has already made payments that covered it. The system takes care of the math for you.

**This feature is in beta.** Please read the "Before you waive" section below so you can help us catch anything that doesn't look right.

## Waive, Reverse, or Delete?

- **Waive** forgives the fee as a business decision. Use it any time you've told a client "get your payment in and I'll take care of the late fee." It works whether or not the fee has been paid.
- **Reverse** is for fees that were applied by mistake. It only works when the fee is the most recent activity on the loan.
- **Delete** removes a reversed fee so the system can apply it fresh. Waived fees cannot be deleted, and the system will never re-apply a waived fee.

## How to waive a late fee

1. Open the loan and go to its **Transactions**.
2. Find the late fee and open the **Actions** menu on that row.
3. Choose **Waive (Beta)**.
4. Add a comment if you'd like a note about why (for example, "client paid in full on 12/26"). The comment becomes part of the loan's record.
5. Confirm.

The fee will now show as **Reversed** with the reason **Waived**, and it stays visible in the loan's history so there's always a record of what was forgiven and when.

## What happens to money the client already paid?

Nothing is lost, and nobody needs a refund. If a payment already covered some or all of the fee, that money is put back through the loan's normal payment order, exactly as if the fee had never existed. In most cases it ends up reducing the client's principal balance, which also slightly lowers the interest they'll owe going forward.

**A quick example.** A $10.29 late fee is applied, and the client's next payment of $267.61 covers the fee plus their installment. If you later waive that fee, the payment is recalculated: the $10.29 that had gone to the fee now goes to principal instead, and the loan's balance drops by $10.29. The interest portion of the payment doesn't change, and none of the client's other payments are touched.

If the fee hadn't been paid yet, waiving simply removes it from what the client owes.

## Before you waive (beta)

While this feature is in beta, we'd like your help double-checking it:

1. **Before waiving**, take screenshots of the loan's details page and the transactions list.
2. **After waiving**, compare: the fee should show as waived, and if it had been paid, the loan's principal should be lower by the amount that was reallocated.
3. **If any number looks off**, email [support@lendiom.com](mailto:support@lendiom.com) with a detailed report: what you expected, what you got, and both sets of screenshots showing the full loan details. Your reports directly make this feature better.

## FAQ

- **Why don't I see the Waive option?** Waive appears only on late fees that are currently in effect (status Success). You also need permission to update loan transactions; if you don't see it, ask your organization's admin. If the loan has been paid off, refinanced, or closed out, fees on it can no longer be waived.
- **Can I undo a waive?** Not directly, so waive with the same care you'd use forgiving a fee on paper. If you waived the wrong fee, contact support and we'll help you sort it out.
- **Why can't I delete a waived fee?** The waived fee's record is what tells the system not to charge that fee again. Deleting it would let the fee come back on its own, so Lendiom keeps it in place to protect the waiver.
- **Will the system re-apply the fee later?** No. A waived fee is permanently forgiven, even if the payment it was attached to is still overdue.
- **The waive was blocked with a message about a later payment or payoff.** A few situations need a step first, and the message will say which: for example, if the loan was paid off after the fee, or a payment was recorded out of order, you'll need to reverse that transaction before the fee can be waived. If you're not sure what to do, contact support with the loan and we'll walk through it with you.
