import { Request, Response } from "express";

import { accountModel as Account } from "../models/account.model";

//********** GET - GET ALL ACCOUNTS */
const getAllAccounts = async (req: Request, res: Response) => {
  const resp = await Promise.all([Account.countDocuments(), Account.find()]);

  res.status(200).json({
    total: resp[0],
    accounts: resp[1],
  });
};

//********** POST - CREATE A NEW ACCOUNT */
const createAccount = async (req: Request, res: Response) => {
  const { name, type, currency } = req.body;

  const account = new Account({ name, type, currency });

  await account.save();

  res.status(200).json({
    msg: "Account has been created",
    account,
  });
};

//********** DELETE - DELETE AN ACCOUNT */
const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const account = await Account.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Account has been deleted",
    account,
  });
};

//********** UPDATE - UPDATE AN ACCOUNT */
const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const account = await Account.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    msg: "Account has been updated",
    account,
  });
};

//Exports
export { createAccount, getAllAccounts, deleteAccount, updateAccount };
