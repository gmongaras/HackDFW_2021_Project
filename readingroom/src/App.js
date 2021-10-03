import React, { useEffect, useState } from 'react'; 
// import {Homepage} from './pages/homepage'; 
import {Login, CreatePage} from './pages'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
    return(
      <div> 
        <Router>
          <Switch> 
            <Route path="/login" component={Login}/>
            <Route path='/create' component={CreatePage}/>
          </Switch>
          </Router> 
      </div> 
    )
}

export default App; 