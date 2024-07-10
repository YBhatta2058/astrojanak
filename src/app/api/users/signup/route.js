import { ApiError } from "@/app/Responses/ApiError";
import connectDB from "@/app/db/connectDB";
import { sendMail } from "@/app/helpers/sendMail.js";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    try {
        const reqBody = await req.json();
        const { name, phone, dob, email, password, timeOfBirth, placeOfBirth } = reqBody;
        const {province,district} = placeOfBirth;
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
        await sendMail({ email, emailType: "VERIFY", userId: newUser._id });

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 200 });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: err.statusCode || 410 });
    }
}
