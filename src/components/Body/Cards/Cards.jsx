import React from 'react'
import './cards.css';

function Cards({setToggleState,username}){
        
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
        return (
                <div className="cardContainer">
                    <div className="cardInsider">
                        <div className="cardImage">
                            {/* <img src=""></img> */}
                        </div>
                        <div className="CardNameHolder">
                            <p>In Offer</p>

                           <h4  >{username}</h4>
                           <h4>Product name</h4>
                           <button onClick={()=>onButtonClick(true)}>Trade</button>
                           <button>Buy</button>
                        </div> 
                    </div>
                </div>

        )
    }


export default Cards
