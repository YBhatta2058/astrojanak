import { ApiError } from "@/app/Responses/ApiError";
import { default as connectDB } from "@/app/db/connectDB";
import { sendMail } from "@/app/helpers/sendMail";
import { getData } from "@/app/helpers/verifyJWT";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request){
    try {
        const userId = await getData(request)
        const reqBody = await request.json();
        const {message} = reqBody;
        if(!userId){
            throw new ApiError(401,"Unauthorized access")
        }

        const user = await User.findById(userId).select("-password")

        if(!user){
            throw new ApiError(410,"Error while getting the id. User not found")
        }
        const res = await sendMail({email: user.email,emailType:"MESSAGE",userId:userId,Body:message});
        if(!res){
            console.log(res)
            throw new ApiError(420,"Mail not sent. Error !!")
        }
        return NextResponse.json({
            message: "Mail sent successfully",
            data: null
        },{status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error.message},{status:error.statusCode})
    }
}