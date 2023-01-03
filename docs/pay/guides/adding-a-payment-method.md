---
id: adding-payment-method
title: Adding a Payment Method
---

A payment method is where the money comes from whenever you make a payment. We currently support:

* Debit/Credit Cards
* Bank Accounts (we use [Plaid](https://plaid.com/why-is-plaid-involved/))

## Adding One
To start adding a payment method, please visit: https://pay.lendiom.com/payment-methods. When the page loads, you will see the following (if you have no payment methods):

![Empty Payemnt Methods Page Screenshot](/img/docs/pay/guides/adding-a-payment-method/empty-payment-methods.png)

### Adding a Card
Click on the **New Card** button and several inputs will appear. Here is a screenshot of it:

![Link Card Modal Screenshot](/img/docs/pay/guides/adding-a-payment-method/card-link-modal.png)

What you need to input is the name on the card, the card number, the expiration date and the CVC. Once you click save, the card will be saved and added to your account for future usage.

:::note Stripe

Your card information is securely stored with [Stripe](https://stripe.com/). None of the information is saved on Lendiom Pay's server nor does it pass through our network.

:::

### Adding a Bank
Click on the **Link Bank** button and then some information will be displayed. Once you have read it, click on the blue **Connect My Bank** and you will start the process with [Plaid](https://plaid.com/why-is-plaid-involved/). Follow the guided process and once completed you will be brought back to Lendiom Pay.

:::note Plaid

Lendiom Pay utilizes [Plaid](https://plaid.com/why-is-plaid-involved/) to securely access your bank account. None of the information is saved on Lendiom Pay's server nor does it pass through our network.

:::
