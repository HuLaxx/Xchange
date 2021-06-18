import React, {useState ,useEffect} from 'react';
import Axios from "axios";
import './explore.css'
import Cards from '../../components/Body/Cards/Cards';
import News from '../../components/Header/header-news/news';
import Header from '../../components/Header/Nav/Header';
import UploadItem from '../Upload/uploadItem';
import uploadItem from '../Upload/uploadItem';

function Explore()  {
    const [toggleState, setToggleState] = useState(false);
    const [dbCheck, GetDbCheck] = useState([]);
    
    useEffect(() => {
        Axios.get('http://localhost:4000/Xc/product').then((Response)=>{
            async function getData(){
                GetDbCheck(Response.data);
            }  
            getData();
        })
    }, [])

    {if(dbCheck.length > 0){
        return (
            <div className="App">
                <div className="headerComponents">
                    <News></News>
                    <Header toggleState={toggleState} setToggleState={setToggleState}></Header>
                </div>
               
                <div className="container">
                    <div className="LabelCaption">
                        <div className="leftadHolder"></div>
                            {/* <div className="BillBoard">
                                
                            </div> */}
    
                       
                        <div className="leftadHolder"></div> 
                    </div>
                    <div className="cardHolder">
                           {dbCheck.map((val)=>{
                                return(<Cards PageBehaviour={true} setToggleState={setToggleState} username={val.username}></Cards>)  
                            })}  
                        </div>
                </div>
             {/* <UploadItem/> */}
            </div> 
            )
        }else{
            return(
            <div className="App">
                <div className="headerComponent">
                   <p>Nothing on this page  </p> 
                </div>
            </div>
            )
        }
    }
      
    }

export default Explore
