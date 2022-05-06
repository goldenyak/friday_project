import {Dispatch} from "redux";
import {authAPI, ResponseError} from "../api/api";
import {AxiosError} from "axios";
import {isLoggedInAC} from "./login-reducer";
import {setProfileInfo} from "./profile-reducer";

const initialState = {
    isInitializedApp: false,
    status: 'loading',
    error: null,
}

type InitialStateType = {
    isInitializedApp: boolean
    status:string
    error: string | null
}

export const appReducer = (state: InitialStateType = initialState, action:appReducerTypes):InitialStateType => {
    switch (action.type) {
        case "app/SET-APP-STATUS":
            return {...state, status: action.status}
        case  "app/IS-INITIALIZED-APP":
            return {...state, isInitializedApp: action.isInitialized}
        case 'app/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }

}


//thunk
export const initializeAppTC = () => (dispatch:Dispatch) => {
    authAPI.getProfile().then((resolve) => {
        dispatch(setAppStatus('idle'))
        dispatch(isInitializedApp(true))
        dispatch(isLoggedInAC(true))
        dispatch(setProfileInfo(resolve.data.email, resolve.data.name))
    }).catch((error:AxiosError<ResponseError>) => {
        dispatch(setAppErrorAC(error.response?.data ? error.response.data.error: error.message))

    }).finally(() => {
        dispatch(setAppStatus('succeeded'))

    })

}

//actions

export const setAppStatus = (status:RequestStatusType) => {return {type: 'app/SET-APP-STATUS', status} as const}
export const isInitializedApp = (isInitialized:boolean) => {return {type: 'app/IS-INITIALIZED-APP', isInitialized} as const}

export const setAppErrorAC = (error:string) => {return {type: 'app/SET-ERROR', error} as const}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appReducerTypes =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof isInitializedApp>