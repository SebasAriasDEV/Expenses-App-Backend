import { Request } from "express";

export interface ICustomRequest extends Request {
  authenticatedUser: any; // or any other type
}
