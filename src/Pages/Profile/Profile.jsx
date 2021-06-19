import React,{useState ,useEffect} from 'react'
import './profile.css'
import Cards from '../../components/Body/Cards/Cards'
import Axios from 'axios';
import Header from '../../components/Header/Nav/Header'

export default function Profile() {

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
        {/* <Header/> */}
        <div className="ProfileBody">
      
            <div className="username_holder">
            <div className="square"></div>
                    <div className="square"></div>

                    Banner and news 
                    <div className="square"></div> 
                     <div className="square"></div>
            </div>
            <div className="ProfileContainer">
                <div className="menuHolder">
                    <div className="profile_banner">
                            Username
                    </div>
                    <div className="menu">
                       <ul>
                           <li>

                           </li>
                       </ul>
                    </div>
                </div>
                <div className="Profile_information">
                    <div className="left_pannel_profile">

                    </div>
                    <div className="item_holder">
                        {dbCheck.map((val)=>{
                            return(<Cards setToggleState={false} username={val.username} PageBehaviour={true}></Cards>)  
                        })} 
                        <div className="AdditemCard">
                            
                        </div>
                      
                       
                         
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    )
}
