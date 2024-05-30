import { useRef, useState } from 'react';
import LoginStyle from './css/login.module.css';
import Axios from 'axios';
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const email_warn = useRef();
    const password_warn = useRef();
    const response_message = useRef();
    const password_input_field = useRef();
    const show_password = useRef();
    function signin(){
        Axios.post('http://localhost:3001/adminlogin',{
            email:email,
            password:password
            },
            {
                withCredentials:true
            }
        )
        .then((res)=>{
            if(res.data.message === "Logged in"){
                window.location.replace('/#streams');
                window.history.replaceState(null,null,'/#streams');
            }
            else{
                response_message.current.innerHTML = res;
                response_message.current.style.visibility = res.data.message !== "Logged in" ? 'visible' : 'hidden';
            }
        })
        .catch((error)=>{
            console.error(error);
            response_message.current.innerHTML = "Something went wrong!";
            response_message.current.style.visibility = 'visible';
        })
    }
    function validateEmail(email){
        if(email.endsWith("@gmail.com") || email.endsWith("@yahoo.com") || email.endsWith("@amat.com")){
            return true;
        }
        else{
            return false;
        }
    }
    function handleInput(){
        email_warn.current.innerText = !validateEmail(email) && email !== "" ? "Invalid email!" : "This field couldn't be empty!";
        email_warn.current.style.visibility = email && validateEmail(email) ? 'hidden' : 'visible';
        password_warn.current.style.visibility = password ? 'hidden' : 'visible';
        if(email && validateEmail(email) && password){
            signin();
        }
    }
    function handlePasswordVisibility(){
        password_input_field.current.type = show_password.current.checked ? 'text' : 'password';
    }
    return(
        <div className={LoginStyle.Login_container}>
            <section className={LoginStyle.left_side}>
                <form name='loginform' id='loginform'>
                    <p ref={response_message} className={LoginStyle.response_message}>Response!</p>
                    <h1>Welcome back</h1>
                    <p className={LoginStyle.welcome_message}>Welcome back! Please enter your details.</p>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" name='email' id='email' placeholder='Enter your email' autoComplete='off'/>
                    <p ref={email_warn} className={LoginStyle.email_warning}>This field couldn't be empty!</p>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} ref={password_input_field} type="password" name='password' id='password' placeholder='Enter your password' autoComplete='off'/>
                    <p ref={password_warn} className={LoginStyle.password_warning}>This field couldn't be empty!</p>
                    <div className={LoginStyle.password_help}>
                        <span className={LoginStyle.showpassword}>
                            <input onChange={()=>handlePasswordVisibility()} ref={show_password} type="checkbox" name='showpassword' id='showpassword'/>
                            <p>Show password</p>
                        </span>
                        <span className={LoginStyle.forgot_password}>
                            <p>Forgot password?</p>
                        </span>
                    </div>
                    <button onClick={()=>handleInput()} type='button' className={LoginStyle.signInButton}>Sign In</button>
                    <p className={LoginStyle.createAccount}>Don't have an account? <a href="http://www.google.com/">Sign up</a></p>
                </form>
            </section>
            <section className={LoginStyle.right_side}>
                <h2>RMS</h2>
            </section>
        </div>
    );
}
export default Login;