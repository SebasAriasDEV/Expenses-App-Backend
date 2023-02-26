import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { userModel as User } from "../models/users.model";
import { ICustomRequest } from "../config/definitions";

const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  //Validate token authenticated
  if (!token) {
    return res.status(401).json({
      msg: "There is no authenticated token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY) as JwtPayload;

    //Look for authenticated user
    const authenticatedUser = await User.findById(uid);
    if (!authenticatedUser) {
      return res.status(401).json({
        msg: "Invalid Token - User not found",
      });
    }

    //TODO: Implement validation when the user status is false (user deleted)

    (req as ICustomRequest).authenticatedUser = authenticatedUser;

    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

//Exports
export { validateJWT };
