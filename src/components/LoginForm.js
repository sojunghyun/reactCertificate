import React, { useState } from 'react';
import { Redirect, Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import '../CSS/LoginForm.css';
// import { Left } from 'react-bootstrap/lib/Media';
import Image from '../img/iconlogin.png';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 350,
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 230,
  }
}));

function LoginForm({ authenticated, login, location }) {
  const classes = useStyles();
  const [user_email, setEmail] = useState('');
  const [user_name, setName] = useState('');
  const [user_password, setPW] = useState('');
  const [user_birthday, setBIRTH] = useState('');
  const [visible, setVB] = useState('');
  const [error, setERROR] = useState('');

  const openModal = () => {
      setVB(true);
      // this.setState({  visible : true  });
  }

  const closeModal =() => {
      setVB(false);
      // this.setState({  visible : false  });
    }
  
  const getBreeds = (newUser) => {
    try {
      return axios.post('/login/user', newUser);
    } catch (error) {
      console.error(error)
    }
  };
  const getoverlaps = (overlapEmail) => {
    try {
      return axios.post('/login/sign/overlap', overlapEmail);
    } catch (error) {
      console.error(error)
    }
  };
  
  const onSubmit = () => {
    try {
      
      console.log(`Form submitted:`);
      console.log(`commnet text: ${user_email}`);
      console.log(`commnet user: ${user_name}`);
      console.log(`commnet user: ${user_password}`);

      const newUser = {
        user_email: user_email,
        //user_name: user_name,
        user_password: user_password
      };
      // axios.post('/login/user', newUser)
      //     .then(res => console.log('이게 어디서 뜨냐'));
      const breeds = getBreeds(newUser).then(res => {
        if (res.data===user_email){
          console.log(res.data);
          login({ user_email, user_password });
        }
        else if (res.data=='false'){
          alert('로그인 실패, 다시 시도해주세요.');
          console.log('react login form에서 로그인 실패임.');
          setEmail('');
          setPW('');
        }
      })

    } catch (e) {
      alert('Failed to login');
      setEmail('');
      setPW('');
    }
  }
  const SignOnclick = () => {
    try {
      console.log(`Form submitted:`);
      console.log(`user_email: ${user_email}`);
      console.log(`user_name: ${user_name}`);
      console.log(`user_name: ${user_birthday}`);
      console.log(`user_password: ${user_password}`);
      
      if (user_password.length > 6 ){
        const newUser = {
          user_email: user_email,
          user_name: user_name,
          user_birthday: user_birthday,
          user_password: user_password
        };
        axios.post('/login/sign/add', newUser)
            .then(res => console.log(res.data))
            .catch(function (error) {
              if (error){
                console.log(error);
                alert('중복 아이디가 있습니다.');
                setERROR('err');
              }
              else if(error!='err') {
  
              }
          })
        //alert('회원가입 성공!');
        setEmail('');
        setPW('');
        setName('');
        setBIRTH('');
        setVB(false);
      }
      else {
        alert('비밀번호 6자리 이상 입력해주세요.');
      }

    } catch (e) {
      alert('회원가입 실패, 다시 시도해주세요.');
      // setEmail('');
      setPW('');
      setName('');
      setBIRTH('');
    }
  } 

  const overlap = () => {
    const overlapEmail = {
      user_email: user_email
    };
    const overs = getoverlaps(overlapEmail).then(res => {
      if (res.data=='false'){
        alert('중복 아이디 존재');
      }
      else if (res.data=='true'){
        alert('아이디 사용가능');
      }
    }) 

  }

  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <><Router>
    <div style={{margin: 25}}>      
    <div><img src={Image} width="20" height="20"></img>LOGIN</div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField id="outlined-required" label="email" variant="outlined" // defaultValue="email"
            value={user_email}
            onChange={({ target: { value } }) => setEmail(value)}  />
        </div>
        <div>
        <TextField  id="outlined-password-input" label="password" variant="outlined" //autoComplete="current-password"
          //defaultValue="password" 
          value={user_password}
          onChange={({ target: { value } }) => setPW(value)}
          type="password"  />
        </div>
        <div style={{marginLeft: 10, float: "left"}}>
        <Button variant="outlined" onClick={onSubmit} >submit</Button>
        {/* </div> */}
        <section style={{ float: "left"}}>
                <Button variant="outlined" onClick={openModal} > 회원가입 </Button>
                {/* <Modal visible={visible} width="400" height="400" effect="fadeInUp"   onClickAway={closeModal}> */}
                <Modal visible={visible} effect="fadeInUp"   onClickAway={closeModal}>
                    <div>
                      <div>
                        <div className="register-header">회원가입</div>   
                        <div style={{  marginLeft: 20}}>
                        <form className={classes.root} noValidate autoComplete="off">
                          <div style={{ float: "left"}} >                            
                            <TextField id="standard-basic" label="email"  
                              className={classes.textField}                           
                              // defaultValue="email"
                              value={user_email}
                              onChange={({ target: { value } }) => setEmail(value)}  />   
                              <Button variant="outlined" onClick={overlap} > 검사 </Button>                         
                          </div>
                          <div>
                          <TextField  id="standard-password-input" label="password" 
                            className={classes.textField}
                            autoComplete="current-password"
                            defaultValue="password" 
                            value={user_password}
                            onChange={({ target: { value } }) => setPW(value)}
                            type="password"  />
                          </div>
                          <div>
                            <TextField id="standard-basic" label="name" 
                               className={classes.textField}
                                // defaultValue="email"
                                value={user_name}
                                onChange={({ target: { value } }) => setName(value)}  />
                          </div>
                          <div className={classes.container} noValidate>
                            <TextField    id="date"  label="Birthday"  type="date"  defaultValue="2020-01-01"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={user_birthday}
                              onChange={({ target: { value } }) => setBIRTH(value)}   />
                          </div>
                          <div style={{ marginTop: 15}}>
                              <Button variant="outlined" onClick={SignOnclick} >submit</Button> </div> 
                          <div style={{ textAlign: "left", margin: 15}}>
                              <a href="javascript:void(0);" onClick={closeModal}>Close</a>   </div>                          
                        </form>    
                        </div>                                     
                      </div>                        
                    </div>
                </Modal>
            </section>
            </div>
        </form>
      </div>     
    </Router>
   </>
  );
}

export default LoginForm;