import RoomModel from "../model/room.model"
import { roomInterface, roomInterfaceInput } from "../types/room.type";

export class RoomService {

  static async getAll() {
    const rooms = RoomModel.find();
    return rooms
  }

  static async get( id : string) {
    const rooms = RoomModel.findById(id);
    return rooms
  }

  static async create(data : roomInterfaceInput) {
    await RoomModel.create(data)
  }

  static async update(id : string, data : roomInterfaceInput) {
    await RoomModel.findByIdAndUpdate(id, data);
  }

  static async updateStatus(id : string, status : string) {
    await RoomModel.findByIdAndUpdate(id, {status});
  }

  static async delete(id : string) {
    const room = RoomModel.findByIdAndDelete(id);
    return room
  }

  static async insertImg(id: string, urls: string[]) {
    await RoomModel.findByIdAndUpdate(
      id,
      {
        $push: {
          images: {
            $each: urls,
          },
        },
      }
    );
  }
  
}
