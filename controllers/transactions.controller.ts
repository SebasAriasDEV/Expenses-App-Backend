import { Request, Response } from "express";

import { transactionModel as Transaction } from "../models/transaction.model";

//********** POST - CREATE A NEW TRANSACTION */
const createTransaction = async (req: Request, res: Response) => {
  const {
    transactionType,
    amount,
    date = new Date(),
    description,
    //TODO: El user ID debe venir del request luego de validar el JWT
    user,
    account,
    category,
  } = req.body;

  const transaction = new Transaction({
    transactionType,
    amount,
    date,
    description,
    user,
    account,
    category,
  });

  await transaction.save();

  res.status(200).json({
    msg: "Transaction was created",
    transaction,
  });
};

//Exports
export { createTransaction };
