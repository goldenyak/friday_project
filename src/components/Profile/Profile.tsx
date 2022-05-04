import React from 'react';
import style from './Profile.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";


export const Profile = React.memo(() => {

    let profileName = useSelector<AppRootStateType, string>(state => state.login.name)
    let profileEmail = useSelector<AppRootStateType, string>(state => state.login.email)
    let getEmailName = profileName!.includes('@') ? profileName!.split('@')[0] : profileName
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return (
        <div className={style.profileBox}>
            Personal info
            <div> <img src={'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}
                       style={{width:'100px', height:'100px'}}/></div>
            <div> <input  defaultValue={getEmailName}/></div>
            <div> <input  defaultValue={profileEmail}/></div>
        </div>

    );
})
