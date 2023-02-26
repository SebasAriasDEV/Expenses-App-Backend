import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firtsName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const userModel = model("User", userSchema);

//Exports
export { userModel };
