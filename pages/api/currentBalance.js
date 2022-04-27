import User from "../../models/userModel";
import protectAPI from "../../middlewares/protectAPI";

async function handler(req, res) {
  if (req.method === "POST") {
    const user = await User.findOne({ _id: req.body.memberID });
    const balance = user.balance;
    console.log(user);
    res.status(200).json(balance);
  } else {
    res.status(500).json("Invalid request method");
  }
}

export default protectAPI(handler);
