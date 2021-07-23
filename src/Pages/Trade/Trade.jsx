import React,{useState ,useEffect} from 'react';
import Axios from "axios";
import Cards from '../../components/Body/Cards/Cards';
import './Trade.css';

export default function Trade({toggleState,setToggleState}) {
    const [dbCheck, GetDbCheck] = useState([]);
        
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
   
    useEffect(() => {
        Axios.get('http://localhost:4000/Xc/product').then((Response)=>{
            async function getData(){
                GetDbCheck(Response.data);
            }  
            getData();
        })
    }, [])

    return (
            
            <div className={toggleState ? 'service-trade-panel openPanel':'service-trade-panel'}>
                <div className="service-trade-panel-Header">
                    <div className="logo" onClick={()=>onButtonClick(false)}>Close</div>
                        <ul>
                            <li><button>Trade</button></li>
                            <li><button>Offer money</button></li>
                        </ul>
                    </div>
                    <div className="service-trade-panel__container">
                        <p>Your Inventory</p>
                        <div className="Container-space">
                            {dbCheck.map((val)=>{
                                return(<Cards setToggleState={setToggleState} username={val.username} PageBehaviour={false}></Cards>)  
                            })}  
                           <div className="TradeAll">
                                All
                            </div>
                    </div>            
                </div>
            </div>
    )
}
