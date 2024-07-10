import { ApiError } from "@/app/Responses/ApiError";
import { default as connectDB } from "@/app/db/connectDB";
import { getData } from "@/app/helpers/verifyJWT";
import { NextResponse } from "next/server";


connectDB();

export async function POST(request){
    try {
        const userId = getData(request);
        if(!userId){
            throw new ApiError(410,"User not found")
        }
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true
        },{status: 200})

        response.cookies.set("token","",{httpOnly:true})

        return response;
        
    } catch (error) {
        return NextResponse.json({message: error.message},{status: statusCode})
    }
}