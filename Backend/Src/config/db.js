import mongoose from "mongoose";

const connectDB = async () => {
  let url = "mongodb+srv://devameen:devameen@juniordevelopment.ecnn1hs.mongodb.net/?retryWrites=true&w=majority&appName=JuniorDevelopment"
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
