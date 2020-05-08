import React from 'react';

import Nav from './js/Nav';
import Header from './js/Header';
import RouteList from './js/RouteList';
import Footer from './js/Footer';


class App extends React.Component {
    state = {
        token: null
    }

    handleToken = (token) => {
        this.setState({ token });
    }

    render() {
        return (
            <div>
                <Nav />
                <Header setToken={this.handleToken}/>
                <RouteList token={this.state.token}/>
                <Footer />
            </div>
            
        );
    }
}

export default App;