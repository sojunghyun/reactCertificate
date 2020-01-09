import React, { useState } from 'react';
import { Redirect, Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import sign from './sign';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 225
    },
  },
}));

function LoginForm({ authenticated, login, location }) {
  const classes = useStyles();

  const [user_email, setEmail] = useState('');
  const [user_name, setName] = useState('');
  const [user_password, setPW] = useState('');

  const getBreeds = (newUser) => {
    try {
      return axios.post('/login/user', newUser);
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
        if (res.data==user_email){
          console.log(res.data);
          login({ user_email, user_password });
        }
        else if (res.data=='false'){
          alert('로그인 실패, 다시 시도해주세요.');
          console.log('react login form에서 로그인 실패임.');
        }
      })
      // console.log(breeds.data.user_email);

      // if (breeds.data.user_email==user_email){
      //   console.log('react login form에서 로그인 성공임!!!!!!!.');
      //   login({ user_email, user_password });
      // }      

    // login({ user_email, user_password });

    } catch (e) {
      alert('Failed to login');
      setEmail('');
      setPW('');
    }
    
    // this.setState({
    //   user_email: '',
    //   user_password: ''
    // })
    // this.props.history.push('/');
  }
  const handleClick = () => {
    try {
      login({ user_email, user_password });
      console.log(user_email);
      axios.post('/login/add', login)
        .then(res => console.log(login));

    } catch (e) {
      alert('Failed to login');
      setEmail('');
      setPW('');
    }
  };
  
  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <><Router>
    <div style={{margin: 25}}>
    <h1>LOGIN</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField id="outlined-required" label="email" variant="outlined" 
            // defaultValue="email"
            value={user_email}
            onChange={({ target: { value } }) => setEmail(value)}
            
          />
          {/* <input
            value={user_email}
            onChange={({ target: { value } }) => setEmail(value)}
            type="text"
            placeholder="email"
          /> */}
        </div>
        <div>
        <TextField  id="outlined-password-input" label="password" variant="outlined"
          autoComplete="current-password"
          defaultValue="password" 
          value={user_password}
          onChange={({ target: { value } }) => setPW(value)}
          type="password"          
        >
        </TextField>

          {/* <input
            value={user_password}
            onChange={({ target: { value } }) => setPW(value)}
            type="password"
            placeholder="password"
          /> */}
        </div>
        <div>
        <Button variant="outlined" onClick={onSubmit} >submit</Button>
        </div>
        <div>
        <Link to="/sign">
              <div style={{fontSize: 20}}>register</div>
        </Link>
        </div>    
      </form>
      
      {/* <button onClick={onSubmit}>submit</button> */}
    </div>     
    <Route path="/sign" component={sign} /> 
      </Router>
    </>
  );
}

export default LoginForm;