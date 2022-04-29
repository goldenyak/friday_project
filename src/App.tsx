import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Register} from './components/Register/Register';

function App() {
    return (
        <div className='App'>
            Стартовая страница
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
