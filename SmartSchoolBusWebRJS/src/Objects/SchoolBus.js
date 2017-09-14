export let SchoolBus = {
    id: 0,
    contractId: 0,
    serviceBusId: 0,
    serviceBusDriverId: 0,
    hostessId: 0,
    serviceBus: require('./ServiceBus').ServiceBus,
    serviceBusDriver: require('./ServiceBusDriver').ServiceBusDriver,
    hostess: require('./Hostess').Hostess,
    contract: require('./Contract').Contract,
};