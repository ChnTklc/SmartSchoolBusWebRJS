import Location from './Location';
import CompanyOfficerObj from './CompanyOfficerObj';
import SchoolStaffObj from './SchoolStaffObj';

const School = {
    id: 0,
    name: "",
    location: Location,
    numberOfStudents: 0,
    companyOfficers: [CompanyOfficerObj],
    schoolStaffs: [SchoolStaffObj]
};
export default School;