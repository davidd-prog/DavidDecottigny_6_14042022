# HOT TAKES #

## Installation ##

Here are the dependancies you need to install:
- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

Back-end:
- Access the backend folder by running the command `cd backend` at the root of the project.
- Run the `npm install` command to install the dependencies from the backend folder.
- Configure your environment file by duplicating the `.env.example` file in the backend folder.
- Rename the duplicate file to `.env`, specify your connection url to your database inside this file
example: MONGO_URI='Connection URL to my MongoDB database'
- Launch your backend application by executing the command: `nodemon server` (if you have nodemon installed on your machine) or the command `node server`.

Front-end:
- Access the frontend folder by running the `cd frontend-old` command inside the project.
- Run the `npm install` command to install the dependencies from the backend folder.
- Run the `npm install --save-dev run-script-os` command.
- Launch your frontend application by running the `npm run start` command.

If your browser does not start or displays a 404 error, navigate to http://localhost:8080/.

The app should automatically reload when you make a change to a file.

Use Ctrl+C in the terminal to stop the local server.