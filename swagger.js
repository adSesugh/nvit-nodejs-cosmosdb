import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs API and COSMOS DB ',
            description: 'Forgot Password API with nodejs and cosmos DB \n Following the steps as below',
            version: '1.0.0',
            name: 'Sesugh Agbadu',
            contact: {
                name: 'Sesugh Agbadu'
            }
        },
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.js', './src/controllers/*'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs