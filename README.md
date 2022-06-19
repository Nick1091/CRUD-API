# CRUD-API
### Clone repo
  - Git clone: https://github.com/Nick1091/CRUD-API.git
  - Select development branch
  - Npm i
### Scripts 
 - npm run start:dev -> The application is run in development mode
 - npm run start:prod -> The application is run in production mode, starts the build process with typescript and then runs the linked file
 - npm run build -> The application is run in production mode, starts the build process with webpack and then runs the linked file
 - npm run start:multi -> Runs multiple instances of application using Cluster API equal to the number of logical processor cores 
 - npm run test -> Starts running tests. 
 # Scoring: CRUD API

## Basic Scope

- [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- [x] **+10** **GET** `api/user` implemented properly
- [x] **+10** **GET** `api/user/${userId}` implemented properly
- [x] **+10** **POST** `api/user` implemented properly
- [x] **+10** **PUT** `api/user/{userId}` implemented properly(**all fields should be required**)
- [x] **+10** **DELETE** `api/user/${userId}` implemented properly
- [x] **+6** Users are stored in the form described in the technical requirements
- [x] **+6** Value of `port` on which application is running is stored in `.env` file

## Advanced Scope
- [x] **+30** Task implemented on Typescript 
- [x] **+10** Processing of requests to non-existing endpoints implemented properly
- [x] **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly(a)
- [x] **+10** Development mode: `npm` script `start:dev` implemented properly
- [x] **+10** Production mode: `npm` script `start:prod` implemented properly

## Hacker Scope
- [x] **+30** There are tests for API (not less than **3** scenarios)
- [x] **+30** There is horizontal scaling for application with a **load balancer**
