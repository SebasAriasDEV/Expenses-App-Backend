import { Router } from "express";
import { check } from "express-validator";
import { createTransaction } from "../controllers/transactions.controller";

const router = Router();

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

//Exports
module.exports = router;
