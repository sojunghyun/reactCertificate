import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 225
    },
  },
}));


function LoginForm2() {
  const classes = useStyles();
  const [user_email, setEmail] = useState('');
  const [user_name, setName] = useState('');
  const [user_password, setPW] = useState('');
  const [user_birthday, setBIRTH] = useState('');

  const onSubmit = () => {
    try {
      console.log(`Form submitted:`);
      console.log(`user_email: ${user_email}`);
      console.log(`user_name: ${user_name}`);
      console.log(`user_name: ${user_name}`);
      console.log(`user_password: ${user_password}`);

      const newUser = {
        user_email: user_email,
        user_name: user_name,
        user_birthday: user_birthday,
        user_password: user_password
      };
      axios.post('/login/sign/add', newUser)
          .then(res => console.log(res.data))

      alert('회원가입 성공!');
      setEmail('');
      setPW('');
      setName('');
      setBIRTH('');

    } catch (e) {
      alert('회원가입 실패, 다시 시도해주세요.');
      setEmail('');
      setPW('');
      setName('');
      setBIRTH('');
    }
    
    // this.setState({
    //   user_email: '',
    //   user_password: ''
    // })
    // this.props.history.push('/');
  }

  return (
    <>
    <div style={{margin: 25}}>
    <h1>회원가입</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField id="outlined-required" label="email" variant="outlined" 
            // defaultValue="email"
            value={user_email}
            onChange={({ target: { value } }) => setEmail(value)}
            
          />
        </div>
        <div>
          <TextField id="outlined-required" label="name" variant="outlined" 
              // defaultValue="email"
              value={user_name}
              onChange={({ target: { value } }) => setName(value)}
              
            />
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
      </form>
      {/* <button onClick={onSubmit}>submit</button> */}
    </div>      
    </>
  );
}

export default LoginForm2;