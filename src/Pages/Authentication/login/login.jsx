import React, {useState} from 'react'
import Axios from 'axios';

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
            <div className="xChange-login">
                <span>Username: </span>
                <input className="xChange-Login__Username"
                 type="text"
                 onChange={(e)=>{
                     SetUsername(e.target.value);
                 }} />
              
               <span>Password: </span>
                <input className="xChange-Login__Password"
                 type="text"
                 onChange={(e)=>{
                     SetPassowrd(e.target.value);
                 }} />     
                <button onClick={LogindbFunction}>Login</button>
                <p>Forget password?</p> 
            </div>
        )
    
}

export default Login
