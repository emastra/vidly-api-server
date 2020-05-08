import React from 'react';

const BASE_URL = window.location.href;

class Header extends React.Component {
    state = {
        text: 'Log in as a test user',
        background: null,
        response: null
    }

    handleClick = (evt) => {
        var url = BASE_URL + 'api/auth';
        var data = {email: 'webinttest@test.com', password: '123456'}
        var options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        fetch(url, options).then((response) => {
            if (response.status == 200) {
                this.setState({
                    text: 'Logged in',
                    background: 'green'
                });
            }
            return response.text();
        }).then((responseText) => {
            const token = responseText;
            this.props.setToken(token);
        }).catch((err) => {
            console.log('There was an error during login. Please try again.')
            // testLoginBtn.innerHTML = "Error. Please try again.";
            // testLoginBtn.style.backgroundColor = 'orange';
            // resPara.innerHTML = response.status + ' ' + response.statusText;
        });
    }

    render() {
        return (
            <header className="bg-primary text-white">
                <div className="container text-center">
                    <h1>Vidly API Playground</h1>
                    <p className="lead">The playground is a great way to test out the Vidly APIs, get details about a specific endpoint and view actual responses.</p>
                    <button 
                        type="button" 
                        name="test-login" 
                        id="test-login-btn" 
                        className="buttons"
                        onClick={this.handleClick}
                        style={{backgroundColor: this.state.background}}
                    >
                        {this.state.text}
                    </button>
                    <p id="res-test-login">{this.state.response}</p>
                </div>
            </header>
        );
    }
}

export default Header;