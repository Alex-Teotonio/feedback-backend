import express from 'express'
import { connection } from './database/connection.js'
import routes from './routes/Routes.js'

const app = express()

const PORT = 3005

app.use(express.json())
app.use(routes)


// Conectar ao MongoDB
connection().catch(console.error)

app.listen(PORT , () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})