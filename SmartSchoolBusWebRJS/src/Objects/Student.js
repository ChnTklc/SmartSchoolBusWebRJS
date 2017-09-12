var School = require('./School').default;
var User = require('./User').default;
var Parent = require('./Parent').default;
var StudentAdress = require('./StudentAdress').default;
var StudentDailyRotueRelation = require('./StudentDailyRotueRelation').default;

const Student = {
    id: 0,
    user: User,
    studentNo: "",
    class: "",
    schoolId: 0,
    school: School,
    parents: [Parent],
    adress: [StudentAdress],
    serviceRoute: StudentDailyRotueRelation,
};
export default Student;