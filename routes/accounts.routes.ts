import { Router } from "express";
import { check } from "express-validator";

import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccount,
} from "../controllers/accounts.controller";
import { validateAccountIdExists } from "../helpers/db_validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router = Router();

//********** GET - GET ALL ACCOUNTS */
router.get(
  "/",
  [
    validateJWT,
    check(
      "displayCurrency",
      "DisplayCurrency to be displayed is required (COP or EUR)."
    ).isIn(["COP", "EUR"]),
    validateFields,
  ],
  getAllAccounts
);

//********** POST - CREATE A NEW ACCOUNT */
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name of account is required").notEmpty(),
    check("type", "Type of account is required").notEmpty(),
    check("currency", "Currency of account is required").notEmpty(),
    validateFields,
  ],
  createAccount
);

//********** DELETE - DELETE AN ACCOUNT */
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Id of account is required").notEmpty(),
    check("id").custom(validateAccountIdExists),
    validateFields,
  ],
  deleteAccount
);

//********** PUT - UPDATE AN ACCOUNT */
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Id is required for deletion").isMongoId(),
    check("id").custom(validateAccountIdExists),
    validateFields,
  ],
  updateAccount
);

//Exports
module.exports = router;
