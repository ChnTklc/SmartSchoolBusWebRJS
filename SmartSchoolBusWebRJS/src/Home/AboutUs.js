import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from './NavigationBar';

let varsAsLanguage = {
    en: {
        title: "DELTA Smart Technologies",
        information: "DELTA Smart Technologies is an R & D and technology company established with TUBITAK 1512 Techno-Initiative Capital Support Program.\
                    The company located in Izmir Technology Development Zone in Izmir Institute of Technology.",
        infoPTitle1: "Intelligent Event Management Solution",
        infoPTitle2: "Smart Product Collection Solution (with Increased Reality)",
        infoPTitle3: "Smart Parking Management Solution",
        infoPTitle4: "Smart Student Service Solution",
        forMoreInfo: "for more information",
        contact: " contact us",
    },
    tr: {
        title: "DELTA Akıllı Teknolojiler",
        information: "DELTA Akıllı Teknolojiler A.Ş. TÜBİTAK 1512 - Teknogirişim Sermayesi Desteği Programı\
                    ile kurulmuş bir Ar- Ge ve teknoloji şirketidir. İzmir Yüksek Teknoloji Enstitüsü yerleşkesinde\
                    yer alan İzmir Teknoloji Geliştirme Bölgesinde faaliyetlerini sürdürmektedir.",
        infoPTitle1: "Akıllı Olay Yönetim Çözümü",
        infoPTitle2: "Akıllı Ürün Toplama Çözümü (Arttırılmış Gerçeklik ile)",
        infoPTitle3: "Akıllı Otopark Yönetim Çözümü",
        infoPTitle4: "Akıllı Öğrenci Servis Çözümü",
        forMoreInfo: "daha fazla bilgi için ",
        contact: " iletişime geçin",
    }
};

let language = varsAsLanguage.tr;

class AboutUs extends Component {
    languageSetting() {
        if (NavigationBar.prototype.getLanguage() === "EN") {
            language = varsAsLanguage.tr;
        }
        else if (NavigationBar.prototype.getLanguage() === "TR") {
            language = varsAsLanguage.en;
        }
    }

    render() {
        this.languageSetting();
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <NavigationBar />
                    <div className="aboutdiv">
                        <div>
                            <h1>{language.title}</h1>
                            <p>{language.information}</p>
                        </div>
                        <div className="altinfo">
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/comment-png-25.png" width={50} height={50} color="black" />
                            <p>{language.infoPTitle1}<br />
                                {language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                            <br />
                            <img alt="" src="https://maxcdn.icons8.com/Share/icon/Business//advertising1600.png" width={50} height={50} color="black" />
                            <p>{language.infoPTitle2}<br />
                                {language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/parking-icon-png-13.png" width={50} height={50} color="black" />
                            <p>{language.infoPTitle3}<br />
                                {language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/school-bus-icon-png-24.png" width={50} height={50} color="black" />
                            <p>{language.infoPTitle4}<br />{language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                        </div>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default AboutUs;