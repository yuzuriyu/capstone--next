// pages/api/login.js

import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT generation
import { connectToDb } from "@/lib/utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Connect to MongoDB
    const { db } = await connectToDb();

    // Find the user with the provided email and password
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Return the JWT to the client
    return res.status(200).json({ token });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
