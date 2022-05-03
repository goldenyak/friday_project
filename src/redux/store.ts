import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {loginReducer} from "./login-reducer";

const rootReducer = combineReducers({
    login: loginReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
// export type AppActionType = ActionsUserType | ActionsReposType | ActionsLoaderType
// export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionType>
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()


// @ts-ignore
window.store = store;
