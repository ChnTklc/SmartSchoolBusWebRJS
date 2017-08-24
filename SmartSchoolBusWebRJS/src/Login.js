import React from 'react';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import Contact from 'material-ui/svg-icons/communication/contact-mail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rpni from 'react-phone-number-input/style.css';
import rrui from 'react-phone-number-input/rrui.css';
import Home from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Phone from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import './Styles.css';

var request = require("request");

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLogin: false,
            phone: '',
            password: ''
        }
    };

    handleClick(event) {
        event.preventDefault();
        var self = this;

        if (self.state.phone === '' || self.state.password === '') {
            return false;
        }

        var options = {
            method: 'POST',
            url: 'http://smartschoolbusdevelopmentapi.azurewebsites.net/api/token',
            headers:
            {
                'content-type': 'application/x-www-form-urlencoded'
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
                if (response.status === 200) {
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
                <div>
                    <section role="navigation" className="nav-bar">
                        <div className="slogan">
                            <Link to="/" className="sloganlink" >
                                <h2><strong>Smart School Bus</strong></h2>
                            </Link>
                        </div>
                        <div className="linksdiv">
                            <Link to="/" className="links"><Home color="rgb(255,255,255)" />Home</Link>
                            <Link to="/about" className="links"><Info color="rgb(255,255,255)" />About Us</Link>
                            <Link to="/contact" className="links"><Contact color="rgb(255,255,255)" />Contact Us</Link>
                        </div>
                    </section>
                    {this.state.isLogin ?
                        <div>

                        </div>
                        :
                        <form className="loginform">
                            <div className="outer">
                                <h2 className="signin">Sign in</h2>
                                <br />
                                <Phone required placeholder="Phone Number*" value={this.state.phone} country="TR"
                                    onChange={(event, value) => this.setState({ phone: value })} nativeExpanded />
                                <TextField required floatingLabelText="Password*" type="password" id="pass"
                                    onChange={(event, value) => this.setState({ password: value })} />
                                {this.state.visible ? <ActionVisibilityOff color="rgb(103, 118, 141)" onClick={() => this.show('pass')} /> :
                                    <ActionVisibility color="rgb(103, 118, 141)" onClick={() => this.show('pass')} />}
                                <br />
                                <RaisedButton label="Login" className="loginbutton" backgroundColor="rgba(51, 105, 30, 0.7)" labelColor="rgb(255, 255, 255)"
                                    onClick={(e) => this.handleClick(e)} labelStyle={{ fontSize: 18 }} style={{ width: 120, height: 40, opacity: 0.8 }} />
                                <br /> <br />
                                <a href="" className="pass-forgot">Forgot your password?</a>
                            </div>
                        </form>
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Login;