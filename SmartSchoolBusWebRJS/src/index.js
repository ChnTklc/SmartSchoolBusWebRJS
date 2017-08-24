import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Login from './Login';
import AdminLogin from './AdminLogin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/contact' component={ContactUs} />
                <Route exact path='/about' component={AboutUs} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/admin' component={AdminLogin} />
            </Switch>
        </div>
    </BrowserRouter>, document.getElementById('root'));
