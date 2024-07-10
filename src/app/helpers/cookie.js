import jwt from "jsonwebtoken";

export const getCookieToken = async () => {
  try {
    console.log("From cookie js");

    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookieValue("token") || "";
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken._id;

  } catch (error) {
    console.error("Error while getting the JWT token:", error.message);
    return null;
  }
};
