import { ApiError } from "@/app/Responses/ApiError";
import { ApiResponse } from "@/app/Responses/ApiResponse";
import connectDB from "@/app/db/connectDB";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";


export async function GET(request){
    console.log("here i am")
    await connectDB();
    try{
        const users = await User.find();
        if(!users || users.length == 0){
            throw new ApiError(410,"No users found");
        }

        return NextResponse.json({message:"All Users fetched successfully",data: users},{status:200});   
        
    }catch(err){
        return NextResponse.json({error: err.message},{status: 410})
    }
}