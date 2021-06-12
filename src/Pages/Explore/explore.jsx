import React, {useState ,useEffect} from 'react';
import Axios from "axios";
import Cards from '../../components/Body/Cards/Cards';
import News from '../../components/Header/header-news/news';
import Headerr from '../../components/Header/Nav/Header';

function Explore()  {
    const [toggleState, setToggleState] = useState(false);
    const [dbCheck, GetDbCheck] = useState([]);

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
        <div className="App">
            <div className="headerComponents">
                <News></News>
                <Headerr toggleState={toggleState} setToggleState={setToggleState}></Headerr>
            </div>
           
            <div className="container">
                <div className="LabelCaption">
                    <div className="BillBoard">
                        <button/>
                    </div>
                   
                    <div className="cardHolder">
                        {/* <Cards setToggleState={setToggleState}> </Cards>
                        <Cards setToggleState={setToggleState}> </Cards>
                        <Cards setToggleState={setToggleState}> </Cards>
                        <Cards setToggleState={setToggleState}> </Cards>
                         */}
                        
                       {dbCheck.map((val)=>{
                            return(<Cards setToggleState={setToggleState} username={val.username}></Cards>)  
                        })}  
                    </div>
                </div>
            </div>
             
        </div> 
        )
    }

export default Explore
