import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import l from './Profile.module.scss';
import onLoadAvatarIcon from '../../common/icons/onLoadAvatar.svg'
import {getProfileInfoTC, logoutTC} from "../../store/profile-reducer";
import Header from '../Header/Header';


type profileType = {
    email:string,
    name:string,
}

type FormikErrorType = {
    email?:string,
    name?:string,
}

const validate = (values:profileType) => {
    const errors: FormikErrorType = {};

    if (!values.email) {
        errors.email = 'Required email';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.name) {
        errors.name = 'Required name';
    }


    return errors;

}




export const Profile =() => {


    let dispatch = useDispatch()


    let profileName = useSelector<AppRootStateType, string>(state => state.login.name)
    let profileEmail = useSelector<AppRootStateType, string>(state => state.login.email)
    let getEmailName = profileName!.includes('@') ? profileName!.split('@')[0] : profileName
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

     const onLogoutHandler = () => {
        dispatch(logoutTC() as any)
    }

    const formik = useFormik( {
        initialValues:  {
            email: profileEmail,
            name:getEmailName,
        },
        validate,
        onSubmit: values => {
            dispatch( getProfileInfoTC(values.name) as any)

        }
    })



    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }




    return (
        <>
            <Header/>

            <div className={l.loginBox}>
                <h2> Personal information</h2>
                <div className={l.avatarBlock}>
                    <img className={l.avatar}
                         src={'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}/>
                    <img className={l.loadAvatar} alt={'loadAvatarIcon'} src={onLoadAvatarIcon} />
                </div>

                <form onSubmit={formik.handleSubmit}>

                    <div className={l.userBox}>
                        <input required={true} {...formik.getFieldProps('name')}/>
                        {formik.touched.name && formik.errors.name &&
                            <div className={l.errorMessage}>{formik.errors.name}</div>}
                        <label>Name</label>
                    </div>

                    <div className={l.userBox}>
                        <input required={true} {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email &&
                            <div className={l.errorMessage}>{formik.errors.email}</div>}
                        <label>Email</label>
                    </div>

                    <div className={l.buttonBlock}>
                        <a onClick={onLogoutHandler}  className={l.backToLoginLink}>Log Out</a>
                        <button className={l.submitButton} type="submit">Save</button>
                    </div>


                </form>


            </div>
        </>
    );
}
