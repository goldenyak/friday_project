import React from 'react';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Register} from './components/Register/Register';
import {store} from './redux/store';

function App() {
    return (
        <div className='App'>
            <Provider store={store}>
                Hello, World)
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </Provider>
        </div>
    );
}

export default App;
