import React,{ useState } from 'react';
import Axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import './signup.css'
library.add(fab, faCheckSquare, faCoffee)

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
            
              <div className="c2">
                <div class="signup-header">Create Account</div>
                  <div class="signup-content">
                    <ul class="login_type">
                      <li><a href="#"><i class="fab fa-google">  <FontAwesomeIcon icon="coffee" /></i></a></li>
                      <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                    </ul>
                  </div>
                  <div className="signup-box">
                        <input className="xChange-Login__Username"
                        type="text"
                        placeholder="Username*" 
                        onChange={(e)=>{
                            SetUsernameReg(e.target.value);
                        }} />
                      
                        <input type="email"
                        className="xChange_signup_Email"
                          type="Email"
                          placeholder="Email*" 
                          onChange={(e)=>{
                            //setEmailRegistration(e.target.value)
                          }}></input>
                    
                        <input className="xChange-Login__Password"
                        type="password"
                        placeholder="Password*" 
                        onChange={(e)=>{
                          SetPasswordReg(e.target.value);
                        }} />       
                        <button onClick={register} className="btn">Sign up</button>
                        <p><a href="/Service/Password">Forget password?</a></p>
                  </div>    
              </div>           
            </div>
        )
}

export default Signup
