import React from 'react';

const BASE_URL = window.location.href;

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
        // console.log('options', options);

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

        let { path, method } = this.props;

        let body;
        if (method !== 'GET') body = this.state.values;

        if (path.includes('/:id') && this.state.values) {
            path = path.replace('/:id', `/${this.state.values.id}`);
        }

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

export default Playground;