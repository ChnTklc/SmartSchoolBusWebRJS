import React from 'react';
import { Redirect } from 'react-router-dom';

class SchoolStaff extends React.Component {
    render() {
        if (window.localStorage.getItem('isLoggedInSchoolStaff') === 'false') {
            return (<Redirect to="/login" />);
        }
        return (
            <div>
            </div>
        );
    }
}
export default SchoolStaff;