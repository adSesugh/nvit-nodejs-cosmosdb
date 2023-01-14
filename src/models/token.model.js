import { database } from '../config/database.js'

const { container } = await database.containers.createIfNotExists({
    id: 'Tokens'
})

export default container
