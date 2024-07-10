import jwt from "jsonwebtoken";

export const getData = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken._id;

  } catch (error) {
    console.error("Error while getting the JWT token:", error.message);
    return null;
  }
};