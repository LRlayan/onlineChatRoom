import {Contact} from "../model/contact.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";

const initialState: {contacts: Contact[]} = {
    contacts: [],
}

export type ContactRootState = {
    contact: {
        contact: Array<{
            firstName: string;
            lastName: string;
            email: string;
        }>
    }
}

export const saveContact = createAsyncThunk(
    "contact/saveContact",
    async (contact: Contact) => {
        try {
            console.log("thunk" ,contact)
            const response = await api.post("contact/saveContact", contact);
            console.log("data res : ", response.data)
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveContact.fulfilled, (state, action) => {
                if (action.payload) {
                    state.contacts = [...state.contacts, action.payload];
                }
            })
            .addCase(saveContact.pending, () => {
                console.log("pending save contact");
            })
            .addCase(saveContact.rejected, () => {
                console.log("rejected save contact");
            })
    }
});

export default ContactSlice.reducer;