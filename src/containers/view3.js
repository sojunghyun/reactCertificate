import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import createPost from "./new/create_post";
import trashImage from'./icon-trash.png';
// import { ButtonToolbar, Button, Form, ormControl  } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

var style = {
  container:{
    padding: 20
  }
}
var buttonstyle = {
  showimg:{
    flex: 1,
    size: 5
  }
}
function onClickbutton(id) {
    console.log(id);
}

const Comment = props => (
  <tr>
  <td>{props.comment.title}</td>
  <td>{props.comment.username}</td>
  <td><Moment format="YYYY/MM/DD">{props.comment.createAt}</Moment></td>
  <td> <form method='POST' action={`/comment/delete/${props.comment._id}` } >
            {/* <button ><img src={'./icon-trash.svg'} ></img></button> */}
            {/* <link rel="apple-touch-icon" href="icon-trash.png" /> */}
            <button onClick = {() => {console.log("Click button")}}>
            <img src={trashImage} height='20px' width='20px'/>
            </button>
            {/* <Button variant="outline-dark"><img src={trashImage} height='20px' width='20px'/></Button> */}

            <img src={trashImage} onClick = {() => {
                var states = {props: []};
                            console.log("Click img");
                          axios.post('/comment/delete/'+props.comment._id)
                              .then(res => console.log(res))
                              .catch(res => { console.log(res) } );
                          

                          // axios.get('http://localhost:7376/')
                          //     .then(res => {
                          //           //parms { props: res.data }
                          //           console.log("comment/ 링크 다시 간다.");
                                    
                          //     })
                          //     .catch(function (error){
                          //         console.log(error);
                          //     });
                      }} height='20px' width='20px'/>
            {/* <button ><img src={trashImage} height='20px' width='20px'/></button> */}
         </form>
    </td>
</tr>
 
)
class showCommentList extends Component {

  //프로퍼티(props) 외부에서 컴포넌트와 소통하는 창구 역할. 일반적으로 프로퍼티의 값은 부모 요소에서 설정. 
  //또한 한 번 설정된 프로퍼티는 기본적으로 컴포넌트 내부에서 변경 X, 프로퍼티는 초깃값 설정과 자료형 유효성 검사 등을 사용할 수 있음
  constructor(props) {
    super(props);
    this.state = {comments: []};
    this.onClicknew = this.onClicknew.bind(this);
    this.routeChange = this.routeChange.bind(this);
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
  routeChange() {
    let path = `/comment/`;
    this.props.history.push(path);
  }


    onClicknew(){
      axios.post('/comment/create')
      .then(res => console.log('comment/create 이동했다.'));

      this.props.history.push('/comment/');
  }

  render() {
    var data = this.state.posts;
    return (
      <div style={style.container}> 
          <h3>List</h3>
          <td> <Router>
                <button onClick={this.routeChange}>new</button>
                <Link to="/comment/create" className="btn btn-primary" >new</Link>
                <Route path="/comment/create" component={createPost} />
                
                </Router>
                
          </td>
          <table className="table table-striped" style={{ marginTop: 20 }} >
              <thead>
                  <tr>
                      <th>title</th>
                      <th>username</th>
                      <th>createAt</th>
                      <th>삭제</th>
                  </tr>
              </thead>
              <tbody>
                        { this.todoList() }
              </tbody>
          </table>   
      </div>
      
    );
  }
}

export default showCommentList;
