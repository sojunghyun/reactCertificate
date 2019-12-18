import React, { Component } from 'react';
//import './problem.css';

//import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from 'react-bootstrap';

import yearDateListview_2018 from "./yearDateListview";


var style = {
  container:{
    padding: 10
  }
}

class Problem extends Component {

  render() {

    return (
      <Router>
      <div style={style.container}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">       
          <Link to="/comment/" className="navbar-brand">연도별 문제 리스트</Link>

          <NavDropdown title="YEAR" id="basic-nav-dropdown" to="/comment/2018">
            <NavDropdown.Item className="nav-link" ><Link to="/comment/2018" className="nav-link">2018</Link></NavDropdown.Item>
            <NavDropdown.Item className="nav-link" ><Link to="/comment/2019" className="nav-link">2019</Link></NavDropdown.Item>
          </NavDropdown>
          
        </nav>
        <br/>
        <Switch>        
                    <Route path="/comment/2018" component={yearDateListview_2018} /></Switch>
      </div>
    </Router>
 
    );
  }
}

export default Problem;
