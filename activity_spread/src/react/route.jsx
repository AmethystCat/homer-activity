import React  from 'react';
import App     from 'pages/app';
import Index  from 'pages/index/main';
import List      from 'pages/list/main';
import Status from 'pages/status/main';

import {Route, IndexRoute} from 'react-router';

let routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Index} />
		<Route path="/index" component={Index} />
		<Route path="/list" component={List} />
		<Route path="/status" component={Status} />
	</Route>
);
export default routes;