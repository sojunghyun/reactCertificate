import React from 'react';

class List extends React.Component {
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

export default List;
