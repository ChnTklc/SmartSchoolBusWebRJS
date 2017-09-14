let Parent = require('./Parent').Parent;
let BusStation = require('./BusStation').BusStation;
//var Frequency = require('./Frequency').Frequency;
//var RouteDirection = require('./RouteDirection').RouteDirection;

export let StudentRouteSchedule = {
    id: 0,
    direction: 0,
    startDate: "",
    endDate: "",
    studentParents: [Parent],
    frequency: 0,
    frequencyEvery: 0,
    frequencyEveryOn: "",
    explanation: "",
    schoolBusId: 0,
    offDay: false,
    busStation: BusStation,
    routeBusStations: [BusStation],
};