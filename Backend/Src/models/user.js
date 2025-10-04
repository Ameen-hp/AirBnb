import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    userType: { type: String, enum: ["user", "host"], default: "user" },

    // ✅ Each user has their own list of favourite homes
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
