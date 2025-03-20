import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    imageUrl: { type: String }, // Image URL field
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Message", MessageSchema);
