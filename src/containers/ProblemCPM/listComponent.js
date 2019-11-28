import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>{props.todo.todo_createdAt}</td>
        <td>
            <Link to={"/Problem/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td> <form method='POST' action={`/Problem/delete/${props.todo._id}`}>
                <button>delete</button>
             </form>
        </td>
        {/* <td>
            <Link to={"/Problem/delete"}>delete</Link>
        </td> */} 
       
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.onDeletebutton = this.onDeletebutton.bind(this);
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
        onDeletebutton() {
        console.log("버튼 눌렸다");
        var id = this.props.todo._id
        console.log(id);
        // axios.post('/Problem/delete/'+this.props.match.params.id, obj)
        axios.post('/Problem/delete', id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/Problem/');
    }

    todoList() {
        var data = this.state.todos;
        // return data.map(function(currentTodo, i){
        //     return (<div>  <Todo todo={currentTodo} key={i} /> 
        //     <from methode = 'POST' action = {'/Problem/delete'}> 
        //     <buttion onClick={this.onDeletebutton.bind(this)}>delete</buttion>
        //     </from>
        //     </div>);
        // })
        return data.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i}/> ;
        })

    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
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