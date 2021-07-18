import React from 'react'
import './cards.css';
import cover from './download.jpg';
function Cards({PageBehaviour,setToggleState,username}){
    const Explore = PageBehaviour;
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }

    const onCardClick = ()=>{
        console.log("card clicked");
    }
    if(Explore){
        return (
                <div className="cardContainer" onClick={onCardClick}>
                    <div className="cardInsider">
                        <div className="cardImage">
                            <img src={cover}></img>
                        </div>
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
