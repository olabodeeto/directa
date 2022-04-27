const mongoose = require("mongoose");
const schema = mongoose.Schema;

const refSchema = new schema(
  {
    amount: {
      type: String,
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ref || mongoose.model("REF", refSchema);
