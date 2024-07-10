import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../Responses/ApiError";

export const verifyAdmin = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);
    console.log(user)
    if(!user.isAdmin){
        throw new ApiError(401,"Not an admin. Unauthorized access")
    }
    return true;
  } catch (error) {
    return false;
  }
};
