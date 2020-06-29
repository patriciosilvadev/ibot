import express from 'express';

import ContactsController from './controllers/Contacts';
import GroupsController from './controllers/Groups';
import VenomController from './controllers/Venom';
import ReportsController from './controllers/Reports';

const routes = express.Router();
const contactsController = new ContactsController;
const groupsController = new GroupsController;
const venomController = new VenomController;
const reportsController = new ReportsController;

routes.get('/contacts', contactsController.index);
routes.get('/groups', groupsController.index);

routes.get('/venom', venomController.status);
routes.post('/venom', venomController.create);
routes.put('/venom', venomController.update);

routes.get('/reports/contacts', reportsController.contacts);

export default routes;