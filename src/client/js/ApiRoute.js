import React from 'react';

import OperationList from './OperationList';

export default function ApiRoute(props) {
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