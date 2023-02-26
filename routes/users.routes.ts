import { Router } from "express";
import { usersGet } from "../controllers/users.controller";

const router = Router();

router.get("/", usersGet);

//Exports
module.exports = router;
