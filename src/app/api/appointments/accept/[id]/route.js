import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { verifyAdmin } from "@/app/helpers/verifyAdmin";
import { Appointment } from "@/app/models/appointment.model";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }){
    await connectDB();
    try {
        const isAdmin = await verifyAdmin(request);
        if(!isAdmin){
            throw new ApiError(404,"Not an admin")
        }
        const { id } = params;
        const appointment = await Appointment.findById(id);
        if(!appointment){
            throw new ApiError(420,"Appointment not found")
        }

        const response = await appointment.updateOne({
            $set: {
                status: "accepted"
            }
        });

        return  NextResponse.json({message: "Appointment accepted successfully",data: response});  
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to accept the appointment"},{status: 425})
    }
}