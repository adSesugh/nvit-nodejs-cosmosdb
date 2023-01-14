// import http from 'http'
// import app from './src/app.js'

// const PORT = process.env.PORT || process.env.DEV_PORT

// const server = http.createServer(app);

// // server listening 
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

import express from 'express'
import cors from 'cors'

import cosmosClient, { DatabaseId } from './src/config/database.js'
import appRouter from './src/routes/index.js'
import swaggerDocs from './swagger.js'

const app = express()
const PORT = process.env.PORT || process.env.DEV_PORT

app.use(cors())
app.use(appRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, async () => {
	swaggerDocs(app, PORT)
	await cosmosClient.databases.createIfNotExists({ id: DatabaseId})
	console.log(`Server running on port ${PORT}`);
})


