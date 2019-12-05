import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
//import Dialog from 'react-bootstrap-dialog'
import history from './history';
import Moment from 'react-moment';

function f1 (id){           //전역 함수
    console.log(id); 
    //this.props.history.push('/Problem/');
  }

const Todo = props => (

    <tr>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td><Moment format="YYYY/MM/DD">{props.todo.todo_createdAt}</Moment></td>
    <td>
        <Link to={"/Problem/edit/"+props.todo._id}>Edit</Link>
    </td>
    <td> <form method='POST' action={`/Problem/delete/${props.todo._id}` } >
            <button onClick = {f1(props.todo._id)}>delete</button>
            {/* </form><Route path="/Problem/" */}
         </form>
    </td>
</tr>
   
)


export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
        //this.onDeletebutton = this.onDeletebutton.bind(this);
    }
    

    componentDidMount() {
        axios.get('http://localhost:7376/Problem/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onSubmit(id) {
        console.log(id);
        axios.post('/Problem/delete/'+this.props.match.id, id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/Problem/');
    }
    onDeletebutton() {
    console.log("버튼 눌렸다");
    this.props.history.push('/Problem/');
    }
    
    todoList() {
        var data = this.state.todos;
        return data.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i}/> ;
        })

    }

    // todoList() {
    //     var data = this.state.todos;
    //     return data.map(function(currentTodo, i){
    //         return <Todo todo={currentTodo} key={i}/> ;
    //     })

    // }

    render() {
        return (
            <div>
                <h3>List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>commnet</th>
                            <th>id</th>
                            <th>Priority</th>
                            <th>createdAt</th>
                            <th>Action</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                       
                        
                    </tbody>
                    
                </table>
            </div>
        )
    }
}