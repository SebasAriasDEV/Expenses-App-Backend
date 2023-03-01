import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userModel as User } from "../models/users.model";
import { generateJWT } from "../helpers/generate_jwt";

//********** GET - GET ALL USERS */
const usersGet = async (req: Request, res: Response) => {
  const resp = await Promise.all([User.countDocuments(), User.find()]);

  res.status(200).json({
    total: resp[0],
    users: resp[1],
  });
};

//********** POST - CREATE AN USER */
const usersPost = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  //Create new user
  const user = new User({ firstName, lastName, password });

  //Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //Generate Token
  const token = await generateJWT(user.id);

  //Save in DB
  await user.save();

  res.status(200).json({
    msg: "User was successfully created",
    user,
    token
  });
};

//********** DELETE - DELETE AN USER */
const usersDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Delete user
  const deletedUser = await User.findByIdAndDelete(id);

  res.status(200).json({
    msg: `User with id: ${id} was deleted successfully`,
    deletedUser,
  });
};

//********** PUT - UPDATE AN USER */
const usersUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...rest } = req.body;

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    msg: `User with id: ${id} has been updated`,
    user,
  });
};

//Exports
export { usersGet, usersPost, usersDelete, usersUpdate };
