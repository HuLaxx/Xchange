import './App.css';
import React from 'react';
import Login from './Pages/Authentication/login/login';
import Signup from './Pages/Authentication/Signup/signup';
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom';
import Explore from './Pages/Explore/explore';
import Error from './Pages/Error/error404';
import Profile from './Pages/Profile/Profile';
import { useLocation } from 'react-router-dom'

// page testing
import Product from './Pages/Product/product';
function App() {
  //const location = useLocation();
    return (
      <div className="Body-container">
        <div className="header">

        </div>
        <div className="Brandname_header">
        <Router> 
          <Switch>        
            <Route exact path="/" component={Explore} />
            <Route excat path="/Error404" component={Error} />
            <Route path="/Login" component={Login} />
            <Route path="/signup" component={Signup}/>
            <Route path='/profile' component={Profile} />
            <Route path='/product' component={Product}/>
            <Redirect to="/Error404" />
          </Switch>
       </Router>

        </div>
        {/* {console.log(location.pathname)} */}
      
      </div>
        
    );
    
}

export default App;