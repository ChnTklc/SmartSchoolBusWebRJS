import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Info from 'material-ui/svg-icons/action/info';
import Contact from 'material-ui/svg-icons/communication/contact-mail';

class NavigationBar extends React.Component {
    render() {
        return (
            <section role="navigation" className="nav-bar" >
                <div className="slogan">
                    <a href="/" className="sloganlink">
                        <h2><strong>Smart School Bus</strong></h2>
                    </a>
                </div>
                <div className="linksdiv">
                    <a href="/" className="links"><HomeIcon color="rgb(255,255,255)" viewBox="0 -7 28 28" />Home</a>
                    <a href="/about" className="links"><Info color="rgb(255,255,255)" viewBox="0 -7 28 28" />About Us</a>
                    <a href="/contact" className="links"><Contact color="rgb(255,255,255)" viewBox="0 -7 28 28" />Contact Us</a>
                </div>
            </section >
        );
    }
}
export default NavigationBar;