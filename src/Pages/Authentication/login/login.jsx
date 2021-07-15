import React, {useState} from 'react'
import Axios from 'axios';
import './login.css';
function Login(){
  const [username,SetUsername] = useState("");
  const [password,SetPassowrd] = useState("");

  const LogindbFunction= ()=>{
     Axios.post('http://localhost:4000/login',{
       username: username,
       password: password,
     }).then((Response)=>{
       console.log(Response);
     })
  }
        return (
          <div className="loginContainer">
            <div className="nameHolder">
              <p><a href="/">ConnectPage</a></p>
            </div>
            <div className="xChange-login">
              <div className="AuthButtons">
                <p>Login to ConnectPage</p>
                <button>Continue with facebook</button>
                <button>Continue with Google</button>
              </div>
              <div className="formContainer">
                <form>
                    <p>Email address</p>
                    <input className="xChange-Login__Username"
                    type="text"
                    placeholder="Email"
                    onChange={(e)=>{
                        SetUsername(e.target.value);
                    }} />
                  <p>Password</p>
                  
                      <input placeholder="password" type="password" tabindex="1" required autofocus />
                  
                  <div className="Capacha"></div>
                  <div className="SubmitContainer">
                    <button onClick={LogindbFunction}>Login</button>
                    <span>Forget password?</span> 

                  </div>
                    
                    <div className="formFooter">
                      <p>not a member? <a href="/signup">Sign up</a></p>
                    </div>
                  </form>
              </div>
               
            </div>
            </div>
        )
    
}

export default Login
