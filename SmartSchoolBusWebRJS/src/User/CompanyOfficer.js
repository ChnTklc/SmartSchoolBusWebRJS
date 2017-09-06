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
import NavigationBar from '../Home/NavigationBar';

let varsAsLanguage = {
    en: {
        id: "TR",
        title: "Company Officer",
        logout: "Logout",
    },
    tr: {
        id: "EN",
        title: "Şirket Çalışanı",
        logout: "Çıkış",
    }
};

var language = varsAsLanguage.en;

const SchoolNames = [
    "İYTE",
    "DEU",
    "EGEÜ",
    "İKÇÜ",
];

const SubListOfSchools = [
    "Route",
    "Students",
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

    languageSetting() {
        if (NavigationBar.prototype.getLanguage() === "EN") {
            language = varsAsLanguage.tr;
        }
        else if (NavigationBar.prototype.getLanguage() === "TR") {
            language = varsAsLanguage.en;
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

    createListWithItems(schoolId, schoolName, itemNames) {
        var itemIds = [];
        for (var i = 0; i < itemNames.length; i++) {
            itemIds[i] = schoolId + itemNames[i];
        }

        return (
            <ListItem
                id={schoolId}
                primaryText={schoolName}
                initiallyOpen={true}
                onClick={() => this.showSchoolInfo(schoolId)}
                nestedItems={[
                    <ListItem id={itemIds[0]} primaryText={itemNames[0]} onClick={() => this.showRoute(itemIds[0])} />,
                    <ListItem id={itemIds[1]} primaryText={itemNames[1]} onClick={() => this.showStudents(itemIds[1])} />,
                    <ListItem id={itemIds[2]} primaryText={itemNames[2]} onClick={() => this.showBuses(itemIds[2])} />,
                    <ListItem id={itemIds[3]} primaryText={itemNames[3]} onClick={() => this.showDrivers(itemIds[3])} />,
                    <ListItem id={itemIds[4]} primaryText={itemNames[4]} onClick={() => this.showHostesses(itemIds[4])} />,
                ]}
            />
        );
    }

    showSchoolInfo(id) {
        return true;
    }

    showStudents(id) {
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

    showRoute(id) {
        return true;
    }

    render() {
        this.languageSetting();
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }} href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{ margin: 0 }} labelStyle={{ fontSize: 18 }} onClick={(e) => this.logoutClick(e)} />}
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
                            {this.createListWithItems("School1", SchoolNames[0], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School2", SchoolNames[1], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School3", SchoolNames[2], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School4", SchoolNames[3], SubListOfSchools)}
                            <Divider />
                        </List>
                    </Drawer>

                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;