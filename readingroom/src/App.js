import React, { useEffect, useState } from 'react'; 
import {Homepage} from './pages/homepage'; 
import {Login} from './pages/login'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
    return(
      <div> 
        <Router>
          <Switch> 
            <Route path="/home" component={Homepage}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Login}/>
          </Switch>
          </Router> 
      </div> 
    )
}

export default App; 