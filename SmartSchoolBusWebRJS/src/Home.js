import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import NavigationBar from './NavigationBar';

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
                    <NavigationBar />
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
