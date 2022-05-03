import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Register} from './components/Register/Register';

function App() {
    return (
<<<<<<<<< Temporary merge branch 1
        <div className='App'>
            Стартовая страница
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
=========
        <div>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
>>>>>>>>> Temporary merge branch 2
        </div>
    );
}

export default App;
