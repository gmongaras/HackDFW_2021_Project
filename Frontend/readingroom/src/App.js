import React, { useEffect, useState } from 'react'; 
import {Homepage} from './pages/homepage'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
    return(
      <div> 
        <Router>
          <Switch> 
            <Route path="/" component={Homepage}/>
          </Switch>
          </Router> 
      </div> 
    )
}

export default App; 