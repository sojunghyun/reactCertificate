import React, { Component } from 'react';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_createdAt: Date.now,
        }
    }


    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onChangecreateAt(e) {
        this.setState({
            todo_createdAt: e.target.value
        });
    }

  onSubmit(e) {
    e.preventDefault();
    
    console.log(`Form submitted:`);
    console.log(`commnet index: ${this.state.todo_indexnumber}`);
    console.log(`commnet text: ${this.state.todo_description}`);
    console.log(`commnet user: ${this.state.todo_responsible}`);
    console.log(`commnet Priority: ${this.state.todo_priority}`);
    console.log(`commnet createdDate: ${this.state.todo_createdAt}`);
 
    const newTodo = {
        todo_description: this.state.todo_description,
        todo_responsible: this.state.todo_responsible,
        todo_priority: this.state.todo_priority,
        todo_createdAt: this.state.todo_createdAt
    };
    // axios.post('/Problem/create', {
    //     todo_description: '',
    //     todo_responsible: '',
    //     todo_priority: '',
    //     todo_completed: false
    // })
    // .then(response => { 
    //     console.log(response)
    // })
    // .catch(error => {
    //     console.log(error.response)
    // });

    axios.post('/Problem/add', newTodo)
        .then(res => console.log(res.data));

    this.setState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_createdAt: ''
    })
    this.props.history.push('/Problem/');
}

    render() {
        return (
            <div style={{margin: 25}}>
                <h3>Create New Problem</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>문제 : </label>
                            <TextareaAutosize aria-label="minimum height" rows={3} placeholder="요청하시고자 하는 문제의 상세 내용을 적어주세요." 
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription} /> 
                        {/* <input  type="text"
                                className="form-control"
                                rows={3} placeholder="Minimum 3 rows"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                /> */}
                      
                    </div>
                    <div className="form-group">
                        <label>정답: </label>
                        <TextareaAutosize aria-label="minimum height" rows={1} placeholder="문제 정답" 
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group" onChange={this.onChangecreateAt}>{this.state.todo_createdAt} </div>
                    <div className="form-group">
                        <input type="submit" value="new problem" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}