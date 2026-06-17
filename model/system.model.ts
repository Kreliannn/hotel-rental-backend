import mongoose, { Schema } from 'mongoose';


const SystemSchema = new Schema({
    systemInfo: { type: String, required: true },
    paymentMin : { type: Number, required: true },
    logo : { type: String, required: true },
    systemName : { type: String, required: true },
    header : { type: String, required: true },
    description : { type: String, required: true },
});


export default mongoose.model('Systems', SystemSchema)