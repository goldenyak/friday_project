import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import l from "./Register.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {registerTC} from "../../store/register-reducer";
import Preloader from "../../common/preloader/Preloader";
import showPasswordIcon from "../../common/icons/showPasswordIcon.png";


export type registerValueTypes = {
    email:string,
    password:string,
    confirmPassword?: string
}

type FormikErrorType = {
    email?:string,
    password?:string,
    confirmPassword?: string
}


const validate = (values:registerValueTypes) => {
    const errors: FormikErrorType = {};

    if (!values.email) {
        errors.email = 'Required email';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required password';
    } else if (values.password.length < 8) {
        errors.password = 'Passwords must be at least 7 characters'
    }


    if(!values.confirmPassword) {
        errors.confirmPassword = 'Required confirm password';

    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords are not same';
    }

    return errors;

}




export const Register = () => {

    const dispatch : AppDispatch = useDispatch();

    let errorMessage = useSelector<AppRootStateType, string>(state => state.register.errorMessage)
    let successRegistrationStatus = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    let isFetchingLoader = useSelector<AppRootStateType, boolean>(state => state.register.isFetchingLoader)

    const formik = useFormik( {
        initialValues:  {
            email: '',
            password: '' ,
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            dispatch(registerTC(values) as any)
        }
    })


    const[showPassword, setShowPassword] = useState<boolean>(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)



    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    if (successRegistrationStatus) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Sign Up</h2>

            <form onSubmit={formik.handleSubmit}>

                <div className={l.userBox}>
                    <input required={true} {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email &&
                        <div className={l.errorMessage}>{formik.errors.email}</div>}
                    <label>Email</label>
                </div>

                <div className={l.userBox}>
                    <input required={true} type={showPassword ? "text" : "password"} {...formik.getFieldProps('password')}/>
                    <img alt={'showPasswordIcon'} onClick={onShowPassword} src={showPasswordIcon}/>
                    {formik.touched.password && formik.errors.password && <div className={l.errorMessage}>{formik.errors.password}</div>}
                    <label>Password</label>
                </div>


                <div className={l.userBox}>
                    <input required={true}  type={showConfirmPassword ? "text" : "password"} {...formik.getFieldProps('confirmPassword')}/>
                    <img alt={'showPasswordIcon'} onClick={onShowConfirmPassword} src={showPasswordIcon}/>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className={l.errorMessage}>{formik.errors.confirmPassword}</div>}
                    <label>Confirm Password</label>
                </div>

                {isFetchingLoader ? <Preloader/> :
                    <div className={l.buttonBlock}>
                        <a href={'/login'}  className={l.backToLoginLink}>Login</a>
                        <button className={l.submitButton} type="submit">Register</button>
                    </div> }

                {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}

            </form>
        </div>
    )
}