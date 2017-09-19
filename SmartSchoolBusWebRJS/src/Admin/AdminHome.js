import React from "react";
import { Redirect } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    logoutClick = () => {
        let self = this;
        self.setState({
            isLogin: false
        });
        localStorage.setItem("isLoggedInAdmin", false);
    };

    render() {
        if (localStorage.getItem("isLoggedInAdmin") === "false") {
            return (<Redirect to="/admin" />);
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
export default AdminHome;