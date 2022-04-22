export default class UserClass {
  constructor(fullname, email, planName, planAmount, password) {
    this.fullname = fullname;
    this.email = email;
    this.planName = planName;
    this.planAmount = planAmount;
    this.password = password;
  }

  createAccount() {
    let userData = {
      fullname: this.fullname,
      email: this.email,
      planName: this.planName,
      planAmount: this.planAmount,
      password: this.password,
    };
    return "Success";
  }
}
