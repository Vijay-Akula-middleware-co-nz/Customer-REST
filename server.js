const logger = require('./logger')
const express = require('express')
const app = express({logger:logger})

app.use(express.json())

const PORT = process.env.PORT || 3000

const routes = require('./src/main/routes')
app.use('/', routes)

//default route to 404
app.use((req,res) => {
    res.status(404).send('API Resource not found')
})

app.listen({ 'port': PORT }, () => {
    logger.info(`Server running on port ${PORT}`)
})