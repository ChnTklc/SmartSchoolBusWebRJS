export let Student = {
    id: 0,
    user: require('./User').User,
    studentNo: "",
    class: "",
    schoolId: 0,
    school: require('./School').School,
    parents: [require('./Parent').Parent],
    adress: [require('./StudentAdress').StudentAdress],
    serviceRoute: require('./StudentDailyRouteRelation').StudentDailyRouteRelation,
};