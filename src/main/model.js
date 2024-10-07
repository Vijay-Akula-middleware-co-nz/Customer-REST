const { type } = require("express/lib/response")
const logger = require('./../../logger')
const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    storage: './sqlitedata/database.sqlite',
    dialect: 'sqlite'
})

sequelize.authenticate().then(() => {
    console.log('Database Connection has been established successfully.')
}).catch((err) => {
    console.error("failed to establish connection")
    logger.error(err)
})
//employeeId has been renamed to customerId
const Customer = sequelize.define('Customer', {
    'firstName': {
        type: Sequelize.STRING
    },
    'lastName': {
        type: Sequelize.STRING
    },
    'customerId': {
        type: Sequelize.INTEGER,
        unique: true
    },
    'address': {
        type: Sequelize.STRING
    }
})

sequelize.sync().then(() => {
    console.log('Database has been Syncronised successfully.')
}
).catch((err) => {
    console.error('Database has not been Syncronised successfully.', err)
})

module.exports = Customer