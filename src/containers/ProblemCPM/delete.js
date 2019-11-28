import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_createdAt: ''
        }
    }

    componentDidMount() {
        axios.get('/Problem/delete/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_createdAt: response.data.todo_createdAt
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}