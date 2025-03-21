import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";
import {Room} from "../model/room.ts";

const initialState: { rooms: Room[] } = {
    rooms:[],
}

export type RoomRootState = {
    room: {
        rooms: Array<{
            name: string;
            createAt: Date;
            image: File | string | null;
            members: [];
        }>;
    };
};

export const saveRooms = createAsyncThunk(
    "room/saveRooms",
    async ( room: FormData ) => {
        try {
            const response = await api.post("chat/saveRooms", room, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
);

const RoomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveRooms.fulfilled, (state, action) => {
                if (action.payload) {
                    state.rooms = [...state.rooms, action.payload];
                }
            })
            .addCase(saveRooms.pending, () => {
                console.log("Pending save Rooms");
            })
            .addCase(saveRooms.rejected, () => {
                console.log("save rooms rejected request");
            })
    }
});

export default RoomSlice.reducer;