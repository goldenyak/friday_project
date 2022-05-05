import {authAPI, ResponseError} from "../api/api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


type InitialStateType = {
    isLoggedIn: boolean
    email:string
    name: string
    error:string | null
    isFetching: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false,
    email: '',
    name:'',
    error: null,
    isFetching:true

}
// reducers
export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-USER-DATA':
            return {...state, ...action.payload }
        case 'login/IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn }
        case 'login/ERROR-MESSAGE':
            return {...state, error: action.message}
        case "login/SET-ISFETCHING":
            return {...state, isFetching: action.fetching}
        default:
            return state
    }
}

// actions
export const setUserData = (isLoggedIn:boolean, email:string, name:string) => (
    {type: 'login/SET-USER-DATA',
        payload: {
            isLoggedIn, email, name
        }
    } as const)

export const isLoggedInAC = (isLoggedIn:boolean) => (
    {type: 'login/IS-LOGGED-IN', isLoggedIn
    } as const)

export const errorLoginMessage = (message:string) => {return {type: 'login/ERROR-MESSAGE', message} as const}
export const isFetchingStatus = (fetching:boolean) => {return {type: 'login/SET-ISFETCHING', fetching} as const}



// thunks
export const loginTC = (loginData: LoginParamsType) => {
    return   (dispatch: Dispatch) => {
        dispatch(isFetchingStatus(false))
        authAPI.login(loginData)
            .then( (res) => {
                let {email, name} = res.data
                dispatch(setUserData(true, email, name));
            }).catch((error:AxiosError<ResponseError>) => {
            dispatch(errorLoginMessage(error.response?.data ? error.response.data.error: error.message))
        }).finally( () => {
                dispatch(isFetchingStatus(true))
            }

        )
    }
}



// types
type ActionsType = ReturnType<typeof setUserData>
    | ReturnType<typeof isLoggedInAC>
    | ReturnType<typeof errorLoginMessage>
    | ReturnType<typeof isFetchingStatus>


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}