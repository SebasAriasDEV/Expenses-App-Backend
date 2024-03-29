import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
  },
  monthlyBudget: {
    type: Number,
    default: 0,
    required: [true, "Monthly budget is required"],
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
    required: [true, "User is required"],
  },
  currency: {
    type: String,
    required: [true, "Budget currency is required"],
  },
});

categorySchema.methods.toJSON = function () {
  const { __v, password, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

const categoryModel = model("Category", categorySchema);
//Exports
export { categoryModel };
