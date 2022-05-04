import {authAPI} from "../api/api";
import {Dispatch} from "redux";


type InitialStateType = {
    isLoggedIn: boolean
    email:string | null
    name: string | null
}

const initialState: InitialStateType = {
    isLoggedIn: false,
    email: null,
    name:null

}
// reducers
export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// export const setUserDataAC = (value: ) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (loginData: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(loginData)
        .then( (res) => {
            console.log(res)
            dispatch(setIsLoggedInAC(true));
            // dispatch(setUserDataAC(''))
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>



export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}