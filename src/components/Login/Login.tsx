import React, {useState} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import l from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppRootStateType} from "../../store/store";
import {loginTC} from "../../store/login-reducer";
import showPasswordIcon from "../../common/icons/eye.svg";
import Preloader from "../../common/preloader/Preloader";
import {loginValidation} from "../../validators/validators";

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const errorMessage = useSelector<AppRootStateType, string | null>(state => state.login.error)
    const isFetchingStatus = useSelector<AppRootStateType, boolean>(state => state.login.isFetching)

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            // email: '',
            // password: '',
            email: 'onethps@gmail.com',
            password: 'dwqdqw24142',
            rememberMe: false
        },
        validate: loginValidation,
        onSubmit: loginData => {
            dispatch(loginTC(loginData) as any)
            formik.resetForm()
        },
    })

    const[showPassword, setShowPassword] = useState<boolean>(false)

    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }

    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Sign In</h2>
            <form onSubmit={formik.handleSubmit}>

                <div className={l.userBox}>
                    <input required={true}{...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ?
                        <div className={l.errorMessage}>{formik.errors.email}</div> : null}
                    <label>Username</label>
                </div>

                <div className={l.userBox}>
                    <input required={true} type={showPassword ? "text" : "password"}
                           {...formik.getFieldProps('password')}/>
                    <img alt={'showPasswordIcon'} onClick={onShowPassword}
                         src={showPasswordIcon}/>
                    {formik.touched.password && formik.errors.password ? (
                        <div className={l.errorMessage}>{formik.errors.password}</div>) : null}
                    <label>Password</label>
                </div>

                <div className={l.forgotPassword}>
                    <NavLink to={'/forgot'} >Forgot Password</NavLink>
                </div>

                <div className={l.rememberBox}>
                    <input type={'checkbox'}
                           {...formik.getFieldProps('rememberMe')}
                    />
                    <label>Remember Me</label>
                </div>


                {isFetchingStatus ? <div className={l.loginButtonBox}>
                        <div className={l.errorBox}>
                            {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}
                        </div>
                        <button type='submit'>Login</button>

                        <h3>Don’t have an account?</h3>
                    <h4><NavLink to={'/register'}>Sign Up</NavLink></h4>
                    </div>
                    :

                    <div className={l.preloaderBox}> <Preloader/></div>}
            </form>
        </div>
    )
}