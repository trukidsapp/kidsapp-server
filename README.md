# kidsapp-api

REST API backend for Kids App

## Starting and stopping the API server

PM2 (https://github.com/Unitech/pm2) is used to manage the node process. With PM2 installed, from the directory the server is located in, the server can be started by running:

```pm2 start app.js --name kidsapp-api```

The server can be stopped by running:

```pm2 stop kidsapp-api```

## Routes

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