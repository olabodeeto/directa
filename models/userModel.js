const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
    },
    planActive: {
      type: Boolean,
    },
    balance: {
      type: Number,
    },
    savingsAmount: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
