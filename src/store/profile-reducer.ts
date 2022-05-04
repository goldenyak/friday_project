import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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


//actions
const setProfileInfo = (payload:any) => {return {type: 'profile/SET-PROFILE-INFO', payload} as const}


//types
export type actionTypeProfileReducer = ReturnType<typeof setProfileInfo>