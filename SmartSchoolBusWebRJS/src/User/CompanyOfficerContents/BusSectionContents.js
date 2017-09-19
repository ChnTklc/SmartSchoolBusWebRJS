import React from "react";
import {Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn} from "material-ui/Table";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import EditIcon from "material-ui/svg-icons/editor/mode-edit";
import StudentPicture from "../../assets/studentDefaultPicture.jpg";
import UserPicture from "../../assets/defaultProfilePicture.png";

let SchoolBus = require("../../Objects/SchoolBus").SchoolBus;
let BusObj = JSON.parse(JSON.stringify(require("../../Objects/SchoolBus").SchoolBus));

let Buses = [BusObj];
Buses.pop();

export default class BusSectionContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buses: this.getBuses(),
            busEditIndex: null,
            isBusEditDialogOpen: false,
            isBusDriverInfoDialogOpen: false,
            isBusHostessInfoDialogOpen: false,
            busDriverInfoIndex: null,
            busHostessInfoIndex: null,
            bDriverID: null,
            bDriverPhoto: "",
            bDriverName: "",
            bDriverSurname: "",
            bDriverPhoneNumber: null,
            bHostessID: null,
            bHostessPhoto: "",
            bHostessName: "",
            bHostessSurname: "",
            bHostessPhoneNumber: null,
            bPlateNumber: null,
            bBusCapacity: null,
        }
    }

    addBus = (driverID, driverPhoto, driverName,
           driverSurname, driverPhoneNumber,
           hostessID, hostessPhoto, hostessName,
           hostessSurname, hostessPhoneNumber,
           plateNumber, capacity) => {

        let busObj = JSON.parse(JSON.stringify(SchoolBus));
        busObj.serviceBusDriver.id = driverID;
        busObj.serviceBusDriver.user.photo.contents = driverPhoto;
        busObj.serviceBusDriver.user.name = driverName;
        busObj.serviceBusDriver.user.surname = driverSurname;
        busObj.serviceBusDriver.user.phoneNumber = driverPhoneNumber;
        busObj.hostess.id = hostessID;
        busObj.hostess.user.photo.contents = hostessPhoto;
        busObj.hostess.user.name = hostessName;
        busObj.hostess.user.surname = hostessSurname;
        busObj.hostess.user.phoneNumber = hostessPhoneNumber;
        busObj.serviceBus.plateNumber = plateNumber;
        busObj.serviceBus.capacity = capacity;

        Buses.push(busObj);
        return Buses;
    };

    getBuses = () => { //bus list get request will be send from here and fill the Buses list.
        /*DUMMY DATA*/
        for (let i = 0; i < 7; i++) {
            Buses = this.addBus(1, UserPicture, "Haydar", "Hayhay", 5397910147,
                2, StudentPicture, "Ayça", "Yirmiiki", 5335353535, "35CT33", 40);
        }
        /*DUMMY DATA*/
        return Buses;
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
                contentStyle={{width: 550}}
                title="Edit Bus Information"
                actions={actions}
                modal={false}
                open={this.state.isBusEditDialogOpen}
                onRequestClose={() => this.closeBusEditDialog()}
                autoScrollBodyContent={true}>

                <TextField required defaultValue={this.state.bDriverName} floatingLabelText="Driver Name"
                           onChange={(event, value) => this.setState({bDriverName: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bDriverSurname} floatingLabelText="Driver Surname"
                           onChange={(event, value) => this.setState({bDriverSurname: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bDriverPhoneNumber} floatingLabelText="Driver Phone Number"
                           onChange={(event, value) => this.setState({bDriverPhoneNumber: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bHostessName} floatingLabelText="Hostess Name"
                           onChange={(event, value) => this.setState({bHostessName: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bHostessSurname} floatingLabelText="Hostess Surname"
                           onChange={(event, value) => this.setState({bHostessSurname: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bHostessPhoneNumber}
                           floatingLabelText="Hostess Phone Number"
                           onChange={(event, value) => this.setState({bHostessPhoneNumber: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bPlateNumber} floatingLabelText="Plate Number"
                           onChange={(event, value) => this.setState({bPlateNumber: value})}/>
                <br/>
                <TextField required defaultValue={this.state.bBusCapacity} floatingLabelText="Bus Capacity"
                           onChange={(event, value) => this.setState({bBusCapacity: value})}/>
                <br/>
            </Dialog>
        );
    };

    deleteBus = (index) => { // Bus delete request will be send from here.
        if (index !== -1) {
            Buses.splice(index, 1);
            this.setState({buses: Buses});
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

    showBusDriverInfoDetail = () => {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeBusDriverInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{width: 550}}
                title="Bus Driver Information Details"
                actions={actions}
                modal={false}
                open={this.state.isBusDriverInfoDialogOpen}
                onRequestClose={() => this.closeBusDriverInfoDialog()}
                autoScrollBodyContent={true}>

                <p style={{fontSize: 20}}>
                    {<div style={{textAlign: "center"}}>
                        <img alt="" src={this.state.bDriverPhoto} style={{width: 150, height: 150}}/>
                    </div>} <br/>
                    <strong>Name:</strong> {this.state.bDriverName} <br/>
                    <strong>Surname:</strong> {this.state.bDriverSurname} <br/>
                    <strong>Phone Number:</strong> {this.state.bDriverPhoneNumber} <br/>
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

    showBusHostessInfoDetail = () => {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeBusHostessInfoDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{width: 550}}
                title="Bus Hostess Information Details"
                actions={actions}
                modal={false}
                open={this.state.isBusHostessInfoDialogOpen}
                onRequestClose={() => this.closeBusHostessInfoDialog()}
                autoScrollBodyContent={true}>

                <p style={{fontSize: 20}}>
                    {<div style={{textAlign: "center"}}>
                        <img alt="" src={this.state.bHostessPhoto} style={{width: 150, height: 150}}/>
                    </div>} <br/>
                    <strong>Name:</strong> {this.state.bHostessName} <br/>
                    <strong>Surname:</strong> {this.state.bHostessSurname} <br/>
                    <strong>Phone Number:</strong> {this.state.bHostessPhoneNumber} <br/>
                    <strong>Hostess ID:</strong> {this.state.bHostessID}
                </p>
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
                            <TableRow key={index + 1} hoverable={true} style={{textAlign: "center"}}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn><img alt="" src={row.serviceBusDriver.user.photo.contents}
                                                     style={{width: 25, height: 25}}
                                                     onClick={() => this.openBusDriverInfoDialog(index)}/></TableRowColumn>
                                <TableRowColumn>{row.serviceBusDriver.user.name} {row.serviceBusDriver.user.surname}</TableRowColumn>
                                <TableRowColumn><img alt="" src={row.hostess.user.photo.contents}
                                                     style={{width: 25, height: 25}}
                                                     onClick={() => this.openBusHostessInfoDialog(index)}/></TableRowColumn>
                                <TableRowColumn>{row.hostess.user.name} {row.hostess.user.surname}</TableRowColumn>
                                <TableRowColumn>{row.serviceBus.plateNumber}</TableRowColumn>
                                <TableRowColumn>
                                    <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                              onClick={() => this.openBusEditDialog(index)}/>
                                    <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)"
                                                onClick={() => this.deleteBus(index)}/></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.isBusEditDialogOpen ? this.editBusInfo() : false}
                {this.state.isBusDriverInfoDialogOpen ? this.showBusDriverInfoDetail() : false}
                {this.state.isBusHostessInfoDialogOpen ? this.showBusHostessInfoDetail() : false}
            </div>
        );
    }
}