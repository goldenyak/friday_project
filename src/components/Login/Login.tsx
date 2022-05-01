import React from 'react';
import l from "./Login.module.scss";

export const Login = () => {
    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Sign In</h2>
            <form>
                <div className={l.userBox}>
                    <input type="text" name="" required={true}/>
                    <label>Username</label>
                </div>
                <div className={l.userBox}>
                    <input type="password" name="" required={true}/>
                    <label>Password</label>
                </div>
                <button>
                    Login
                </button>
                <h3>Don’t have an account?</h3>
                <h4>Sign Up</h4>
            </form>
        </div>
    )

};
