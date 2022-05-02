import axios, {AxiosResponse} from "axios"
import {LoginParamsType} from "../store/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



//api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<AxiosResponse>('auth/register', {email, password})
    },

    login(params: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', params);
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login');
    }

}

export enum RESPONSE_TYPE {
    REGISTER_SUCCESS = 'Created',
}

export type ResponseError = {
    error:string
    email:string
    in:string
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

