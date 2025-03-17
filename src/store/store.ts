import {configureStore} from "@reduxjs/toolkit";
import SegmentsSlice from "../reducer/segmentsSlice.ts";


export const store = configureStore({
    reducer:{
        segment: SegmentsSlice,
    }
});

export type AppDispatch = typeof store.dispatch;