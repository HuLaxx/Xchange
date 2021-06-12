import React,{ useState } from 'react';
import Axios from "axios";
function Signup() {
    
  const [usernameReg,SetUsernameReg] = useState("");
  const [passwordReg,SetPasswordReg] = useState("");

  const register= ()=>{
     Axios.post('http://localhost:4000/Xc/registration',{
       username: usernameReg,
       password: passwordReg,
     }).then((Response)=>{
       console.log(Response);
     })
  }
        return (
            <div className="signup-body">
                <h1>Signup</h1>
                <span>Username: </span>
                <input className="xChange-Login__Username"
                type="text"
                onChange={(e)=>{
                    SetUsernameReg(e.target.value);
                }} />
                <span>Email</span>
                <input type="email"
                 className="xChange_signup_Email"
                  namespace="Email"
                  onChange={(e)=>{
                    //setEmailRegistration(e.target.value)
                  }}></input>
               <span>Password: </span>
                <input className="xChange-Login__Password"
                type="text"
                onChange={(e)=>{
                  SetPasswordReg(e.target.value);
                }} />       
                <button onClick={register}>Sign up</button>
                <p><a href="/Service/Password">Forget password?</a></p> 
            </div>
        )
    
}

export default Signup
