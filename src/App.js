import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ProductCatalog from './components/ProductCatalog';
import UserSettings from './components/UserSettings';
import NavBar from './components/NavBar';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
// Create context object
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(loadUser())
  },[dispatch])

  return (
  
    <Router>
    <div className="App">
    <NavBar/>   
        <Switch>
          <Route exact path = "/"><ProductCatalog/></Route>       
          <Route path = "/signUp"><SignUp/></Route>
          <Route path = "/signIn"><SignIn/></Route>
          <Route path = "/forgotPassword"><ForgotPassword/></Route>
          <Route path = "/userSettings"><UserSettings/></Route>
          <Route path = "/productPage"><ProductPage/></Route>    
          <Route path = "/cartPage"><CartPage/></Route>    
        </Switch>
        </div>
    </Router>  
    
   );
}

export default App;
