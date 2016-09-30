import React from 'react';
import Login from './login.jsx';
import Regist from './regist.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main';
    }
    render() {
        return (
        	<div className="container">
        		<Login />
        		<Regist />
        	</div>
        );
    }
}

export default Main;
