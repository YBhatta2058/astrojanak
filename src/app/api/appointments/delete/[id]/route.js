import connectDB from "@/app/db/connectDB";
import { Appointment } from "@/app/models/appointment.model";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/Responses/ApiError";

export async function DELETE(request,{params}){
    try {
    await connectDB();
    const {id} = params;
    if(!id){
        throw new ApiError(410,"Appointment id missing")
    }
    const deleteResponse = await Appointment.deleteOne({_id:id});
        return NextResponse.json({message:"Appointment deleted successfully",data:deleteResponse},{status:200});
    }
    catch (error) {
        return NextResponse.json({message: error.message},{status: error.statusCode});
    }
}