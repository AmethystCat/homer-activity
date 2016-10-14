import React from 'react';
import App from 'pages/app';
import Index from 'pages/index/main';
import List from 'pages/list/main';
import Status from 'pages/status/main';
import Add from 'pages/saler/add';
import Order from 'pages/saler/order';

import {Route, IndexRoute} from 'react-router';

let routes = (
    <Route path="/api/seller" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/api/seller/index" component={Index}/>
        <Route path="/api/seller/list" component={List}/>
        <Route path="/api/seller/status" component={Status}/>
        <Route path="/api/seller/add-saler" component={Add}/>
        <Route path="/api/seller/add-order" component={Order}/>
    </Route>
);
export default routes;
