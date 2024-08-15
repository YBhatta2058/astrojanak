import { ApiError } from "@/app/Responses/ApiError";
import { verifyAdmin } from "@/app/helpers/verifyAdmin";
import { Kundali } from "@/app/models/kundali.model";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "@/app/helpers/cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("kundaliImage");
    const requestId = formData.get("requestId");

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // this will be used to upload the file
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);
    console.log(res)
    const kundali = await Kundali.findByIdAndUpdate(requestId,{
      kundaliImage: res.result.secure_url
    });
    console.log(kundali)
    if (!kundali) {
      throw new ApiError(410, "Kundali not found");
    }

    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: res.result.secure_url,
      });
    } else return NextResponse.json({ message: "failure" });
  } catch (err) {
   console.log(err)
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode }
    );
  }
}
