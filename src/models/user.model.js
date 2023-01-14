import { database } from '../config/database.js'

const { container } = await database.containers.createIfNotExists({
    id: 'Users'
})

export default container

