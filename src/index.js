import React from 'react';
import ReactDOM from 'react-dom';
// React Router는 위에서 살펴본 SPA의 라우팅 문제를 해결하기 위해서 거의 표준처럼 사용되고 있는 네비게이션 라이브러리입니다.
// React Router를 이해하는데 핵심이 되는 3가지 컴포넌트 중 Link 등이 있음.
// 클라이언트 사이드 렌더링을 하는 SPA 특징을 가지는 리액트
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header';
import App from './App';
import Home from './containers/Home';
import view3 from './containers/view3';
import Problem from './containers/Problem';
//import comment from './containers/comment';
// import evaluation from './containers/evaluation-view';
// import evaluation from './containers/yearData/yearDateListview';
import evaluation from './containers/yearData/evaluation';
import './index.css';

ReactDOM.render(
  
  <Router>
       <Route path="/" component={App}>
    <Header />
      <Route exact path="/" component={Home} />
      <Route path="/Problem" component={Problem}/>
      <Route path="/comment" component={evaluation}/>
       </Route>
  </Router>,
  document.getElementById('root')
);



