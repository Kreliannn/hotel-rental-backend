import { Response } from "express";
import { AuthRequest } from "../types/request.type";
import { bookingInterfaceInput } from "../types/bookings.type";
import { BookingService } from "../services/booking.service";
import { RoomService } from "../services/room.service";

export class BookingController {

  static getAllBookings = async (request: AuthRequest, response: Response) => {
    try {
      const bookings = await BookingService.getAll()
      response.send(bookings)
    } catch (error) {
      console.log("Failed to get bookings: " + (error as Error).message)
      response.status(500).send("Failed to get bookings: " + (error as Error).message)
    }
  }

  static getBooking = async (request: AuthRequest, response: Response) => {
    try {
      const { id } = request.params
      const booking = await BookingService.get(id)
      if (!booking) {
        response.status(404).send("Booking not found")
        return
      }
      response.send(booking)
    } catch (error) {
      console.log("Failed to get booking: " + (error as Error).message)
      response.status(500).send("Failed to get booking: " + (error as Error).message)
    }
  }

  static createBooking = async (request: AuthRequest, response: Response) => {
    try {
      const bookingData: bookingInterfaceInput = {
        clientName: request.body.clientName,
        clientAddress: request.body.clientAddress,
        type: request.body.type,
        status: request.body.status,
        arivalDate: request.body.arivalDate,
        arivalTime: request.body.arivalTime,
        room: request.body.room,
      }
      

      await BookingService.create(bookingData)

      await RoomService.updateStatus(request.body.room, "occupied")

      
      const bookings = await BookingService.getAll()
      response.send(bookings)
    } catch (error) {
      console.log("Failed to create booking: " + (error as Error).message)
      response.status(500).send("Failed to create booking: " + (error as Error).message)
    }
  }

  static updateBooking = async (request: AuthRequest, response: Response) => {
    try {
      const { _id, clientName, clientAddress, type, status, arivalDate, arivalTime, room } = request.body
      await BookingService.update(_id, { clientName, clientAddress, type, status, arivalDate, arivalTime, room })
      const bookings = await BookingService.getAll()
      response.send(bookings)
    } catch (error) {
      console.log("Failed to update booking: " + (error as Error).message)
      response.status(500).send("Failed to update booking: " + (error as Error).message)
    }
  }

  static deleteBooking = async (request: AuthRequest, response: Response) => {
    try {
      const { _id } = request.body
      await BookingService.delete(_id)
      const bookings = await BookingService.getAll()
      response.send(bookings)
    } catch (error) {
      console.log("Failed to delete booking: " + (error as Error).message)
      response.status(500).send("Failed to delete booking: " + (error as Error).message)
    }
  }



  static checkOut = async (request: AuthRequest, response: Response) => {
    try {
     const { bookingId, roomId, amount } = request.body

     await BookingService.updateStatus(bookingId, "completed")

     await RoomService.updateStatus(roomId, "available")

     response.send("success")
     
    } catch (error) {
      console.log("Failed to update booking: " + (error as Error).message)
      response.status(500).send("Failed to update booking: " + (error as Error).message)
    }
  }

}
