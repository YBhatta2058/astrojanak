import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req){
    try{
        const reqBody = await req.json();
        const { token } = reqBody;
        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            throw new ApiError(410,"Invalid token ! Cannot verify")
            
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified Successfully",
            success: true
        },{
            status: 200
        })
    }catch(err){
        return NextResponse.json({error: err.message},{status: 500})
    }
}