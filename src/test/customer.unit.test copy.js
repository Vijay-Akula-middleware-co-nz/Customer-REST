//import { expect } from 'chai'

import { expect } from 'chai'
import request from 'supertest'
import app from '../customermgmtapi.js' // Assuming your file is named customermgmtapi.js

// Mock database and functions
let customersDB = []
let currentId = 1

const saveCustomer = (customer) => {
    const newCustomer = {
        id: currentId++,
        ...customer
    }
    customersDB.push(newCustomer)
    return newCustomer
}

const getCustomerById = (id) => {
    return customersDB.find(customer => customer.id === id)
}

describe('Customer Management Unit Tests', () => {
    beforeEach(() => {
        // Reset the mock database before each test
        customersDB = []
        currentId = 1
    })

    it('should save a customer correctly', () => {
        const customer = {
            firstName: 'Adam',
            lastName: 'Faulkner',
            employeeId: 32,
            address: '23 Albert Street'
        }
        const savedCustomer = saveCustomer(customer)

        expect(savedCustomer).to.have.property('id').that.equals(1)
        expect(customersDB.length).to.equal(1)
        expect(savedCustomer).to.deep.include(customer)
    })

    it('should retrieve a customer by ID', () => {
        const customer = {
            firstName: 'Adam',
            lastName: 'Faulkner',
            employeeId: 32,
            address: '23 Albert Street'
        }
        const savedCustomer = saveCustomer(customer)

        const retrievedCustomer = getCustomerById(savedCustomer.id)
        expect(retrievedCustomer).to.deep.equal(savedCustomer)
    })

    it('should return undefined for non-existent customer ID', () => {
        const retrievedCustomer = getCustomerById(999)
        expect(retrievedCustomer).to.be.undefined
    })
})
