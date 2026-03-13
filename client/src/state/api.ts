import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const api = createApi({
    reducerPath: "api",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
        prepareHeaders: (headers) => {
            const deviceId = localStorage.getItem("deviceId");
            if (deviceId) {
                headers.set("x-device-id", deviceId);
                headers.set("x-device-name", navigator.platform);
            }

            const useragent = navigator.userAgent;
            headers.set("user-agent", useragent);
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default api;
