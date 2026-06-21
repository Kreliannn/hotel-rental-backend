import { Router } from "express";
import { SystemController } from "../controller/system.controller";
import { upload } from "../utils/upload";

const route = Router()

route.post("/ai", SystemController.aiChatBot)
route.get("/", SystemController.getSystemInfo)
route.get("/payments", SystemController.getAllPayments)
route.put("/info", SystemController.updateSystemInfo)
route.post("/logo", upload.single("logo"), SystemController.uploadLogo)

route.get("/chat", SystemController.getAllChats)
route.get("/chat/:id", SystemController.getChat)
route.post("/chat", SystemController.createChat)
route.post("/chat/message", SystemController.sendChatMessage)

export default route
