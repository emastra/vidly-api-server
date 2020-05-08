import React from 'react';

import ApiRoute from './ApiRoute';

import { data } from '../data';

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

export default RouteList;