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
import { Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

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

var Students = []

function addStudent(photo, name, surname, classNo, studentNo, parent, homeAdress, service) {
    Students.push({
        photo: photo,
        studentNo: studentNo,
        name: name,
        surname: surname,
        classNo: classNo,
        parent: parent,
        homeAdress: homeAdress,
        service: service,
    });
    return Students;
}
for (var i = 1; i < 26; i++) {
    Students = addStudent("http://studentreasures.com/wp-content/themes/kingpower-v1-08/images/profile_default.jpg",
        "Cihan",
        "Toklucu",
        "4",
        "210201027",
        "Ali Veli",
        "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No:1 / 37 D:18 Urla / Izmir / Turkey",
        "Service1");
}

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
            isDrawerOpen: true
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
        /*fix me*/
        var itemStudents = document.getElementById(id);
        itemStudents.setAttribute('color', 'grey');
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
    /*
    close drawer button

                            <FlatButton label="X" labelStyle={{ fontSize: 15, padding: 0 }} onClick={() => this.handleMenuToggle()}
                                style={{ minWidth: 40, minHeight: 38, width: 40, height: 38, top: "2%", left: "2%", position: "absolute", border: 2, textAlign: "center", bottom: "8%" }} />
    */
    render() {
        this.languageSetting();
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        return (
            <MuiThemeProvider>
                <div style={{ left: "18%", position: "absolute" }}>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }} href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{ margin: 0 }} labelStyle={{ fontSize: 18 }} onClick={(e) => this.logoutClick(e)} />}
                        onLeftIconButtonTouchTap={() => this.handleMenuToggle()} />
                    <Drawer
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
                    <div className="studentTableDiv">
                        <Table
                            height="540"
                            fixedHeader={false}
                            fixedFooter={false}
                            selectable={false}>
                            <TableHeader
                                adjustForCheckbox={false}
                                displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Number">No</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Photo">Photo</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's School Number">Student No</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Name">Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Surname">Surname</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Class">Class</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Parent">Parent</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Adress">Adress</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Student's Service">Service</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={false}
                                stripedRows={true}>
                                {Students.map((row, index) => (
                                    <TableRow key={index + 1} displayBorder={true}>
                                        <TableRowColumn>{index + 1}</TableRowColumn>
                                        <TableRowColumn><img src={row.photo} style={{ width: 25, height: 25 }} /></TableRowColumn>
                                        <TableRowColumn>{row.studentNo}</TableRowColumn>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.surname}</TableRowColumn>
                                        <TableRowColumn>{row.classNo}</TableRowColumn>
                                        <TableRowColumn>{row.parent}</TableRowColumn>
                                        <TableRowColumn>{row.homeAdress}</TableRowColumn>
                                        <TableRowColumn>{row.service}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;