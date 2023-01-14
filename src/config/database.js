import { CosmosClient } from "@azure/cosmos";
import * as dotenv from 'dotenv'
dotenv.config()

const ENDPOINT = process.env.COSMOS_ENDPOINT
const KEY = process.env.COSMOS_KEY

export const DatabaseId = process.env.COSMOS_DATABASE_ID

const cosmosClient = new CosmosClient({
    endpoint: ENDPOINT,
    key: KEY
})

export const { database } = await cosmosClient.databases.createIfNotExists({
    id: DatabaseId
});

export default cosmosClient