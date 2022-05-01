import React, {useState} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "./registerReducer";
import style from './Register.module.scss'
import showPasswordIcon from '../../common/icons/showPasswordIcon.png'
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import Preloader from "../../common/preloader/Preloader";


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



export const Register: React.FC = () => {

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
        <div>
            <div>
                Страница REGISTER
            </div>
            <div className={style.container}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <div>
                        <h2>It-incubator</h2>
                    </div>
                    <div>
                        <h3>Sign Up</h3>
                    </div>


                    <div className={style.formInputBlock}>
                        <div className={style.customInput}>
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                // getting name, onchange, value with destructurization
                                   {...formik.getFieldProps('email')}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && <div className={style.errorMessage}>{formik.errors.email}</div>}
                    </div>

                    <div className={style.formInputBlock}>
                        <div className={style.customInput}>
                            <label className={style.inputLabel} htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...formik.getFieldProps('password')}
                            />
                            <img alt={'showPasswordIcon'} onClick={onShowPassword} className={style.showPasswordIcon} src={showPasswordIcon}/>

                        </div>
                        {formik.touched.password && formik.errors.password && <div className={style.errorMessage}>{formik.errors.password}</div>}
                    </div>


                    <div className={style.formInputBlock}>

                        <div className={style.customInput}>
                            <label className={style.inputLabel} htmlFor="email">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            <img alt={'showPasswordIcon'} onClick={onShowConfirmPassword} className={style.showPasswordIcon} src={showPasswordIcon}/>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className={style.errorMessage}>{formik.errors.confirmPassword}</div>}
                    </div>
                    {isFetchingLoader ? <Preloader/> :
                        <div className={style.buttonBlock}>
                            <a href={'/login'}  className={style.backToLoginLink}>Login</a>
                            <button className={style.submitButton} type="submit">Register</button>

                        </div> }

                    {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
                    {successRegistrationStatus && <div style={{color:'green'}}>Success Registration!</div>}
                </form>
            </div>
        </div>
    );
};
