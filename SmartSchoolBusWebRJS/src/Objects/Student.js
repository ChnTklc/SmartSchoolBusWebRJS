import React from 'react';
import School from './School';
import User from './User';
import Parent from './Parent';

const Student = {
    id: null,
    user: User,
    studentNo: "",
    class: "",
    schoolId: null,
    school: School,
    parents: [Parent],
};
export default Student;