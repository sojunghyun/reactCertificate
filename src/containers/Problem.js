import React, { Component } from 'react';
import './problem.css';
import request from 'superagent';

class Problem extends Component {
  state = {
    number: 0
  }
  constructor(props){
    super(props);
    this.state={
      message: '',
    };
    this.handleMessageInput = this.handleMessageInput.bind(this);
  }
  handleMessageInput(e) {
    this.setState({ message: e.target.value });
  }
  handleSubmitMessage() {
    console.log('starting to submit profile');
    if (this.state.isFormFilledProfile) {
      console.log('Profile Form appears filled');
      const data = {
        message: this.state.message,
      };

      request
        .post('/api/messages')
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            console.log('Oh no! err');
          } else {
            console.log('Success');
          }
        });
    }
  }
  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }

  render() {
    return (
      <div className="button-item">
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
        <div>
          <form onSubmit={this.handleSubmitMessage}>
            <input
              onChange={this.handleMessageInput}
              value={this.state.message}
            />
            <button type='Submit' value='Submit'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Problem;
