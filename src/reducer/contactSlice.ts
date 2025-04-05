import {Contact} from "../model/contact.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";

const initialState: {contacts: Contact[]} = {
    contacts: [],
}

export type ContactRootState = {
    contact: {
        contacts: Array<{
            code: string;
            firstName: string;
            lastName: string;
            email: string;
            bio: string;
            image: File | null;
            rooms: string[];
            users: string[];
        }>
    }
}

export const saveContact = createAsyncThunk(
    "contact/saveContact",
    async (contact: Contact) => {
        try {
            const response = await api.post("contact/saveContact", contact);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const getAllContact = createAsyncThunk(
    "contact/getAllContact",
    async () => {
        try {
            const response = await api.get("contact/getAllContact");
            console.log("get all contact : ", response.data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
)

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
            .addCase(getAllContact.fulfilled, (state, action) => {
                state.contacts = action.payload || [];
                console.log("payload : " , action.payload);
            })
            .addCase(getAllContact.pending, () => {
                console.log("pending get all contacts");
            })
            .addCase(getAllContact.rejected, () => {
                console.log("rejected get all contact");
            })
    }
});

export default ContactSlice.reducer;