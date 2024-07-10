import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { Appointment } from "@/app/models/appointment.model";
import { NextResponse } from "next/server";

export async function PATCH(request,{params}){
    
    try{
        await connectDB()
        const { id } = params;
        if(!id){
            throw new ApiError(430,"Id not found");
        }
        const appointment = await Appointment.findById(id);
        if(!appointment){
            throw new ApiError(430,"Appointment not found"); 
        }
        const reqBody = await request.json();
        const {date, time } = reqBody;

        const response = await appointment.updateOne({
            $set: {
                date,
                time,
                status: "rescheduled"
            }
        })

        if(!response){
            throw new ApiError(435,"Error while rescheduling the appointment")
        }

        return NextResponse.json({message: "Appointment rescheduled successfully",data: response},{status: 200});

    }
    catch(err){
        return NextResponse.json({message: err.message},{status: err.statusCode})
    }
}