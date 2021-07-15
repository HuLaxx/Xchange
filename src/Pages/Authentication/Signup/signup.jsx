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
     Axios.post('http://localhost:4000/registration',{
       username: usernameReg,
       password: passwordReg,
     }).then((Response)=>{
       console.log(Response);
     })
  }
        return (
           <div className="SignupContainer">
                 <div className="nameHolder">
              <p><a href="/">ConnectPage</a></p>
            </div>
            <div className="xChange-login">
              <div className="AuthButtons">
                <p>Join to ConnectPage</p>
                <button>Continue with facebook</button>
                <button>Continue with Google</button>
                <button>Continue with Email</button>
              </div>
              <div className="formContainer">
                <form>
                    <p>Email address</p>
                    <input className="xChange-Login__Username"
                    type="text"
                    placeholder="Email"
                     />
                    <p>Password</p>
                  
                    <input placeholder="password"
                      type="password"
                      tabindex="1"
                      required autofocus />
                  
                  <div className="Capacha"></div>
                  <div className="SubmitContainer">
                    <button onClick={register}>Login</button>
                    <span>Forget password?</span> 
                  </div>
                    
                  <div className="formFooter">
                      <p>Already a member? <a href="/login">Login</a></p>
                  </div>
                  </form>
              </div>
               
            </div>
           </div>
        )
}

export default Signup
