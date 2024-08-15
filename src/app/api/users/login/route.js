import { ApiError } from "@/app/Responses/ApiError";
import { default as connectDB } from "@/app/db/connectDB";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";


connectDB();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        
        const user = await User.findOne({email})

        if(!user){
            throw new ApiError(400,"User not found");
        }

        const passwordCorrect = await user.isPasswordCorrect(password);
        if(!passwordCorrect){
            throw new ApiError(415,"Incorrect Password")
        }

        const loggedInUser = await User.findById(user._id).select('-password');

        const accessToken = await user.generateAccessToken();
        const options = {
            httpOnly: true,
            secure: true
        }
        
        if(!user.isVerified){
            throw new ApiError(410,"User not verified");
        }

        const response = NextResponse.json({message: "User logged in successfully",data: loggedInUser},{status:200})
        
        response.cookies.set("token",accessToken,options)
        return response;
        
} 
    catch (err) {
        return NextResponse.json({error: err.message},{status: err.statusCode})
    }
}
