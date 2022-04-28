import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import Ref from "../../models/refModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc"; //test mode sk

async function handler(req, res) {
  const webhook = req.body;

  switch (webhook.event) {
    case "direct_debit.payment_successful":
      // do something with webhook data;
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
        const newBalance = parseInt(user.savingsAmount) + user.balance;

        const memberAccountUpdate = await User.findOneAndUpdate(
          { _id: transMemberID },
          { balance: newBalance, planActive: true }, //update the balance
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
          const memberTransactionUpdate = await Trans.findOneAndUpdate(
            { reference: req.body.data.object.reference },
            { status: "true" },
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

          if (!memberTransactionUpdate) return;
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(500).send({ message: "Error" });
      }
      break;
  }
}

// async function handler(req, res) {
//   const webhook = req.body;

//   switch (webhook.event) {
//     case "direct_debit.payment_successful":
//       // do something with webhook data;
//       try {
//         await User.findOneAndUpdate(
//           { _id: req.body.data.object.meta.memberID },
//           {
//             balance:
//               parseInt(req.body.data.object.meta.savingsAmount) +
//               parseInt(req.body.data.object.meta.currentBal),
//             planActive: true,
//           }, //update the balance
//           { new: true },
//           (error, result) => {
//             if (result) {
//               res.status(200).send(result);
//             } else {
//               console.log(error);
//             }
//           }
//         );
//         // .clone()
//         // .catch(function (err) {
//         //   console.log(err);
//         // });
//       } catch (error) {
//         res.status(500).send({ message: "Error" });
//       }
//       break;

//     case "mono.events.account_updated":
//       await Trans.findOneAndUpdate(
//         { reference: req.body.data.object.reference },
//         { status: "true" },
//         { new: true },
//         (error, result) => {
//           if (result) {
//             res.status(200).send(result);
//           } else {
//             console.log(error);
//           }
//         }
//       );
//       // .clone()
//       // .catch(function (err) {
//       //   console.log(err);
//       // });
//       break;
//   }
// }

export default protectAPI(handler);
