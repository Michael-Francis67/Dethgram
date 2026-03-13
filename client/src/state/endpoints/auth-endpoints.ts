import api from "../api";
import {SignUpResponseData} from "@/types";

export const authEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignUpResponseData, {displayName: string; email: string; password: string}>({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),

        login: builder.mutation<SignUpResponseData, {email: string; password: string}>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),

        verifyEmail: builder.mutation<boolean, {code: string}>({
            query: (data) => ({
                url: "/auth/verify-email",
                method: "POST",
                body: data,
            }),
        }),

        forgotPassword: builder.mutation<{message: string}, {email: string}>({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation<{message: string}, {token: string; password: string}>({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authEndpoints;
