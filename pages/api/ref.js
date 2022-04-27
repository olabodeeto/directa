import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  res.status(200).json("success");
}

export default protectAPI(handler);
