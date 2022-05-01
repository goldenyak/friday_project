import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Register} from './components/Register/Register';

function App() {
    return (
        <div>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
        </div>
    );
}

export default App;
