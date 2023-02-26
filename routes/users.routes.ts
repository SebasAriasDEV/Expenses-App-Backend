import { Router } from "express";
import {
  usersDelete,
  usersGet,
  usersPost,
  usersUpdate,
} from "../controllers/users.controller";

const router = Router();

router.get("/", usersGet);

router.post("/", usersPost);

router.delete("/:id", usersDelete);

router.put("/:id", usersUpdate);

//Exports
module.exports = router;
