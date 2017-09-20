import React from "react";
import {Table, TableRow, TableRowColumn, TableBody, TableHeader, TableHeaderColumn} from "material-ui/Table";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import EditIcon from "material-ui/svg-icons/editor/mode-edit";

let DriverObj = JSON.parse(JSON.stringify(require("../../Objects/ServiceBusDriver").ServiceBusDriver));
let Drivers = [DriverObj];

export default class DriverSectionContents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drivers: this.getDrivers(),
            isDriverEditDialogOpen: false,
            driverEditIndex: null,
            dPhoto: "",
            dName: "",
            dSurname: "",
            dPhoneNumber: "",
            dID: null,
        }
    }

    getDrivers = () => { //todo: send get drivers request from here.

        return Drivers;
    };

    attachDriverItemsToState = (index) => {
        let driverList = this.state.drivers;
        let driver = driverList[index];
        this.setState({
            dPhoto: driver.user.photo.contents,
            dName: driver.user.name,
            dSurname: driver.user.surname,
            dPhoneNumber: driver.user.phoneNumber,
            dID: driver.id,
        });
    };

    updateDriverList = () => { //todo: driver update request will be send from here to server.
        let index = this.state.driverEditIndex;
        let driverList = this.state.drivers;

        driverList[index].user.photo.contents = this.state.dPhoto;
        driverList[index].user.name = this.state.dName;
        driverList[index].user.surname = this.state.dSurname;
        driverList[index].user.phoneNumber = this.state.dPhoneNumber;
        driverList[index].id = this.state.dID;

        this.setState({
            drivers: driverList
        });
    };

    openDriverEditDialog = (index) => {
        this.setState({
            isDriverEditDialogOpen: true
        });
        this.setState({
            driverEditIndex: index
        });
        this.attachDriverItemsToState(index);
    };

    closeDriverEditDialog = () => {
        this.setState({
            isDriverEditDialogOpen: false
        });
    };

    deleteDriver = (index) => { //todo: Driver delete request will be send from here.
        if (index !== -1) {
            Drivers.splice(index, 1);
            this.setState({drivers: Drivers});
        }
        else {
            alert("error!");
        }
    };

    editDriverInfo = () => {
        const actions = [
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.updateDriverList()}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                onClick={() => this.closeDriverEditDialog()}
            />
        ];
        return (
            <Dialog
                contentStyle={{width: 550}}
                title="Edit Driver Information"
                actions={actions}
                modal={false}
                open={this.state.isDriverEditDialogOpen}
                onRequestClose={() => this.closeDriverEditDialog()}
                autoScrollBodyContent={true}>

                <TextField required defaultValue={this.state.dName} floatingLabelText="Name"
                           onChange={(event, value) => this.setState({sName: value})}/>
                <br/>
                <TextField required defaultValue={this.state.dSurname} floatingLabelText="Surname"
                           onChange={(event, value) => this.setState({sSurname: value})}/>
                <br/>
                <TextField required defaultValue={this.state.dPhoneNumber} floatingLabelText="Phone Number"
                           onChange={(event, value) => this.setState({sClassNo: value})}/>
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
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Number">No</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Driver's Photo">Photo</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Driver's Name">Name</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Driver's Surname">Surname</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Driver's Phone Number">Phone</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: "center"}} tooltip="Driver's ID">Driver ID</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                        stripedRows={true}>
                        {this.state.drivers.map((row, index) => (
                            <TableRow key={index + 1} hoverable={true} style={{textAlign: "center"}}>
                                <TableRowColumn style={{textAlign: "center"}}>{index + 1}</TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>
                                    <img alt="" src={row.user.photo.contents}
                                                     style={{width: 25, height: 25}}
                                                     onClick={() => this.openBusDriverInfoDialog(index)}/>
                                </TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>{row.user.name}</TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>{row.user.surname}</TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>{row.user.phoneNumber}</TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>{row.id}</TableRowColumn>
                                <TableRowColumn style={{textAlign: "center"}}>
                                    <EditIcon hoverColor="rgba(0, 0, 0, 1)" color="rgb(100, 100, 100)"
                                              onClick={() => this.openDriverEditDialog(index)}/>
                                    <DeleteIcon hoverColor="rgb(255, 0, 0)" color="rgb(100, 100, 100)"
                                                onClick={() => this.deleteDriver(index)}/></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.isDriverEditDialogOpen ? this.editDriverInfo() : false}
            </div>
        );
    };
}