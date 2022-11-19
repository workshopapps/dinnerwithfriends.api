


# Catch-Up (Backend Repo).

#### A web application that _reserves an event based on your friends and family consensus._

### API installation

To install this application, the following steps are to be followed;

1. Clone the API on your local machine
2. Open your terminal and navigate to the directory of the cloned app on your local machine
3. Run `npm install yarn` -y to install yarn on your local machine
4. Run `yarn install` to install all packages and dependencies the app will run on
5. Create a `.env` file on the root folder and save the database connection string to variable MONGO_URI
6. Run `npm run dev to run the application




## Endpoint Documentation

1. ### SIGN-UP:

This endpoint is responsible for accepting data from users that are new to the application and creating an account for them

2. ### SIGN-IN:

This endpoint is responsible for accepting data from the users and sign into the application after they must have created an account on the application

3. ### REFRESH:

This endpoint is responsible for refreshing the JWT needed to access the protected resources on the application

4. ### GENERATE RECOVER TOKEN:

This endpoint is responsible for generating the newly generated JWT needed to access protected resources on the application

5. ### GENERATE RECOVER ACCOUNT TOKEN:

This endpoint is responsible for generating JWT for an account after password recovery

6. ### ADD EVENT:

This endpoint is responsible for creating an event by an event

7 ### GET ALL EVENT:

This endpoint is responsible for querying the event database and getting list of all events

8. ### GET AN EVENT:

This endpoint is responsible for retrieving information for a particular event

9 ### DELETE EVENT:

This endpoint is responsible for removing an event from the database by the host

10. ### UPDATE EVENT:

This endpoint is responsible for keeping record of an event in the event database up-to-date

11 ### GET SINGLE EVENT BY TOKEN:

This endpoint is responsible for getting an event by using the token






