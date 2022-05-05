import axios, {AxiosResponse} from "axios"
import {LoginParamsType} from "../store/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



//api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<AxiosResponse>('auth/register', {email, password} )
    },

    login(loginData: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', loginData);
    },
    getProfile() {
        return instance.post<ResponseType>('/auth/me', {});
    },
    changeProfileInfo(name:string) {
        return instance.put<ResponseType>('/auth/me', {name});
    },
    logout() {
        return instance.delete('/auth/me', {})
    },
    forgotPassword(email:string) {
        return instance.post('/auth/forgot',{
                email: email, // кому восстанавливать пароль
                from: "test-front-admin <ai73a@yandex.by>",
                // можно указать разработчика фронта)
                message: `
<div style="background-color: lime; padding: 15px">password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>` // хтмп-письмо, вместо $token$ бэк вставит токен
            }
        )
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

