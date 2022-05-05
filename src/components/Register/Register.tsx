import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import l from "./Register.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {registerTC} from "../../store/register-reducer";
import Preloader from "../../common/preloader/Preloader";
import showPasswordIcon from "../../common/icons/eye.svg";
import {RegisterValidate} from "../../validators/validators";






export const Register = () => {

    const dispatch : AppDispatch = useDispatch();

    let errorMessage = useSelector<AppRootStateType, string>(state => state.register.errorMessage)
    let successRegistrationStatus = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    let isFetchingLoader = useSelector<AppRootStateType, boolean>(state => state.register.isFetchingLoader)

    const formik = useFormik( {
        initialValues:  {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: RegisterValidate,
        onSubmit: values => {
            dispatch(registerTC(values.email, values.password) as any)
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