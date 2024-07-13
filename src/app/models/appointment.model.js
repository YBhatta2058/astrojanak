import mongoose,{ Schema } from "mongoose";


const appointmentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String,default:"Random",required:true},
    status: { type: String, enum: ['pending', 'accepted', 'rescheduled'], default: 'pending' },
    adminNotes: { type: String,default:"No notes" }
},{
    timestamps:true
});

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);