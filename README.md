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


A glimpse of the MongoDB backend database having 2 collections namely "users" and "messages":

<img width="263" alt="Screenshot 2021-11-18 at 3 38 56 AM" src="https://user-images.githubusercontent.com/45812764/142290463-f53de80e-19e5-4d96-a699-2fc807658dc3.png">

To use your own MongoDB, you have to just substitute the DATABASE varibale with your MongoDB URI inside the _config.env_ file. 
