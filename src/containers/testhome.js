import React, { Component } from 'react';
// import './problem.css';

class testhome extends Component {
  constructor(props){
      super();
      this.state = {
          users:[],
          name : '',
      };
  }

  componentDidMount() {
      this.getText();
  }

  getText = () => {
      fetch('/users')
          .then(res=>res.json())
          .then(users=>this.setState({users}));
  }

  handlechange = (e) => {
      this.setState({
          [e.target.name]:e.target.value
      });
  }

  handleclick = () => {
      const  {name}= this.state;

      fetch('/users', {
          method: 'POST',
          body: JSON.stringify({
              name,
          }),
          haeaders: {
              'Accept': 'application/json',
              'content-Type': 'application/json'
          },
      })
          .then(res=>this.getText());

      document.getElementById('name').value = "";
  }


  render() {
    return (
      <div className="button-item">
          <p> 이름 : <input id = "name" name = "name" onChange={this.handlechange}></input><br/>
                    <button onClick={this.handleclick}>등록</button></p>
          {this.state.users.map(user=>
              <div key = {user._id}>{user.name} </div>
          )}

      </div>
    );
  }
}

export default testhome;
