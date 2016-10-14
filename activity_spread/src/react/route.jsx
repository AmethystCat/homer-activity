import React from 'react';
import App from 'pages/app';
import Index from 'pages/index/main';
import List from 'pages/list/main';
import Status from 'pages/status/main';
import Add from 'pages/saler/add';
import Order from 'pages/saler/order';

import {Route, IndexRedirect} from 'react-router';

let routes = (
    <Route path="/" component={App}>
        {/*<IndexRoute component={Index}/> */}
        <IndexRedirect to="/index" />
        <Route path="/index" component={Index}/>
        <Route path="/list" component={List}/>
        <Route path="/status" component={Status}/>
        <Route path="/add-saler" component={Add}/>
        <Route path="/add-order" component={Order}/>
    </Route>
);
export default routes;
