import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import { Register } from './components/Register/Register';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./store/app-reducer";
import {AppRootStateType} from "./store/store";
import Preloader from "./common/preloader/Preloader";

function App() {
    let dispatch = useDispatch()
    let isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

    // useEffect(() => {
    //     dispatch(initializeAppTC() as any)
    // }, [dispatch])



    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader/>
        </div>
    }



    return (
        <div className='App'>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>

                <Route path={'*'}  element={ <Login/> }/>
            </Routes>
        </div>
    );
}

export default App;
