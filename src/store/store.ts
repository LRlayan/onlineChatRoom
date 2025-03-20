import {configureStore} from "@reduxjs/toolkit";
import SegmentsSlice from "../reducer/segmentsSlice.ts";
import RoomSlice from "../reducer/roomSlice.ts";
import UserSlice from "../reducer/userSlice.ts";


export const store = configureStore({
    reducer:{
        segment: SegmentsSlice,
        rooms: RoomSlice,
        user: UserSlice,
    }
});

export type AppDispatch = typeof store.dispatch;