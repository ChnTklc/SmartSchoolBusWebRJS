import React from "react";
import HomeIcon from "material-ui/svg-icons/action/home";
import Info from "material-ui/svg-icons/action/info";
import Contact from "material-ui/svg-icons/communication/contact-mail";
import FlatButton from "material-ui/FlatButton";

let varsAsLanguage = {
    en: {
        id: "TR",
        title: "Smart School Bus",
        home: "Home",
        about: "About Us",
        contact: "Contact Us",
    },
    tr: {
        id: "EN",
        title: "Akıllı Okul Otobüsü",
        home: "Ana Sayfa",
        about: "Hakkımızda",
        contact: "İletişim",
    }
};

let language = varsAsLanguage.tr; // to change all project's language just do "en" to "tr"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languageType: language.id,
        }
    }
    /*fix me: just navigationbar is changing others should do too*/
    setLanguage = (lang, id) => {
        if (lang === "EN") {
            language = varsAsLanguage.en;
        } else {
            language = varsAsLanguage.tr;
        }
        this.setState({
            languageType: language.id,
        })
    };

    static getLanguage = () => {
        return language.id;
    };

    render() {
        return (
            <section role="navigation" className="nav-bar" >
                <div className="slogan">
                    <a href="/" className="sloganlink">
                        <h2><strong>{language.title}</strong></h2>
                    </a>
                </div>
                <div className="linksdiv">
                    <a href="/" className="links"><HomeIcon color="rgb(255,255,255)" viewBox="0 -7 28 28" />{language.home}</a>
                    <a href="/about" className="links"><Info color="rgb(255,255,255)" viewBox="0 -7 28 28" />{language.about}</a>
                    <a href="/contact" className="links"><Contact color="rgb(255,255,255)" viewBox="0 -7 28 28" />{language.contact}</a>
                    <FlatButton id="langBtn" label={this.state.languageType} labelStyle={{ padding: 0, fontSize: 17.5 }}
                        style={{
                            color: "rgba(128, 128, 128, .5)", border: 2,
                            textAlign: "center", minWidth: 40,
                            minHeight: 38, width: 40,
                            height: 38, bottom: "8%"
                        }}
                        onClick={() => this.setLanguage(language.id, "langBtn")} />
                </div>
            </section >
        );
    }
}
export default NavigationBar;