import axios, {AxiosResponse} from "axios"
import {LoginParamsType} from "../store/login-reducer";
import {registerValueType} from "../components/Register/Register";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



//api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<registerValueType,AxiosResponse>('auth/register', {email, password} )
    },

    login(loginData: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', loginData);
    },
    getProfile() {
        return instance.post<ResponseType>('/auth/me', {});
    },
   // changeInfo() {
   //      return instance.put<ResponseType>('/auth/me', {name:"new name", avatar:"https://s3.envato.com/files/253866565/9270.jpg"});
   //  }



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

