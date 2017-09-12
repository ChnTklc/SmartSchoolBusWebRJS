import School from './School';
import User from './User';
import Parent from './Parent';
import StudentAdress from './StudentAdress';
import StudentDailyRotueRelation from './StudentDailyRotueRelation';

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