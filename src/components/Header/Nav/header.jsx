import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

export class header extends Component {
  

    render() {
        return (
            <div className='containerHeader'>
                <ul className="Header">
                    <li>
                        <div className="logo">
                            <span>Xchange</span>
                        </div>
                    </li>
                   </ul>
                   
                        <ul className="nav">
                            <Link to='/login'>
                            <li>
                                <p>HOME</p>
                            </li>
                            </Link>
                            <Link to='/signup'>
                            <li>
                                <p>TRADE</p>
                            </li>
                            </Link>
                        </ul>
                
            </div>
        )
    }
}


export default header
