import { Constants } from "../Constants";
export default class PaymentClass {
  async monoPayment(amount, memberID, savingsAmount, currentBal) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "mono-sec-key": Constants.monoKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "recurring-debit",
        amount: amount,
        description: "WEEKLY SAVINGS",
        reference: memberID,
        meta: {
          memberID: memberID,
          savingsAmount: savingsAmount,
          currentBal: currentBal,
        },
        duration: 1,
        interval: "weekly",
        redirect_url: `${Constants.siteUrl}/Home`,
      }),
    };
    try {
      const res = await fetch(
        "https://api.withmono.com/v1/payments/initiate",
        options
      );
      const data = res.json();
      return data;
    } catch (error) {}
  }
  // Pending payment transaction

  async pendingpay(transdata) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transdata),
    };

    const res = await fetch(`${Constants.baseUrl}/pending`, options);
    const data = res.json();
    return data;
  }

  async checkPending(memberID) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberID),
    };

    const res = await fetch(`${Constants.baseUrl}/checkpending`, options);
    const data = res.json();
    return data;
  }

  async currentBalance(memberID) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberID),
    };

    const res = await fetch(`${Constants.baseUrl}/balance`, options);
    const data = res.json();
    return data;
  }
}
