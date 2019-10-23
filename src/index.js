import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import App from './App';
import Home from './containers/Home';
import Problem from './containers/Problem';
import Mobile from './containers/Mobile';
import './index.css';
import express from 'express';
import mongoose from 'mongoose';

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.connect(process.env.MongoDB); // 2

//
const db = mongoose.connection; // 3
// 4
db.once("open", function(){
  console.log("DB connected");
});
// 5
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

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



