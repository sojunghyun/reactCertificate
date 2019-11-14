import React, { Component } from 'react';
import BigText from '../components/BigText';
import {AuthContent, Input} from "../Auth";

class Home extends Component {
      LoggingButton = () => {
        console.log("click");
  }
      render() {
        return (
            <div className="button-item">
                <button onClick={this.LoggingButton}>submit</button>
            </div>

        );
    }
    // render() {
    //     return (
    //         <div className="button-item">
    //             <AuthContent title="로그인">
    //             <Input label="이메일" name="email" placeholder="이메일"/>
    //             <Input label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
    //             </AuthContent>
    //             <button onClick={this.LoggingButton}>submit</button>
    //         </div>
    //
    //     );
    // }

}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
        return (
      <div className="button-item">
        <div>login</div>

      </div>
    );
  }
}
export default Home;
//  const Home = () => {
//      return (
//          <div>
//              <BigText>Users</BigText>
//              {/*{this.state.users.map(user =>*/}
//              {/*    <div key={user._id}>{user.name} {user.age}</div>*/}
//              )}
//          </div>
//      );
//  };
//
// export default Home;