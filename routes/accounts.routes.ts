import { Router } from "express";
import { check } from "express-validator";

import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccount,
} from "../controllers/accounts.controller";
import { validateFields } from "../middlewares/validate_fields";

const router = Router();

//********** GET - GET ALL ACCOUNTS */
router.get("/", getAllAccounts);

//********** POST - CREATE A NEW ACCOUNT */
router.post(
  "/",
  [
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
  [check("id", "Id of account is required").notEmpty(), validateFields],
  deleteAccount
);

//********** PUT - UPDATE AN ACCOUNT */
router.put(
  "/:id",
  [check("id", "Id is required for deletion").isMongoId(), validateFields],
  updateAccount
);

//Exports
module.exports = router;
