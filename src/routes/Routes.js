import express from 'express'
import RouterUsuarios from './Router.Usario.js'
import RouterFeedback from './Router.Feedback.js'

const routes = express.Router()

routes.use('/api/feedBack/', RouterUsuarios)
routes.use('/api/feedBack/', RouterFeedback)

export default routes