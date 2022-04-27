import Ref from "../../models/refModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  const webhook = req.body;
  if (webhook.event === "direct_debit.payment_successful") {
    const ref = new Ref({
      amount: req.body.data.object.amount,
      reference: req.body.data.object.reference,
    });

    try {
      const result = await ref.save(); //save user info
      if (result) {
        console.log(result);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send({ message: "Error" });
    }
  }
  //   res.status(200).json("success");
}

export default protectAPI(handler);
