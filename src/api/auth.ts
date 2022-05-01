import axios, { AxiosResponse } from "axios";
import {LoginParamsType} from "../redux/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// login-api
export const authApi = {
    login(params: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', params);
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login');
    }
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}