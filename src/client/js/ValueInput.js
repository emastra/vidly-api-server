import React from 'react';

export default class valueInput extends React.Component {
    state = {
        value: ''
    }

    handleChange = (evt) => {
        const value = evt.target.value;

        this.setState({ value: value });
    }

    render() {
        const { type, } = this.props;

        return (
            <input 
                type={type} 
                name="valueInput" 
                onChange={handleChange}
                value={this.state.value}
            />
        );
    }
}