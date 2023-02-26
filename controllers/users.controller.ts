import { Request, Response } from "express";

import { userModel as User } from "../models/users.model";

const usersGet = (req: Request, res: Response) => {
  console.log("GET Users answer");
  res.status(200).json({
    msg: "Response from GET users",
  });
};

//Exports
export { usersGet };
