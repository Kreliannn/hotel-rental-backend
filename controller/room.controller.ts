import { Response } from "express";
import { AuthRequest } from "../types/request.type";
import { roomInterfaceInput } from "../types/room.type";
import { RoomService } from "../services/room.service";
import { uploadToCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinaryUpload";

export class RoomController {

  static getAllRooms = async (request : AuthRequest , response : Response) => {
    const rooms = await RoomService.getAll()
    response.send(rooms)
  }

  static getRoom = async (request : AuthRequest , response : Response) => {
    const {id} = request.params
    const room = await RoomService.get(id)
    response.send(room)
  }

  static createRoom = async (request : AuthRequest , response : Response) => {
    try {

     
      // Handle file upload for the 'image' field
      let imageUrl = "";
      if (request.file) {
        imageUrl = await uploadToCloudinary(request.file.path);
      }

      // Build room data from form fields, converting stringified arrays
      const roomData: roomInterfaceInput = {
        category: request.body.category,
        amenities: typeof request.body.amenities === "string"
          ? JSON.parse(request.body.amenities)
          : request.body.amenities || [],
        price: Number(request.body.price),
        discount: Number(request.body.discount),
        image: imageUrl || request.body.image,
        description: request.body.description,
        images: typeof request.body.images === "string"
          ? JSON.parse(request.body.images)
          : request.body.images || [],
        status: request.body.status,
        maintenance: "",
        housekeeping: typeof request.body.housekeeping === "string"
          ? JSON.parse(request.body.housekeeping)
          : request.body.housekeeping || [],
      };

      await RoomService.create(roomData)
      const rooms = await RoomService.getAll()
      response.send(rooms)
    } catch (error) {
      console.log("Failed to create room: " + (error as Error).message)
      response.status(500).send("Failed to create room: " + (error as Error).message)
    }
  }

  static updateRoom = async (request : AuthRequest , response : Response) => {
    try {
      const { _id, category, amenities, price, discount, image, description, images, status, maintenance, housekeeping } = request.body
      await RoomService.update(_id, { category, amenities, price: Number(price), discount: Number(discount), image, description, images, status, maintenance, housekeeping })
      const rooms = await RoomService.getAll()
      response.send(rooms)
    } catch (error) {
      console.log("Failed to update room: " + (error as Error).message)
      response.status(500).send("Failed to update room: " + (error as Error).message)
    }
  }

  static deleteRoom = async (request : AuthRequest , response : Response) => {
    const { _id } = request.body
    await RoomService.delete(_id)
    const rooms = await RoomService.getAll()
    response.send(rooms)
  }

  static uploadRoomImages = async (request : AuthRequest , response : Response) => {
    try {

      const { roomId } = request.body

      const files = request.files as Express.Multer.File[]
      if (!files || files.length === 0) {
        response.status(400).send("No images provided")
        return
      }

      const filePaths = files.map(file => file.path)
      const urls = await uploadMultipleToCloudinary(filePaths)

      await RoomService.insertImg(roomId ,urls)

      response.send({ urls })
    } catch (error) {
      response.status(500).send("Failed to upload images: " + (error as Error).message)
    }
  }

}
