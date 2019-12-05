import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import createPost from "./new/create_post";
import viewcomment from "./view3";
var style = {
  container:{
    padding: 20
  }
}

const Comment = props => (
  <tr>
  <td>{props.comment.title}</td>
  <td>{props.comment.username}</td>
  <td><Moment format="YYYY/MM/DD">{props.comment.createAt}</Moment></td>
</tr>
 
)
class showCommentList extends Component {

  //프로퍼티(props) 외부에서 컴포넌트와 소통하는 창구 역할. 일반적으로 프로퍼티의 값은 부모 요소에서 설정. 
  //또한 한 번 설정된 프로퍼티는 기본적으로 컴포넌트 내부에서 변경 X, 프로퍼티는 초깃값 설정과 자료형 유효성 검사 등을 사용할 수 있음
  constructor(props) {
    super(props);
    this.state = {comments: []};
    this.onClicknew = this.onClicknew.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:7376/comment/')
        .then(response => {
            this.setState({ comments: response.data });
            console.log("comment/ 링크 타고 간다.");
        })
        .catch(function (error){
            console.log(error);
        })
  }
  // event.preventDefault()
  // react { javascript 인식, render() 함수 작동 가능}
  todoList() {
    var data = this.state.comments;
    return data.map(function(current, i){
        return <Comment comment={current} key={i}/> ;
    })

  }


    onClicknew(){
      axios.post('/comment/create')
      .then(res => console.log('comment/create 이동했다.'));

      this.props.history.push('/comment/');
  }

  render() {
    var data = this.state.posts;
    return (
      <Router><div style={style.container}> 
          <h3>List</h3>
          <td> <Router>
                <button onClick={this.onClicknew.bind(this)}>new</button>
                <Link to="/comment/create" >new</Link>
                <Route path="/comment/create" component={createPost} />
                </Router>
                
          </td>
          <table className="table table-striped" style={{ marginTop: 20 }} >
              <thead>
                  <tr>
                      <th>title</th>
                      <th>username</th>
                      <th>createAt</th>
                  </tr>
              </thead>
              <tbody>
                        { this.todoList() }
              </tbody>
          </table>   
      </div>
      </Router>
      
    );
  }
}

export default showCommentList;
