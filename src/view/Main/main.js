import React  from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../Login/login";
import Admin from "../../layouts/Layout";
import AddApart from '../ListApart/AddApart/AddApart';


export default function Main()
{
    
    const LoginContainer = () => (
        <div className="container">
          {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
          <Route path="/login" component={Login} />
        </div>
      )
      
      
       const DefaultContainer = () => (
          <div>
                <Admin/> 
               <Route exact path="/" render={() => <Redirect to="/home" />} />     
               <Route path="/add/apart" component={AddApart} />
          </div>
       )
    return (
        <BrowserRouter>
      
        <div className="main-route-place">
            <Switch>        
                <Route exact path="/login" component={LoginContainer}/>
                <Route component={DefaultContainer}/>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
} 

