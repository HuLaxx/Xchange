import React, { Component } from 'react'

export class login extends Component {
 
    render() {
        return (
            <div className="xChange-login">
                <span>Username: </span>
                <input className="xChange-Login__Username"></input>
              
               <span>Password: </span>
                <input className="xChange-Login__Password"></input>        
            </div>
        )
    }
}

export default login
