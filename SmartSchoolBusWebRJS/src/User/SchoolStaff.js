import React from "react";
import { Redirect } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

class SchoolStaff extends React.Component {
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
        localStorage.setItem("isLoggedInSchoolStaff", false);
    }

    render() {
        if (localStorage.getItem("isLoggedInSchoolStaff") === "false") {
            return (<Redirect to="/login" />);
        }
        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="LOGOUT" backgroundColor="rgba(51, 105, 30, 0.8)" className="logout" onClick={(e) => this.logoutClick(e)} />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default SchoolStaff;