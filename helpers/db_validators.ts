import { userModel as User } from "../models/users.model";
import { categoryModel as Category } from "../models/category.model";
import { accountModel as Account } from "../models/account.model";
import { transactionModel as Transaction } from "../models/transaction.model";

//Validate if user exists and throw error if NON existing
const validateUserIdExists = async (id: string) => {
  const foundUser = await User.findById(id);
  if (!foundUser) {
    throw new Error(`The user with id ${id} does not exist in the database`);
  }
};

//Validate if category exists and throw error if NON existing
const validateCategoryIdExists = async (id: string) => {
  const foundCategory = await Category.findById(id);
  if (!foundCategory) {
    throw new Error(
      `The Category with id ${id} does not exist in the database`
    );
  }
};

//Validate if Account exists and throw error if NON existing
const validateAccountIdExists = async (id: string) => {
  const foundAccount = await Account.findById(id);
  if (!foundAccount) {
    throw new Error(`The Account with id ${id} does not exist in the database`);
  }
};

//Validate if Transaction exists and throw error if NON existing
const validateTransactionIdExists = async (id: string) => {
  const foundTransaction = await Transaction.findById(id);
  if (!foundTransaction) {
    throw new Error(
      `The Transaction with id ${id} does not exist in the database`
    );
  }
};

//TODO: Validar cuando ya exista un usuario, para esto se debe agregar el email al modelo de usuarios y todos sus endpoints

//Exports
export {
  validateUserIdExists,
  validateCategoryIdExists,
  validateAccountIdExists,
  validateTransactionIdExists,
};
