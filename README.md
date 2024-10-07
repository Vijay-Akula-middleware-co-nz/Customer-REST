# Node.js Customer Project
This project is a simple Node.js backend built with Express to insert and retrieve Customer details into and from an in-memory database SQLite.

The following table shows overview of the Rest APIs that will be exported:

- POST     `customers`	          Inserts a valid customer into the Database
- GET     `customers/:id`         Retrieves customer's details when a valid CustomerId is supplied


### Prerequisites
Make sure you have Node.js and npm installed on your machine. Then, install the project's dependencies with:
```
npm install
```
### Start the Application
You can then launch the application locally with:
```
npm start

The REST API by default uses port 3000
```
### Insert a Customer

POST  {"firstName": "Ram","lastName": "Krishna","customerId": 108,"address": "108 Delhi"}
to the endpoint http://localhost:3000/customers
---
### Retrieve a Customer
curl http://localhost:3000/customers/1