import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/"
});

const getAccessToken = () => localStorage.getItem("jwt_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

api.interceptors.request.use (
    (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = getAccessToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if ( error.response && error.response.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                const res = await api.post("auth/refresh-token", {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }
                    });

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem("jwt_token", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                    return api(originalRequest);
                }
            } catch (e) {
                console.error("Refresh token expired or invalid. Logging out...");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);