import { Request, Response } from "express";
import { ICustomRequest } from "../config/definitions";

import { transactionModel as Transaction } from "../models/transaction.model";
import { accountModel as Account } from "../models/account.model";

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
    account,
    category,
  } = req.body;

  //Create transaction to be saves
  const transaction = new Transaction({
    transactionType,
    amount,
    date,
    description,
    user: (req as ICustomRequest).authenticatedUser.id,
    account,
    category,
  });

  //Update account balance with new transaction
  //TODO: Validar que el account/category que vienen por parametro existan
  const currentAccount = await Account.findById(account);
  const newBalance = currentAccount!.balance + amount;
  await Account.findByIdAndUpdate(account, { balance: newBalance });

  //Save new transaction
  await transaction.save();

  res.status(200).json({
    msg: "Transaction was created",
    transaction,
  });
};

//********** DELETE - DELETE A TRANSACTION */
const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Update account balance
  const transactionToDelete = await Transaction.findById(id);
  const currentAccount = await Account.findById(transactionToDelete!.account);

  const newBalance = currentAccount!.balance - transactionToDelete!.amount;
  await Account.findByIdAndUpdate(transactionToDelete!.account, {
    balance: newBalance,
  });

  //Delete transaction
  const deletedTransaction = await Transaction.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Transaction has been deleted",
    deletedTransaction,
  });
};

//********** PUT - UPDATE A TRANSACTION */
const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  //TODO: Update account balance on amount updated. Or if the account is updated.

  const transaction = await Transaction.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    msg: "Transaction has been updated",
    transaction,
  });
};

//Exports
export {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
};
