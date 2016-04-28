# kidsapp-api

REST API backend for Kids App

## Deploying the kidsapp server

While the server runs really well on Heroku, it can be deployed as a node server on the platform of your choice. 
The steps required to deploy on your own server may vary, but should include:

* Ensuring you have a database configured for the API (see "Data Access")
* Ensuring that you have the required environment variables set for your particular environment (see "Environment Variables")

## Data access

The API uses the Sequelize ORM (on top of PostgreSQL, currently), and can be modified for use on other SQL database management systems with minmal code changes. Simply replace the Postgres driver node module with the one of your choice that works with Sequelize, and modify the Seqelize config in `/models/index.js` to suit.

For more about how to use Sequelize to manage our model, check out http://docs.sequelizejs.com/en/latest/

## Environment variables

```NODE_ENV``` set to `'development'` in development environment, `'production'` in production
 
```PORT``` Port number for the API to listen for requests on 

```KIDSAPPDBNAME``` Database name

```KIDSAPPDBUSER``` Database username

```KIDSAPPDBPW``` Database password

```KIDSAPPDBHOST``` Database host

```KIDSAPPDBPORT``` Database port

```KIDSAPPTOKENKEY``` Key for signing JSON Web Tokens

##Running the Server
Once your environment is properly configured:

1. Install dependencies with `npm install`
2. Start the server with `npm start`

#API Routes

## Authentication

All routes require a token obtained after successfully authenticating with the API as follows:
 
```
POST http://hostname:port/api/authenticate
{
	"username" : "mrahman",
	"password" : "password123",
	"userType" : "teacher"
} 
```

If your credentials are correct, the response will contain the token:

```
200 OK
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0ZXZlMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE0NTQ2NDgwNzgsImV4cCI6MTQ1NDY5MTI3OH0.02e-AVwszPBKMp-78ubmnujkmkKk1Rov1LCYM09m4sY"
}
```

This token must be passed in an `api-token` header with any subsequent requests to the API.


## Routes
All require a token (see above) for authentication.

### Student

#### Get all students

`GET /classes/:classId/students`

Request:

```
GET http://HOSTNAME:PORTNUMBER/api/classes/CLASSID/students
{   

}
```

Response: 

```
200 OK
[
  {
    "username": "gregwee",
    "lastName": "Wee",
    "firstName": "Greg",
    "classId": 2
  },
  {
    "username": "tasdasd",
    "lastName": "Thomas",
    "firstName": "Master",
    "classId": 2
  }
]
```

#### Get a student by id

`GET /classes/:classId/students/:studentId`

Request:

```
GET http://HOSTNAME:PORTNUMBER/api/classes/CLASSID/students/STUDENTID
{   

}
```

Response: 

```
200 OK
{
  "username": "gregwee",
  "firstName": "Greg",
  "lastName": "Wee",
  "ClassId": 2
}
```

#### Create a student

`POST /classes/:classId/students`

Request:

```
POST http://HOSTNAME:PORTNUMBER/api/classes/CLASSID/students
{   
	"username" : "timmy",
	"firstName" : "Timmy",
	"lastName" : "Tester",
	"password" : "Password"
}
```

Response: 

```
200 OK
{
  "message": "Inserted student successfully"
}
```

#### Delete a student

`DELETE /classes/:classId/students/:studentId`

Request:

```
DELETE http://HOSTNAME:PORTNUMBER/api/classes/CLASSID/students/STUDENTID
{   

}
```

Response: 

```
200 OK
{
  "message": "Deleted student successfully"
}
```

#### Update a student

`PUT /classes/:classId/students/:studentId`

Request:

```
PUT http://HOSTNAME:PORTNUMBER/api/classes/CLASSID/students/STUDENTID
{   
    "username" : "updatedKingbro",
    "firstName" : "Bob",
    "lastName" : "McGoy",
    "password" : "password1"
}
```

Response: 

```
200 OK
{
  "message": "Updated student successfully"
}
```

### Classes
#### Get all classes
#### Get a class by id
#### Create a class
#### Delete a class
#### Update a class

### Question
#### Get all questions
#### Get a question by id
#### Create a question
#### Delete a question
#### Update a question

### Answer
#### Get all answers for a question
#### Get specific answer for a question
#### Create an answer for a question
#### Delete an answer for a question
#### Update an answer for a question

### Results
#### Get all results for a student
#### Get specific result for a student
#### Create a result for a question for a student
#### Delete a result for a question for a student
#### Update a result for a question for a student

### Teacher
#### Get all teachers
#### Get a teacher by id
#### Create a teacher
#### Delete a teacher
#### Update a teacher
#### Update a teacher's password

### Class Quizzes
#### Associate a quiz and a class
#### Get all quizzes associated with a class
#### 

### Quiz Questions



