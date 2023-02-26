import { Router } from "express";
import { check } from "express-validator";

import {
  usersDelete,
  usersGet,
  usersPost,
  usersUpdate,
} from "../controllers/users.controller";
import { validateFields } from "../middlewares/validate_fields";

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("firstName", "First name is mandatory").notEmpty(),
    check("lastName", "Last name is mandatory").notEmpty(),
    check("password", "Password is mandatory").notEmpty().isLength({ min: 6 }),
    validateFields,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    check("id", "User id must be provided as valid Mongo id").isMongoId(),
    validateFields,
  ],
  usersDelete
);

router.put(
  "/:id",
  [
    check("id", "User id must be provided as valid Mongo id").isMongoId(),
    validateFields,
  ],
  usersUpdate
);

//Exports
module.exports = router;
