import { Constants } from "../Constants";

export default class UserClass {
  constructor(fullname, email, planName, planAmount, password) {
    this.fullname = fullname;
    this.email = email;
    this.planName = planName;
    this.planAmount = planAmount;
    this.password = password;
  }

  async createAccount() {
    let userData = {
      fullname: this.fullname,
      email: this.email,
      planName: this.planName,
      planAmount: this.planAmount,
      password: this.password,
    };

    let res = await fetch(`${Constants.baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    let data = await res.json();
    return data;
  }
}
