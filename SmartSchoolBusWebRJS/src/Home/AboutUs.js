import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from './NavigationBar';

class AboutUs extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="homepageoutter">
                    <NavigationBar />
                    <div className="aboutdiv">
                        <div>
                            <h1>DELTA Akıllı Teknolojiler</h1>
                            <p>DELTA Akıllı Teknolojiler A.Ş. TÜBİTAK 1512 - Teknogirişim Sermayesi Desteği Programı
                            ile kurulmuş bir Ar-Ge ve teknoloji şirketidir. İzmir Yüksek Teknoloji Enstitüsü yerleşkesinde
                            yer alan İzmir Teknoloji Geliştirme Bölgesinde faaliyetlerini sürdürmektedir.</p>
                        </div>
                        <div className="altinfo">
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/comment-png-25.png" width={50} height={50} color="black" />
                            <p>Akıllı Olay Yönetim Çözümü <br />
                                daha fazla bilgi için <a href="/contact" className="links">iletişime geçin</a></p>
                            <br />
                            <img alt="" src="https://maxcdn.icons8.com/Share/icon/Business//advertising1600.png" width={50} height={50} color="black" />
                            <p>Akıllı Ürün Toplama Çözümü (Arttırılmış Gerçeklik ile) <br />
                                daha fazla bilgi için <a href="/contact" className="links">iletişime geçin</a></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/parking-icon-png-13.png" width={50} height={50} color="black" />
                            <p>Akıllı Otopark Yönetim Çözümü <br />
                                daha fazla bilgi için <a href="/contact" className="links">iletişime geçin</a></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/school-bus-icon-png-24.png" width={50} height={50} color="black" />
                            <p>Akıllı Öğrenci Servis Çözümü <br /> daha fazla bilgi için <a href="/contact" className="links">iletişime geçin</a></p>
                        </div>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default AboutUs;