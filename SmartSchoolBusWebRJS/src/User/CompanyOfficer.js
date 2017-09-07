import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Login from './Login';
import NavigationBar from '../Home/NavigationBar';
import { Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

let SelectableList = makeSelectable(List);

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

/*DUMM DATA*/
for (var i = 1; i < 10; i++) {
    Students = addStudent("http://studentreasures.com/wp-content/themes/kingpower-v1-08/images/profile_default.jpg",
        "Cihan",
        "Toklucu",
        "4",
        "210201027",
        "Ali Veli",
        "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No:1 / 37 D:18 Urla / Izmir / Turkey",
        "Service1");
}
/*DUMM DATA*/

class CompanyOfficer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isDrawerOpen: true,
            students: Students,
            selectedIndex: null,
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

    handleSelectMenuItem(event, index) {
        this.setState({
            selectedIndex: index,
        });
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
                value={schoolId}
                id={schoolId}
                primaryText={schoolName}
                initiallyOpen={true}
                onClick={(e) => this.showSchoolInfo(e, schoolId)}
                nestedItems={[
                    <ListItem value={itemIds[0]} id={itemIds[0]} primaryText={itemNames[0]} onClick={(e) => this.showRoute(e, itemIds[0])} />,
                    <ListItem value={itemIds[1]} id={itemIds[1]} primaryText={itemNames[1]} onClick={(e) => this.showStudents(e, itemIds[1])} />,
                    <ListItem value={itemIds[2]} id={itemIds[2]} primaryText={itemNames[2]} onClick={(e) => this.showBuses(e, itemIds[2])} />,
                    <ListItem value={itemIds[3]} id={itemIds[3]} primaryText={itemNames[3]} onClick={(e) => this.showDrivers(e, itemIds[3])} />,
                    <ListItem value={itemIds[4]} id={itemIds[4]} primaryText={itemNames[4]} onClick={(e) => this.showHostesses(e, itemIds[4])} />,
                ]}
            />
        );
    }

    studentList() {
        var divstyle;
        if (this.state.isDrawerOpen) {
            divstyle = {
                left: "18%",
                position: "absolute"
            };
        } else {
            divstyle = {
                position: "relative"
            };
        }
        return (
            <div className="studentTableDiv" style={divstyle} >
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
                            <TableHeaderColumn tooltip="Settings">Settings</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                        stripedRows={true}>
                        {this.state.students.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn><img src={row.photo} style={{ width: 25, height: 25 }} /></TableRowColumn>
                                <TableRowColumn>{row.studentNo}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.surname}</TableRowColumn>
                                <TableRowColumn>{row.classNo}</TableRowColumn>
                                <TableRowColumn>{row.parent}</TableRowColumn>
                                <TableRowColumn style={{ width: 100 }}>{row.homeAdress}</TableRowColumn>
                                <TableRowColumn>{row.service}</TableRowColumn>
                                <TableRowColumn>
                                    <DeleteIcon hoverColor="rgba(128, 128, 128, .8)" onClick={() => this.deleteStudent(index)} />
                                    <EditIcon hoverColor="rgba(128, 128, 128, .8)" onClick={() => this.editStudentInfo(index)} /></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    deleteStudent(index) {
        if (index !== -1) {
            Students.splice(index, 1);
            this.setState({ students: Students });
        }
        else {
            alert("error!");
        }
    }

    editStudentInfo(index) {
        var self = this;
    }

    showSchoolInfo(e, id) {
    }

    showStudents(e, id) {
        e.preventDefault();
    }

    showBuses(e) {
    }

    showDrivers(e) {
    }

    showHostesses(e) {
    }

    showRoute(e) {
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
                        width={250}
                        open={this.state.isDrawerOpen}
                        onRequestChange={(open) => this.setState({ isDrawerOpen: open })}>
                        <AppBar
                            className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                            title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white", fontSize: 18 }} href="/companyofficer">{language.title}</a>}
                            onLeftIconButtonTouchTap={() => this.handleMenuToggle()} />
                        <div style={{ textAlign: "center" }}>
                            <img src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png"
                                style={{ width: 60, height: 60, marginTop: 10 }} />
                            <br /> <br />
                            <strong>Welcome {Login.prototype.getLoggedinPhone()}</strong>
                        </div>
                        <SelectableList
                            value={this.state.selectedIndex}
                            onChange={(e, value) => this.handleSelectMenuItem(e, value)} >
                            {this.createListWithItems("School1", SchoolNames[0], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School2", SchoolNames[1], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School3", SchoolNames[2], SubListOfSchools)}
                            <Divider />
                            {this.createListWithItems("School4", SchoolNames[3], SubListOfSchools)}
                            <Divider />
                        </SelectableList>
                    </Drawer>
                    {this.studentList()}
                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;