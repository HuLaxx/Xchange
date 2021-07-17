import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './news.css';
import { Button } from 'react-bootstrap';

export class news extends Component {
    render() {
        return (
                <div className="NewsTitle">
                    
                    <ul className="header-tool__services">
                        <li>

                        </li>
                        <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                        <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                        <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                         <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                         <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                         <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                         <li>
                            <span className="header-tool__helpService"><Link to="/services">Nagpur</Link></span>
                        </li>
                    </ul>
                    
                    <ul className="Header-tools-tools">
                            <Link to='/Notification'>
                                <Button type="button" className="btn btn-primary">
                                        Notifications <span className="badge badge-light">0</span>
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button type="button" className="btn btn-Basecolor long">
                                        signup 
                                </Button>
                            </Link>
                    </ul> 
                </div>
           
        )
    }
}

export default news
