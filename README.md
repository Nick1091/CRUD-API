# CRUD-API
  This application is a simulation of queries (CRUD), where you can check its work with "POSTMAN"
### How to install app
  - ```git clone: https://github.com/Nick1091/CRUD-API.git```
  - Select develop branch
  - ```npm i```
### Scripts 
 - ```npm run start:dev``` -> The application is run in development mode
 - ```npm run start:prod``` -> The application is run in production mode, starts the build process with typescript and then runs the linked file
 - ```npm run build``` -> The application is run in production mode, starts the build process with webpack and then runs the linked file
 - ```npm run start:multi``` -> Runs multiple instances of application using Cluster API equal to the number of logical processor cores 
 - ```npm run test``` -> Starts running tests. 
### API
  > Implemented endpoints: ```api/users```
- **GET** `api/user` - to get all users
- **GET** `api/user/${userId}` to get all user by id
- **POST** `api/user` to create record about user and store it in `in-memory-database`
- **PUT** `api/user/{userId}` to update existing user(**`all fields should be required`**)
- **DELETE** `api/user/${userId}` to delete existing user from `in-memory-database`
### User`s required fields:
- username - user`s name (string, **required**)
- age - user`s age (number, **required**)
- hobbies - user`s hobbies (array of string or empty array, **required**)
#### example body request :
```{
    "username":"Name",
    "age": 50,
    "hobbies": ["football"]
}
