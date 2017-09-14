import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from './NavigationBar';
import Park from '../assets/ParkingIcon.png';
import Comment from '../assets/CommentIcon.png';
import SchoolBus from '../assets/SchoolBusIcon.png';

let varsAsLanguage = {
    en: {
        title: "DELTA Smart Technologies",
        information: "DELTA Smart Technologies is an R & D and technology company established with TUBITAK (The Scientific and Technological Research Council of Turkey)\
                    1512 Techno- Initiative Capital Support Program.\
                    The company located in Izmir Technology Development Zone in Izmir Institute of Technology.",
        infoPTitle1: "Smart Incident Management Solution",
        infoPTitle2: "Smart Car Park Management Solution",
        infoPTitle3: "Smart School Bus Solution for students",
        forMoreInfo: "for more information",
        contact: " contact us",
    },
    tr: {
        title: "DELTA Akıllı Teknolojiler",
        information: "DELTA Akıllı Teknolojiler A.Ş. TÜBİTAK 1512 - Teknogirişim Sermayesi Desteği Programı\
                    ile kurulmuş bir Ar- Ge ve teknoloji şirketidir. İzmir Yüksek Teknoloji Enstitüsü yerleşkesinde\
                    yer alan İzmir Teknoloji Geliştirme Bölgesinde faaliyetlerini sürdürmektedir.",
        infoPTitle1: "Akıllı Olay Yönetim Çözümü",
        infoPTitle2: "Akıllı Otopark Yönetim Çözümü",
        infoPTitle3: "Akıllı Öğrenci Servis Çözümü",
        forMoreInfo: "daha fazla bilgi için ",
        contact: " iletişime geçin",
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

class AboutUs extends Component {
    render() {
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
                            <img alt="" src={Comment} width={50} height={50} color="black" />
                            <p>{language.infoPTitle1}<br />
                                {language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                            <br />
                            <img alt="" src={Park} width={50} height={50} color="black" />
                            <p>{language.infoPTitle2}<br />
                                {language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                        </div>
                            <br />
                            <img alt="" src={SchoolBus} width={50} height={50} color="black" />
                            <p>{language.infoPTitle3}<br />{language.forMoreInfo}<a href="/contact" className="links">{language.contact}</a></p>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default AboutUs;