import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Login from './Login';
import Admin from './Admin';
import AdminHome from './AdminHome';
import SchoolStaff from './SchoolStaff';
import CompanyOfficer from './CompanyOfficer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const NotFound = () => (
    <div className="notfound">
        <h1>404.. This is not the web page you are looking for!</h1>
    </div>);

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/contact' component={ContactUs} />
                <Route exact path='/about' component={AboutUs} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/admin/home' component={AdminHome} />
                <Route exact path='/schoolstaff' component={SchoolStaff} />
                <Route exact path='/companyofficer' component={CompanyOfficer} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>, document.getElementById('root'));
