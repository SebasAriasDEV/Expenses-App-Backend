import { Request, Response } from "express";
import { ICustomRequest } from "../config/definitions";
import { categoryModel as Category } from "../models/category.model";

//********** GET - GET ALL CATEGORIES */
const getAllCategories = async (req: Request, res: Response) => {
  const resp = await Promise.all([Category.countDocuments(), Category.find()]);
  const users = await Category.find();

  res.status(200).json({
    total: resp[0],
    categories: resp[1],
  });
};

//********** POST - CREATE A NEW CATEGORY */
const createCategory = async (req: Request, res: Response) => {
  const { name, monthlyBudget, month, year } = req.body;

  //Get authenticated user
  const authID = (req as ICustomRequest).authenticatedUser.id;

  const newCategory = new Category({ name, monthlyBudget, month, year, user: authID });

  //Create category in Mongo
  await newCategory.save();

  res.status(200).json({
    msg: "Category was created",
    newCategory,
  });
};

//********** DELETE - DELETE A CATEGORY */
const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  res.status(200).json({
    msg: "The category has been deleted",
    category,
  });
};

//********** UPDATE - UPDATE A CATEGORY */
const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, monthlyBudget } = req.body;

  const category = await Category.findByIdAndUpdate(id, {
    name,
    monthlyBudget,
  });

  res.status(200).json({
    msg: "The category has been updated",
    category,
  });
};
//Exports
export { createCategory, getAllCategories, deleteCategory, updateCategory };
