import { Router } from "express";
import accountRoute from "./account.route"
import roomRoute from "./room.route"

const routes = Router()

routes.use("/account", accountRoute)
routes.use("/room", roomRoute)

export default routes