export let CompanyOfficerObj = {
    id: 0,
    user: require('./User').User,
    serviceCompanyIds: [0],
    serviceCompanies: [require('./ServiceCompany').ServiceCompany],
};