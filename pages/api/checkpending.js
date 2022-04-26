import Trans from "../../models/transactionModel";
import protectAPI from "../../middlewares/protectAPI";

async function handler(req, res) {
  if (req.method === "POST") {
    const trans = await Trans.find({
      memberID: req.body.memberID,
      status: "false",
    });
    res.status(200).json({ data: trans });
  } else {
    res.status(500).json("Invalid request method");
  }
}

export default protectAPI(handler);
