import jwt from "jsonwebtoken";

export const getData = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log(token)
    if(!token) return null;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken._id;

  } catch (error) {
    console.log("Error while getting the JWT token. Unauthorized access");
    return null;
  }
};