import { Router } from "express";
import { check } from "express-validator";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categories.controller";
import { validateCategoryIdExists } from "../helpers/db_validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router = Router();

//********** GET - RETRIEVE AL CATEGORIES */
router.get("/", [validateJWT], getAllCategories);

//********** POST - CREATE A NEW CATEGORY */
router.post(
  "/",
  [
    validateJWT,
    check("name", "Category name is mandatory").notEmpty(),
    check("monthlyBudget", "Category monthly budget is mandatory").notEmpty(),
    check("month", "Month is mandatory").notEmpty(),
    check("year", "Year is mandatory").notEmpty(),
    check("currency", "Currency is mandatory").notEmpty(),
    validateFields,
  ],
  createCategory
);

//********** DELETE - DELETE A CATEGORY */
router.delete(
  "/:id",
  [
    validateJWT,
    check(
      "id",
      "Parameter id is mandatory and need to be a valid mongo id"
    ).isMongoId(),
    check("id").custom(validateCategoryIdExists),
    validateFields,
  ],
  deleteCategory
);

//********** UPDATE - UPDATE A CATEGORY */
router.put(
  "/:id",
  [
    validateJWT,
    check(
      "id",
      "Parameter id is mandatory and need to be a valid mongo id"
    ).isMongoId(),
    check("id").custom(validateCategoryIdExists),
    validateFields,
  ],
  updateCategory
);

//Exports
module.exports = router;
