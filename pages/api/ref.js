import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import Ref from "../../models/refModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  const webhook = req.body;

  if (webhook.event === "direct_debit.payment_successful") {
    const hookreference = req.body.data.object.reference;
    const amount = parseInt(req.body.data.object.amount);

    const trans = await Trans.findOne({
      reference: req.body.data.object.reference,
    });

    if (trans._id) {
      try {
        const ref = new Ref({
          amount: req.body.data.object.amount,
          reference: req.body.data.object.reference,
        });
        const result = await ref.save(); //save user info
        if (result) {
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(500).send({ message: "Error" });
      }
    }

    // if (trans) {
    //   const transMemberID = trans.memberID;
    //   // find user using the memberid from pending transaction
    //   const user = await User.findOne({ _id: transMemberID });
    //   if (!user) return;
    //   const currentUserBalance = user.balance;
    //   const newBalance = amount + currentUserBalance;

    //   const memberAccountUpdate = await User.findOneAndUpdate(
    //     { _id: transMemberID },
    //     { balance: newBalance, planActive: true },
    //     { new: true },
    //     (error, result) => {
    //       if (result) {
    //         return result;
    //       } else {
    //         console.log(error);
    //       }
    //     }
    //   )
    //     .clone()
    //     .catch(function (err) {
    //       console.log(err);
    //     });

    //   if (memberAccountUpdate._id) {
    //     const memberTransactionUpdate = await Trans.findOneAndUpdate(
    //       { reference: hookreference },
    //       { status: "true" },
    //       { new: true },
    //       (error, result) => {
    //         if (result) {
    //           return result;
    //         } else {
    //           console.log(error);
    //         }
    //       }
    //     )
    //       .clone()
    //       .catch(function (err) {
    //         console.log(err);
    //       });

    //     if (memberTransactionUpdate._id) {
    //       console.log(memberTransactionUpdate);
    //       res.status(200).json("success");
    //     }
    //   }
    // }
  }
}

// import Ref from "../../models/refModel";
// import protectAPI from "../../middlewares/protectAPI";

// let secret = "sec_YToy9KMlSJV7w97ZsCXc";

// async function handler(req, res) {
//   const webhook = req.body;
//   if (webhook.event === "direct_debit.payment_successful") {
//     const ref = new Ref({
//       amount: req.body.data.object.amount,
//       reference: req.body.data.object.reference,
//     });

//     try {
//       const result = await ref.save(); //save user info
//       if (result) {
//         console.log(result);
//         res.status(200).send(result);
//       }
//     } catch (error) {
//       res.status(500).send({ message: "Error" });
//     }
//   }
//   //   res.status(200).json("success");
// }

// export default protectAPI(handler);

export default protectAPI(handler);
