import express from 'express'
import { connection } from './database/connection.js'
import routes from './routes/Routes.js'
import path from 'path'

const app = express()

const PORT = 3005

app.use(express.json())
app.use(routes)

app.use(express.urlencoded({ extended: true }))

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.resolve('uploads')))


// Conectar ao MongoDB
connection().catch(console.error)

app.listen(PORT , () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})