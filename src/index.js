import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import App from './App';
import Home from './containers/Home';
import Problem from './containers/Problem';
import Mobile from './containers/Mobile';
import './index.css';

const  mongoose = require('mongoose');
const { mongo_id, mongo_password, node_env} = process.env;
const MONGO_URL = 'mongodb://hyunsojung:rjsqkdwls23@ds229088.mlab.com:29088/reactdb';

module.exports = () => {
    const connect = () => {
        if (node_env !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'reactdb',
        }, (error) => {
            if (error) {
                console.log('mongodb connection error', error);
            } else {
                console.log('mongodb connection success');
            }
        });
    };
    connect();

    mongoose.connection.on('error', (error) => {
        console.error('mongodb connection error', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('mongodb connected fail');
    });
    require('./components/Header');
};

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