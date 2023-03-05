import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  transactionType: {
    type: String,
    required: [true, "Transaction Type is required"],
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required"],
  },
  date: {
    type: Date,
    required: [true, "Transaction date is required"],
  },
  description: {
    type: String,
    required: [true, "Transaction description is required"],
  },
  month: {
    type: Number,
    required: [true, "Month is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

transactionSchema.methods.toJSON = function () {
  const { __v, password, _id, ...transaction } = this.toObject();
  transaction.uid = _id;
  return transaction;
};

const transactionModel = model("Transaction", transactionSchema);

//Exports
export { transactionModel };
