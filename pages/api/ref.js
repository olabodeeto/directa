import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import Ref from "../../models/refModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  const webhook = req.body;
  if (webhook.event === "direct_debit.payment_successful") {
    const amount = parseInt(req.body.data.object.amount) / 100;
    const ref = new Ref({
      amount: req.body.data.object.amount,
      reference: req.body.data.object.reference,
    });

    try {
      const result = await ref.save(); //save user info
      if (result) {
        const trans = await Trans.findOne({
          reference: req.body.data.object.reference,
        });

        const transMemberID = trans.memberID;
        const user = await User.findOne({ _id: transMemberID });
        if (!user) return;
        const currentUserBalance = user.balance;
        const newBalance = amount + currentUserBalance;

        const memberAccountUpdate = await User.findOneAndUpdate(
          { _id: transMemberID },
          { balance: newBalance, planActive: true },
          { new: true },
          (error, result) => {
            if (result) {
              return result;
            } else {
              console.log(error);
            }
          }
        )
          .clone()
          .catch(function (err) {
            console.log(err);
          });

        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send({ message: "Error" });
    }
  }
  //   res.status(200).json("success");
}

export default protectAPI(handler);
