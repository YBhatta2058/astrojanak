import { ApiError } from "@/app/Responses/ApiError";
import { default as connectDB } from "@/app/db/connectDB";
import { getData } from "@/app/helpers/verifyJWT";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";


connectDB();

export async function GET(request){
    try {
        const userId = await getData(request)
        
        if(!userId){
            throw new ApiError(401,"Unauthorized access")
        }

        const user = await User.findById(userId).select("-password")

        if(!user){
            throw new ApiError(410,"Error while getting the id. User not found")
        }

        return NextResponse.json({
            message: "User found",
            data: user
        },{status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error.message},{status:error.statusCode})
    }
}