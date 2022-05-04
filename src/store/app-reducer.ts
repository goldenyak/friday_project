import {Dispatch} from "redux";
import {authAPI, ResponseError} from "../api/api";
import {AxiosError} from "axios";
import {isLoggedInAC, setUserData} from "./login-reducer";

const initialState = {
    status: 'loading',
    error: null,
    isInitialized:false
}

type InitialStateType = {
    status:string
    error: string | null
    isInitialized:boolean
}

export const appReducer = (state: InitialStateType = initialState, action:appReducerTypes):InitialStateType => {
    switch (action.type) {
        case "app/SET-APP-STATUS":
            return {...state, status: action.status}
        case "app/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}

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
        dispatch(setIsInitializedAC(true))
        dispatch(setUserData(true, resolve.data.email, resolve.data.name))
    }).catch((error:AxiosError<ResponseError>) => {
        console.log(error)
        dispatch(setIsInitializedAC(false))
        dispatch(setAppErrorAC(error.response?.data ? error.response.data.error: error.message))

    }).finally(() => {
        dispatch(setAppStatus('succeeded'))

    })

}

//actions
export const setIsInitializedAC = (isInitialized: boolean) => {return {type: 'app/SET-IS-INITIALIZED', isInitialized} as const}

export const setAppStatus = (status:RequestStatusType) => {return {type: 'app/SET-APP-STATUS', status} as const}

export const setAppErrorAC = (error:string) => {return {type: 'app/SET-ERROR', error} as const}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appReducerTypes = ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorAC>