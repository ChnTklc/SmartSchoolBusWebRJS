import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminLogin from './AdminLogin';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    };

    static isLoggedOut = false;

    logoutClick(e) {
        Admin.isLoggedOut = true;
        this.props.history.push('/adminlogin');
    }
    
    render() {
        if (!AdminLogin.isLoggedIn) {
            return (<Redirect to="/adminlogin" />)
        }
        Admin.isLoggedOut = false;
        return (
            <div>
                <button onClick={(e) => this.logoutClick(e)}>LOGOUT</button>
            </div>
        );
    }
}
export default Admin