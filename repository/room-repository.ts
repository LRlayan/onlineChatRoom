import Rooms from "../schema/room";

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