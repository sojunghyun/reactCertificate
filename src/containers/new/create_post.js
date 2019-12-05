import React, { Component } from 'react';
import axios from 'axios';

export default class createPost extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChageUsername = this.onChageUsername.bind(this);
        this.onChangecreateAt = this.onChangecreateAt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            username: '',
            createAt: Date.now,
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChageUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangecreateAt(e) {
        this.setState({
            createAt: e.target.value
        });
    }

  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`commnet text: ${this.state.title}`);
    console.log(`commnet user: ${this.state.username}`);
    console.log(`commnet createdDate: ${this.state.createAt}`);
 
    const newTodo = {
        title: this.state.title,
        username: this.state.username,
        createAt: this.state.createAt
    };
    axios.post('/comment/add', newTodo)
        .then(res => console.log(res.data))

    this.setState({
        title: '',
        username: '',
        createAt: ''
    })
    this.props.history.push('/');
}

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>New Comment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>username: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChageUsername}
                                />
                    </div>
                   
                    <div className="form-group" onChange={this.onChangecreateAt}>{this.state.createAt} </div>
                    <div className="form-group">
                        <input type="submit" value="Create comment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}