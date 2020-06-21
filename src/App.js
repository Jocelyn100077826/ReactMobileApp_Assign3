import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import login from './pages/login'
import main from './pages/main';
import setting from './pages/setting';
import stat from './pages/stat';



class App extends Component {
  render(){
    const style = {
      backgroundColor: "#f5f5f5",
      width: "100%",
      height: "100vh",
      padding: "0px",
      margin: "0px",
    };


    return (
        <div style={style} >
          <div style={{width: "90%", marginLeft: "auto", marginRight:"auto"}}>
            <Router>

              <Switch>
                <Route exact path="/" component={login}/>

                <Route exact path="/main" component={main}/>

                <Route exact path="/stat" component={stat}/>

                <Route exact path="/setting" component={setting}/>
              </Switch>

            </Router>
          </div>
        </div>
    );
  }
}

export default App;
