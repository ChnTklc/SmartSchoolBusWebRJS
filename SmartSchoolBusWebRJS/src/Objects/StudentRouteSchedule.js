import Parent from './Parent';
import BusStation from './BusStation';
//import Frequency from './Frequency';
//import RouteDirection from './RouteDirection';

const StudentRouteSchedule = {
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
export default StudentRouteSchedule;