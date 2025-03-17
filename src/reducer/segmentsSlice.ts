import {createSlice} from "@reduxjs/toolkit";

const initialState: { segment: string, collapse: boolean} = {
    segment: "",
    collapse: false,
};

export type SegmentsRootState= {
    segment: {
        segment: string;
        collapse: boolean;
    };
};

const SegmentsSlice = createSlice({
    name: "newChat",
    initialState,
    reducers: {
        changeSegment: (state,action) => {
            state.segment = action.payload.segment;
            state.collapse = action.payload.collapse;
        }
    }
});

export const {changeSegment} = SegmentsSlice.actions;
export default SegmentsSlice.reducer;