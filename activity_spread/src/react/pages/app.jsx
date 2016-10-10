import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }

    render() {
        return (
            <div className="container">
                <ul>
                    <li>
                        <Link to="/list">list</Link>
                    </li>
                    <li>
                        <Link to="/status">status</Link>
                    </li>
                    <li>
                        <Link to="/index">index</Link>
                    </li>
                </ul>
                <ReactCSSTransitionGroup component="div" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default App;
