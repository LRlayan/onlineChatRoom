import {getAllRooms} from "../repository/room-repository";

class IdGenerator {

    async generateId(type: string){
        switch (type) {
            case "ROOM-":
                const getAllRoom = await getAllRooms();
                const roomCodes = getAllRoom.map((room) => room.roomCode);

                if (roomCodes.length > 0) {
                    return await this.codesIncrement(roomCodes,"ROOM");
                }
                return "ROOM-1";
            default:
                return null;
        }
    }

    async codesIncrement(codes: string[], type: string): Promise<string> {
        const lastElement = codes[codes.length - 1];
        const parts = lastElement.split("-");
        let increment = parseInt(parts[1], 10) + 1;
        return `${type}-${increment}`;
    }
}

export default IdGenerator;