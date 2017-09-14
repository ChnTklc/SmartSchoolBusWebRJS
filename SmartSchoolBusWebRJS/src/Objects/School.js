export let School = {
    id: 0,
    name: "",
    location: require('./Location').Location,
    numberOfStudents: 0,
    companyOfficers: [require('./CompanyOfficerObj').CompanyOfficerObj],
    schoolStaffs: [require('./SchoolStaffObj').SchoolStaffObj]
};