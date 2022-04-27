import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import Ref from "../../models/refModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  const webhook = req.body;

  switch (webhook.event) {
    case "direct_debit.payment_successful":
      // do something with webhook.data.account;
      try {
        const ref = new Ref({
          amount: req.body.data.object.amount,
          reference: req.body.data.object.reference,
        });
        const result = await ref.save(); //save the webhook returned data
        if (!result) return;
        //Get the pending transaction details using the webhook reference
        const trans = await Trans.findOne({
          reference: req.body.data.object.reference,
        });

        if (!trans) return;
        const transMemberID = trans.memberID;
        // find the member using the pending transaction member's id
        const user = await User.findOne({ _id: transMemberID });
        if (!user) return;

        //Calcutale the new member balance
        const currentUserBalance = user.balance;
        const amount = parseInt(user.savingsAmount);
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

        if (memberAccountUpdate) {
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(500).send({ message: "Error" });
      }
      break;
  }

  //   if (webhook.event === "direct_debit.payment_successful") {
  //     const amount = parseInt(req.body.data.object.amount) / 100;
  //     const ref = new Ref({
  //       amount: req.body.data.object.amount,
  //       reference: req.body.data.object.reference,
  //     });

  //     try {
  //       const result = await ref.save(); //save user info
  //       if (result) {
  //         const trans = await Trans.findOne({
  //           reference: req.body.data.object.reference,
  //         });

  //         const transMemberID = trans.memberID;
  //         const user = await User.findOne({ _id: transMemberID });
  //         if (!user) return;
  //         const currentUserBalance = user.balance;
  //         const newBalance = amount + currentUserBalance;

  //         const memberAccountUpdate = await User.findOneAndUpdate(
  //           { _id: transMemberID },
  //           { balance: newBalance, planActive: true },
  //           { new: true },
  //           (error, result) => {
  //             if (result) {
  //               return result;
  //             } else {
  //               console.log(error);
  //             }
  //           }
  //         )
  //           .clone()
  //           .catch(function (err) {
  //             console.log(err);
  //           });

  //         res.status(200).send(result);
  //       }
  //     } catch (error) {
  //       res.status(500).send({ message: "Error" });
  //     }
  //   }
  //   res.status(200).json("success");
}

export default protectAPI(handler);
