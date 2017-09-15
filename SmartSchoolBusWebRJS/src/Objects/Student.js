import StudentPicture from '../assets/studentDefaultPicture.jpg';

export let Student = {
    id: 0,
    user: {
        id: 0,
        username: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: 0,
        ssn: "",
        role: "",
        photo: {
            contents: StudentPicture,
            mimeType: "",
        },
    },
    studentNo: "",
    classNo: "",
    schoolId: 0,
    school: {
        id: 0,
        name: "",
        location: {
            address: "",
            latitude: 0,
            longitude: 0,
        },
        numberOfStudents: 0,
        companyOfficers: [{
            id: 0,
            user: {
                id: 0,
                username: "",
                password: "",
                name: "",
                surname: "",
                phoneNumber: 0,
                ssn: "",
                role: "",
                photo: {
                    contents: "",
                    mimeType: "",
                },
            },
            serviceCompanyIds: [], // number array
            serviceCompanies: [{
                id: 0,
                name: "",
                location: {
                    address: "",
                    latitude: 0,
                    longitude: 0,
                },
            }], // ServiceCompany object array
        }], // CompanyOfficerObj object array
        schoolStaffs: [{
            id: 0,
            user: {
                id: 0,
                username: "",
                password: "",
                name: "",
                surname: "",
                phoneNumber: 0,
                ssn: "",
                role: "",
                photo: {
                    contents: "",
                    mimeType: "",
                },
            },
            schoolId: 0,
        }] //SchoolStaffObj object array
    },
    parent: [{
        id: 0,
        user: {
            id: 0,
            username: "",
            password: "",
            name: "",
            surname: "",
            phoneNumber: 0,
            ssn: "",
            role: "",
            photo: {
                contents: "",
                mimeType: "",
            },
        },
        studentId: 0,
        relationship: 0,
    }], //Parent object array
    address: [{
        id: 0,
        studentId: 0,
        location: {
            address: "",
            latitude: 0,
            longitude: 0,
        },
        name: "",
        isActive: false,

    }], //StudentAddress array
    serviceRoute: {
        date: "",
        getOn: {
            id: 0,
            direction: 0,
            startDate: "",
            endDate: "",
            studentParents: [{
                id: 0,
                user: {
                    id: 0,
                    username: "",
                    password: "",
                    name: "",
                    surname: "",
                    phoneNumber: 0,
                    ssn: "",
                    role: "",
                    photo: {
                        contents: "",
                        mimeType: "",
                    },
                },
                studentId: 0,
                relationship: 0,
            }], // Parent object array
            frequency: 0,
            frequencyEvery: 0,
            frequencyEveryOn: "",
            explanation: "",
            schoolBusId: 0,
            offDay: false,
            busStation: {
                order: 0,
                location: {
                    address: "",
                    latitude: 0,
                    longitude: 0,
                },
            },
            busStationsOnRoute: [{
                order: 0,
                location: {
                    address: "",
                    latitude: 0,
                    longitude: 0,
                },
            }], // BusStation object array
        },
        getOff: {
            id: 0,
            direction: 0,
            startDate: "",
            endDate: "",
            studentParents: [{
                id: 0,
                user: {
                    id: 0,
                    username: "",
                    password: "",
                    name: "",
                    surname: "",
                    phoneNumber: 0,
                    ssn: "",
                    role: "",
                    photo: {
                        contents: "",
                        mimeType: "",
                    },
                },
                studentId: 0,
                relationship: 0,
            }], // Parent object array
            frequency: 0,
            frequencyEvery: 0,
            frequencyEveryOn: "",
            explanation: "",
            schoolBusId: 0,
            offDay: false,
            busStation: {
                order: 0,
                location: {
                    address: "",
                    latitude: 0,
                    longitude: 0,
                },
            },
            busStationsOnRoute: [{
                order: 0,
                location: {
                    address: "",
                    latitude: 0,
                    longitude: 0,
                },
            }], // BusStation object array
        },
    },
};