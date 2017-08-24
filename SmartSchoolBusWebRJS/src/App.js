import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Home from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import Contact from 'material-ui/svg-icons/communication/contact-mail';

const styles = {
    width: 230,
    height: 80,
    marginTop: 320,
    marginLeft: 560,
    opacity: .8,
};

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <section role="navigation" className="nav-bar">
                        <div className="slogan">
                            <Link to="/" className="sloganlink">
                                <h2><strong>Smart School Bus</strong></h2>
                            </Link>
                        </div>
                        <div className="linksdiv">
                            <Link to="/" className="links"><Home color="rgb(255,255,255)" />Home</Link>
                            <Link to="/about" className="links"><Info color="rgb(255,255,255)" />About Us</Link>
                            <Link to="/contact" className="links"><Contact color="rgb(255,255,255)" />Contact Us</Link>
                        </div>
                    </section>
                    <div>
                        <Link to='/login'><FlatButton labelPosition="center" backgroundColor="rgb(51, 105, 30)"
                            labelStyle={{ fontSize: 30, color: "rgba(255, 255, 255, 1)" }}
                            style={styles} label="Login" /></Link>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default App;
