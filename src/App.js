
import React, {Component} from 'react';
import './CSS/App.css';
import Header from './components/Header';


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

/*
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
 */

/* function App() {
      function handleClick(e) {
        e.preventDefault();
        window.location = 'my-app/src/Home.js';
      }
      ;
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
            <div className ="menu">
                    <AuthContent title="로그인">
                        <Input label="이메일" name="email" placeholder="이메일"/>
                        <Input label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
                        <button  onClick={handleClick}> submit </button>
                    </AuthContent>
            </div>
        </div>

  );
}
*/


export default App;
