﻿import React, { Component } from 'react';
import { lightGreen900, lightBlue900 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import Address from 'material-ui/svg-icons/maps/place';
import Fax from 'material-ui/svg-icons/action/print';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import NavigationBar from './NavigationBar';

const styles = {
    floatingLabelStyle: {
        color: lightGreen900,
        fontSize: 18,
    },
    floatingLabelFocusStyle: {
        color: lightBlue900,
        fontSize: 18,
    },
};

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            name: '',
            email: '',
            message: '',
            errortext: '',
        }
    }

    handleClick() {
        var self = this;
        if (self.state.name && self.state.email && self.state.message) {
            self.setState({
                sent: true
            });
        } else {
            self.setState({
                errortext: 'You have to fill in all fields!'
            });
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <NavigationBar />
                    <main>
                        <form className="contactform">
                            {this.state.sent ? <div className="contactfields"><strong>Thank you for your message. We will reply your email soon.</strong></div> :
                                <div className="contactfields">
                                    <TextField floatingLabelText="Name*" floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        onChange={(event, value) => this.setState({ name: value })} required />
                                    <br />
                                    <TextField floatingLabelText="Email*" floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        onChange={(event, value) => this.setState({ email: value })} required />
                                    <br />
                                    <TextField floatingLabelText="Message*" floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} multiLine={true} rows={5} rowsMax={9}
                                        onChange={(event, value) => this.setState({ message: value })} required />
                                    <br />
                                    {this.state.errortext ? <div className="errorText">{this.state.errortext}</div> : true}
                                    <FlatButton label="Send" backgroundColor="rgba(51, 105, 30, .8)" labelStyle={{ fontSize: 18, color: "rgba(255, 255, 255, 1)" }}
                                        style={{ width: 100, height: 40, marginTop: 30 }} onClick={() => this.handleClick()} />
                                </div>}
                            <div className="contactinfo">
                                <h2>DELTA Smart Technologies</h2>
                                <ul>
                                    <li>
                                        <Email viewBox="0 -9 30 30" /><strong>E-mail</strong>
                                        <div><a href="mailto:info@DeltaSmart.Tech">info@DeltaSmart.Tech</a></div>
                                    </li>
                                    <br />
                                    <li>
                                        <Phone viewBox="0 -9 30 30" /><strong>Telephone</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Fax viewBox="0 -9 30 30" /><strong>Fax</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Address viewBox="0 -9 30 30" /><strong>Adress</strong>
                                        <div>
                                            Gulbahce Mahallesi IYTE Kampusu
                                            <br />
                                            A8 Binasi No:1/37 D:18
                                            <br />
                                            Urla / Izmir / Turkey
                                        </div>
                                    </li>
                                    <br />
                                    <li>
                                        <iframe title="This is a unique title"
                                            src="https://www.google.com/maps?q=Gulbahce+Mahallesi+IYTE+Kampusu%0AA8+Binasi+No%3A1%2F37+D%3A18%0AUrla+%2F+Izmir+%2F+Turkey&output=embed&hl=tr&z=14" />
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </main>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default ContactUs;