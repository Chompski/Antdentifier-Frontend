import React, { Component } from 'react';
import logo from './ants.gif';
import BG from './background.png';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound"
import Body from "./Body"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={BG} id="bg" alt="" />
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <body className="App-Body">
         
      
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Body}/>
            <Route component={NotFound} />
            {/* <Route exact path="*" render={(props) => <NotFound {...props} />} /> */}
          </Switch>
        </BrowserRouter>
        </body>
      </div>
    
    );
  }
}

export default App;
