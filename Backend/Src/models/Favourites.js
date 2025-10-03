import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  homes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }],
}, { timestamps: true });

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
