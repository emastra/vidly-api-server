import React from 'react';

import Playground from './Playground';

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

export default OperationList;