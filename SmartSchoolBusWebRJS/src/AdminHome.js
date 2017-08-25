﻿import React from 'react';
import { Redirect } from 'react-router-dom';

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    logoutClick() {
        var self = this;
        self.setState({
            isLogin: false
        });
        window.localStorage.setItem('isLogin', false);
    }

    render() {
        //Admin.propTypes.isLogin = this.state.isLogin;
        if (window.localStorage.getItem('isLogin') === 'false') {
            return (<Redirect to="/admin" />);
        }
        return (
            <div>
                <button onClick={(e) => this.logoutClick(e)}>LOGOUT</button>
            </div>
        );
    }
}
export default AdminHome;