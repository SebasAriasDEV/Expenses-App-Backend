import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  name: {
    type: String,
    required: [true, "Account name is required"],
  },
  type: {
    type: String,
    required: [true, "Account name is required"],
  },
  currency: {
    type: String,
    required: [true, "Account name is required"],
  },
});

accountSchema.methods.toJSON = function () {
  const { __v, password, _id, ...account } = this.toObject();
  account.uid = _id;
  return account;
};

const accountModel = model("Account", accountSchema);

//Exports
export { accountModel };
