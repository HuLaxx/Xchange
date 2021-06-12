import './App.css';
import React from 'react';
import Login from './Pages/login/login';
import Signup from './Pages/Signup/signup';
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom';
import Explore from './Pages/Explore/explore';
import Error from './Pages/Error/error404';
import './Pages/sidePanel/sidepanel.css';

function App() {

    return (
      <Router> 
        <Switch>        
          <Route exact path="/" component={Explore} />
          <Route excat path="/Error404" component={Error} />
          <Route path="/Login" component={Login} />
          <Route path="/signup" component={Signup}/>
          <Redirect to="/Error404" />
        </Switch>
       </Router>  
    );
    
}

export default App;