import connectDB from "@/app/db/connectDB";
import { Appointment } from "@/app/models/appointment.model";
import { getData } from "@/app/helpers/verifyJWT";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/Responses/ApiError";
import { User } from "@/app/models/user.model";

export async function POST(request){
    try {
    await connectDB();
    const userId = await getData(request);
    const user = await User.findById(userId);
    if(!userId){
        throw new ApiError(401,"Unauthorized access");
    }

    const req = await request.json();

    const {date , description , time} = req;

    const appointmentDate = new Date(date);
    const today = new Date();

    const tomorrow = new Date(today.getTime() + (24*60*60*1000));

    // if(appointmentDate < tomorrow){
    //     throw new ApiError(400,"Appointment date must be at least 24 hours from now")
    // }

        const appointment = await Appointment.create({
            userId,
            date,
            time,
            description
        })
        return NextResponse.json({message:"Appointment created successfully",appointment});
    }
    catch (error) {
        return NextResponse.json({message: error.message},{status: error.statusCode});
    }
}