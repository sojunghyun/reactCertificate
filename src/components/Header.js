import React, { useState, useEffect } from 'react';
// react version 4 이기 때문에 react-router가 아니라 react-router-dom을 사용해야함 (버전마다 상이하게 다름)
// 리액트 v3 정적라우팅 , v4 동적 라우팅
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import '../CSS/Header.css';
import { signIn } from './auth';
import AuthRoute from './AuthRoute';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import Problem from '../containers/Problem';
import Homeview from '../containers/Home';
import YearComment from '../containers/yearData/evaluation'

// Link 사용하여 컴포넌트 누르는 메뉴 이벤트 형성
const MenuItem = ({active, children, to}) => (
    <Link to={to} className="menu-item">
            {children}
    </Link>
)
// link 컴포넌트가 눌렸을 때, 설정될 라우트 경로를 to 값으로 통해 설정한다. props가 link컴포넌트 값으로 설정되게끔 전달.
const Header = () => {
    const [user, setUser] = useState(null);
    const authenticated = user != null;
    
    const login = ({ email, name }) => setUser(signIn({ email, name }));
    const logout = () => setUser(null);

    return (
        <Router>
         <div>
            <div className="logo">
                REACT-INFO              
                <div style={{ float: "right", marginRight: 20}}>{authenticated ? (
                <LogoutButton logout={logout} />              
                ) : (
                <Link to="/login">
                    <div style={{fontSize: 20}}>Login</div>
                </Link>
                )}</div>
            </div>
            <div className="menu">
                <Link to={"/"} className="menu-item">introduction</Link>
                <Link to={"/Problem"} className="menu-item">Problem</Link>
                <Link to={"/comment"} className="menu-item">comment</Link>
                {/* <MenuItem to={"/"} >introduction</MenuItem>
                <MenuItem to={"/Problem"}>Problem</MenuItem>
                <MenuItem to={"/comment"}>comment</MenuItem> */}
            </div>
            <Switch>
                <Route exact path="/" component={Homeview} />
                <Route
                    path="/login"
                    render={props => (
                    <LoginForm authenticated={authenticated} login={login} {...props} />
                    )} />
                <AuthRoute
                    authenticated={authenticated}
                    path="/Problem"
                    render={props => <Problem user={user} {...props} /> }  />           
                <AuthRoute
                    authenticated={authenticated}
                    path="/comment"
                    render={props => <YearComment user={user} {...props} />} />               
            </Switch>
        </div>
        </Router>
       
    );
};

export default Header;