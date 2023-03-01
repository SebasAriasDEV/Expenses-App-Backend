import { Router } from "express";
import { check } from "express-validator";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../controllers/transactions.controller";
import { validateFields } from "../middlewares/validate_fields";

const router = Router();

//********** GET - GET ALL TRANSACTIONS */
router.get("/", [], getAllTransactions);

//********** POST - CREATE A NEW TRANSACTION */
router.post(
  "/",
  [
    check("transactionType", "TransactionType is required").notEmpty(),
    check("amount", "Amount is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    check("user", "user is required").notEmpty(),
    check("account", "TransactionType is required").notEmpty(),
    check("category", "TransactionType is required").notEmpty(),
  ],
  createTransaction
);

//********** DELETE - DELETE A TRANSACTION */
router.delete(
  "/:id",
  [
    check("id", "ID to delete is mandatory and mongo ID").isMongoId(),
    validateFields,
  ],
  deleteTransaction
);
//********** PUT - UPDATE A TRANSACTION */
router.put(
  "/:id",
  [
    check("id", "ID to update is mandatory and mongo ID").isMongoId(),
    validateFields,
  ],
  updateTransaction
);


//Exports
module.exports = router;
