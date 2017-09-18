import React from 'react';
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
import StudentPicture from '../assets/studentDefaultPicture.jpg';
import UserPicture from '../assets/defaultProfilePicture.png';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import NavigationBar from '../Home/NavigationBar';
let Student = require('../Objects/Student').Student;
let StudentObj = JSON.parse(JSON.stringify(Student)); // saved life copy object to another object without bind them.

let SchoolBus = require('../Objects/SchoolBus').SchoolBus;
let BusObj = JSON.parse(JSON.stringify(SchoolBus));

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

(function languageSetting() {
    if (NavigationBar.getLanguage() === "EN") {
        language = varsAsLanguage.tr;
    }
    else if (NavigationBar.getLanguage() === "TR") {
        language = varsAsLanguage.en;
    }
})();

/****
 * in here get school information and run instantly.
 * then fill the SchoolNames list, other properties will become generic.
 * ****/

let SchoolNames = [
    "İzmir Yüksek Teknoloji Enstitüsü",
    "Dokuz Eylül Üniversitesi",
    "Ege Üniversitesi",
    "İzmir Katip Çelebi Üniversitesi",
    "İzmir Ekonomi Üniversitesi",
];

let SubListOfSchools = [
    language.route,
    language.students,
    language.buses,
    language.drivers,
    language.hostesses,
];

let Students = [StudentObj];
Students.pop();

function addStudent(photo, name, surname, classNo,
                    studentNo, parentName, parentSurname,
                    homeAddress, morningBusId, nightBusId) {

    let stdObj = JSON.parse(JSON.stringify(Student));
    stdObj.parent.pop();
    stdObj.address.pop();
    stdObj.user.photo.contents = photo;
    stdObj.user.name = name;
    stdObj.user.surname = surname;
    stdObj.classNo = classNo;
    stdObj.studentNo = studentNo;
    stdObj.parent.push({
        user: {
            name: parentName,
            surname: parentSurname
        }
    });
    stdObj.address.push({
        location: {
            address: homeAddress
        },
        name: "Home"
    });
    stdObj.serviceRoute.getOn.id = morningBusId;
    stdObj.serviceRoute.getOff.id = nightBusId;
    Students.push(stdObj);
    return Students;
}

function getStudents() { //student list get request will be send from here and fill the Students list.
    /*DUMMY DATA*/
    for (let i = 0; i < 20; i++) {
        Students = addStudent(StudentPicture,
            "Cihan",
            "Toklucu",
            "4",
            "210201027",
            "Ali",
            "Veli",
            "Gulbahce Mahallesi IYTE Kampusu A8 Binasi No:1 / 37 D:18 Urla / Izmir / Turkey",
            1, 2);
    }
    /*DUMMY DATA*/
    return Students;
}

let Buses = [BusObj];
Buses.pop();

function addBus(driverID, driverPhoto, driverName,
                driverSurname, driverPhoneNumber,
                hostessID, hostessPhoto, hostessName,
                hostessSurname, hostessPhoneNumber,
                plateNumber, capacity) {

    let busObj = JSON.parse(JSON.stringify(SchoolBus));
    busObj.serviceBusDriver.id = driverID;
    busObj.serviceBusDriver.user.photo = driverPhoto;
    busObj.serviceBusDriver.user.name = driverName;
    busObj.serviceBusDriver.user.surname = driverSurname;
    busObj.serviceBusDriver.user.phoneNumber = driverPhoneNumber;
    busObj.hostess.id = hostessID;
    busObj.hostess.user.photo = hostessPhoto;
    busObj.hostess.user.name = hostessName;
    busObj.hostess.user.surname = hostessSurname;
    busObj.hostess.user.phoneNumber = hostessPhoneNumber;
    busObj.serviceBus.plateNumber = plateNumber;
    busObj.serviceBus.capacity = capacity;

    Buses.push(busObj);
    return Buses;
}

