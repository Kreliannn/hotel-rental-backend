
import mongoose, { Schema } from "mongoose";

const BookingsSchema = new Schema({
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    arivalDate: { type: String, required: true },
    arivalTime: { type: String, required: true },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Rooms",
        required: true
    }
});

export default mongoose.model('Bookings', BookingsSchema)