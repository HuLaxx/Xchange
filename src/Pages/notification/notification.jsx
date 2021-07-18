import React from 'react'
import './notification.css';
export default function notification({notificaitionPanel}) {
    return (
        <div className={notificaitionPanel ? 'notificationContainer active' : 'notificationContainer'}>
            <div className="notification">
                <div className="Requestblock">
                    <div className="ProductInfoContainer">
                        <p>Name</p>
                    </div>
                    <div className="Response">
                    <div className="accept"></div>
                        <div className="deny"></div>    
                    </div>
                </div>

                <div className="Requestblock">
                    <div className="ProductInfoContainer">
                        <p>Name</p>
                    </div>
                    <div className="Response">
                    <div className="accept"></div>
                        <div className="deny"></div>
                    </div>
                </div>

                <div className="Requestblock">
                    <div className="ProductInfoContainer">
                        <p>Name</p>
                    </div>
                    <div className="Response">
                        <div className="accept"></div>
                        <div className="deny"></div>
                    </div>
                </div>
            </div>   
        </div>
    )
}
