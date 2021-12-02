import React, {useState} from "react";
import './../css/ModalWindow.css'
import SignIn from "./SignIn";
import LogoSingIn from './../img/Logo.svg';
import SignUp from "./SignUp";
import {faPaw} from "@fortawesome/free-solid-svg-icons";

const ModalWindow = () => {

    const [currentForm, setCurrentForm] = useState(true);
    const changeFormHandler=(event, isChanged)=>{
        event.preventDefault();
        const signInBtn=document.querySelectorAll('.btn');
        signInBtn.forEach(item=>item.classList.remove('active'));
        event.target.classList.add('active');
        setCurrentForm(isChanged);
    }

    const signIn=(event)=>{
        changeFormHandler(event, true)
    }
    const signUp=(event)=>{
        changeFormHandler(event, false)
    }

    return (
        <div className='modalWindow'>
            <div className='singInFormWindow'>
                <div className='formTitleSignIn'>
                <img src={LogoSingIn} alt='logo'/>  <h3>Welcome!</h3>
                </div>
                <div className='btnsForm'>
                    <button className='btnSignIn' onClick={(event) => signIn(event)}>Sign in</button>
                    <button className='btnSignUp' icone={faPaw} onClick={(event) => signUp(event)}>Sign up</button>
                </div>
                {currentForm ? <SignIn currentForm={currentForm}/>:<SignUp currentForm={currentForm}/>}
            </div>
        </div>
    )
}
export default ModalWindow