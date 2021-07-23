import React from 'react'
import './cards.css';
import { Link, useHistory } from "react-router-dom";
import cover from './download.jpg';
import Product from '../../../Pages/Product/product';


function Cards({PageBehaviour,setToggleState,username}){
    const Explore = PageBehaviour;
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
        
    const history = useHistory();


    if(Explore){
        return (
                <div className="cardContainer">
                    <div className="cardInsider">
                        <Link to={{pathname: '/:product', state: {id: 1, name: 'Ford', color: 'red'}}}>
                        <div className="cardImage">
                            <img src={cover}></img>
                        </div>
                        </Link>
                        <div className="CardNameHolder">
                           <h4  >{username}</h4>
                           <h4>Product name</h4>
                           <div className="CardButtonHolder">
                                <button onClick={()=>onButtonClick(true)}>Trade</button>
                                <button>Buy</button>
                           </div>
                           
                        </div> 
                    </div>
                </div>
        )
    }else{
        return (
            <div className="cardContainer smallSize">
                <div className="cardInsider">
                    <div className="cardImage">
                        {/* <img src=""></img> */}
                    </div>
                    <div className="CardNameHolder">
                        <p>In Offer</p>
                       {/* <h4  >{username}</h4>
                       <h4>Product name</h4> */}
                       <button onClick={()=>onButtonClick(true)}>Trade</button>
                      
                    </div> 
                </div>
            </div>

    )
        }
    }


export default Cards
