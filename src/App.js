import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ProductCatalog from './components/ProductCatalog';
import UserSettings from './components/UserSettings';
import NavBar from './components/NavBar';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import FavoriteProductPage from './components/FavoriteProductPage';
import ProductNotFoundPage from './components/ProductNotFoundPage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

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
    <ToastContainer/>
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
          <Route path = "/favoriteProductPage"><FavoriteProductPage/></Route>   
          <Route path = "/productNotFoundPage"><ProductNotFoundPage/></Route>   
        </Switch>
        </div>
    </Router>  
    
   );
}

export default App;
