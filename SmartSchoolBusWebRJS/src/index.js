import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import ContactUs from './Home/ContactUs';
import AboutUs from './Home/AboutUs';
import Login from './User/Login';
import Admin from './Admin/Admin';
import AdminHome from './Admin/AdminHome';
import SchoolStaff from './User/SchoolStaff';
import CompanyOfficer from './User/CompanyOfficer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const NotFound = () => (
    <div className="notfound">
        <h1>404.. This is not the web page you are looking for!</h1>
    </div>);

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
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
