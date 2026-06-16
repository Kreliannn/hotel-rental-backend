import { Router } from "express";
import { BookingController } from "../controller/booking.controller";

const route = Router()

route.get("/:id", BookingController.getBooking)
route.get("/", BookingController.getAllBookings)
route.post("/", BookingController.createBooking)
route.post("/checkout", BookingController.checkOut)
route.put("/", BookingController.updateBooking)
route.delete("/", BookingController.deleteBooking)

export default route
