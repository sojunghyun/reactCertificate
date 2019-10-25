import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import App from './App';
import Home from './containers/Home';
import Problem from './containers/Problem';
import Mobile from './containers/Mobile';
import './index.css';

ReactDOM.render(
  <Router>
       <Route path="/" component={App}>
    <Header />
      <Route exact path="/" component={Home} />
      <Route path="/Problem" component={Problem}/>
      <Route path="/Mobile" component={Mobile}/>
       </Route>
  </Router>,
  document.getElementById('root')
);



