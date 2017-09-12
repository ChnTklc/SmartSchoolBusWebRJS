import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import NavigationBar from '../Home/NavigationBar';
import Login from './Login';


let SelectableList = makeSelectable(List);

let varsAsLanguage = {
    en: {
        id: "TR",
        title: "Company Officer",
        drawerTitle: "Welcome ",
        logout: "Logout",
        route: "Route",
        students: "Students",
        buses: "Buses",
        drivers: "Drivers",
        hostesses: "Hostesses",
    },
    tr: {
        id: "EN",
        title: "Şirket Çalışanı",
        drawerTitle: "Hoşgeldin ",
        logout: "Çıkış",
        route: "Güzergah",
        students: "Öğrenciler",
        buses: "Otobüsler",
        drivers: "Sürücüler",
        hostesses: "Hostesler",
    }
};

var language = varsAsLanguage.en;

function languageSetting() {
    if (NavigationBar.prototype.getLanguage() === "EN") {
        language = varsAsLanguage.tr;
    }
    else if (NavigationBar.prototype.getLanguage() === "TR") {
        language = varsAsLanguage.en;
    }
}

var Students = [];
var drawerListIds = [];

var SchoolNames = [
    "İzmir Yüksek Teknoloji Enstitüsü",
    "Dokuz Eylül Üniversitesi",
    "Ege Üniversitesi",
    "İzmir Katip Çelebi Üniversitesi",
    "İzmir Ekonomi Üniversitesi",
];

/**
 * fix me
 */
