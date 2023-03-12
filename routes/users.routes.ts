import { Router } from "express";
import { check } from "express-validator";

import {
  usersDelete,
  usersGet,
  usersPost,
  usersUpdate,
} from "../controllers/users.controller";
import { validateUserIdExists } from "../helpers/db_validators";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router = Router();

router.get("/", [validateJWT], usersGet);

router.post(
  "/",
  [
    //validateJWT,
    check("firstName", "First name is mandatory").notEmpty(),
    check("lastName", "Last name is mandatory").notEmpty(),
    check("password", "Password must have at least 6 characters")
      .notEmpty()
      .isLength({ min: 6 }),
    validateFields,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "User id must be provided as valid Mongo id").isMongoId(),
    check("id").custom((id) => validateUserIdExists(id)),
    validateFields,
  ],
  usersDelete
  );
  
  router.put(
    "/:id",
    [
      validateJWT,
      check("id", "User id must be provided as valid Mongo id").isMongoId(),
      check("id").custom((id) => validateUserIdExists(id)),
    validateFields,
  ],
  usersUpdate
);

//Exports
module.exports = router;
