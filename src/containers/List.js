import React from 'react';

class H_Problem_list extends React.Component {
    render() {
        return (
            <div>
            <h2>{this.props.num}</h2>
            <p>{this.props.problem}</p>
            <p>{this.props.answer}</p>
            </div>
        )
    }
}

export default H_Problem_list;
