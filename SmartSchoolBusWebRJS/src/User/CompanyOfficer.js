import React from 'react';
import { Redirect } from 'react-router-dom';
import { Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import NavigationBar from '../Home/NavigationBar';
var Student = require('../Objects/Student').Student;

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

let language = varsAsLanguage.en;

function languageSetting() {
    if (NavigationBar.prototype.getLanguage() === "EN") {
        language = varsAsLanguage.tr;
    }
    else if (NavigationBar.prototype.getLanguage() === "TR") {
        language = varsAsLanguage.en;
    }
}

var Students = [Student];
let drawerListIds = [];

let SchoolNames = [
    "İzmir Yüksek Teknoloji Enstitüsü",
    "Dokuz Eylül Üniversitesi",
    "Ege Üniversitesi",
    "İzmir Katip Çelebi Üniversitesi",
    "İzmir Ekonomi Üniversitesi",
];

/**
 * fix me
 */
let SubListOfSchools = [
    language.route,
    language.students,
    language.buses,
    language.drivers,
    language.hostesses,
];

function addStudent(photo, name, surname, classNo, studentNo, parentName, parentSurname, homeAdress, morningBusId, nightBusId) {
    let stdObj = Student;
    stdObj.user.photo.contents = photo; // patlıyor bir sorun var bul.
    stdObj.user.name = name;
    stdObj.user.surname = surname;
    stdObj.class = classNo;
    stdObj.studentNo = studentNo;
    stdObj.parents.push({ user: { name: parentName, surname: parentSurname } });
    stdObj.adress.push({ location: { adress: homeAdress }, name: "Home" });
    stdObj.serviceRoute.getOn.id = morningBusId; // fix me: iki id'ye de aynı değeri atıyor object tpye'ları aynı diye olabilir. nedeni bilinmiyor.
    stdObj.serviceRoute.getOff.id = nightBusId; // fix me: iki id'ye de aynı değeri atıyor object tpye'ları aynı diye olabilir. nedeni bilinmiyor.
    Students.push(stdObj);
    return Students;
}

function fillDrawerListIds() {
    for (let i = 0; i < SchoolNames.length; i++) {
        drawerListIds.push("School" + i);
        for (let k = 0; k < SubListOfSchools.length; k++) {
            drawerListIds.push("School" + i + "." + k);
        }
    }
    return drawerListIds;
}

drawerListIds = fillDrawerListIds();

function getStudents(){
    /*DUMMY DATA*/
    for (let i = 1; i < 15; i++) {
        Students = addStudent("http://studentreasures.com/wp-content/themes/kingpower-v1-08/images/profile_default.jpg",
            "Cihan ",
            "Toklucu",
            "4",
            "210201027",
            "Ali ",
            "Veli",
            "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No:1 / 37 D:18 Urla / Izmir / Turkey",
            1, 2);
    }
    /*DUMMY DATA*/
}

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

    handleSelectMenuItem = (event, index) => {
        this.setState({
            selectedIndex: index,
        });
    };

    openDrawerMenu = () => {
        this.setState({ isDrawerOpen: true });
    };

    closeDrawerMenu = () => {
        this.setState({ isDrawerOpen: false });
    };

    logoutClick = () => {
        this.setState({ isLogin: false });
        localStorage.setItem('isLoggedInCompanyOfficer', false);
    };

    createListWithItems = (id, schoolName, itemNames) => {
        let itemIds = [];
        for (let j = (id * (SubListOfSchools.length + 1)); j < ((id + 1) * (SubListOfSchools.length + 1)); j++) {
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
    };

    generateSelectableList = (numberOfSchools) => {
        let listItems = [];
        for (let i = 0; i < numberOfSchools; i++) {
            listItems.push(this.createListWithItems(i, SchoolNames[i], SubListOfSchools));
        }
        return listItems;
    };

    studentTable = () => {
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
                        <TableHeaderColumn tooltip="Student's Regular Service">Route Morning/Night</TableHeaderColumn>
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
                            <TableRowColumn><img alt="" src={row.user.photo.contents} style={{ width: 25, height: 25 }} /></TableRowColumn>
                            <TableRowColumn>{row.studentNo}</TableRowColumn>
                            <TableRowColumn>{row.user.name}</TableRowColumn>
                            <TableRowColumn>{row.user.surname}</TableRowColumn>
                            <TableRowColumn>{row.parents[0].user.name}{row.parents[0].user.surname}</TableRowColumn>
                            <TableRowColumn>{row.serviceRoute.getOn.id}/{row.serviceRoute.getOff.id}</TableRowColumn>
                            <TableRowColumn>
                                <InfoIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)" onClick={() => this.openStudentInfoDialog(index)} />
                                <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)" onClick={() => this.openEditDialog(index)} />
                                <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)" onClick={() => this.deleteStudent(index)} /></TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    routeTable = () => {
        return (
            <Table
                height="540px"
                fixedHeader={false}
                fixedFooter={false}
                selectable={false}>
            </Table>
        );
    };

    busesTable = () => {
        return (
            <Table
                height="540px"
                fixedHeader={false}
                fixedFooter={false}
                selectable={false}>
            </Table>
        );
    };

    driversTable = () => {
        return (
            <Table
                height="540px"
                fixedHeader={false}
                fixedFooter={false}
                selectable={false}>
            </Table>
        );
    };

    hostessesTable = () => {
        return (
            <Table
                height="540px"
                fixedHeader={false}
                fixedFooter={false}
                selectable={false}>
            </Table>
        );
    };

    resizableTableView = (num) => {
        let divstyle;

        let tableType;
        if (num === 1) {
            tableType = this.routeTable();
        } else if (num === 2) {
            tableType = this.studentTable();
        } else if (num === 3) {
            tableType = this.busesTable();
        } else if (num === 4) {
            tableType = this.driversTable();
        } else if (num === 5) {
            tableType = this.hostessesTable();
        }

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
                {tableType}
            </div>
        );
    };

    /* Functions about dialog sections */

    attachStudentItemsToState = (index) => {
        let stdlist = this.state.students;
        let std = stdlist[index];
        this.setState({
            sStudentNo: std.studentNo,
            sName: std.user.name,
            sSurname: std.user.surname,
            sClassNo: std.class,
            sParent: std.parents[0].user.name + std.parents[0].user.surname,
            sAdress: std.adress[0].location.adress,
            sService: std.service,
        });
    };

    openEditDialog = (index) => {
        this.setState({
            studentEditIndex: index
        });
        this.setState({
            isStudentEditDialogOpen: true
        });
        this.attachStudentItemsToState(index);
    };

    closeEditDialog = () => {
        this.setState({
            isStudentEditDialogOpen: false
        });
    };

    openStudentInfoDialog = (index) => {
        this.setState({
            studentInfoIndex: index
        });
        this.setState({
            isStudentInfoDialogOpen: true
        });
        this.attachStudentItemsToState(index);
    };

    closeStudentInfoDialog = () => {
        this.setState({
            isStudentInfoDialogOpen: false
        });
    };

    showStudentInfoDetail = (index) => {
        let stdlist = this.state.students;
        let std = stdlist[index];

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeStudentInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Student Information Details"
                actions={actions}
                modal={false}
                open={this.state.isStudentInfoDialogOpen}
                onRequestClose={() => this.closeStudentInfoDialog()}
                autoScrollBodyContent={true} >

                <p style={{ fontSize: 20 }}>
                    {<div style={{ textAlign: "center" }}> <img alt="" src={std.user.photo.contents} style={{ width: 100, height: 100 }} /> </div>} <br />
                    <strong>Name:</strong> {this.state.sName} <br />
                    <strong>Surname:</strong> {this.state.sSurname} <br />
                    <strong>Class Number:</strong> {this.state.sClassNo} <br />
                    <strong>Student Number:</strong> {this.state.sStudentNo} <br />
                    <strong>Parent Name:</strong> {this.state.sParent} <br />
                    <strong>Adress:</strong> {this.state.sAdress} <br />
                    <strong>Service:</strong> {this.state.sService}
                </p>
            </Dialog>
        );
    };

    deleteStudent = (index) => { // Student delete request will be send from here.
        if (index !== -1) {
            Students.splice(index, 1);
            this.setState({ students: Students });
        }
        else {
            alert("error!");
        }
    };

    updateStudentsList = () => { // student update request will be send from here to server.
        let index = this.state.studentEditIndex;
        let stdlist = this.state.students;
        stdlist[index] = {
            photo: stdlist[index].photo,
            studentNo: this.state.sStudentNo,
            name: this.state.sName,
            surname: this.state.sSurname,
            classNo: this.state.sClassNo,
            parent: this.state.sParent,
            homeAdress: this.state.sAdress,
            service: this.state.sService,
        };
        this.setState({
            students: stdlist
        });
    };

    editStudentInfo = (index) => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.updateStudentsList()}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeEditDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Edit Student"
                actions={actions}
                modal={false}
                open={this.state.isStudentEditDialogOpen}
                onRequestClose={() => this.closeEditDialog()}
                autoScrollBodyContent={true} >

                <TextField required defaultValue={this.state.sName} floatingLabelText="Name" onChange={(event, value) => this.setState({ sName: value })} /> <br />
                <TextField required defaultValue={this.state.sSurname} floatingLabelText="Surname" onChange={(event, value) => this.setState({ sSurname: value })} /> <br />
                <TextField required defaultValue={this.state.sClassNo} floatingLabelText="Class Number" onChange={(event, value) => this.setState({ sClassNo: value })} /> <br />
                <TextField required defaultValue={this.state.sStudentNo} floatingLabelText="Student Number" onChange={(event, value) => this.setState({ sStudentNo: value })} /> <br />
                <TextField required defaultValue={this.state.sParent} floatingLabelText="Parent" onChange={(event, value) => this.setState({ sParent: value })} /> <br />
                <TextField required fullWidth={true} multiLine={true}
                    defaultValue={this.state.sAdress} floatingLabelText="Adress" onChange={(event, value) => this.setState({ sAdress: value })} /> <br />
                <TextField required defaultValue={this.state.sService} floatingLabelText="Service" onChange={(event, value) => this.setState({ sService: value })} /> <br />
            </Dialog>
        );
    };

    /* Functions about dialog sections */

    isItem = (item) => {
        return (this.state.selectedIndex === item);
    };

    render = () => {
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        languageSetting();
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }} href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{ margin: 0 }} labelStyle={{ fontSize: 18 }} onClick={(e) => this.logoutClick(e)} />}
                        onLeftIconButtonTouchTap={() => this.openDrawerMenu()} />
                    <Drawer
                        width={250}
                        open={this.state.isDrawerOpen}
                        onRequestChange={(open) => this.setState({ isDrawerOpen: open })}>
                        <AppBar
                            className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                            title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white", fontSize: 18 }}
                                href="/companyofficer"> {language.drawerTitle}{"Cihan"} </a>}
                            onLeftIconButtonTouchTap={() => this.closeDrawerMenu()} />
                        <div style={{ textAlign: "center" }}>
                            <img alt="" src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png"
                                style={{ width: 60, height: 60, marginTop: 10 }} />
                        </div>
                        <SelectableList
                            value={this.state.selectedIndex}
                            onChange={(e, value) => this.handleSelectMenuItem(e, value)} >
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
                                            {this.resizableTableView(2)}
                                            {this.state.isStudentEditDialogOpen ? this.editStudentInfo(this.state.studentEditIndex) : false}
                                            {this.state.isStudentInfoDialogOpen ? this.showStudentInfoDetail(this.state.studentInfoIndex) : false}
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