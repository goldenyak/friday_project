import {authAPI} from "../api/api";


type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
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
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (params: LoginParamsType) => (dispatch: any) => {
    authAPI.login(params)
        .then( (res: any) => {
            dispatch(setIsLoggedInAC(true));
        })
}

export const logoutTC = () => (dispatch: any) => {
    authAPI.logout()
        .then( (res: any) => {
            dispatch(setIsLoggedInAC(false));
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>



export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}