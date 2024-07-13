import nodemailer from "nodemailer"
import { User } from "../models/user.model";
import bcrypt from "bcrypt"

  const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_USERNAME,
        pass: process.env.APP_PASSWORD
    },
  });

  export const sendMail = async ({email,emailType,userId})=>{
    console.log("Sending mail");
    try{
      const hashedToken = await bcrypt.hash(userId.toString(),10);
      const encodedToken = encodeURIComponent(hashedToken);
      if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
          {
            verifyToken: encodedToken,
            verifyTokenExpiry:Date.now() + 3600000
          }
        )
      }
      const mailOptions = {
        from:"ybhatta70@gmail.com",
        to: email,
        subject: emailType,
        text: `Please click this link to verify your account 
        
        http://localhost:3000/verifyEmail/${encodedToken}`
      }

      const mailResponse = await transporter.sendMail(mailOptions)
      return mailResponse;
    }catch(err){
      console.log(err);
      return null;
    }
  }
    
    