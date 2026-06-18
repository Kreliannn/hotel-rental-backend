import { Router } from "express";
import { ReportController } from "../controller/report.controller";

const route = Router()

route.get("/occupancy", ReportController.getOccupancyReport)
route.get("/revenue", ReportController.getRevenueReport)
route.get("/reservations", ReportController.getReservationReport)
route.get("/popular-rooms", ReportController.getPopularRoomReport)

export default route
