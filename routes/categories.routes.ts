import { Router } from "express";
import { check } from "express-validator";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categories.controller";
import { validateFields } from "../middlewares/validate_fields";

const router = Router();

//********** GET - RETRIEVE AL CATEGORIES */
router.get("/", [], getAllCategories);

//********** POST - CREATE A NEW CATEGORY */
router.post(
  "/",
  [
    check("name", "Category name is mandatory").notEmpty(),
    check("monthlyBudget", "Category monthly budget is mandatory").notEmpty(),
    validateFields,
  ],
  createCategory
);

//********** DELETE - DELETE A CATEGORY */
router.delete(
  "/:id",
  [
    check(
      "id",
      "Parameter id is mandatory and need to be a valid mongo id"
    ).isMongoId(),
    validateFields,
  ],
  deleteCategory
);

//********** UPDATE - UPDATE A CATEGORY */
router.put(
  "/:id",
  [
    check(
      "id",
      "Parameter id is mandatory and need to be a valid mongo id"
    ).isMongoId(),
    validateFields
  ],
  updateCategory
);

//********** PUT - UPDATE A CATEGORY */

//Exports
module.exports = router;
