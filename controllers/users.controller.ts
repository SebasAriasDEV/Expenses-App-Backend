import { Request, Response } from "express";

import { userModel as User } from "../models/users.model";

const usersGet = async (req: Request, res: Response) => {
  const resp = await Promise.all([User.countDocuments(), User.find()]);

  res.status(200).json({
    total: resp[0],
    users: resp[1],
  });
};

const usersPost = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  //Create new user
  const user = new User({ firstName, lastName, password });

  //Save in DB
  await user.save();

  res.status(200).json({
    msg: "User was successfully created",
    user,
  });
};

//Exports
export { usersGet, usersPost };
