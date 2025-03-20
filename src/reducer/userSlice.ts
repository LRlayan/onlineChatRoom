import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../model/user.ts";
import {api} from "../api/api.ts";

const initialState : { user: User | null, jwt_token: null, refresh_token: null, username: null, isAuthenticated: boolean, loading: boolean, error: string } = {
    user: null,
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
};

export type UserRootState = {
    user: {
        user: User | null;
        jwt_token: null;
        refresh_token: null;
        username: null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
    };
};

export const register = createAsyncThunk(
    "auth/register",
    async (user: User) => {
        try {
            console.log("Sending register request:", user);
            const response = await api.post("auth/register", user, {withCredentials: true});
            console.log("Register response:", response.data);
            return response.data;
        } catch (e: any) {
            if (e.config && typeof e.config.url !== "string") {
                console.error("Invalid URL in Axios request:", e.config.url);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: User) => {
        try {
            const response = await api.post(
                'auth/login',
                user,
                {withCredentials: true}
            );
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("jwt_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                    console.log("payload :: ",action.payload)
                    console.log("isAuth :: ", state.isAuthenticated)
                }
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Registration failed";
                console.log(state.error);
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.jwt_token = action.payload.accessToken;
                    state.refresh_token = action.payload.refreshToken;
                    state.username = action.payload.username;
                    state.isAuthenticated = true;

                    localStorage.setItem("jwt_token", action.payload.accessToken);
                    localStorage.setItem("refresh_token", action.payload.refreshToken);
                }
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false;
                console.error("Login failed");
            });
    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;