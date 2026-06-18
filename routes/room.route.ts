import { Router } from "express";
import { RoomController } from "../controller/room.controller";
import { upload } from "../utils/upload";
import { authenticateJWT } from "../middleware/auth";

const route = Router()

route.get("/:id", RoomController.getRoom)
route.get("/", RoomController.getAllRooms)
route.post("/",upload.single("image"), RoomController.createRoom)
route.put("/", RoomController.updateRoom)
route.delete("/", RoomController.deleteRoom)
route.post("/images",  upload.array("images", 10), RoomController.uploadRoomImages)
route.patch("/maintenance", RoomController.toggleMaintenance)
route.patch("/discount", RoomController.updateDiscount)

export default route
