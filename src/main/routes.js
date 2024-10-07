
const express = require("express")
const { postInsertCustomer, getCustomerById } = require("./controller")
const router = express.Router()

router.post('/customers', postInsertCustomer)
router.get('/customers/:id', getCustomerById)

module.exports = router