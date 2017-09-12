import React from 'react';
import Location from './Location';
import CompanyOfficerObj from './CompanyOfficerObj';
import SchoolStaffObj from './SchoolStaffObj';

const School = {
    name: "",
    location: Location,
    numberOfStudents: null,
    companyOfficers: [CompanyOfficerObj],
    schoolStaffs: [SchoolStaffObj]
};
export default School;