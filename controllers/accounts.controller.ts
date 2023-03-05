import { Request, Response } from "express";
import { ICustomRequest } from "../config/definitions";

import { accountModel as Account } from "../models/account.model";

//********** GET - GET ALL ACCOUNTS OF AUTHENTICATED USER */
const getAllAccounts = async (req: Request, res: Response) => {
  //Find the authenticated user
  const authID = (req as ICustomRequest).authenticatedUser.id;

  const resp = await Promise.all([
    Account.countDocuments({ user: authID }),
    Account.find({ user: authID }).sort({ balance: -1 }),
  ]);

  res.status(200).json({
    total: resp[0],
    accounts: resp[1],
  });
};

//********** POST - CREATE A NEW ACCOUNT */
const createAccount = async (req: Request, res: Response) => {
  const { name, type, currency, balance } = req.body;

  //Get the authenticated user ID
  const userID = (req as ICustomRequest).authenticatedUser.id;

  const account = new Account({ name, type, currency, balance, user: userID });

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
