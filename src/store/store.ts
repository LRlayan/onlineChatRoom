import {configureStore} from "@reduxjs/toolkit";
import SegmentsSlice from "../reducer/segmentsSlice.ts";
import RoomSlice from "../reducer/roomSlice.ts";
import UserSlice from "../reducer/userSlice.ts";
import ContactSlice from "../reducer/contactSlice.ts";


export const store = configureStore({
    reducer:{
        segment: SegmentsSlice,
        rooms: RoomSlice,
        user: UserSlice,
        contact: ContactSlice
    }
});

export type AppDispatch = typeof store.dispatch;