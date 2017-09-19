import React from "react";
import ActionVisibilityOff from "material-ui/svg-icons/action/visibility-off";
import ActionVisibility from "material-ui/svg-icons/action/visibility";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import rpni from "react-phone-number-input/style.css";
import rrui from "react-phone-number-input/rrui.css";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Phone from "react-phone-number-input";
import { Redirect } from "react-router-dom";
import NavigationBar from "../Home/NavigationBar";

let request = require("request");

let varsAsLanguage = {
    en: {
        loginTitle: "Log In",
        loginButton: "Log In",
        phone: "Phone Number*",
        pass: "Password*",
        forgotPass: "Forgot your password?",
    },
    tr: {
        loginTitle: "Giriş Yap",
        loginButton: "GİRİŞ",
        phone: "Telefon Numarası*",
        pass: "Şifre*",
        forgotPass: "Şifrenizi mi unuttunuz?"
    }
};

let language = varsAsLanguage.en;

(function languageSetting() {
    if (NavigationBar.getLanguage() === "EN") {
        language = varsAsLanguage.tr;
    }
    else if (NavigationBar.getLanguage() === "TR") {
        language = varsAsLanguage.en;
    }
})();


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLogin: false,
            errortext: "",
            role: "",
            phone: "",
            password: ""
        }
    };

    handleClick = (event) => {
        event.preventDefault();
        let self = this;
        if (self.state.phone === "" || self.state.password === "") {
            return false;
        }

        let options = {
            method: "POST",
            url: "http://smartschoolbusdevelopmentapi.azurewebsites.net/api/token",
            headers:
            {
                "content-type": "application/x-www-form-urlencoded"
            },
            form:
            {
                username: self.state.phone,
                password: self.state.password,
                client_id: "ec37e34e0b04195199383c45a595412161629a92d01d676460f2e8e553d5b83e",
                grant_type: "password"
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            else {
                let info = JSON.parse(body);
                if (info.access_token !== null) {
                    self.setState({
                        isLogin: true,
                        role: info.role
                    });
                } else {
                    console.log(body);
                    self.setState({
                        errortext: info.error
                    });
                }
            }
        });
    };

    show = (id) => {
        let tag = document.getElementById(id);
        if (tag.getAttribute("type") === "password") {
            tag.setAttribute("type", "text");
        } else {
            tag.setAttribute("type", "password");
        }
        this.setState({
            visible: !this.state.visible
        });
    };

    enteredPhoneChange = (value) => {
        this.setState({ phone: value });
    };

    render() {
        if (this.state.isLogin ||
            localStorage.getItem("isLoggedInSchoolStaff") === "true" ||
            localStorage.getItem("isLoggedInCompanyOfficer") === "true") {

            if (this.state.role === "SchoolStaff" ||
                localStorage.getItem("isLoggedInSchoolStaff") === "true") {

                localStorage.setItem("isLoggedInSchoolStaff", true);
                return (<Redirect to="/schoolstaff" />);
            }
            else if (this.state.role === "CompanyOfficer" ||
                localStorage.getItem("isLoggedInCompanyOfficer") === "true") {

                localStorage.setItem("isLoggedInCompanyOfficer", true);
                return (<Redirect to="/companyofficer" />);
            }
        }
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <NavigationBar />
                    <form className="loginform">
                        <div className="outer">
                            <h2 className="signin">{language.loginTitle}</h2>
                            <br />
                            <Phone required placeholder={language.phone} value={this.state.phone} country="TR"
                                onChange={(value) => this.enteredPhoneChange(value)} nativeExpanded />
                            <TextField required floatingLabelText={language.pass} type="password" id="pass"
                                onChange={(event, value) => this.setState({ password: value })} />
                            {this.state.visible ? <ActionVisibilityOff color="rgb(103, 118, 141)" onClick={() => this.show("pass")} /> :
                                <ActionVisibility color="rgb(103, 118, 141)" onClick={() => this.show("pass")} />}
                            <br /><br />
                            {this.state.errortext ? <div className="errorText">{this.state.errortext}!</div> : true}
                            <br />
                            <RaisedButton label={language.loginButton} className="loginbutton" backgroundColor="rgba(51, 105, 30, 0.7)" labelColor="rgb(255, 255, 255)"
                                onClick={(e) => this.handleClick(e)} labelStyle={{ fontSize: 18 }} style={{ width: 120, height: 40, opacity: 0.8 }} />
                            <br /> <br />
                            <a href="" className="pass-forgot">{language.forgotPass}</a>
                        </div>
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Login;