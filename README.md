# kidsapp-api

REST API backend for Kids App

## Starting and stopping the API server

PM2 (https://github.com/Unitech/pm2) is used to manage the node process. With PM2 installed, from the directory the server is located in, the server can be started by running:

```pm2 start app.js --name kidsapp-api```

The server can be stopped by running:

```pm2 stop kidsapp-api```

## Environment variables

```RESTPORT``` Port number for the API to listen for requests on 
