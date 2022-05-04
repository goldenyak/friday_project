import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import l from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppRootStateType} from "../../store/store";
import {loginTC} from "../../store/login-reducer";
import showPasswordIcon from "../../common/icons/showPasswordIcon.png";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'sasads1a@mail.ru',
            password: 'sdas3r2135dfsad',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 2) {
                errors.password = 'Пароль должен быть не менее 2 символов';
            }
            return errors;
        },
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
                    <input required={true}
                           {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={l.errorMessage}>{formik.errors.email}</div>) : null}
                    <label>Username</label>
                </div>
                <div className={l.userBox}>
                    <input type={showPassword ? "text" : "password"} required={true}
                           {...formik.getFieldProps('password')}
                    />
                    <img alt={'showPasswordIcon'} onClick={onShowPassword} src={showPasswordIcon}/>
                    {formik.touched.password && formik.errors.password ? (
                        <div className={l.errorMessage}>{formik.errors.password}</div>) : null}
                    <label>Password</label>
                </div>
                <button type='submit'>
                    Login
                </button>
                <h3>Don’t have an account?</h3>
                <a href={'/register'}><h4>Sign Up</h4></a>
            </form>
        </div>
    )
}