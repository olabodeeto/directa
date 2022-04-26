const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transSchema = new schema(
  {
    memberID: {
      type: String,
    },
    amount: {
      type: String,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trans || mongoose.model("Trans", transSchema);
