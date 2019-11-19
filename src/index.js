import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import App from './App';
import Home from './containers/Home';
//import testhome from './containers/testhome';
import Problem from './containers/Problem';
import comment from './containers/comment';
import './index.css';


ReactDOM.render(
  <Router>
       <Route path="/" component={App}>
    <Header />
      <Route exact path="/" component={Home} />
      <Route path="/Problem" component={Problem}/>
      <Route path="/comment" component={comment}/>
       </Route>
  </Router>,
  document.getElementById('root')
);



