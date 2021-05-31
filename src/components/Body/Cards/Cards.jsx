import React, { Component } from 'react'
import './cards.css';

export class Cards extends Component {
  
    render() {
        return (
                <div className="cardContainer">
                    <div className="cardInsider">
                        <div className="cardImage">
                            <img></img>
                        </div>
                        <div className="CardNameHolder">
                            <p>In Offer</p>
                           <h4>Product name</h4>
                           <h4>Product name</h4>
                           <span>&#8377; 1,200</span>
                        </div> 
                    </div>
                </div>

        )
    }
}

export default Cards
