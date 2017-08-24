import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Login from './Login';
import AdminLogin from './AdminLogin';
import Admin from './Admin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const NotFound = () => (
    <h1>404.. This page is not found!</h1>);

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/contact' component={ContactUs} />
                <Route exact path='/about' component={AboutUs} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/adminlogin' component={AdminLogin} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='*' component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>, document.getElementById('root'));
