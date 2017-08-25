import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import Contact from 'material-ui/svg-icons/communication/contact-mail';

const styles = {
    width: 230,
    height: 80,
    marginTop: 320,
    marginLeft: 560,
    opacity: .8,
};

class Home extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <section role="navigation" className="nav-bar">
                        <div className="slogan">
                            <a href="/" className="sloganlink">
                                <h2><strong>Smart School Bus</strong></h2>
                            </a>
                        </div>
                        <div className="linksdiv">
                            <a href="/" className="links"><HomeIcon color="rgb(255,255,255)" viewBox="0 -7 28 28" />Home</a>
                            <a href="/about" className="links"><Info color="rgb(255,255,255)" viewBox="0 -7 28 28" />About Us</a>
                            <a href="/contact" className="links"><Contact color="rgb(255,255,255)" viewBox="0 -7 28 28" />Contact Us</a>
                        </div>
                    </section>
                    <div>
                        <a href='/login'><FlatButton labelPosition="center" backgroundColor="rgb(51, 105, 30)"
                            labelStyle={{ fontSize: 30, color: "rgba(255, 255, 255, 1)" }}
                            style={styles} label="Login" /></a>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default Home;
