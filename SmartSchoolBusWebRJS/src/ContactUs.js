import React, { Component } from 'react';
import { lightGreen900, lightBlue900 } from 'material-ui/styles/colors';
import Contact from 'material-ui/svg-icons/communication/contact-mail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import Address from 'material-ui/svg-icons/maps/place';
import Home from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import Fax from 'material-ui/svg-icons/action/print';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

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
    constructor() {
        super();
        this.state = {
            sent: false,
            name: '',
            email: '',
            message: ''
        }
    }

    handleClick() {
        this.setState({
            sent: true
        });
    }

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
                    <main>
                        <form className="contactform">
                            {this.state.sent ? <div className="sendedmail"><strong>Thank you for your message. We will reply your email soon.</strong></div> :
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
                                    <FlatButton label="Send" backgroundColor="rgba(51, 105, 30, .8)" labelStyle={{ fontSize: 18, color: "rgba(255, 255, 255, 1)" }}
                                        style={{ width: 100, height: 40, marginTop: 30 }} onClick={() => this.handleClick()} />
                                </div>}
                            <div className="contactinfo">
                                <h2>DELTA Smart Technologies</h2>
                                <ul>
                                    <li>
                                        <Email /><strong>E-mail</strong>
                                        <div><a href="mailto:info@DeltaSmart.Tech">info@DeltaSmart.Tech</a></div>
                                    </li>
                                    <br />
                                    <li>
                                        <Phone /><strong>Telephone</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Fax /><strong>Fax</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Address /><strong>Adress</strong>
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
                                        <iframe src="https://www.google.com/maps?q=Gulbahce+Mahallesi+IYTE+Kampusu%0AA8+Binasi+No%3A1%2F37+D%3A18%0AUrla+%2F+Izmir+%2F+Turkey&output=embed&hl=tr&z=14">
                                        </iframe>
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