import React from 'react';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var request = require("request");

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLogin: false,
            username: '',
            password: ''
        }
    };

    /*
        var options = {
            method: 'POST',
            url: 'http://smartschoolbusdevelopmentapi.azurewebsites.net/api/token',
            headers:
            {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data:
            {
                client_id: 'cde01d2db10b2bc2d81a6dc738ccf16f7b99973a57737486903436a685f0e7fa',
                username: 'SYSADMIN',
                password: 'SYSADMIN',
                grant_type: 'password'
            }
        };
        axios(options).then(function (response) {
            console.log(response);
            alert('REQUEST SENT!');

            if (response.status === 200) {
                console.log("Login successfull");
                alert("Login successfull");
                self.setState({
                    isLogin: true
                });
            }
            else if (response.data.code === 204) {
                console.log("Username and password do not match");
                alert("Username and password do not match")
            }
            else {
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        }).catch(function (error) {
            console.log(error.response);
            alert(error);
        });*/

    handleClick(event) {
        event.preventDefault();
        var self = this;

        if (self.state.username === '' || self.state.password === '') {
            return false;
        }

        var options = {
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
                var info = JSON.parse(body);
                if (response.statusCode === 200) {
                    console.log(body);
                    alert(info.role);
                    self.setState({
                        isLogin: true
                    });
                } else {
                    console.log(body);
                    alert(info.error);
                }
            }
        });
    }

    show(id) {
        var tag = document.getElementById(id);
        if (tag.getAttribute('type') === 'password') {
            tag.setAttribute('type', 'text');
        } else {
            tag.setAttribute('type', 'password');
        }
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                {this.state.isLogin ?
                    <div>

                    </div>
                    :
                    <form className="loginform">
                        <div className="outer">
                            <TextField required floatingLabelText="Username*" style={{ marginRight: 22 }}
                                onChange={(event, value) => this.setState({ username: value })} />
                            <TextField required floatingLabelText="Password*" type="password" id="pass"
                                onChange={(event, value) => this.setState({ password: value })} />
                            {this.state.visible ? <ActionVisibilityOff color="rgb(103, 118, 141)" onClick={() => this.show('pass')} /> :
                                <ActionVisibility color="rgb(103, 118, 141)" onClick={() => this.show('pass')} />}
                            <br />
                            <RaisedButton label="Go" labelColor="rgb(103, 118, 141)" style={{ opacity: .7 }}
                                secondary={true} className="loginbutton" onClick={(e) => this.handleClick(e)} />
                        </div>
                    </form>
                }
            </MuiThemeProvider>
        );
    }
}

export default AdminLogin;