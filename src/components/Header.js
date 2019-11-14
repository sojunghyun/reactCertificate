import React from 'react';
// react version 4 이기 때문에 react-router가 아니라 react-router-dom을 사용해야함 (버전마다 상이하게 다름)
// 리액트 v3 정적라우팅 , v4 동적 라우팅
import { Link } from 'react-router-dom';
import './Header.css';


// Link 사용하여 컴포넌트 누르는 메뉴 이벤트 형성
const MenuItem = ({active, children, to}) => (
    <Link to={to} className="menu-item">
            {children}
    </Link>
)
// link 컴포넌트가 눌렸을 때, 설정될 라우트 경로를 to 값으로 통해 설정한다. props가 link컴포넌트 값으로 설정되게끔 전달.
const Header = () => {
    return (
        <div>
            <div className="logo">
                React
            </div>
            <div className="menu">
                <MenuItem to={'/'} >introduction</MenuItem>
                <MenuItem to={'/Problem'}>Problem</MenuItem>
                <MenuItem to={'/comment'}>comment</MenuItem>
            </div>
        </div>
    );
};

export default Header;