import React from 'react';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
let request = require("request");

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLogin: false,
            username: '',
            password: ''
        }
    };

    handleClick = (event) => {
        event.preventDefault();
        let self = this;

        if (self.state.username === '' || self.state.password === '') {
            return false;
        }

        let options = {
            method: 'POST',
            url: 'http://smartschoolbusdevelopmentapi.azurewebsites.net/api/token',
            headers:
            {
                'content-type': 'application/x-www-form-urlencoded',
            },
            form:
            {
                client_id: 'cde01d2db10b2bc2d81a6dc738ccf16f7b99973a57737486903436a685f0e7fa',
                username: self.state.username,
                password: self.state.password,
                grant_type: 'password'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            else {
                let info = JSON.parse(body);
                if (response.statusCode === 200) {
                    self.setState({
                        isLogin: true
                    });
                } else {
                    console.log(body);
                    alert(info.error);
                }
            }
        });
    };

    show = (id) => {
        let tag = document.getElementById(id);
        if (tag.getAttribute('type') === 'password') {
            tag.setAttribute('type', 'text');
        } else {
            tag.setAttribute('type', 'password');
        }
        this.setState({
            visible: !this.state.visible
        });
    };

    render() {
        if (this.state.isLogin || localStorage.getItem('isLoggedInAdmin') === 'true') {
            localStorage.setItem('isLoggedInAdmin', true);
            return (<Redirect to="/admin/home" />);
        }
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <form className="loginform">
                        <div className="outer">
                            <TextField required floatingLabelText="Username*" style={{ marginRight: 22 }}
                                onChange={(event, value) => this.setState({ username: value })} />
                            <br /><br />
                            <TextField required floatingLabelText="Password*" type="password" id="pass"
                                onChange={(event, value) => this.setState({ password: value })} />
                            {this.state.visible ? <ActionVisibilityOff color="rgb(103, 118, 141)" onClick={() => this.show('pass')} /> :
                                <ActionVisibility color="rgb(103, 118, 141)" onClick={() => this.show('pass')} />}
                            <br />
                            <RaisedButton label="Go" labelColor="rgb(103, 118, 141)" style={{ opacity: .8 }}
                                secondary={true} className="loginbutton" onClick={(e) => this.handleClick(e)} />
                        </div>
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Admin;