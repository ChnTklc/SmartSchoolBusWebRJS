export let StudentDailyRouteRelation = {
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
};