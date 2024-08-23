import express from 'express'
import RouterUsuarios from './Router.Usario.js'

const routes = express.Router()

routes.use('/api/feedBack/', RouterUsuarios)

export default routes