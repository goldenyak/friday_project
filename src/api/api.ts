import axios, {AxiosError, AxiosResponse } from "axios"

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})



//api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<AxiosResponse>('auth/register', {email, password})
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

