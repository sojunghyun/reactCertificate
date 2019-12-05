import React, { Component } from 'react';
import './problem.css';

import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./newProblemfile/create-todocomponent";
import EditTodo from "./newProblemfile/edit-todocomponent";
import TodosList from "./newProblemfile/listComponent";

// var Problem = React.createClass({
//   postMessage: function(value) {
//     axios.post('/message', {
//       content: value
//     })
//     .then(function (message) {
//       console.log(message);
//     })
//   },
  
//   render: function() {
//     return (
//       <div>
//         <input onSubmit={() => this.postMessage(value)}>Type your message here</input>
//       </div>
//     );
//   }
// });
// Link 사용하여 컴포넌트 누르는 메뉴 이벤트 형성

class Problem extends Component {

//   constructor(props){
//     super(props);
//     this.state={
//       title: ''
//     };
//     this.handleMessageInput = this.handleMessageInput.bind(this);
//   }
//   handleMessageInput(e) {
//     this.setState({ title: e.target.value });
//   }
//   onSubmit(e) {
//     e.preventDefault();
    
//     console.log(`Form submitted:`);
//     console.log(`Todo Description: ${this.state.todo_description}`);
//     console.log(`Todo Responsible: ${this.state.todo_responsible}`);
//     console.log(`Todo Priority: ${this.state.todo_priority}`);
 
//     const newTodo = {
//         todo_description: this.state.todo_description,
//         todo_responsible: this.state.todo_responsible,
//         todo_priority: this.state.todo_priority,
//         todo_completed: this.state.todo_completed
//     };

//     axios.post('http://localhost:7376/Problem/add', newTodo)
//         .then(res => console.log(res.data));

//     this.setState({
//         todo_description: '',
//         todo_responsible: '',
//         todo_priority: '',
//         todo_completed: false
//     })
// }


  render() {

    return (
      <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">       
          <Link to="/Problem/" className="navbar-brand">댓글</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <li className="navbar-item">
                <Link to="/Problem/list" className="nav-link">Todos</Link>
              </li> */}
              <li className="navbar-item">
                <Link to="/Problem/create" className="nav-link">댓글 달기</Link>
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
