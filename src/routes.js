import React, {Fragment} from 'react';
import {NotLoggedInLayout, PrivateLayout, PublicLayout} from '@layouts';
import {HashRouter as Router, Redirect, Switch} from "react-router-dom";

import {
    CreateRoute,
    CreateRouteSelector,
    Login,
    PageNotFound,
    Profile,
    Register,
    RegistrationSuccess,
    Ruta,
    TimeLine,
    Welcome,
} from './containers';
import CreateRouteFile from "./containers/CreateRouteFile/CreateRouteFile";
import FriendsList from './containers/FriendsList/FriendsList';
import FriendsGroups from './containers/FriendsGroups/FriendsGroups';
import CreateGroup from './containers/CreateGroup';
import Group from './containers/FriendsGroups/children/Group';

const privateRoutes = [
    {
        id: 'welcome',
        path: '/welcome',
        component: Welcome
    },
    {
        id: 'profile',
        path: '/profile',
        component: Profile
    },
    {
        id: 'timeline',
        path: '/timeline',
        component: TimeLine
    },
    {
        id: 'route',
        path: '/route/:id',
        component: Ruta
    },
    {
        id: 'friends',
        path: '/friends',
        component: FriendsList
    },
    {
        id: 'friendsGroups',
        path: '/friendsGroups',
        component : FriendsGroups
    },
    {
        id: 'createroute',
        path: '/createroute',
        component: CreateRoute
    },
    {
        id: 'createrouteselector',
        path: '/createrouteselector',
        component: CreateRouteSelector
    },
    {
        id: 'createGroup',
        path: '/createGroup',
        component : CreateGroup
    }
    ,{
        id: 'friendsGroups',
        path: '/friendsGroups',
        component : FriendsGroups
    },
    {
        id:'group',
        path: '/group',
        component : Group
    },
    {
        id:'createroutefile',
        path: '/createroutefile',
        component : CreateRouteFile
    }
];

const Routes = () => (
    <Router>
        <Fragment>
            <Switch>
                <NotLoggedInLayout component={Login} path="/login" exact/>
                <NotLoggedInLayout component={Register} path="/register" exact/>
                <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact/>
                <PublicLayout path="/404" component={PageNotFound} exact/>
                <Redirect from="/" to="/welcome" exact/>
                <PrivateLayout path="/" routes={privateRoutes}/>
                <Redirect to="/404"/>
            </Switch>
        </Fragment>
    </Router>
);

export default Routes;
