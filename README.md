# kidsapp-api

REST API backend for Kids App

## Starting and stopping the API server

PM2 (https://github.com/Unitech/pm2) is used to manage the node process. With PM2 installed, from the directory the server is located in, the server can be started by running:

```pm2 start app.js --name kidsapp-api```

The server can be stopped by running:

```pm2 stop kidsapp-api```

## Environment variables

```NODE_ENV``` set to `'development'` in development environment, `'production'` in production
 
```PORT``` Port number for the API to listen for requests on 

```KIDSAPPDBNAME``` Database name

```KIDSAPPDBUSER``` Database username

```KIDSAPPDBPW``` Database password

```KIDSAPPDBHOST``` Database host

```KIDSAPPDBPORT``` Database port

```KIDSAPPTOKENKEY``` Key for signing JSON Web Tokens

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