import React from "react";
import {Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn} from "material-ui/Table";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import EditIcon from "material-ui/svg-icons/editor/mode-edit";
import InfoIcon from "material-ui/svg-icons/action/info";
import StudentPicture from "../../assets/studentDefaultPicture.jpg";

let Student = require("../../Objects/Student").Student;
let StudentObj = JSON.parse(JSON.stringify(require("../../Objects/Student").Student)); // saved life copy object to another object without bind them.

let Students = [StudentObj];
Students.pop();

export default class StudentSectionContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: this.getStudents(),
            isStudentEditDialogOpen: false,
            isStudentInfoDialogOpen: false,
            isAddStudentDialogOpen: false,
            studentEditIndex: null,
            studentInfoIndex: null,
            sPhoto: "",
            sName: "",
            sSurname: "",
            sClassNo: "",
            sStudentNo: "",
            sParentName: "",
            sParentSurname: "",
            sAddress: "",
            sServiceRouteOn: "",
            sServiceRouteOff: "",
        }
    }

    addStudent = (photo, name, surname, classNo,
                  studentNo, parentName, parentSurname,
                  homeAddress, morningBusId, nightBusId) => {

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
    };

    getStudents = () => { //student list get request will be send from here and fill the Students list.
        /*DUMMY DATA*/
        for (let i = 0; i < 5; i++) {
            Students = this.addStudent(StudentPicture,
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
    };

    attachStudentItemsToState = (index) => {
        let stdList = this.state.students;
        let std = stdList[index];
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

    showStudentInfoDetail = () => {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeStudentInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{width: 550}}
                title="Student Information Details"
                actions={actions}
                modal={false}
                open={this.state.isStudentInfoDialogOpen}
                onRequestClose={() => this.closeStudentInfoDialog()}
                autoScrollBodyContent={true}>

                <p style={{fontSize: 20}}>
                    {<div style={{textAlign: "center"}}>
                        <img alt="" src={this.state.sPhoto} style={{width: 100, height: 100}}/>
                    </div>} <br/>
                    <strong>Name:</strong> {this.state.sName} <br/>
                    <strong>Surname:</strong> {this.state.sSurname} <br/>
                    <strong>Class Number:</strong> {this.state.sClassNo} <br/>
                    <strong>Student Number:</strong> {this.state.sStudentNo} <br/>
                    <strong>Parent:</strong> {this.state.sParentName} {this.state.sParentSurname} <br/>
                    <strong>Address:</strong> {this.state.sAddress} <br/>
                    <strong>Departure/Return
                        Service:</strong> {this.state.sServiceRouteOn}/{this.state.sServiceRouteOff}
                </p>
            </Dialog>
        );
    };

    deleteStudent = (index) => { // Student delete request will be send from here.
        if (index !== -1) {
            Students.splice(index, 1);
            this.setState({students: Students});
        }
        else {
            alert("error!");
        }
    };

    updateStudentsList = () => { // student update request will be send from here to server.
        let index = this.state.studentEditIndex;
        let stdList = this.state.students;

        stdList[index].user.name = this.state.sName;
        stdList[index].user.surname = this.state.sSurname;
        stdList[index].user.photo.contents = this.state.sPhoto;
        stdList[index].studentNo = this.state.sStudentNo;
        stdList[index].classNo = this.state.sClassNo;
        stdList[index].parent[0].user.name = this.state.sParentName;
        stdList[index].parent[0].user.surname = this.state.sParentSurname;
        stdList[index].address[0].location.address = this.state.sAddress;
        stdList[index].serviceRoute.getOn.id = this.state.sServiceRouteOn;
        stdList[index].serviceRoute.getOff.id = this.state.sServiceRouteOff;

        this.setState({
            students: stdList
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
                contentStyle={{width: 550}}
                title="Edit Student Information"
                actions={actions}
                modal={false}
                open={this.state.isStudentEditDialogOpen}
                onRequestClose={() => this.closeStudentEditDialog()}
                autoScrollBodyContent={true}>

                <TextField required defaultValue={this.state.sName} floatingLabelText="Name"
                           onChange={(event, value) => this.setState({sName: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sSurname} floatingLabelText="Surname"
                           onChange={(event, value) => this.setState({sSurname: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sClassNo} floatingLabelText="Class Number"
                           onChange={(event, value) => this.setState({sClassNo: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sStudentNo} floatingLabelText="Student Number"
                           onChange={(event, value) => this.setState({sStudentNo: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sParentName} floatingLabelText="Parent Name"
                           onChange={(event, value) => this.setState({sParentName: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sParentSurname} floatingLabelText="Parent Surname"
                           onChange={(event, value) => this.setState({sParentSurname: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sAddress} floatingLabelText="Address"
                           fullWidth={true} multiLine={true}
                           onChange={(event, value) => this.setState({sAddress: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sServiceRouteOn} floatingLabelText="Departure Service"
                           onChange={(event, value) => this.setState({sServiceRouteOn: value})}/>
                <br/>
                <TextField required defaultValue={this.state.sServiceRouteOff} floatingLabelText="Return Service"
                           onChange={(event, value) => this.setState({sServiceRouteOff: value})}/>
                <br/>
            </Dialog>
        );
    };

    callAddStudent = () => {
        this.setState({
            students: this.addStudent(
                StudentPicture, // will be edit after.
                this.state.sName,
                this.state.sSurname,
                this.state.sClassNo,
                this.state.sStudentNo,
                this.state.sParentName,
                this.state.sParentSurname,
                this.state.sAddress,
                this.state.sServiceRouteOn,
                this.state.sServiceRouteOff
            )
        });
    };

    openAddStudentDialog = () => {
        this.setState({
            isAddStudentDialogOpen: true
        });
    };

    closeAddStudentDialog = () => {
        this.setState({
            isAddStudentDialogOpen: false
        });
    };

    addStudentDialog = () => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.callAddStudent()}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onClick={() => this.closeAddStudentDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{width: 550}}
                title="Add Student"
                actions={actions}
                modal={false}
                open={this.state.isAddStudentDialogOpen}
                onRequestClose={() => this.closeAddStudentDialog()}
                autoScrollBodyContent={true}>

                <TextField required floatingLabelText="Name"
                           onChange={(event, value) => this.setState({sName: value})}/>
                <br/>
                <TextField required floatingLabelText="Surname"
                           onChange={(event, value) => this.setState({sSurname: value})}/>
                <br/>
                <TextField required floatingLabelText="Class Number"
                           onChange={(event, value) => this.setState({sClassNo: value})}/>
                <br/>
                <TextField required floatingLabelText="Student Number"
                           onChange={(event, value) => this.setState({sStudentNo: value})}/>
                <br/>
                <TextField required floatingLabelText="Parent Name"
                           onChange={(event, value) => this.setState({sParentName: value})}/>
                <br/>
                <TextField required floatingLabelText="Parent Surname"
                           onChange={(event, value) => this.setState({sParentSurname: value})}/>
                <br/>
                <TextField required floatingLabelText="Address"
                           fullWidth={true} multiLine={true}
                           onChange={(event, value) => this.setState({sAddress: value})}/>
                <br/>
                <TextField required floatingLabelText="Departure Service"
                           onChange={(event, value) => this.setState({sServiceRouteOn: value})}/>
                <br/>
                <TextField required floatingLabelText="Return Service"
                           onChange={(event, value) => this.setState({sServiceRouteOff: value})}/>
                <br/>
            </Dialog>
        );
    };

    render(){
        return(
            <div>
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
                            <TableHeaderColumn tooltip="Student's Regular Service">Route
                                Departure/Return</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Settings">Settings</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                        stripedRows={true}>
                        {this.state.students.map((row, index) => (
                            <TableRow key={index + 1} hoverable={true} style={{textAlign: "center"}}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn><img alt="" src={row.user.photo.contents}
                                                     style={{width: 25, height: 25}}/></TableRowColumn>
                                <TableRowColumn>{row.studentNo}</TableRowColumn>
                                <TableRowColumn>{row.user.name} {row.user.surname}</TableRowColumn>
                                <TableRowColumn>{row.parent[0].user.name} {row.parent[0].user.surname}</TableRowColumn>
                                <TableRowColumn>{row.serviceRoute.getOn.id}/{row.serviceRoute.getOff.id}</TableRowColumn>
                                <TableRowColumn>
                                    <InfoIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                              onClick={() => this.openStudentInfoDialog(index)}/>
                                    <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                              onClick={() => this.openStudentEditDialog(index)}/>
                                    <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)"
                                                onClick={() => this.deleteStudent(index)}/></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <FlatButton style={{ margin: 15 }} primary={true} label={"Add"} onClick={this.openAddStudentDialog()} />
                {this.state.isAddStudentDialogOpen ? this.addStudentDialog() : false}
                {this.state.isStudentEditDialogOpen ? this.editStudentInfo() : false}
                {this.state.isStudentInfoDialogOpen ? this.showStudentInfoDetail() : false}
            </div>
        );
    };
}