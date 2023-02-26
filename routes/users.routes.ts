import { Router } from "express";
import { usersGet, usersPost } from "../controllers/users.controller";

const router = Router();

router.get("/", usersGet);

router.post("/", usersPost);


//Exports
module.exports = router;
