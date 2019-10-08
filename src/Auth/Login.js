import React, { Component } from 'react';
import { AuthContent, Input } from './';

class Login extends Component {
    render() {
        return (
                <AuthContent title="로그인">
                <Input label="이메일" name="email" placeholder="이메일"/>
                <Input label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
                </AuthContent>
        );
    }

}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
export default Login;