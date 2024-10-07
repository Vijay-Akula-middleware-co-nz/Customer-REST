const sinon = require("sinon");
const faker = require("faker");
const chai = require('chai')
const expect = chai.expect;
const CustomerModel = require("../main/controller")

describe("CustomerModel", function () {
    const stubValue = {
        id: Math.floor(Math.random() * 1000),
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        customerId: Math.floor(Math.random() * 1000),
        address: faker.name.findName(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    };

    describe("postInsertCustomer", function () {
        it("should add a new Customer to the db", async function () {
            const stub = sinon.stub(CustomerModel, "postInsertCustomer").returns(stubValue);
            const customerIn = { firstName: stubValue.firstName, lastName: stubValue.lastName, customerId: stubValue.customerId, address: stubValue.address }
            const customerOut = await CustomerModel.postInsertCustomer(customerIn);
            expect(stub.calledOnce).to.be.true;
            expect(customerOut.firstName).to.equal(stubValue.firstName);
            expect(customerOut.lastName).to.equal(stubValue.lastName);
            expect(customerOut.customerId).to.equal(stubValue.customerId);
            expect(customerOut.address).to.equal(stubValue.address);
            console.log(customerOut.customerId)

        });
    });

    describe("getCustomerById", function () {
        it("should retrueve a Customer from the db", async function () {
            const stub = sinon.stub(CustomerModel, "getCustomerById").returns(stubValue);
            const customerOut = await CustomerModel.getCustomerById(stubValue.customerId);
            expect(stub.calledOnce).to.be.true;
            expect(customerOut.firstName).to.equal(stubValue.firstName);
            expect(customerOut.lastName).to.equal(stubValue.lastName);
            expect(customerOut.customerId).to.equal(stubValue.customerId);
            expect(customerOut.address).to.equal(stubValue.address);
            console.log(customerOut.customerId)

        });
    });
})