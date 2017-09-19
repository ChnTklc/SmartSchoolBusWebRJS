import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import {List, ListItem, makeSelectable} from "material-ui/List";
import UserPicture from "../assets/defaultProfilePicture.png";

import NavigationBar from "../Home/NavigationBar";
import RouteSectionContents from "./CompanyOfficerContents/RouteSectionContents";
import StudentSectionContents from "./CompanyOfficerContents/StudentSectionContents";
import BusSectionContents from "./CompanyOfficerContents/BusSectionContents";
import DriverSectionContents from "./CompanyOfficerContents/DriverSectionContents";
import HostessSectionContents from "./CompanyOfficerContents/HostessSectionContents";

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

/** TODO: in here get school information and run instantly.
 *        then fill the SchoolNames list, other properties will become generic. **/

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
        };
    }

    handleSelectMenuItem = (event, index) => {
        this.setState({
            selectedIndex: index,
        });
    };

    openDrawerMenu = () => {
        this.setState({isDrawerOpen: true});
    };

    closeDrawerMenu = () => {
        this.setState({isDrawerOpen: false});
    };

    logoutClick = () => {
        this.setState({isLogin: false});
        localStorage.setItem("isLoggedInCompanyOfficer", false);
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
                    <ListItem key={itemIds[1]} value={itemIds[1]} primaryText={itemNames[0]}/>,
                    <ListItem key={itemIds[2]} value={itemIds[2]} primaryText={itemNames[1]}/>,
                    <ListItem key={itemIds[3]} value={itemIds[3]} primaryText={itemNames[2]}/>,
                    <ListItem key={itemIds[4]} value={itemIds[4]} primaryText={itemNames[3]}/>,
                    <ListItem key={itemIds[5]} value={itemIds[5]} primaryText={itemNames[4]}/>,
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

    /** FIXME: When contents shown on the browser in every section click same contents adding to before contents, fix it.**/

    getRouteContents = () => {
        return (<RouteSectionContents />);
    };

    getStudentContents = () => {
        return(<StudentSectionContents />);
    };

    getBusContents = () => {
        return(<BusSectionContents />);
    };

    getDriverContents = () => {
        return(<DriverSectionContents/>);
    };

    getHostessContents = () => {
        return (<HostessSectionContents />);
    };

    /** CONTENTS SHOWING FUNCTIONS **/

    resizableTableView = (num) => {
        let divStyle;

        let tableType;
        if (num === 1) {
            tableType = this.getRouteContents();
        } else if (num === 2) {
            tableType = this.getStudentContents();
        } else if (num === 3) {
            tableType = this.getBusContents();
        } else if (num === 4) {
            tableType = this.getDriverContents();
        } else if (num === 5) {
            tableType = this.getHostessContents();
        }

        if (this.state.isDrawerOpen) {
            divStyle = {
                left: "18%",
                position: "absolute",
            };
        } else {
            divStyle = {
                position: "relative"
            };
        }
        return (
            <div className="studentTableDiv" style={divStyle}>
                {tableType}
            </div>
        );
    };

    isItem = (item) => {
        return (this.state.selectedIndex === item);
    };

    showSchoolInfo = (i) => {

    };

    selectContent = (i) => {
        let t = i % 6;
        return (
            <div>
                {t === 0 ? this.showSchoolInfo(i) : this.resizableTableView(i)}
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
        /**if (localStorage.getItem("isLoggedInCompanyOfficer") === "false") {
            return (<Redirect to="/login" />);
        }**/
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        className="appbar" style={{backgroundColor: "rgba(61, 59, 59, 1)"}}
                        title={<a style={{textDecoration: "none", cursor: "pointer", color: "white"}}
                                  href="/companyofficer">{language.title}</a>}
                        iconElementRight={<Button label={language.logout} style={{margin: 0}}
                                                  labelStyle={{fontSize: 18}} onClick={(e) => this.logoutClick(e)}/>}
                        onLeftIconButtonTouchTap={() => this.openDrawerMenu()}/>
                    <Drawer
                        width={250}
                        open={this.state.isDrawerOpen}
                        onRequestChange={(open) => this.setState({isDrawerOpen: open})}>
                        <AppBar
                            className="appbar" style={{backgroundColor: "rgba(61, 59, 59, 1)"}}
                            title={<a style={{textDecoration: "none", cursor: "pointer", color: "white", fontSize: 18}}
                                      href="/companyofficer"> {language.drawerTitle}{"Cihan"} </a>}
                            onLeftIconButtonTouchTap={() => this.closeDrawerMenu()}/>
                        <div style={{textAlign: "center"}}>
                            <img alt="" src={UserPicture}
                                 style={{width: 60, height: 60, marginTop: 10}}/>
                        </div>
                        <SelectableList
                            value={this.state.selectedIndex}
                            onChange={(e, value) => this.handleSelectMenuItem(e, value)}>
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