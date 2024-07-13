import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { verifyAdmin } from "@/app/helpers/verifyAdmin";
import { Appointment } from "@/app/models/appointment.model";
import { NextResponse } from "next/server";

export async function GET(request){
    await connectDB();
    try {
    const isAdmin = await verifyAdmin(request);
    if(!isAdmin){
        throw new ApiError(401,"Unauthrized access. Admin access required")
    }   
        const appointments = await Appointment.find().populate('userId','name');
        return NextResponse.json({message: "All appointments fetched successfully",data: appointments},{status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error.message},{status: error.statusCode})
    }
}