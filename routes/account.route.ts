import { Router } from "express";
import { AccountController } from "../controller/accounts.controller";

const route = Router()

route.post("/", AccountController.createAccount)
route.post("/login", AccountController.login)
route.get("/", AccountController.getAccounts)
route.put("/", AccountController.updateAccount)
route.delete("/", AccountController.deleteAccount)

export default route