import { Request, Response } from "express";

import { transactionModel as Transaction } from "../models/transaction.model";

//********** GET - GET ALL TRANSACTIONS */
const getAllTransactions = async (req: Request, res: Response) => {
  const resp = await Promise.all([
    Transaction.countDocuments(),
    Transaction.find(),
  ]);

  res.status(200).json({
    total: resp[0],
    transactions: resp[1],
  });
};

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

//********** DELETE - DELETE A TRANSACTION */
const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTransaction = await Transaction.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Transaction has been deleted",
    deletedTransaction,
  });
};

//********** PUT - UPDATE A TRANSACTION */
const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await Transaction.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    msg: "Transaction has been updated",
    transaction,
  });
};

//Exports
export { createTransaction, getAllTransactions, deleteTransaction, updateTransaction };
