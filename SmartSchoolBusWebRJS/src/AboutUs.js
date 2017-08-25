import React, { Component } from 'react';
import Contact from 'material-ui/svg-icons/communication/contact-mail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import { Link } from 'react-router-dom';

class AboutUs extends Component {
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
                                daha fazla bilgi için <Link to="/contact" className="links">iletişime geçin</Link></p>
                            <br />
                            <img alt="" src="https://maxcdn.icons8.com/Share/icon/Business//advertising1600.png" width={50} height={50} color="black" />
                            <p>Akıllı Ürün Toplama Çözümü (Arttırılmış Gerçeklik ile) <br />
                                daha fazla bilgi için <Link to="/contact" className="links">iletişime geçin</Link></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/parking-icon-png-13.png" width={50} height={50} color="black" />
                            <p>Akıllı Otopark Yönetim Çözümü <br />
                                daha fazla bilgi için <Link to="/contact" className="links">iletişime geçin</Link></p>
                            <br />
                            <img alt="" src="http://www.freeiconspng.com/uploads/school-bus-icon-png-24.png" width={50} height={50} color="black" />
                            <p>Akıllı Öğrenci Servis Çözümü <br /> daha fazla bilgi için <Link to="/contact" className="links">iletişime geçin</Link></p>
                        </div>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default AboutUs;