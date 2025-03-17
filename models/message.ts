import mongoose, {Schema} from "mongoose";

const messages = new Schema({
    sender: String,
    room: String,
    message: String,
    timestamp: { type: Date, default: Date.now() },
});

const MessagesSchema = mongoose.model<any>("Messages", messages);
export default MessagesSchema;