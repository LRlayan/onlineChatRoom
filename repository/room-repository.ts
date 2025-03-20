import Rooms from "../schema/room";
import Room from "../schema/room";

interface Rooms {
    name: string;
    createAt: Date;
    members: string[];
}

export async function saveRoomRepository(roomData: Rooms) {
    try {
        const newRoom = new Rooms(roomData);
        const result = newRoom.save();
        if (result) {
            return result;
        } else {
            return { message: "Failed to create room. Please try again."}
            throw new Error("Failed to create room. Please try again.");
        }
    } catch (e) {
        console.error("Failed to create room:", e);
        throw e;
    }
}

export async function getAllRooms() {
    try {
        return await Rooms.find().populate("members");
    } catch (e) {
        console.error("Failed to get rooms data:", e);
        throw e;
    }
}