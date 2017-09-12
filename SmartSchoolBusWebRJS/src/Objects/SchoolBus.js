import ServiceBus from './ServiceBus';
import ServiceBusDriver from './ServiceBusDriver';
import Hostess from './Hostess';
import Contract from './Contract';

const SchoolBus = {
    id: 0,
    contractId: 0,
    serviceBusId: 0,
    serviceBusDriverId: 0,
    hostessId: 0,
    serviceBus: ServiceBus,
    serviceBusDriver: ServiceBusDriver,
    hostess: Hostess,
    contract: Contract,
};
export default SchoolBus;