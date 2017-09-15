export let SchoolBus = {
    id: 0,
    contractId: 0,
    serviceBusId: 0,
    serviceBusDriverId: 0,
    hostessId: 0,
    serviceBus: {
        id: 0,
        serviceCompanyId: 0,
        plateNumber: "",
        capacity: 0,
    },
    serviceBusDriver: {
        id: 0,
        serviceCompanyIds: [], // number array
    },
    hostess: {
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
    },
    contract: {
        id: 0,
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
            }] // SchoolStaffObj object array
        },
        schoolId: 0,
        serviceCompanyId: 0,
        serviceCompany: {
            id: 0,
            name: "",
            location: {
                address: "",
                latitude: 0,
                longitude: 0,
            },
        },
    },
};