
import './App.css';
import Cards from './components/Body/Cards/Cards';
import News from './components/Header/header-news/news';
import Header from './components/Header/Nav/header';
import Login from './Pages/login/login';
import Signup from './Pages/Signup/signup';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Explore from './Pages/Explore/explore';

function App() {
  
    return (
      <Router>
        <div className = "App" >
        
          
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                
         
          <div className="headerComponents">
          <News></News>
           <Header></Header>
          </div>
           
          <div className="container">
          
            <div className="LabelCaption">
             
                <div className="BillBoard">
                   
                </div>
             <Explore></Explore>
              {/* <div className="cardHolder">
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
              </div> */}
            </div>
          </div>
       </div>
       </Router>  
    );
    
}

export default App;