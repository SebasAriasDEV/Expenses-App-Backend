import { Router } from "express";
import { check } from "express-validator";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../controllers/transactions.controller";
import { validateTransactionIdExists } from "../helpers/db_validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router = Router();

//********** GET - GET ALL TRANSACTIONS */
router.get("/", [validateJWT], getAllTransactions);

//********** POST - CREATE A NEW TRANSACTION */
router.post(
  "/",
  [
    validateJWT,
    check("transactionType", "TransactionType is required").notEmpty(),
    check("amount", "Amount is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    check('date','Date of the transaction is required').isDate(),
    // check("month", "Month is required").notEmpty(),
    // check("year", "Year is required").notEmpty(),
    check("account", "TransactionType is required").notEmpty(),
    check("category", "TransactionType is required").notEmpty(),
    //TODO: Check de que el category y account existan antes de crearlo
    validateFields,
  ],
  createTransaction
);

//********** DELETE - DELETE A TRANSACTION */
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "ID to delete is mandatory and mongo ID").isMongoId(),
    check("id").custom(validateTransactionIdExists),
    validateFields,
  ],
  deleteTransaction
);
//********** PUT - UPDATE A TRANSACTION */
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "ID to update is mandatory and mongo ID").isMongoId(),
    check("id").custom(validateTransactionIdExists),
    validateFields,
  ],
  updateTransaction
);

//Exports
module.exports = router;