var SubListOfSchools = [
    language.route,
    language.students,
    language.buses,
    language.drivers,
    language.hostesses,
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

function fillDrawerListIds() {
    for (var i = 0; i < SchoolNames.length; i++) {
        drawerListIds.push("School" + i);
        for (var k = 0; k < SubListOfSchools.length; k++) {
            drawerListIds.push("School" + i + SubListOfSchools[k]);
        }
    }
    return drawerListIds;
}

drawerListIds = fillDrawerListIds();

/*DUMMY DATA*/
for (var i = 1; i < 15; i++) {
    Students = addStudent("http://studentreasures.com/wp-content/themes/kingpower-v1-08/images/profile_default.jpg",
        "Cihan",
        "Toklucu",
        "4",
        "210201027",
        "Ali Veli",
        "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No:1 / 37 D:18 Urla / Izmir / Turkey",
        "Service1");
}
/*DUMMY DATA*/

class CompanyOfficer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isDrawerOpen: true,
            students: Students,
            selectedIndex: drawerListIds[0],
            isStudentEditDialogOpen: false,
            isStudentInfoDialogOpen: false,
            studentEditIndex: null,
            studentInfoIndex: null,
            sName: '',
            sSurname: '',
            sClassNo: '',
            sStudentNo: '',
            sParent: '',
            sAdress: '',
            sService: '',
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

    createListWithItems(id, schoolName, itemNames) {
        var itemIds = [];
        for (var j = (id * (SubListOfSchools.length + 1)); j < ((id + 1) * (SubListOfSchools.length + 1)); j++) {
            itemIds.push(drawerListIds[j]);
        }

        return (
            <ListItem
                key={itemIds[0]}
                value={itemIds[0]}
                primaryText={schoolName}
                initiallyOpen={true}
                nestedItems={[
                    <ListItem key={itemIds[1]} value={itemIds[1]} primaryText={itemNames[0]} />,
                    <ListItem key={itemIds[2]} value={itemIds[2]} primaryText={itemNames[1]} />,
                    <ListItem key={itemIds[3]} value={itemIds[3]} primaryText={itemNames[2]} />,
                    <ListItem key={itemIds[4]} value={itemIds[4]} primaryText={itemNames[3]} />,
                    <ListItem key={itemIds[5]} value={itemIds[5]} primaryText={itemNames[4]} />,
                ]}
            />
        );
    }

    generateSelectableList(numberOfSchools) {
        var listItems = [];
        for (var i = 0; i < numberOfSchools; i++) {
            listItems.push(this.createListWithItems(i, SchoolNames[i], SubListOfSchools));
        }
        return listItems;
    }

    studentTable() {
        return (
            <Table
                height="540px"
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
                        <TableHeaderColumn tooltip="Student's Parent">Parent</TableHeaderColumn>
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
                            <TableRowColumn><img alt="" src={row.photo} style={{ width: 25, height: 25 }} /></TableRowColumn>
                            <TableRowColumn>{row.studentNo}</TableRowColumn>
                            <TableRowColumn>{row.name}</TableRowColumn>
                            <TableRowColumn>{row.surname}</TableRowColumn>
                            <TableRowColumn>{row.parent}</TableRowColumn>
                            <TableRowColumn>{row.service}</TableRowColumn>
                            <TableRowColumn>
                                <InfoIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)" onClick={() => this.openStudentInfoDialog(index)} />
                                <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)" onClick={() => this.openEditDialog(index)} />
                                <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)" onClick={() => this.deleteStudent(index)} /></TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    resizableTableView() {
        var divstyle;
        if (this.state.isDrawerOpen) {
            divstyle = {
                left: "18%",
                position: "absolute",
            };
        } else {
            divstyle = {
                position: "relative"
            };
        }
        return (
            <div className="studentTableDiv" style={divstyle} >
                {this.studentTable()}
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

    /* Functions about dialog sections */

    attachStudentItemsToState(index) {
        var stdlist = this.state.students;
        var std = stdlist[index];
        this.setState({
            sStudentNo: std.studentNo,
            sName: std.name,
            sSurname: std.surname,
            sClassNo: std.classNo,
            sParent: std.parent,
            sAdress: std.homeAdress,
            sService: std.service,
        });
    }

    openEditDialog(index) {
        this.setState({
            studentEditIndex: index
        });
        this.setState({
            isStudentEditDialogOpen: true
        });
        this.attachStudentItemsToState(index);
    }

    closeEditDialog() {
        this.setState({
            isStudentEditDialogOpen: false
        });
    }

    openStudentInfoDialog(index) {
        this.setState({
            studentInfoIndex: index
        });
        this.setState({
            isStudentInfoDialogOpen: true
        });
        this.attachStudentItemsToState(index);
    }

    closeStudentInfoDialog() {
        this.setState({
            isStudentInfoDialogOpen: false
        });
    }

    showStudentInfoDetail(index) {
        var self = this;
        var stdlist = this.state.students;
        var std = stdlist[index];

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => self.closeStudentInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Student Information Details"
                actions={actions}
                modal={false}
                open={self.state.isStudentInfoDialogOpen}
                onRequestClose={() => self.closeStudentInfoDialog()}
                autoScrollBodyContent={true} >

                <p style={{ fontSize: 20 }}>
                    {<div style={{ textAlign: "center" }}> <img alt="" src={std.photo} style={{ width: 100, height: 100 }} /> </div>} <br />
                    <strong>Name:</strong> {self.state.sName} <br />
                    <strong>Surname:</strong> {self.state.sSurname} <br />
                    <strong>Class Number:</strong> {self.state.sClassNo} <br />
                    <strong>Student Number:</strong> {self.state.sStudentNo} <br />
                    <strong>Parent Name:</strong> {self.state.sParent} <br />
                    <strong>Adress:</strong> {self.state.sAdress} <br />
                    <strong>Service:</strong> {self.state.sService}
                </p>
            </Dialog>
        );
    }

    updateStudentsList() { // student update request will be send from here to server.
        var self = this;
        var index = self.state.studentEditIndex;
        var stdlist = self.state.students;
        var elem = {
            photo: stdlist[index].photo,
            studentNo: self.state.sStudentNo,
            name: self.state.sName,
            surname: self.state.sSurname,
            classNo: self.state.sClassNo,
            parent: self.state.sParent,
            homeAdress: self.state.sAdress,
            service: self.state.sService,
        }
        stdlist[index] = elem;
        self.setState({
            students: stdlist
        });
    }

    editStudentInfo(index) {
        var self = this;

        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => self.updateStudentsList()}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => self.closeEditDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Edit Student"
                actions={actions}
                modal={false}
                open={self.state.isStudentEditDialogOpen}
                onRequestClose={() => self.closeEditDialog()}
                autoScrollBodyContent={true} >

                <TextField required defaultValue={self.state.sName} floatingLabelText="Name" onChange={(event, value) => self.setState({ sName: value })} /> <br />
                <TextField required defaultValue={self.state.sSurname} floatingLabelText="Surname" onChange={(event, value) => self.setState({ sSurname: value })} /> <br />
                <TextField required defaultValue={self.state.sClassNo} floatingLabelText="Class Number" onChange={(event, value) => self.setState({ sClassNo: value })} /> <br />
                <TextField required defaultValue={self.state.sStudentNo} floatingLabelText="Student Number" onChange={(event, value) => self.setState({ sStudentNo: value })} /> <br />
                <TextField required defaultValue={self.state.sParent} floatingLabelText="Parent" onChange={(event, value) => self.setState({ sParent: value })} /> <br />
                <TextField required fullWidth={true} multiLine={true}
                    defaultValue={self.state.sAdress} floatingLabelText="Adress" onChange={(event, value) => self.setState({ sAdress: value })} /> <br />
                <TextField required defaultValue={self.state.sService} floatingLabelText="Service" onChange={(event, value) => self.setState({ sService: value })} /> <br />
            </Dialog>
        );
    }

    /* Functions about dialog sections */

    isItem(item) {
        return (this.state.selectedIndex === item);
    }

    render() {
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        var self = this;
        languageSetting();
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }} href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{ margin: 0 }} labelStyle={{ fontSize: 18 }} onClick={(e) => self.logoutClick(e)} />}
                        onLeftIconButtonTouchTap={() => self.handleMenuToggle()} />
                    <Drawer
                        width={250}
                        open={self.state.isDrawerOpen}
                        onRequestChange={(open) => self.setState({ isDrawerOpen: open })}>
                        <AppBar
                            className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                            title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white", fontSize: 18 }}
                                href="/companyofficer"> {language.drawerTitle}{Login.prototype.getLoggedinPhone()} </a>}
                            onLeftIconButtonTouchTap={() => self.handleMenuToggle()} />
                        <div style={{ textAlign: "center" }}>
                            <img alt="" src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png"
                                style={{ width: 60, height: 60, marginTop: 10 }} />
                        </div>
                        <SelectableList
                            value={self.state.selectedIndex}
                            onChange={(e, value) => self.handleSelectMenuItem(e, value)} >
                            {this.generateSelectableList(SchoolNames.length)}
                        </SelectableList>
                    </Drawer>
                    {this.isItem(drawerListIds[0]) ?
                        <div>

                        </div>
                        :
                        <div>
                            {this.isItem(drawerListIds[1]) ?
                                <div>

                                </div>
                                :
                                <div>
                                    {this.isItem(drawerListIds[2]) ?
                                        <div>
                                            {self.resizableTableView()}
                                            {self.state.isStudentEditDialogOpen ? self.editStudentInfo(self.state.studentEditIndex) : false}
                                            {self.state.isStudentInfoDialogOpen ? self.showStudentInfoDetail(self.state.studentInfoIndex) : false}
                                        </div>
                                        : false
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;