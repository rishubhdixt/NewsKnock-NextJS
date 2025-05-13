import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the expected structure of the decoded token
interface DecodedToken extends JwtPayload {
  id: string; // Assuming `id` is a string, you can adjust the type as needed
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    // Verify the token and specify the type of the decoded token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as DecodedToken;

    return decodedToken.id;

  } catch (error: unknown) {
    // Handle errors more safely
    if (error instanceof Error) {
      console.error("Token verification error:", error.message);
    } else {
      console.error("Unknown error during token verification");
    }
    return null; // or handle the error as needed
  }
};
