import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { List, ListItem } from 'material-ui/List';
import Login from './Login';

const SchoolNames = [
    "İYTE",
    "DEU",
    "EGEÜ",
    "İKÇÜ",
];

const SubListOfSchools = [
    "Company Officers",
    "Buses",
    "Drivers",
    "Hostesses",
];

class CompanyOfficer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isDrawerOpen: false
        }
    }

    handleMenuToggle() {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    };

    handleClose() {
        this.setState({ isDrawerOpen: false });
    }

    logoutClick() {
        var self = this;
        self.setState({ isLogin: false });
        localStorage.setItem('isLoggedInCompanyOfficer', false);
    }

    showshowCompanyOfficers(id) {
        return true;
    }

    showBuses(id) {
        return true;
    }

    showDrivers(id) {
        return true;
    }

    showHostesses(id) {
        return true;
    }

    render() {
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }} href="/companyofficer">Company Officer</a>}
                        iconElementRight={<Button label="Logout" style={{ margin: 0 }} labelStyle={{ fontSize: 18 }} onClick={(e) => this.logoutClick(e)} />}
                        onLeftIconButtonTouchTap={() => this.handleMenuToggle()} />
                    <Drawer
                        docked={false}
                        width={250}
                        open={this.state.isDrawerOpen}
                        onRequestChange={(open) => this.setState({ isDrawerOpen: open })}>
                        <div style={{ textAlign: "center" }}>
                            <img src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png"
                                style={{ width: 60, height: 60, marginTop: 10 }} />
                            <br /> <br />
                            <strong>Welcome {Login.prototype.getLoggedinPhone()}</strong>
                        </div>
                        <List>
                            <ListItem
                                id="School1"
                                primaryText={SchoolNames[0]}
                                initiallyOpen={true}
                                nestedItems={[
                                    <ListItem primaryText={SubListOfSchools[0]} onClick={() => this.showCompanyOfficers('School1')} />,
                                    <ListItem primaryText={SubListOfSchools[1]} onClick={() => this.showBuses('School1')} />,
                                    <ListItem primaryText={SubListOfSchools[2]} onClick={() => this.showDrivers('School1')} />,
                                    <ListItem primaryText={SubListOfSchools[3]} onClick={() => this.showHostesses('School1')} />
                                ]}
                            />
                            <Divider />
                            <ListItem
                                id="School2"
                                primaryText={SchoolNames[1]}
                                initiallyOpen={true}
                                nestedItems={[
                                    <ListItem primaryText={SubListOfSchools[0]} onClick={() => this.showCompanyOfficers('School2')} />,
                                    <ListItem primaryText={SubListOfSchools[1]} onClick={() => this.showBuses('School2')} />,
                                    <ListItem primaryText={SubListOfSchools[2]} onClick={() => this.showDrivers('School2')} />,
                                    <ListItem primaryText={SubListOfSchools[3]} onClick={() => this.showHostesses('School2')} />
                                ]}
                            />
                            <Divider />
                            <ListItem
                                id="School3"
                                primaryText={SchoolNames[2]}
                                initiallyOpen={true}
                                nestedItems={[
                                    <ListItem primaryText={SubListOfSchools[0]} onClick={() => this.showCompanyOfficers('School3')} />,
                                    <ListItem primaryText={SubListOfSchools[1]} onClick={() => this.showBuses('School3')} />,
                                    <ListItem primaryText={SubListOfSchools[2]} onClick={() => this.showDrivers('School3')} />,
                                    <ListItem primaryText={SubListOfSchools[3]} onClick={() => this.showHostesses('School3')} />
                                ]}
                            />
                            <Divider />
                            <ListItem
                                id="School4"
                                primaryText={SchoolNames[3]}
                                initiallyOpen={true}
                                nestedItems={[
                                    <ListItem primaryText={SubListOfSchools[0]} onClick={() => this.showCompanyOfficers('School4')} />,
                                    <ListItem primaryText={SubListOfSchools[1]} onClick={() => this.showBuses('School4')} />,
                                    <ListItem primaryText={SubListOfSchools[2]} onClick={() => this.showDrivers('School4')} />,
                                    <ListItem primaryText={SubListOfSchools[3]} onClick={() => this.showHostesses('School4')} />
                                ]}
                            />
                            <Divider />
                        </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;