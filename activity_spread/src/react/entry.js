import	React from 'react';
import ReactDOM from 'react-dom';
import routes from './route';
import {Router, browserHistory} from 'react-router';

import '../less/style-spread.less';

console.log(process.env.NODE_ENV);
ReactDOM.render(
	<Router routes={routes} history={browserHistory}/>,
	document.getElementById('app')
);