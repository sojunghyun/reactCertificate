import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
//import Dialog from 'react-bootstrap-dialog'
import Moment from 'react-moment';
import trashImage from '../../../src/img/icon-trash.png';
import { Table } from 'react-bootstrap';

const btnStyle = {
    color: "white",
    background: "white",
    //padding: ".375rem .75rem",
    border: "1px solid white",
    borderRadius: ".25rem",
   // fontSize: "1rem",
    lineHeight: 1.5
  };
const Todo = props => (
    
    <tr>
    <td>{props.index}</td>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td><Moment format="YYYY/MM/DD">{props.todo.todo_createdAt}</Moment></td>
    <td>
        {/* <Link to={"/Problem/edit/"+props.todo._id} className="btn btn-primary" >Edit</Link> */}
        <Link to={"/Problem/edit/"+props.todo._id} >Edit</Link>
    </td>
    <td> 
        <form method='POST' action={`/Problem/delete/${props.todo._id}` } >
            <button style={btnStyle} ><img src={trashImage} height='20px' width='20px'/></button>
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

    // 배열에서 map() 함수를 활용해 part id 배열을 만듬
    todoList() {
        var data = this.state.todos;
        return data.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} index={i+1}/> ;
        })

    }

    render() {
        return (
            <div>
                {/* <h3>List</h3> */}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th width={'3%'}>#</th>
                            <th width={'45%'}>문제</th>
                            <th>정답</th>
                            <th>단계</th>
                            <th width={'7%'}>Date</th>
                            <th width={'3%'}>Action</th>
                            <th width={'3%'}>delete</th>
                        </tr>
                    </thead>
                    <tbody >
                        { this.todoList() }                                  
                    </tbody>
                </Table>
            </div>
        )
    }
}