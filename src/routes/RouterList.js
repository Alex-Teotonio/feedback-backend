import express from 'express'
import ListController from '../controller/controllerList.js';

const routes = express.Router();

routes.get('/list', ListController.allList)
routes.get('/list/:_id', ListController.listById)
routes.post('/list', ListController.newList)
routes.put('/list/:_id', ListController.updateList)
routes.delete('/list/:_id', ListController.removeList)

export default routes