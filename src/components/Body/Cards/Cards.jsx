import React from 'react'
import './cards.css';

function Cards({PageBehaviour,setToggleState,username}){
    const Explore = PageBehaviour;
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
    if(Explore){
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
