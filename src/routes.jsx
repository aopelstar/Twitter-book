import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import NewBook from './components/NewBook';
import Drafts from './components/Drafts';
import Landing from './components/Landing';

export default(
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/newbook" component={NewBook} />
        <Route path="/drafts" component={Drafts} />
    </Switch>
)