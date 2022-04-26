import Trans from "../../models/transactionModel";
import protectAPI from "../../middlewares/protectAPI";

async function handler(req, res) {
  const trans = new Trans({
    memberID: req.body.memberID,
    amount: req.body.amount,
    reference: req.body.reference,
    status: "false",
  });

  try {
    const result = await trans.save(); //save user info
    if (result) {
      console.log(result);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
  //   res.status(200).json(req.body);
}

export default protectAPI(handler);
