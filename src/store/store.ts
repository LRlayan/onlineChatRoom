import {configureStore} from "@reduxjs/toolkit";
import SegmentsSlice from "../reducer/segmentsSlice.ts";
import RoomSlice from "../reducer/roomSlice.ts";


export const store = configureStore({
    reducer:{
        segment: SegmentsSlice,
        rooms: RoomSlice,
    }
});

export type AppDispatch = typeof store.dispatch;