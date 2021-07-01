import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import {Button} from 'antd';
import Homepage from './views/Homepage';
import XmlList from './views/XmlList';
import XmlDetails from './views/XmlDetails'

const appStyles = {
  padding: "20px"
};

const headerStyles = {
  width: "100%",
  padding: "20px",
  backgroundColor:"#cecece"
}


function App() {
  return (
    <div className="App" style={appStyles}>
      <Router>
        <header style={headerStyles}>
          <nav> 
            <Link to="/"><Button type="link">HomePage</Button></Link>
            <Link to="/xml_list"><Button type="link">XML List</Button></Link>
          </nav>
        </header>
        <br/>
        <Switch>
          <Route exact path="/xml_list">
            <XmlList title="XML List"/>
          </Route>
          <Route path="/xml_list/:campaignId">
            <XmlDetails title="XML Dertails"/>
          </Route>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
