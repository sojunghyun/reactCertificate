import React, { Component } from 'react';
import BigText from '../components/BigText';
import {AuthContent, Input} from "../Auth";
import List from './List';

const list = [
  {
  'num': 1,
  'problem': 'test 문제1',
  'answer': 'test 답1'
},
  {
  'num': 2,
  'problem': 'test 문제2',
  'answer': 'test 답2'
  }
]
  

const names = ['안녕하세요.', '방갑습니다.', '퇴근합시다.'];

// const list = [
//   {
//   'num': 1,
//   'problem': 'test 문제1',
//   'answer': 'test 답1'
//   },
//   {
//   'num': 2,
//   'problem': 'test 문제2',
//   'answer': 'test 답2'
//   },
//   {
//   'num': 3,
//   'problem': 'test 문제3',
//   'answer': 'test 답3'
//   }
//   ]
class Home extends Component {

  state = {
    number: 0
  }

  searchList(questionList, randNum){
    console.log(questionList[randNum-1]['problem']);
  }

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 1 };
  }

  handleClick() {
    const min = 1;
    const max = 2;
    const rand = Math.floor(Math.random()*(max+1-min))+min;
    this.setState({ random: rand });
    this.searchList(list, rand)
  }

  render() {
    return (
      <div>
 
        <button onClick={this.handleClick.bind(this)}>Click</button>
        <div>The number is: {this.state.random}</div>
                  <List 
                  num={list.num}
                  problem={list.problem}
                  answer={list.answer}
                  />
        }

      </div>

    );
  }
    // render() {
    //     return (
    //         <div className="button-item">
    //             <AuthContent title="로그인">
    //             <Input label="이메일" name="email" placeholder="이메일"/>
    //             <Input label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
    //             </AuthContent>
    //             <button onClick={this.LoggingButton}>submit</button>
    //         </div>
    //
    //     );
    // }

}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
        return (
      <div className="button-item">
        <div>login</div>

      </div>
    );
  }
}
export default Home;
//  const Home = () => {
//      return (
//          <div>
//              <BigText>Users</BigText>
//              {/*{this.state.users.map(user =>*/}
//              {/*    <div key={user._id}>{user.name} {user.age}</div>*/}
//              )}
//          </div>
//      );
//  };
//
// export default Home;