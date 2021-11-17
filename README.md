# message_posting_backend
NodeJs Express Backend with MongoDB for Authentication, Authorization and CRUD operations

```
git clone https://github.com/nikhilagarwal204/message_posting_backend.git
cd message_posting_backend
npm install
npm start
```

This is going to be the base URL now -> http://localhost:5050/

Postman Collection Documentation -> https://documenter.getpostman.com/view/15841040/UVCCd3Q7

First Register a user (by default it will be a Student)

After Login, a JWT Token is returned which will be used further in all the CRUD opeartions by passing it in Header as "x-access-token"
