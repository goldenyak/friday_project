import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {isLoggedInAC} from "./login-reducer";

const initialState = {
    email: '',
    name:'',
    error: null,
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action:actionTypeProfileReducer) => {
    switch (action.type) {
        case "profile/SET-PROFILE-INFO":
            return {...state, name: action.name, email: action.email}
        default:
            return state
    }

}


//thunk

export const changeProfileInfoTC = (name:string) => {
    return (dispatch: Dispatch) => {
        authAPI.changeProfileInfo(name).then(() => {
        })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout().then((res) => {
            dispatch(setProfileInfo( '', ''))
            dispatch(isLoggedInAC(false))
        })
    }
}


//actions
export const setProfileInfo = (email:string, name:string) => {
    return {
        type: 'profile/SET-PROFILE-INFO',
        email, name
    } as const
}


//types
export type actionTypeProfileReducer = ReturnType<typeof setProfileInfo>