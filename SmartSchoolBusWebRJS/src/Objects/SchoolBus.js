import React from 'react';
import ServiceBus from './ServiceBus';
import ServiceBusDriver from './ServiceBusDriver';
import Hostess from './Hostess';
import Contract from './Contract';

const SchoolBus = {
    id: null,
    contractId: null,
    serviceBusId: null,
    serviceBusDriverId: null,
    hostessId: null,
    serviceBus: ServiceBus,
    serviceBusDriver: ServiceBusDriver,
    hostess: Hostess,
    contract: Contract,
};
export default SchoolBus;