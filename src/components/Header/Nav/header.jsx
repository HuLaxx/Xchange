import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
export default function Header({toggleState,setToggleState}){

    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
    
    return (
            <div className='containerHeader'>
                        <ul className="Header">
                                <li>
                                    <div className="logo">
                                        <span className="website-name">Xchan<span>ge</span></span>
                                        <p>{toggleState}</p>
                                    </div>
                                </li>
                        </ul>
                        <ul className="SearchBar_container">
                            <li>
                                <input className="SearchBar" placeholder="Search" ></input><button>S</button>
                            </li>
                        </ul>
                       
                        <ul className="nav link">
                            <Link to='/explore'>
                            <li>
                                <p>HOME</p>
                            </li>
                                </Link>
                                <Link to='/signup' >
                                <li>
                                    <p>TRADE</p>
                                </li>
                                </Link>
                                <li className="Panel_open">
                                <button>Open Panel</button> 
                                </li>
                            </ul>
                            
                            {/* Sidepanel have to fix this by CREATING A GLOBAL VARIABLE FOR SIDEBAR active and rest funtion which is created here */}
                             
                            <div className={toggleState ? 'service-trade-panel active':'service-trade-panel'}>
                                    <div className="service-trade-panel-Header">
                                        <div className="logo" onClick={()=>onButtonClick(false)}>Back</div>
                                            <ul>
                                                <li><button>Trade</button></li>
                                                <li><button>Offer money</button></li>
                                            </ul>
                                        </div>
                                        <div className="service-trade-panel__container">
                                            <div className="Container-space">
                                                
                                            </div>            
                                    </div>
                            </div>
            </div>
       
        );       
}
