import { Router } from "express";
import { RoomController } from "../controller/room.controller";
import { upload } from "../utils/upload";

const route = Router()

route.get("/:id", RoomController.getRoom)
route.get("/", RoomController.getAllRooms)
route.post("/", upload.single("image"), RoomController.createRoom)
route.put("/", RoomController.updateRoom)
route.delete("/", RoomController.deleteRoom)
route.post("/images", upload.array("images", 10), RoomController.uploadRoomImages)

export default route
