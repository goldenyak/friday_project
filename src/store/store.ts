import {applyMiddleware, combineReducers, createStore} from "redux";
import {actionTypeRegistrationReducer, registerReducer} from "../components/Register/registerReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

const rootReducer  = combineReducers( {
    register: registerReducer
})



export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = actionTypeRegistrationReducer


export type AppThunk<ReturnType=void>=ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;