function getBuses(){
    /*DUMMY DATA*/
    for (let i = 0; i < 7; i++) {
        Buses = addBus(1, UserPicture, "Haydar", "Hayhay", 5397910147,
            2, StudentPicture, "Ayça", "Yirmiiki", 5335353535, "35CT33", 40);
    }
    /*DUMMY DATA*/
    return Buses;
}

let drawerListIds = [];

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

class CompanyOfficer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isDrawerOpen: true,
            selectedIndex: drawerListIds[0],
            //states for student section
            students: getStudents(),
            isStudentEditDialogOpen: false,
            isStudentInfoDialogOpen: false,
            studentEditIndex: null,
            studentInfoIndex: null,
            sPhoto: '',
            sName: '',
            sSurname: '',
            sClassNo: '',
            sStudentNo: '',
            sParentName: '',
            sParentSurname: '',
            sAddress: '',
            sServiceRouteOn: '',
            sServiceRouteOff: '',
            //states for bus section
            buses: getBuses(),
            busEditIndex: null,
            isBusEditDialogOpen: false,
            isBusDriverInfoDialogOpen: false,
            isBusHostessInfoDialogOpen: false,
            busDriverInfoIndex: null,
            busHostessInfoIndex: null,
            bDriverID: null,
            bDriverPhoto: '',
            bDriverName: '',
            bDriverSurname: '',
            bDriverPhoneNumber: null,
            bHostessID: null,
            bHostessPhoto: '',
            bHostessName: '',
            bHostessSurname: '',
            bHostessPhoneNumber: null,
            bPlateNumber: null,
            bBusCapacity: null,
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

    /** Functions about route section **/

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

    /** Functions about route section **/


    /** Functions about student section **/

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
                        <TableHeaderColumn tooltip="Student's Parent">Parent</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Student's Regular Service">Route Departure/Return</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Settings">Settings</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={false}
                    stripedRows={true}>
                    {this.state.students.map((row, index) => (
                        <TableRow key={index + 1} hoverable={true} style={{ textAlign: "center" }}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            <TableRowColumn><img alt="" src={row.user.photo.contents}
                                                 style={{ width: 25, height: 25 }} /></TableRowColumn>
                            <TableRowColumn>{row.studentNo}</TableRowColumn>
                            <TableRowColumn>{row.user.name} {row.user.surname}</TableRowColumn>
                            <TableRowColumn>{row.parent[0].user.name} {row.parent[0].user.surname}</TableRowColumn>
                            <TableRowColumn>{row.serviceRoute.getOn.id}/{row.serviceRoute.getOff.id}</TableRowColumn>
                            <TableRowColumn>
                                <InfoIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                          onClick={() => this.openStudentInfoDialog(index)} />
                                <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                          onClick={() => this.openStudentEditDialog(index)} />
                                <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)"
                                            onClick={() => this.deleteStudent(index)} /></TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    attachStudentItemsToState = (index) => {
        let stdlist = this.state.students;
        let std = stdlist[index];
        this.setState({
            sPhoto: std.user.photo.contents,
            sStudentNo: std.studentNo,
            sName: std.user.name,
            sSurname: std.user.surname,
            sClassNo: std.classNo,
            sParentName: std.parent[0].user.name,
            sParentSurname: std.parent[0].user.surname,
            sAddress: std.address[0].location.address,
            sServiceRouteOn: std.serviceRoute.getOn.id,
            sServiceRouteOff: std.serviceRoute.getOff.id
        });
    };

    openStudentEditDialog = (index) => {
        this.setState({
            studentEditIndex: index
        });
        this.setState({
            isStudentEditDialogOpen: true
        });
        this.attachStudentItemsToState(index);
    };

    closeStudentEditDialog = () => {
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
                    {<div style={{ textAlign: "center" }}> <img alt="" src={std.user.photo.contents}
                                                                style={{ width: 100, height: 100 }} /> </div>} <br />
                    <strong>Name:</strong> {this.state.sName} <br />
                    <strong>Surname:</strong> {this.state.sSurname} <br />
                    <strong>Class Number:</strong> {this.state.sClassNo} <br />
                    <strong>Student Number:</strong> {this.state.sStudentNo} <br />
                    <strong>Parent:</strong> {this.state.sParentName} {this.state.sParentSurname} <br />
                    <strong>Address:</strong> {this.state.sAddress} <br />
                    <strong>Departure/Return Service:</strong> {this.state.sServiceRouteOn}/{this.state.sServiceRouteOff}
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

        stdlist[index].user.name = this.state.sName;
        stdlist[index].user.surname = this.state.sSurname;
        stdlist[index].user.photo.contents = this.state.sPhoto;
        stdlist[index].studentNo = this.state.sStudentNo;
        stdlist[index].classNo = this.state.sClassNo;
        stdlist[index].parent[0].user.name = this.state.sParentName;
        stdlist[index].parent[0].user.surname = this.state.sParentSurname;
        stdlist[index].address[0].location.address = this.state.sAddress;
        stdlist[index].serviceRoute.getOn.id = this.state.sServiceRouteOn;
        stdlist[index].serviceRoute.getOff.id = this.state.sServiceRouteOff;

        this.setState({
            students: stdlist
        });
    };

    editStudentInfo = () => {
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
                onClick={() => this.closeStudentEditDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Edit Student"
                actions={actions}
                modal={false}
                open={this.state.isStudentEditDialogOpen}
                onRequestClose={() => this.closeStudentEditDialog()}
                autoScrollBodyContent={true} >

                <TextField required defaultValue={this.state.sName} floatingLabelText="Name"
                           onChange={(event, value) => this.setState({ sName: value })} />
                <br />
                <TextField required defaultValue={this.state.sSurname} floatingLabelText="Surname"
                           onChange={(event, value) => this.setState({ sSurname: value })} />
                <br />
                <TextField required defaultValue={this.state.sClassNo} floatingLabelText="Class Number"
                           onChange={(event, value) => this.setState({ sClassNo: value })} />
                <br />
                <TextField required defaultValue={this.state.sStudentNo} floatingLabelText="Student Number"
                           onChange={(event, value) => this.setState({ sStudentNo: value })} />
                <br />
                <TextField required defaultValue={this.state.sParentName} floatingLabelText="Parent Name"
                           onChange={(event, value) => this.setState({ sParentName: value })} />
                <br />
                <TextField required defaultValue={this.state.sParentSurname} floatingLabelText="Parent Surname"
                           onChange={(event, value) => this.setState({ sParentSurname: value })} />
                <br />
                <TextField required defaultValue={this.state.sAddress} floatingLabelText="Address"
                           fullWidth={true} multiLine={true} onChange={(event, value) => this.setState({ sAddress: value })} />
                <br />
                <TextField required defaultValue={this.state.sServiceRouteOn} floatingLabelText="Departure Service"
                           onChange={(event, value) => this.setState({ sServiceRouteOn: value })} />
                <br />
                <TextField required defaultValue={this.state.sServiceRouteOff} floatingLabelText="Return Service"
                           onChange={(event, value) => this.setState({ sServiceRouteOff: value })} />
                <br />
            </Dialog>
        );
    };

    /** Functions about student section **/


    /** Functions about bus section **/

    busesTable = () => {
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
                        <TableHeaderColumn tooltip="Bus' Driver Photo">Driver's Photo</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Bus' Driver">Driver</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Bus' Hostess Photo">Hostess's Photo</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Bus' Hostess">Hostess</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Bus' Plate Number">Plate Number</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Settings">Settings</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={false}
                    stripedRows={true}>
                    {this.state.buses.map((row, index) => (
                        <TableRow key={index + 1} hoverable={true} style={{ textAlign: "center" }}>
                            <TableRowColumn>{index + 1}</TableRowColumn>
                            <TableRowColumn><img alt="" src={row.serviceBusDriver.user.photo.contents}
                                                 style={{ width: 25, height: 25 }}
                                                 onClick={() => this.openBusDriverInfoDialog(index)} /></TableRowColumn>
                            <TableRowColumn>{row.serviceBusDriver.user.name} {row.serviceBusDriver.user.surname}</TableRowColumn>
                            <TableRowColumn><img alt="" src={row.hostess.user.photo.contents}
                                                 style={{ width: 25, height: 25 }}
                                                 onClick={() => this.openBusHostessInfoDialog(index)} /></TableRowColumn>
                            <TableRowColumn>{row.hostess.user.name} {row.hostess.user.surname}</TableRowColumn>
                            <TableRowColumn>{row.serviceBus.plateNumber}</TableRowColumn>
                            <TableRowColumn>
                                <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                          onClick={() => this.openBusEditDialog(index)} />
                                <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)"
                                            onClick={() => this.deleteBus(index)} /></TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    attachBusItemsToState = (index) => {
        let busList = this.state.buses;
        let bus = busList[index];
        this.setState({
            bDriverID: bus.serviceBusDriver.id,
            bDriverPhoto: bus.serviceBusDriver.user.photo.contents,
            bDriverName: bus.serviceBusDriver.user.name,
            bDriverSurname: bus.serviceBusDriver.user.surname,
            bDriverPhoneNumber: bus.serviceBusDriver.user.phoneNumber,
            bHostessID: bus.hostess.id,
            bHostessPhoto: bus.hostess.user.photo.contents,
            bHostessName: bus.hostess.user.name,
            bHostessSurname: bus.hostess.user.surname,
            bHostessPhoneNumber: bus.hostess.user.phoneNumber,
            bPlateNumber: bus.serviceBus.plateNumber,
            bBusCapacity: bus.serviceBus.capacity,
        });
    };

    openBusEditDialog = (index) => {
        this.setState({
            busEditIndex: index
        });
        this.setState({
            isBusEditDialogOpen: true
        });
        this.attachBusItemsToState(index);
    };

    closeBusEditDialog = () => {
        this.setState({
            isBusEditDialogOpen: false
        });
    };

    editBusInfo = () => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.updateBusesList()}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeBusEditDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Edit Bus Information"
                actions={actions}
                modal={false}
                open={this.state.isBusEditDialogOpen}
                onRequestClose={() => this.closeBusEditDialog()}
                autoScrollBodyContent={true} >

                <TextField required defaultValue={this.state.bDriverName} floatingLabelText="Driver Name"
                           onChange={(event, value) => this.setState({ bDriverName: value })} />
                <br />
                <TextField required defaultValue={this.state.bDriverSurname} floatingLabelText="Driver Surname"
                           onChange={(event, value) => this.setState({ bDriverSurname: value })} />
                <br />
                <TextField required defaultValue={this.state.bDriverPhoneNumber} floatingLabelText="Driver Phone Number"
                           onChange={(event, value) => this.setState({ bDriverPhoneNumber: value })} />
                <br />
                <TextField required defaultValue={this.state.bHostessName} floatingLabelText="Hostess Name"
                           onChange={(event, value) => this.setState({ bHostessName: value })} />
                <br />
                <TextField required defaultValue={this.state.bHostessSurname} floatingLabelText="Hostess Surname"
                           onChange={(event, value) => this.setState({ bHostessSurname: value })} />
                <br />
                <TextField required defaultValue={this.state.bHostessPhoneNumber} floatingLabelText="Hostess Phone Number"
                           onChange={(event, value) => this.setState({ bHostessPhoneNumber: value })} />
                <br />
                <TextField required defaultValue={this.state.bPlateNumber} floatingLabelText="Plate Number"
                           onChange={(event, value) => this.setState({ bPlateNumber: value })} />
                <br />
                <TextField required defaultValue={this.state.bBusCapacity} floatingLabelText="Bus Capacity"
                           onChange={(event, value) => this.setState({ bBusCapacity: value })} />
                <br />
            </Dialog>
        );
    };

    deleteBus = (index) => { // Bus delete request will be send from here.
        if (index !== -1) {
            Buses.splice(index, 1);
            this.setState({ buses: Buses });
        }
        else {
            alert("error!");
        }
    };

    updateBusesList = () => { // bus update request will be send from here to server.
        let index = this.state.busEditIndex;
        let busList = this.state.buses;

        busList[index].serviceBusDriver.id = this.state.bDriverID;
        busList[index].serviceBusDriver.user.photo.contents = this.state.bDriverPhoto;
        busList[index].serviceBusDriver.user.name = this.state.bDriverName;
        busList[index].serviceBusDriver.user.surname = this.state.bDriverSurname;
        busList[index].serviceBusDriver.user.phoneNumber = this.state.bDriverPhoneNumber;
        busList[index].hostess.id = this.state.bHostessID;
        busList[index].hostess.user.photo.contents = this.state.bHostessPhoto;
        busList[index].hostess.user.name = this.state.bHostessName;
        busList[index].hostess.user.surname = this.state.bHostessSurname;
        busList[index].hostess.user.phoneNumber = this.state.bHostessPhoneNumber;
        busList[index].serviceBus.plateNumber = this.state.bPlateNumber;
        busList[index].serviceBus.capacity = this.state.bBusCapacity;

        this.setState({
            buses: busList
        });
    };

    attachBusDriverInfoToState = (index) => {
        let busList = this.state.buses;
        let bus = busList[index];
        this.setState({
            bDriverID: bus.serviceBusDriver.id,
            bDriverPhoto: bus.serviceBusDriver.user.photo.contents,
            bDriverName: bus.serviceBusDriver.user.name,
            bDriverSurname: bus.serviceBusDriver.user.surname,
            bDriverPhoneNumber: bus.serviceBusDriver.user.phoneNumber,
        });
    };

    openBusDriverInfoDialog = (index) => {
        this.setState({
            busDriverInfoIndex: index
        });
        this.setState({
            isBusDriverInfoDialogOpen: true
        });
        this.attachBusDriverInfoToState(index);
    };

    closeBusDriverInfoDialog = () => {
        this.setState({
            isBusDriverInfoDialogOpen: false
        });
    };

    showBusDriverInfoDetail = (index) => {
        let busList = this.state.buses;
        let bus = busList[index];

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeBusDriverInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Bus Driver Information Details"
                actions={actions}
                modal={false}
                open={this.state.isBusDriverInfoDialogOpen}
                onRequestClose={() => this.closeBusDriverInfoDialog()}
                autoScrollBodyContent={true} >

                <p style={{ fontSize: 20 }}>
                    {<div style={{ textAlign: "center" }}> <img alt="" src={bus.serviceBusDriver.user.photo.contents}
                                                                style={{ width: 150, height: 150 }} /> </div>} <br />
                    <strong>Name:</strong> {this.state.bDriverName} <br />
                    <strong>Surname:</strong> {this.state.bDriverSurname} <br />
                    <strong>Phone Number:</strong> {this.state.bDriverPhoneNumber} <br />
                    <strong>Driver ID:</strong> {this.state.bDriverID}
                </p>
            </Dialog>
        );
    };

    attachBusHostessInfoToState = (index) => {
        let busList = this.state.buses;
        let bus = busList[index];
        this.setState({
            bHostessID: bus.hostess.id,
            bHostessPhoto: bus.hostess.user.photo.contents,
            bHostessName: bus.hostess.user.name,
            bHostessSurname: bus.hostess.user.surname,
            bHostessPhoneNumber: bus.hostess.user.phoneNumber,
        });
    };

    openBusHostessInfoDialog = (index) => {
        this.setState({
            busHostessInfoIndex: index
        });
        this.setState({
            isBusHostessInfoDialogOpen: true
        });
        this.attachBusHostessInfoToState(index);
    };

    closeBusHostessInfoDialog = () => {
        this.setState({
            isBusHostessInfoDialogOpen: false
        });
    };

    showBusHostessInfoDetail = (index) => {
        let busList = this.state.buses;
        let bus = busList[index];

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeBusHostessInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{ width: 550 }}
                title="Bus Hostess Information Details"
                actions={actions}
                modal={false}
                open={this.state.isBusHostessInfoDialogOpen}
                onRequestClose={() => this.closeBusHostessInfoDialog()}
                autoScrollBodyContent={true} >

                <p style={{ fontSize: 20 }}>
                    {<div style={{ textAlign: "center" }}> <img alt="" src={bus.hostess.user.photo.contents}
                                                                style={{ width: 150, height: 150 }} /> </div>} <br />
                    <strong>Name:</strong> {this.state.bHostessName} <br />
                    <strong>Surname:</strong> {this.state.bHostessSurname} <br />
                    <strong>Phone Number:</strong> {this.state.bHostessPhoneNumber} <br />
                    <strong>Hostess ID:</strong> {this.state.bHostessID}
                </p>
            </Dialog>
        );
    };

    /** Functions about bus section **/


    /** Functions about driver section **/

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

    /** Functions about driver section **/


    /** Functions about hostess section **/

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

    /** Functions about hostess section **/


    /** CONTENTS SHOWING FUNCTIONS **/

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

    isItem = (item) => {
        return (this.state.selectedIndex === item);
    };

    showSchoolInfo = (i) => {

    }

    itemContents = (i) => {
        switch (i) {
            case 1:
                return (
                    <div />
                );
            case 2:
                return (
                    <div>
                        {this.state.isStudentEditDialogOpen ? this.editStudentInfo() : false}
                        {this.state.isStudentInfoDialogOpen ? this.showStudentInfoDetail(this.state.studentInfoIndex) : false}
                    </div>
                );
            case 3:
                return (
                    <div>
                        {this.state.isBusEditDialogOpen ? this.editBusInfo() : false}
                        {this.state.isBusDriverInfoDialogOpen ? this.showBusDriverInfoDetail() : false}
                        {this.state.isBusHostessInfoDialogOpen ? this.showBusHostessInfoDetail() : false}
                    </div>
                );
            default: return ( <div /> );
        }
    }

    selectContent = (i) => {
        let t = i % 6;
        return (
            <div>
                {t === 0 ? this.showSchoolInfo(i) : this.resizableTableView(i)}
                {this.itemContents(i)}
            </div>
        );
    };

    fillSelectedItemContents = (i, len) => {
        if (i > len) {
            return false;
        }
        return (
            <div>
                {this.isItem(drawerListIds[i]) ? this.selectContent(i) : this.fillSelectedItemContents(i + 1, len)}
            </div>
        );
    };

    showSelectedItemContents = () => {
        let len = SchoolNames.length * SubListOfSchools.length;
        return this.fillSelectedItemContents(0, len);
    };

    /** CONTENTS SHOWING FUNCTIONS **/

    render = () => {
        /*if (localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }*/
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{ backgroundColor: "rgba(61, 59, 59, 1)" }}
                        title={<a style={{ textDecoration: "none", cursor: "pointer", color: "white" }}
                                  href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{ margin: 0 }}
                                                  labelStyle={{ fontSize: 18 }} onClick={(e) => this.logoutClick(e)} />}
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
                            <img alt="" src={UserPicture}
                                 style={{ width: 60, height: 60, marginTop: 10 }} />
                        </div>
                        <SelectableList
                            value={this.state.selectedIndex}
                            onChange={(e, value) => this.handleSelectMenuItem(e, value)} >
                            {this.generateSelectableList(SchoolNames.length)}
                        </SelectableList>
                    </Drawer>
                    {this.showSelectedItemContents()}
                </div>
            </MuiThemeProvider>
        );
    }
}
export default CompanyOfficer;