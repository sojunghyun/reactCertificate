import React, { Component } from 'react';
//import './problem.css';
import axios from 'axios';
//import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
//import { ButtonToolbar, Button, Form, ormControl  } from 'react-bootstrap';
import CreateTodo from "./newProblemfile/create-Problem";
import EditTodo from "./newProblemfile/edit-Problem";
import TodosList from "./newProblemfile/listShow-Problem";

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
          <Link to="/Problem/" className="navbar-brand">문제요청리스트</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <li className="navbar-item">
                <Link to="/Problem/list" className="nav-link">Todos</Link>
              </li> */}
              <li className="navbar-item">
                <Link to="/Problem/create" className="nav-link">요청</Link>
              </li>
            </ul>
          </div>
          
        </nav>
        <br/>
        <Route exact path="/Problem/" component={TodosList} />
        <Route path="/Problem/edit/:id" component={EditTodo} />
        <Route path="/Problem/create" component={CreateTodo} />
      </div>
    </Router>
      // <Router>
      //   <div className="container">
      //     <div className="menu">
      //           <MenuItem to={'/Problem/'} exact component={TodosList} >todolist</MenuItem>
      //           <MenuItem to={'/Problem/edit/:id'} component={EditTodo} >edit</MenuItem>
      //           <MenuItem to={'/Problem/create'} component={CreateTodo} >create</MenuItem>
      //       </div>

      //   </div>
      // </Router>
    );
  }
}

export default Problem;
