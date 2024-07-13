import connectDB from "@/app/db/connectDB";
import { getData } from "@/app/helpers/verifyJWT";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await connectDB();
        const userId = await getData(request);
        if(!userId){
            return NextResponse.json({message:"Unauthorized access"},{status:200});
        }
        const user = await User.findById(userId);

        return NextResponse.json({message:"User authorized",data:user},{status: 200});
    }
    catch(err){
        return NextResponse.json({message: "Unauthorized access or couldn't get the user"},{status: 200}); // Ensure this returns 401
    }
}
