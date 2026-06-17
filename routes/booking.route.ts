import { Router } from "express";
import { BookingController } from "../controller/booking.controller";
import { authenticateJWT } from "../middleware/auth";

const route = Router()

route.get("/:id", BookingController.getBooking)
route.get("/", BookingController.getAllBookings)
route.post("/", BookingController.createBooking)
route.post("/checkout", BookingController.checkOut)
route.post("/reservation", BookingController.reservation)
route.post("/reservationPayment", BookingController.reservationPayment)
route.post("/reservation/active", BookingController.reservationActivate)
route.post("/reservation/cancel", BookingController.reservationCancel)
route.put("/",BookingController.updateBooking)
route.delete("/", BookingController.deleteBooking)

export default route
