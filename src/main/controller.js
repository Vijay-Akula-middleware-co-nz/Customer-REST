const Customer = require("./model")
const logger = require('./../../logger')

/* 
    This function valdates the Customer Id to be number and then attempts to retrieve customer details
    via the model, if customer exists all deatils in the DB are sent otherwise error is mapped as per the OpenAPI spec
*/
exports.getCustomerById = async (req, res) => {
    const customerId = parseInt(req.params.id)

    // Validate customer ID
    if (isNaN(customerId)) {
        return res.status(400).json({
            fault: {
                code: 'badRequest',
                httpStatus: 400,
                message: 'Invalid customer Id, it has to be integer',
                serverDateTime: new Date().toISOString(),
                failures: []
            }
        })
    }

    const cust = await Customer.findOne({
        raw: true, //would return just the data and not the model instance
        where: {
            customerId: customerId
        }
    }).catch(err => {
        logger.error(err);        
        res.status(500).send({
            message: err.message || "Some error occurred while getting the Customer."
        })
    })
    if (cust === null) {
        return res.status(400).json({ //This should have been 404/204 but it's not specified in the OpenAPI spec 
            fault: {
                code: 'badRequest',
                httpStatus: 400,
                message: 'You have supplied invalid request details',
                serverDateTime: new Date().toISOString(),
                failures: [{ message: 'Customer not found' }]
            }
        })
    } else {
        res.status(200).json({
            customer: cust
        })
    }
}

/* 
    This function performs input valdation and then inserts a customer row via model, any failures are 
    mapped as per the OpenAPI spec
*/
exports.postInsertCustomer = async (req, res) => {
    // this should have been done by automatic OpenAPI spec validation buy I ran into errors with express-openapi-validator module 
    if (!req.body.firstName || !req.body.lastName || !req.body.customerId || !req.body.address) {
        return res.status(400).json({
            fault: {
                code: 'badRequest',
                httpStatus: 400,
                message: 'You have supplied invalid request details',
                serverDateTime: new Date().toISOString(),
                failures: [{ message: 'Missing mandatory input' }] // if needed more specific error has to added
            }
        })
    }
    // insert the customer
    await Customer.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Created successfully',
                customer: data
            })
        })
        .catch(err => {
            //No need to error log here
            if (err.name == 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    fault: {
                        code: 'badRequest',
                        httpStatus: 400,
                        message: 'You have supplied invalid request details',
                        serverDateTime: new Date().toISOString(),
                        failures: err.errors
                    }
                })
            } else {
                logger.error(err);
                return res.status(500).json({
                    fault: {
                        code: 'internalError',
                        httpStatus: 400,
                        message: 'An internal error was encountered processing the request',
                        serverDateTime: new Date().toISOString(),
                        failures: err.errors
                    }
                })
            }
        })
}