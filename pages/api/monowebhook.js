import Trans from "../../models/transactionModel";
import User from "../../models/userModel";
import protectAPI from "../../middlewares/protectAPI";

let secret = "sec_YToy9KMlSJV7w97ZsCXc";

async function handler(req, res) {
  if (req.method === "POST") {
    const webhook = req.body;

    switch (webhook.event) {
      case "direct_debit.payment_successful":
        const hookreference = req.body.data.object.reference;
        const amount = parseInt(req.body.data.object.amount);
        const trans = await Trans.findOne({
          reference: hookreference,
        });
        // do something with webhook.data.account;

        if (trans) {
          const transMemberID = trans.memberID;
          // find user using the memberid from pending transaction
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

          if (memberAccountUpdate._id) {
            const memberTransactionUpdate = await Trans.findOneAndUpdate(
              { reference: hookreference },
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

            if (memberTransactionUpdate._id) {
              console.log(memberTransactionUpdate);
              res.status(200).json("success");
            }
          }
        }

        break;
    }
  }
}

export default protectAPI(handler);
