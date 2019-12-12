import React, { Component } from 'react';
import './Home.css'; 
import Popup from "reactjs-popup";
import { ButtonToolbar, Button, Form, Modal  } from 'react-bootstrap';
import { textAlign } from '@material-ui/system';
 
const list = [
  {  'num': 1,  'problem': 'test 문제1',  'answer': 'test 답1'  },
  {
  'num': 2,
  'problem': 'test 문제2',
  'answer': 'test 답2'
  },
  {
  'num': 3,
  'problem': 'test 문제3',
  'answer': 'test 답3'
  },
  {
  'num': 4,
  'problem': 'test 문제4',
  'answer': 'test 답4'
  },
  {
  'num': 5,
  'problem': 'test 문제5',
  'answer': 'test 답5'
  }
]
const btnStyle = {
  color: "white",
  background: "black",
  padding: ".375rem .75rem",
  border: "1px solid white",
  borderRadius: ".25rem",
  fontSize: "1rem",
  lineHeight: 1.5,
  textAlign:"center",
  marginTop: 15
};

class Home extends Component {

  // 상태(state)는 컴포넌트의 상태를 나타냄. 변화할 수 있는 데이터의 집합
  state = {
    number: 0
  }

  //list에서 무엇을 가져올지 지정해준 후 객체를 넘겨준다. this.setState사용
  searchList(questionList, randNum){
    console.log(questionList[randNum-1]['problem']);
    const index = questionList[randNum-1]['num'];
    const problem = questionList[randNum-1]['problem'];
    const answer = questionList[randNum-1]['answer'];
    this.setState({ result_problem: problem, result_answer: answer, result_index: index });
  }
  //프로퍼티(props) 외부에서 컴포넌트와 소통하는 창구 역할. 일반적으로 프로퍼티의 값은 부모 요소에서 설정. 
  //또한 한 번 설정된 프로퍼티는 기본적으로 컴포넌트 내부에서 변경 X, 프로퍼티는 초깃값 설정과 자료형 유효성 검사 등을 사용할 수 있음
  constructor(props) {
    super(props);
    this.onChangeClick = this.onChangeClick.bind(this);
     
    // 초기 값 설정 가능
    this.state = { showPopup: false, random: 1 }; 

  }

  onChangeClick() {
    const min = 1;
    const max = 5;
    const rand = Math.floor(Math.random()*(max+1-min))+min;
    this.setState({ random: rand });
    this.searchList(list, rand)
  }

  render() {

    return (
      <div >   
        <div className="text-item">
          <div>The number is: {this.state.random}</div>
          <div>The Problem is: {this.state.result_problem}</div>
        </div>        
        <div className="button-style">
          <button style={btnStyle} onClick={this.onChangeClick.bind(this) } >NEXT</button>
          {/* <Popup trigger={<button> ANSWER</button>} position="right center">
          <div>{this.state.result_answer}</div>
          </Popup> */}
          <Popup modal trigger={<button style={btnStyle} >ANSWER</button>} >
            <div style={{ marginTop: 15, textAlign:"center"}}>ANSWER</div>
            <div style={{ marginTop: 15, textAlign:"center"}} >{this.state.result_answer}</div>
          </Popup>
        </div> 



      </div>
  
    );
  }
}

export default Home;
