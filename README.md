There are two parts in this project:

1. Server side (in the "api" folder)
2. Client side (in the "client" folder)


In each folder run the "npm i" command to install all the dependencies.

To run the app(s) locally:

1. In the "api" folder run the "npm run start" command. This will start the API part on http://localhost:5000
2. In the "client" folder run the "npm run start" command. This will start the client part on http://localhost:3000

The app should be ready to use at this point.
Open http://localhost:3000 in the browser to use it.

There's also an up and runnig app at https://dnb.birenbergg.com

You can also run these app parts via docker by running "docker build" in each folder separately ("api" and "client") and creating containers from both of the images that you would create.
