import React from 'react'; 
import {LoginPage, CreatePage, HomePage, RecordPage, PlaybackPage} from './pages'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
    return(
      <div> 
        <Router>
          <Switch> 
            <Route path="/home" component={HomePage}/>
            <Route path='/create' component={CreatePage}/>
            <Route path='/record' component={RecordPage}/>
            <Route path='/playback' component={PlaybackPage}/>
            <Route path="/" component={LoginPage}/>
          </Switch>
          </Router> 
      </div> 
    )
}

export default App; 