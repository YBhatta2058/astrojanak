import { ApiError } from "@/app/Responses/ApiError";
import { ApiResponse } from "@/app/Responses/ApiResponse";
import connectDB from "@/app/db/connectDB";
import { getData } from "@/app/helpers/verifyJWT";
import { Kundali } from "@/app/models/kundali.model.js";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();
    try {
        const  userId  = await getData(request);
        const { message } = await request.json();
        
        if (!userId || !message) {
            throw new ApiError(400, "User ID and message are required");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const kundaliRequest = new Kundali({
            user: userId,
            requestMessage:message,
            status: 'pending'
        });

        await kundaliRequest.save();

        return NextResponse.json({ message: "Kundali request created successfully", data: kundaliRequest }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
