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
});

categorySchema.methods.toJSON = function () {
  const { __v, password, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

const categoryModel = model("Category", categorySchema);
//Exports
export { categoryModel };
