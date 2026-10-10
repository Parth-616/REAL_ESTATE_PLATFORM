import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Safety check to ensure your environment variable is actually loading
    if (!mongoURI) {
      console.error("❌ Error: MONGO_URI is not defined in your .env file!");
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1); // Stop the server if the database fails to connect
  }
};