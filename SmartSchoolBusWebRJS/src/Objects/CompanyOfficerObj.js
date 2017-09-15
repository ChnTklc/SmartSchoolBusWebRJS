export let CompanyOfficerObj = {
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
};