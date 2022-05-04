import {authAPI} from "../api/api";
import {Dispatch} from "redux";


type InitialStateType = {
    isLoggedIn: boolean
    email:string
    name: string
}

const initialState: InitialStateType = {
    isLoggedIn: false,
    email: '',
    name:''

}
// reducers
export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-USER-DATA':
            return {...state, ...action.payload }
        case 'login/IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}

// actions
export const setUserData = (isLoggedIn:boolean, email:string, name:string) => (
    {type: 'login/SET-USER-DATA',
        payload: {isLoggedIn, email, name}
    } as const)

export const isLoggedInAC = (isLoggedIn:boolean) => (
    {type: 'login/IS-LOGGED-IN', isLoggedIn
    } as const)


// thunks
export const loginTC = (loginData: LoginParamsType) => {
    return   (dispatch: Dispatch) => {
        authAPI.login(loginData)
            .then( (res) => {
                let {email, name} = res.data
                dispatch(setUserData(true, email, name));
            })
    }
}



// types
type ActionsType = ReturnType<typeof setUserData>
    | ReturnType<typeof isLoggedInAC>


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}