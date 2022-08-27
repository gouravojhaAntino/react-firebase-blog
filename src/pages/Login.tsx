import React from 'react'
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import {useNavigate} from "react-router-dom"

function Login({setLogin}:any) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((result) => {
            console.log(result)
            localStorage.setItem('isLogged',JSON.stringify(result))
            setLogin(true);
            navigate("/")
        })
    }

    return (
        <div className="loginPage">
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
    )
}

export default Login