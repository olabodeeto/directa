import protectAPI from "../../middlewares/protectAPI";
import bcrypt from "bcrypt";
import User from "../../models/userModel";

async function handler(req, res) {
  if (req.method === "POST") {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      plan: req.body.planName,
      savingsAmount: req.body.planAmount,
      password: hashPassword,
      planActive: false,
      balance: 0,
    });

    try {
      const result = await user.save(); //save user info
      if (result) {
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send({ message: "Error" });
    }
  }
}
export default protectAPI(handler);
