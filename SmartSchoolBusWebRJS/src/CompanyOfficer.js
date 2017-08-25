import React from 'react';
import { Redirect } from 'react-router-dom';

class CompanyOfficer extends React.Component {
    render() {
        if (window.localStorage.getItem('isLoggedInCompanyOfficer') === 'false') {
            return (<Redirect to="/login" />);
        }
        return (
            <div>
            </div>
        );
    }
}
export default CompanyOfficer;