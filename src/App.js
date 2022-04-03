import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats"
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (
    <div style={{fontFamily: 'Avenir'}}>
       <Router>
         <AuthProvider>
            <Switch>
              <Route path="/chats" component={Chats}/>
              <Route path="/" component={Login} /> 
            </Switch>
           </AuthProvider>
       </Router>
    </div>
  );
}

export default App;
