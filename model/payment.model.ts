import mongoose, { Schema } from 'mongoose';


const PaymentSchema = new Schema({
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    receivedBy: { type: String, required: true },
});

export default mongoose.model('Payments', PaymentSchema)