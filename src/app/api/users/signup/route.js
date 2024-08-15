import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { sendMail } from "@/app/helpers/sendMail.js";
import { User } from "@/app/models/user.model";
import { CldUploadWidget } from "next-cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    try {
        const reqBody = await req.json();
        const { name, phone, dob, email, password, timeOfBirth, province,district } = reqBody;
        const placeOfBirth = {province,district}
        console.log(name,phone,dob,email,password,timeOfBirth,province,district)
        if (!name || !phone || !dob || !email || !password || !timeOfBirth || !province || !district) {
            throw new ApiError(410, "All fields are required");
        }
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const newUser = new User({ name, phone, dob, email, password, timeOfBirth, placeOfBirth });
        await newUser.save();
        const res = await sendMail({ email, emailType: "VERIFY", userId: newUser._id });
        if(!res){
            await User.deleteOne({_id:newUser._id})
            throw new ApiError(440,"Error while sending mail !!Register again")
        }

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 200 });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: err.statusCode || 410 });
    }
}
