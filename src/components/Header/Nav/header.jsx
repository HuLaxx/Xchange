import React,{useState ,useEffect} from 'react';
import Axios from "axios";
import './Header.css';
import {Link} from 'react-router-dom';
import Cards from '../../Body/Cards/Cards';

export default function Header({toggleState,setToggleState}){
    const [dbCheck, GetDbCheck] = useState([]);
    
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }

        
        useEffect(() => {
            Axios.get('http://localhost:4000/Xc/product').then((Response)=>{
                async function getData(){
                    GetDbCheck(Response.data);
                    //console.log(Response.data);
                }  
                getData();
            })
        }, [])

    
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
                                {/* <input className="SearchBar" placeholder="Search" ></input><button>S</button> */}
                            </li>
                        </ul>
                       
                        <ul className="nav link">
                            <Link to='/'>
                            <li>
                                <p>HOME</p>
                            </li>
                                </Link>
                                <Link to='/signup' >
                                <li>
                                    <p>TRADE</p>
                                </li>
                                </Link>
                                <Link to='/profile'>
                                    <li>
                                        <p>PROFILE</p>
                                    </li>
                                </Link>
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
                                                {dbCheck.map((val)=>{
                                                    return(<Cards setToggleState={setToggleState} username={val.username} PageBehaviour={false}></Cards>)  
                                                })}  
                                               
                                            </div>            
                                    </div>
                            </div>
            </div>
       
        );       
}
