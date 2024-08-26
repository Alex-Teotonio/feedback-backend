import express from 'express'
import ControllerFeedback from '../controller/ControllerFeedback.js'
import upload from '../middlewares/multerConfig.js'

const routes = express.Router()

routes.get('/home', ControllerFeedback.getAllFeedback)
routes.get('/home', ControllerFeedback.getOneFeedback)
routes.post('/usuarios/addfeedback', upload.array('media', 5), ControllerFeedback.submitFeedback)
routes.put('/usuarios/addfeedback/:_id', ControllerFeedback.updateFeedback)
routes.delete('/usuarios/addfeedback/:_id', ControllerFeedback.deleteFeedback)

export default routes