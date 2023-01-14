import express from 'express'
import cors from 'cors'

import cosmosClient, { DatabaseId } from './config/database.js'
import appRouter from './routes/index.js'
import swaggerDocs from '../swagger.js'

const app = express()
const PORT = process.env.PORT || process.env.DEV_PORT

app.use(cors())
app.use(appRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

await cosmosClient.databases.createIfNotExists({ id: DatabaseId})
swaggerDocs(app, PORT)

export default app

