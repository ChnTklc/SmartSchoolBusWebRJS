import React, { Component } from 'react';
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

let varsAsLanguage = {
    en: {
        errortext: "You have to fill in all fields!",
        messageResponse: "Thank you for your message. We will reply your email soon.",
        name: "Name*",
        email: "Email*",
        messageText: "Message*",
        sendButton: "Send",
        infoTitle: "DELTA Smart Technologies",
        infoEmailTitle: "E-mail",
        infoPhoneTitle: "Telephone",
        infoFaxTitle: "Fax",
        infoAdressTitle: "Adress",
        infoAdress: "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No: 1 / 37 D: 18 Urla / Izmir / Turkey",
        infoMapSrc: "https://www.google.com/maps?q=Gulbahce+Mahallesi+IYTE+Kampusu%0AA8+Binasi+No%3A1%2F37+D%3A18%0AUrla+%2F+Izmir+%2F+Turkey&output=embed&hl=en&z=14",
    },
    tr: {
        errortext: "Bütün alanları doldurunuz!",
        messageResponse: "Mesajınız için teşekkür ederiz. İletinizi en kısa zamanda cevaplayacağız.",
        name: "İsim*",
        email: "E-posta*",
        messageText: "Mesaj*",
        sendButton: "GÖNDER",
        infoTitle: "DELTA Akıllı Teknolojiler",
        infoEmailTitle: "E-posta",
        infoPhoneTitle: "Telefon",
        infoFaxTitle: "Faks",
        infoAdressTitle: "Adres",
        infoAdress: "Gülbahçe Mahallesi İYTE Kampüsü \nA8 Binası No: 1 / 37 D: 18 \nUrla / İzmir / Türkiye",
        infoMapSrc: "https://www.google.com/maps?q=Gulbahce+Mahallesi+IYTE+Kampusu%0AA8+Binasi+No%3A1%2F37+D%3A18%0AUrla+%2F+Izmir+%2F+Turkey&output=embed&hl=tr&z=14",
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

    handleClick = () => {
        if (this.state.name && this.state.email && this.state.message) {
            this.setState({
                sent: true
            });
        } else {
            this.setState({
                errortext: language.errortext
            });
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <NavigationBar />
                    <main>
                        <form className="contactform">
                            {this.state.sent ? <div className="contactfields"><strong>{language.messageResponse}</strong></div> :
                                <div className="contactfields">
                                    <TextField floatingLabelText={language.name} floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        onChange={(event, value) => this.setState({ name: value })} required />
                                    <br />
                                    <TextField floatingLabelText={language.email} floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        onChange={(event, value) => this.setState({ email: value })} required />
                                    <br />
                                    <TextField floatingLabelText={language.messageText} floatingLabelStyle={styles.floatingLabelStyle}
                                        fullWidth={true} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} multiLine={true} rows={5} rowsMax={9}
                                        onChange={(event, value) => this.setState({ message: value })} required />
                                    <br />
                                    {this.state.errortext ? <div className="errorText">{this.state.errortext}</div> : true}
                                    <FlatButton label={language.sendButton} backgroundColor="rgba(51, 105, 30, .8)" labelStyle={{ fontSize: 17, color: "rgba(255, 255, 255, 1)" }}
                                        style={{ width: 100, height: 40, marginTop: 30 }} onClick={() => this.handleClick()} />
                                </div>}
                            <div className="contactinfo">
                                <h2>{language.infoTitle}</h2>
                                <ul>
                                    <li>
                                        <Email viewBox="0 -9 30 30" /><strong>{language.infoEmailTitle}</strong>
                                        <div><a href="mailto:info@DeltaSmart.Tech">info@DeltaSmart.Tech</a></div>
                                    </li>
                                    <br />
                                    <li>
                                        <Phone viewBox="0 -9 30 30" /><strong>{language.infoPhoneTitle}</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Fax viewBox="0 -9 30 30" /><strong>{language.infoFaxTitle}</strong>
                                        <div>+90-232-5024749</div>
                                    </li>
                                    <br />
                                    <li>
                                        <Address viewBox="0 -9 30 30" /><strong>{language.infoAdressTitle}</strong>
                                        <div>{language.infoAdress}</div>
                                    </li>
                                    <br />
                                    <li>
                                        <iframe title="This is a unique title" src={language.infoMapSrc} />
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