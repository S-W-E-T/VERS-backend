import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const connection = await mongoose.connect(process.env.MONGO_URL || "");

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`.red);
    // process.exit(1);
  }
};

export default connectDB;
