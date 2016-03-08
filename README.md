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

###Student

####Create a student

`POST /students`

Create a student. 
Example request:

```
POST http://hostname:8080/api/students
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
	"message" : "inserted student successfully"
}
```

####Get all students

`GET /students`

Gets all students. 
Example request:

```
GET http://hostname:8080/api/students
{   

}
```

Response: 

```
200 OK
[
	{
		"id": 1,
		"username":"timmy",
		"lastName":"Tester",
		"firstName":"Timmy",
		"password":"Password",
		"ClassId":null
	}
]
```
