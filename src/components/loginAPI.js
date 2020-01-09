
import React, {useState} from 'react';
//import '../src/CSS/LoginView.css';

//import Header from './components/Header';
// import ReactDOM from 'react-dom';
// React Router는 위에서 살펴본 SPA의 라우팅 문제를 해결하기 위해서 거의 표준처럼 사용되고 있는 네비게이션 라이브러리입니다.
// React Router를 이해하는데 핵심이 되는 3가지 컴포넌트 중 Link 등이 있음.
// 클라이언트 사이드 렌더링을 하는 SPA 특징을 가지는 리액트
import {Redirect, Link, Route, BrowserRouter as Router } from 'react-router-dom';
// 로그인 API 사용하기 위한 패키지
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-naver-login';
import NaverLoginImage from '../img/naverloginImg.PNG';
// 카드 뷰를 위한 패키지 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import logoImage1 from '../img/iconschool.png';
// import logoImage2 from './img/iconschool2.png';
// import logoImage3 from './img/iconschool3.png';
import axios from 'axios';
// users redux componet 사용을 위한 패키지
//import {connect} from 'react-redux';
//import User from '../../src/store/users';
//import {id, email} from '../../src/store/users';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
      padding: 50,
    },
    media: {
      height: 140,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    view: {
        margin: 20,
    }
  }));

  
function LoginForm2({ authenticated, login, location }) {
    const [user_email, setEmail] = useState('');
    const [user_name, setname] = useState('');
  
    const { from } = location.state || { from: { pathname: "/" } };
    if (authenticated) return <Redirect to={from} />;

    // google login
    const responseGoogle = (res)=>{
        console.log(res);
        const provider = 'google';
        //setState({ id: res.profileObj.googleId, name: res.profileObj.name, email: res.profileObj.email, provider: res.buttonText});
        //console.log( res.profileObj.googleId);
        console.log( res.profileObj.googleId);
        console.log( res.profileObj.email);
        console.log( res.profileObj.name);
        console.log( provider);

        setEmail(res.profileObj.email);
        setname(res.profileObj.name)
  
        const newUser = {
          user_id: res.profileObj.googleId,
          user_email: res.profileObj.email,
          user_name: res.profileObj.name,
          user_provider: provider
        };
        axios.post('/login/add', newUser)
            //.then(res => console.log('login성공'))

        login({ user_email, user_name });
        
    }
    // naver login
    const responsenaver= (res)=>{
        const provider = 'naver';
        console.log(res);
        //this.setState({ id: res.id, name: res.name, email: res.email, provider: res.buttonText});
        console.log( res.id);
        console.log( res.email);
        console.log( res.name);
        console.log( provider);

        setEmail(res.email);
        setname(res.name)
          
        const newUser = {
          user_id: res.id,
          user_email: res.email,
          user_name: res.name,
          user_provider: provider
        };
        axios.post('/login/add', newUser)
            //.then(res => console.log('login성공'))

        login({ user_email, user_name });
    }
    // login - error
    const responseFail = (err)=>{
        console.log(err);
    }
    return (
      <>
      <Router>
      <div style={{marginTop: 20}}>
                {/* <div style={{width: 400}}>  */}
                <div className="divClass">
                <Card className={useStyles.card}>
                <CardHeader avatar={
                    <Avatar aria-label="recipe" className={useStyles.avatar}>
                        R
                    </Avatar>
                    }
                    title="로그인"
                    subheader="from September 19, 2019"
                     />
                {/* <CardContent>
                    <Typography>
                    <div ><img src = {logoImage1} ></img></div>
                    </Typography>
                </CardContent> */}
                
                    <CardContent>                    
                        <Typography >
                            <div style={{margin: 10}}>    
                            <Link to={"/login/user"} >
                            <GoogleLogin 
                            clientId = {'315448044660-e5lgdf2cgel3pf1o5gf7lgbm1aa3rc1k.apps.googleusercontent.com'}
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={responseFail}
                            />   
                            </Link>                        
                                                   
                            </div>                                          
                        </Typography>

                        <Typography>
                            <div style={{margin: 10}}>
                            <Link to={"/login/user"} >
                            <NaverLogin 
                            clientId="GIhf0PgclnLxL6tUNs8U"
                            //callbackUrl="http://localhost:7376/login/googlesinInCallback"
                            callbackUrl="http://localhost:7376/login/naverInCallback"
                            buttonText="Naver"
                            render={(props) => <div>
                                <img src={NaverLoginImage} onClick={props.onClick} height='40px' width="auto"></img>
                                </div>}
                            onSuccess={responsenaver}
                            onFailure={responseFail}
                            
                            />
                            </Link>    
                            </div>                        
                        </Typography>
                    </CardContent>
                    
                </Card>

                </div>
            </div>   
      </Router>
            
      </>
    );
}
  
export default LoginForm2;

