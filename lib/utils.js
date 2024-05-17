import mongoose from "mongoose";

export const connectToDb = async () => {
  const connection = {};
  try {
    if (connection.isConnected) return;

    // Increase timeout to 30 seconds (30000 milliseconds)
    const db = await mongoose.connect(process.env.MONGO, {
      bufferTimeoutMS: 30000,
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};
