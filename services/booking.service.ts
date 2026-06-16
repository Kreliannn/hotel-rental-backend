import BookingsModel from "../model/bookings.model"
import { bookingInterfaceInput } from "../types/bookings.type";

export class BookingService {

  static async getAll() {
    const bookings = BookingsModel.find().populate("room");
    return bookings
  }

  static async get(id: string) {
    const bookings = BookingsModel.findById(id).populate("room");
    return bookings
  }

  static async create(data: bookingInterfaceInput) {
    await BookingsModel.create(data)
  }

  static async update(id: string, data: bookingInterfaceInput) {
    await BookingsModel.findByIdAndUpdate(id, data);
  }

   static async updateStatus(id: string, status: string) {
    await BookingsModel.findByIdAndUpdate(id, {status});
  }

  static async delete(id: string) {
    const booking = BookingsModel.findByIdAndDelete(id);
    return booking
  }

}
