// https://stackoverflow.com/questions/36609910/react-without-webpack

/*
visualizza eventuali errori, sia per login (line 377), sia per richieste normali (line 532)

*/

const BASE_URL = window.location.href;

const data = {
    list0: {
        title: 'Genres',
        id: '0',
        endpoints: [
            {
                hrefid: 'endpoint-0-0',
                method: 'GET',
                address: '/api/genres',
                shortdesc: 'Get the list of all genres',
                parent: '#endpoint-list0', // empty string if dont want automatic toggle
                playgroundvars: {
                    longdesc: 'Retrieve the list of all available genres.',
                    table: []
                }
            },
            {
                hrefid: 'endpoint-0-1',
                method: 'POST',
                address: '/api/genres',
                shortdesc: 'Create a genre',
                parent: '#endpoint-list0',
                playgroundvars: {
                    longdesc: 'Create a genre. It requires just a name.',
                    table: [{ id: 't-0-1-0', name: 'name', description: 'Name of the genre', type: 'text' }]
                }
            },
            {
                hrefid: 'endpoint-0-2',
                method: 'PUT',
                address: '/api/genres/:id',
                shortdesc: 'Update a specific genre',
                parent: '#endpoint-list0',
                playgroundvars: {
                    longdesc: 'Update a specific genre. It requires the ID of the genre to update.',
                    table: [
                        { id: 't-0-2-0', name: 'id', description: 'ID of the genre to update', type: 'text' },
                        { id: 't-0-2-1', name: 'name', description: 'New name of the genre', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-0-3',
                method: 'DELETE',
                address: '/api/genres/:id',
                shortdesc: 'Delete a specific genre',
                parent: '#endpoint-list0',
                playgroundvars: {
                    longdesc: 'Delete a specific genre.',
                    table: [{ id: 't-0-3-0', name: 'id', description: 'ID of the genre to delete', type: 'text' }]
                }
            },
            {
                hrefid: 'endpoint-0-4',
                method: 'GET',
                address: '/api/genres/:id',
                shortdesc: 'Get a specific genre',
                parent: '#endpoint-list0',
                playgroundvars: {
                    longdesc: 'Retrieve a specific genre by ID.',
                    table: [{ id: 't-0-4-0', name: 'id', description: 'ID of the genre to retrieve', type: 'text' }]
                }
            }
        ]
    },
    list1: {
        title: 'Movies',
        id: '1',
        endpoints: [
            {
                hrefid: 'endpoint-1-0',
                method: 'GET',
                address: '/api/movies',
                shortdesc: 'Get a list of all movies',
                parent: '#endpoint-list1',
                playgroundvars: {
                    longdesc: 'Retrieve the list of all movies in the database.',
                    table: []
                }
            },
            {
                hrefid: 'endpoint-1-1',
                method: 'POST',
                address: '/api/movies',
                shortdesc: 'Create a movie',
                parent: '#endpoint-list1',
                playgroundvars: {
                    longdesc: 'Create a movie.',
                    table: [
                        { id: 't-1-1-0', name: 'title', description: 'Title of the new movie', type: 'text' },
                        { id: 't-1-1-1', name: 'genreId', description: 'ID of the genre for this movie', type: 'text' },
                        { id: 't-1-1-2',name: 'numberInStock', description: 'Number in stock', type: 'text' },
                        { id: 't-1-1-3', name: 'dailyRentalRate', description: 'Daily rental rate', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-1-2',
                method: 'PUT',
                address: '/api/movies/:id',
                shortdesc: 'Update a specific movie',
                parent: '#endpoint-list1',
                playgroundvars: {
                    longdesc: 'Update a specific movie.',
                    table: [
                        { id: 't-1-2-0', name: 'id', description: 'ID of the movie to update', type: 'text' },
                        { id: 't-1-2-1', name: 'title', description: 'New title', type: 'text' },
                        { id: 't-1-2-2', name: 'genreId', description: 'Id of the new genre', type: 'text' },
                        { id: 't-1-2-3', name: 'numberInStock', description: 'New number in stock', type: 'text' },
                        { id: 't-1-2-4', name: 'dailyRentalRate', description: 'New daily rental rate', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-1-3',
                method: 'DELETE',
                address: '/api/movies/:id',
                shortdesc: 'Delete a specific movie',
                parent: '#endpoint-list1',
                playgroundvars: {
                    longdesc: 'Delete a specific movie.',
                    table: [
                        { id: 'play-1-3-0', name: 'id', description: 'ID of the movie to update', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-1-4',
                method: 'GET',
                address: '/api/movies/:id',
                shortdesc: 'Get a specific movie',
                parent: '#endpoint-list1',
                playgroundvars: {
                    longdesc: 'Retrieve a specific movie by ID.',
                    table: [
                        { id: 'play-1-4-0', name: 'id', description: 'ID of the movie to update', type: 'text' }
                    ]
                }
            },
        ]
    },
    list2: {
        title: 'Customers',
        id: '2',
        endpoints: [
            {
                hrefid: 'endpoint-2-0',
                method: 'GET',
                address: '/api/customers',
                shortdesc: 'Get the list of all customers',
                parent: '#endpoint-list2',
                playgroundvars: {
                    longdesc: 'Retrieve the list of all customers.',
                    table: []
                }
            },
            {
                hrefid: 'endpoint-2-1',
                method: 'POST',
                address: '/api/customers',
                shortdesc: 'Create a customer',
                parent: '#endpoint-list2',
                playgroundvars: {
                    longdesc: 'Create a new customer.',
                    table: [
                        { id: 't-2-1-0', name: 'name', description: 'Name of the new customer', type: 'text' },
                        { id: 't-2-1-1', name: 'isGold', description: 'Tick if customer is a Gold customer', type: 'checkbox' },
                        { id: 't-2-1-2', name: 'phone', description: 'Telephone number of the customer', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-2-2',
                method: 'PUT',
                address: '/api/customers/:id',
                shortdesc: 'Update a specific customer',
                parent: '#endpoint-list2',
                playgroundvars: {
                    longdesc: 'Update a specific customer.',
                    table: [
                        { id: 't-2-2-0', name: 'id', description: 'Id of the customer to update', type: 'text' },
                        { id: 't-2-2-1', name: 'name', description: 'Name of the new customer', type: 'text' },
                        { id: 't-2-2-2', name: 'isGold', description: 'Tick if customer is a Gold customer', type: 'checkbox' },
                        { id: 't-2-2-3', name: 'phone', description: 'Telephone number of the customer', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-2-3',
                method: 'DELETE',
                address: '/api/customers/:id',
                shortdesc: 'Delete a specific customer',
                parent: '#endpoint-list2',
                playgroundvars: {
                    longdesc: 'Delete a specific customer.',
                    table: [
                        { id: 't-2-3-0', name: 'id', description: 'Id of the customer to delete', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-2-4',
                method: 'GET',
                address: '/api/customers/:id',
                shortdesc: 'Retrieve a specific customer',
                parent: '#endpoint-list2',
                playgroundvars: {
                    longdesc: 'Retrieve a specific customer by ID.',
                    table: [
                        { id: 't-2-4-0', name: 'id', description: 'Id of the customer to retrieve', type: 'text' }
                    ]
                }
            }
        ]
    },
    list3: {
        title: 'Rentals',
        id: '3',
        endpoints: [
            {
                hrefid: 'endpoint-3-0',
                method: 'GET',
                address: '/api/rentals',
                shortdesc: 'Get the list of all rentals',
                parent: '#endpoint-list3',
                playgroundvars: {
                    longdesc: 'Retrieve the list of all rentals.',
                    table: []
                }
            },
            {
                hrefid: 'endpoint-3-1',
                method: 'POST',
                address: '/api/rentals',
                shortdesc: 'Create a rental',
                parent: '#endpoint-list3',
                playgroundvars: {
                    longdesc: 'Create a new rental. It requires IDs of the customer and the movie.',
                    table: [
                        { id: 't-3-1-0', name: 'customerId', description: 'Id of the customer for this rental', type: 'text' },
                        { id: 't-3-1-1', name: 'movieId', description: 'Id of the movie for this rental', type: 'text' }
                    ]
                }
            },
            {
                hrefid: 'endpoint-3-2',
                method: 'GET',
                address: '/api/rentals/:id',
                shortdesc: 'Get a specific rental',
                parent: '#endpoint-list3',
                playgroundvars: {
                    longdesc: 'Retrieve a specific rental by ID.',
                    table: [
                        { id: 't-3-2-0', name: 'id', description: 'Id of the customer to retrieve', type: 'text' }
                    ]
                }
            }
        ]
    },
    list4: {
        title: 'Returns',
        id: '4',
        endpoints: [
            {
                hrefid: 'endpoint-4-0',
                method: 'POST',
                address: '/api/returns',
                shortdesc: 'Create a return',
                parent: '#endpoint-list4',
                playgroundvars: {
                    longdesc: 'Register the return of a video. It sets dateReturned and rentalFee on the actual rental. It requires the customerId and the movieId of the rental.',
                    table: [
                        { id: 't-4-0-0', name: 'customerId', description: 'Id of the customer for the rental to return', type: 'text' },
                        { id: 't-4-0-1', name: 'movieId', description: 'Id of the movie for the rental to return', type: 'text' }
                    ]
                }
            }
        ]
    },
    list5: {
        title: 'Users',
        id: '5',
        endpoints: [
            {
                hrefid: 'endpoint-5-0',
                method: 'GET',
                address: '/api/users/me',
                shortdesc: 'Get the current user information.',
                parent: '#endpoint-list5',
                playgroundvars: {
                    longdesc: 'Retrieve information of the current user.',
                    table: []
                }
            },
            {
                hrefid: 'endpoint-5-1',
                method: 'POST',
                address: '/api/users',
                shortdesc: 'Create a new user',
                parent: '#endpoint-list5',
                playgroundvars: {
                    longdesc: 'Create a new user. It requires name, email and password.',
                    table: [
                        { id: 't-5-1-0', name: 'name', description: 'Name of the new user', type: 'text' },
                        { id: 't-5-1-1', name: 'email', description: 'Email of the new user', type: 'text' },
                        { id: 't-5-1-2', name: 'password', description: 'Password of the new user', type: 'password' }
                    ]
                }
            }
        ]
    }
};

const Nav = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="/">Vidly</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

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

const Footer = (props) => {
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Developed with <i className="fa fa-heart"></i> by <a href="http://mastragostino.me" target="_blank">Emiliano Mastragostino</a></p>
                <p className="footer-p-icons m-0">
                    <a href="https://www.linkedin.com/in/emiliano-mastragostino/" target="_blank"><i className="fa fa-linkedin icons"></i></a>
                    <a href="https://github.com/emastra" target="_blank"><i className="fa fa-github icons"></i></a>
                    <a href="https://plus.google.com/112095688629248913313" target="_blank"><i className="fa fa-google-plus-square icons"></i></a>
                </p>
            </div>
        </footer>
    );
}

//

class RouteList extends React.Component {
    render() {
        return (
            <section>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <ul id="route-list">
                            <ApiRoute list={data.list0} token={this.props.token} />
                            <ApiRoute list={data.list1} token={this.props.token} />
                            <ApiRoute list={data.list2} token={this.props.token} />
                            <ApiRoute list={data.list3} token={this.props.token} />
                            <ApiRoute list={data.list4} token={this.props.token} />
                            <ApiRoute list={data.list5} token={this.props.token} />
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}


const ApiRoute = (props) => {
    const { title, id, endpoints } = props.list;
    const { token } = props;

    return (
        <div>
            <a data-toggle="collapse" className="collapsed" href={'#route' + id}>
                <li>
                    <span className="route-title">{title}</span>
                    <span className="route-subtitle">{title} operations</span>
                    <i className="fa fa-minus-circle float-right"></i>
                </li>
            </a>
            <div id={'route' + id} className="collapse col-lg-11" data-parent="#route-list">
                <ul id={'endpoint-list' + id}>
                    <OperationList endpoints={endpoints} token={token} />
                </ul>
            </div>
        </div>
    );
}

class OperationList extends React.Component {
    render() {
        const { endpoints, token } = this.props;

        return (
            <React.Fragment>
                {endpoints.map(operation => (
                    <div key={operation.hrefid}>
                        <a data-toggle="collapse" className="collapsed" href={'#' + operation.hrefid}>
                            <li>
                                <span className={'verb-btn ' + operation.method + '-color'}><strong>{operation.method}</strong></span>
                                <span className="endpoint-address">{operation.address}</span>
                                <span className="endpoint-desc">{operation.shortdesc}</span>
                                <i className="fa fa-minus-circle float-right"></i>
                            </li>
                        </a>
                        <div id={operation.hrefid} className="play-div collapse" data-parent={operation.parent}>
                            <Playground
                                token={token}
                                desc={operation.playgroundvars.longdesc} 
                                table={operation.playgroundvars.table}
                                path={operation.address}
                                method={operation.method}
                            />
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

class Playground extends React.Component {
    state = {
        resWindowText: 'Make the call to this endpoint to see the response',
        statusWindowText: 'Status code and text',
        values: null
    }

    handleChange = (evt) => {
        const values = Object.assign({}, this.state.values);
        values[evt.target.name] = evt.target.value;

        this.setState({ 
            values: values
        });
    }

    apiReq = async (path, method, body) => {
        const currentUrl = BASE_URL.slice(0,-1) + path;
        const options = Object.create(null);

        options.method = method;
        options.headers = { 'Content-Type': 'application/json' };

        if (this.props.token) {
            options.headers['x-auth-token'] = this.props.token;
        }
        if (body) {
            if (body.id) delete body.id;
            options.body = JSON.stringify(body);
        }
        console.log('options', options);

        const response = await fetch(currentUrl, options);
        console.log('response', response);

        let resData;
        if (response.status === 200) {
            resData = await response.json();
        }

        return {
            status: response.status,
            statusText: response.statusText,
            data: resData
        };
    }

    handleClick = async (evt) => {
        this.setState({ resWindowText: 'Waiting for response...' });
        let { path } = this.props;
        const { method } = this.props;
        const body = this.state.values; //values ? values : null;

        if (path.includes('/:id') && this.state.values) {
            path = path.replace('/:id', `/${this.state.values.id}`);
        }
        console.log('playground state:', this.state);

        const { status, statusText, data } = await this.apiReq(path, method, body);

        this.setState({ 
            resWindowText: status === 200 ? JSON.stringify(data, null, 4) : statusText,
            statusWindowText: `${status} ${statusText}`
        });
    }

    render() {
        const { desc, table } = this.props;

        return (
            <React.Fragment>
                <p>{desc}</p>
                <div className="white-band"><strong>Parameters</strong></div>
                {!table.length ? (
                    <p>No parameters for this endpoint.</p>
                ) : (
                    <table className="table params-table">
                        <thead>
                            <tr>
                                <th className="col" style={{width: '33.33%'}}>Name</th>
                                <th className="col" style={{width: '33.33%'}}>Description</th>
                                <th className="col" style={{width: '33.33%'}}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map(row => (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>
                                        <input 
                                            type={row.type} 
                                            name={row.name} // 'valueInput' 
                                            onChange={this.handleChange}
                                            value={this.state.inputValue}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button 
                    className="execute-btn buttons" 
                    type="button" 
                    name="execute"
                    onClick={this.handleClick}
                >
                    Make Call
                </button>
                <div className="white-band"><strong>Response</strong><span className="float-right"><strong>Content-Type:</strong> application/json</span></div>
                <pre className="status-window">{this.state.statusWindowText}</pre>
                <pre className="res-window">{this.state.resWindowText}</pre>
            </React.Fragment>
        );
    }
}

class valueInput extends React.Component {
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



//

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


ReactDOM.render(
    <App />,
    document.getElementById('root')
);