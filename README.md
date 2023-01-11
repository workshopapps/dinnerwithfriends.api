
# Catch-Up (Backend Repo).

#### A web application that _reserves an event based on your friends and family consensus._

### API installation

To install this application, the following steps are to be followed;

1. Clone the API on your local machine.
2. Open your terminal and navigate to the directory of the cloned app on your local machine.
3. If you don't have yarn installed on your machine, run `npm install yarn -g` to install yarn.
4. Run `yarn install` to install all packages and dependencies the app will run on
5. Create a `.env` file on the root folder and save the database connection string to variable MONGO_URI and create a variable PORT with integer value.
6. Run `yarn dev` to run the application. Upon successfully, a message will show on the console showing your server is running on the specified port and database connection has been established.




## Endpoint Documentation

1. ### SIGN-UP:
[`https://catchup.hng.tech/api/v1/auth/signup`](https://catchup.hng.tech/api/v1/auth/signup)

This endpoint is responsible for accepting data from users that are new to the application and creating an account for them

2. ### SIGN-IN:
[`https://catchup.hng.tech/api/v1/auth/signin`](https://catchup.hng.tech/api/v1/auth/signin)

This endpoint is responsible for accepting data from the users and sign into the application after they must have created an account on the application

3. ### REFRESH:
[`https://catchup.hng.tech/api/v1/auth/refresh`](https://catchup.hng.tech/api/v1/auth/refresh)

This endpoint is responsible for refreshing the JWT needed to access the protected resources on the application

4. ### GENERATE RECOVER ACCOUNT TOKEN:
[`https://catchup.hng.tech/api/v1/auth/recover/generate`](https://catchup.hng.tech/api/v1/auth/recover/generate)

This endpoint is responsible for generating the token required for user to recover their account (Password Recovery)

5. ### GENERATE RECOVER TOKEN:
[`https://catchup.hng.tech/api/v1/auth/recover/confirm`](https://catchup.hng.tech/api/v1/auth/recover/confirm)

This endpoint is responsible for having the account recovery token generated sent to the user's email


6. ### GOOGLE AUTH URL:
[`https://catchup.hng.tech/api/v1/auth/google/url`](https://catchup.hng.tech/api/v1/auth/google/url)

This endpoint is responsible for login in to Google to interface with Google API for sign-up/Sign-in up with Google

7. ### GOOGLE AUTH X:
[`https://catchup.hng.tech/api/v1/auth/google`](https://catchup.hng.tech/api/v1/auth/google)

This link is responsible for getting user from Google

8. ### ADD EVENT:
[`https://api.catchup.hng.tech/api/v1/event`](https://catchup.hng.tech/api/v1/event)

This endpoint is responsible for creating an event by an event

9. ### GET ALL EVENT:
[`https://catchup.hng.tech/api/v1/event`](https://catchup.hng.tech/api/v1/event)

This endpoint is responsible for querying the event database and getting list of all events

10. ### GET AN EVENT:
[`https://catchup.hng.tech/api/v1/event/:id`](https://catchup.hng.tech/api/v1/event/:id)

This endpoint is responsible for retrieving information for a particular event

11. ### DELETE EVENT:
[`https://catchup.hng.tech/api/v1/event/:id`](https://catchup.hng.tech/api/v1/event/:id)

This endpoint is responsible for removing an event from the database by the host

12. ### UPDATE EVENT:
[`https://catchup.hng.tech/api/v1/event/:id`](https://catchup.hng.tech/api/v1/event/:id)

This endpoint is responsible for keeping record of an event in the event database up-to-date

13. ### GET SINGLE EVENT BY TOKEN:
[`https://api.catchup.hng.tech/api/v1/event/token/:id`](https://catchup.hng.tech/api/v1/event/token/:id)


14. ### ADD PARTICIPANT
[`https://catchup.hng.tech/api/v1/participant/addpart`](https://catchup.hng.tech/api/v1/participant/addpart)

This endpoint is responsible for creating a participant on the database

15. ### DELETE PARTICIPANT
[`https://catchup.hng.tech/api/v1/participant/delete/:id`](https://catchup.hng.tech/api/v1/participant/delete/:id)

This endpoint is responsible for removing a participants from an event

16. ### UPDATE PARTICIPANT
[`https://catchup.hng.tech/api/v1/participant/update/:id`](https://catchup.hng.tech/api/v1/participant/update/:id)

This endpoint is responsible for keeping a partcipant data up-to-date

17. ### Event RSVP:
[`https://catchup.hng.tech/api/v1/event/user/event`](https://catchup.hng.tech/api/v1/event/user/event)

This endpoint is responsible for getting all Decided events

18. ### Calendar:
[`https://catchup.hng.tech/api/v1/calendar/`](https://catchup.hng.tech/api/v1/calendar/)

This endpoint is responsible for syncing with google calendar




### SWAGGER API DOCUMENTATION

The following steps should be taken for effective use of the Catchup API Swagger documentation

Follow the guidelines below to make use of the swagger documentation on `https://catchup.hng.tech/api-docs`

1. First, you have to go to `https://catchup.hng.tech/api-docs` to gain access to the Catchup swagger API documentation


2. Once on the above route, there are 3 collections: auth, events and paricipants - housing the related endpoints

3. Select the production server

4. To test an endpoint, select a collection e.g auth. To access protected enpoint you will need to signup and then sign in and copy the access token from the response

5. After a successful sign in, click on the authorize button at the top right corner and input the access token in the provided field

6. Click on any of the displayed endpoints to learn more about it's use case

7. To run/test the endpoint click on the 'Try it out' button. This displays a preview page where you can modify/input parameters or the request body

8. For clarity, an example of the expected response is displayed iin the endpoint page

9. In the case of routes requiring parameters such as 'api/v1/:id' you can input the id in the provided id field

10. Once this is all set, click on the execute button to send a request to the enpoint

11. The server then sends response which is displayed in the response section right below the execute button.






