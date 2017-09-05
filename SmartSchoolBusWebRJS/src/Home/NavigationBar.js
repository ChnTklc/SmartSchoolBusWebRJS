import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import Contact from 'material-ui/svg-icons/communication/contact-mail';
import FlatButton from 'material-ui/FlatButton';

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

let language = varsAsLanguage.en;

class NavigationBar extends React.Component {
    setLanguage(lang) {
        if (lang === "EN") {
            language = varsAsLanguage.en;
        } else if (lang === "TR") {
            language = varsAsLanguage.tr;
        }
    }

    getLanguage() {
        return language.id;
    }
    /* Fix language button
     */
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
                    <FlatButton labelStyle={{ padding: 0, fontSize: 17.5, color: "white" }}
                        style={{ border: 2, textAlign: "center", minWidth: 40, minHeight: 38, width: 40, height: 38, bottom: "8%" }}
                        onClick={() => this.setLanguage(language.id)} label={language.id} />
                </div>
            </section >
        );
    }
}
export default NavigationBar;