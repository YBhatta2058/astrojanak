import connectDB from "@/app/db/connectDB";
import { Appointment } from "@/app/models/appointment.model";
import { getData } from "@/app/helpers/verifyJWT";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/Responses/ApiError";
import { User } from "@/app/models/user.model";

export async function GET(request){
    try {
    await connectDB();
    const userId = await getData(request);
    const user = await User.findById(userId);
    if(!userId){
        throw new ApiError(401,"Unauthorized access");
    }
    const appointments = await Appointment.find({userId})
    if(!appointments || appointments.length == 0){
        return NextResponse.json({message:"No Appointments found"},{status: 200});
    }
    return NextResponse.json({message:"Appointments fetched successfully",data:appointments},{status: 200});
    

    }
    catch (error) {
        return NextResponse.json({message: error.message},{status: error.statusCode});
    }
}