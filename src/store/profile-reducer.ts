import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setUserData} from "./login-reducer";

const initialState = {}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action:actionTypeProfileReducer) => {
    switch (action.type) {
        case "profile/SET-PROFILE-INFO":
            return {...state, ...action.payload}
        default:
            return state
    }

}


//thunk
export const getProfileInfoTC = (name:string) => {
    return (dispatch: Dispatch) => {
        authAPI.changeProfileInfo(name).then((res) => {
        })
    }
}


export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout().then((res) => {
           dispatch(setUserData(false, '', ''))
        })
    }
}


//actions
const setProfileInfo = (payload:any) => {return {type: 'profile/SET-PROFILE-INFO', payload} as const}


//types
export type actionTypeProfileReducer = ReturnType<typeof setProfileInfo>