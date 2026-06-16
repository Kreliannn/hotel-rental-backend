import { Router } from "express";
import { SystemController } from "../controller/system.controller";

const route = Router()

route.post("/ai", SystemController.aiChatBot)


export default route
