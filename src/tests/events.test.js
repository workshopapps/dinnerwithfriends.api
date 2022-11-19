const mongoose = require("mongoose")
const createServer = require("./testServer")
const dotenv = require("dotenv")
const Event = require("../models/event")
const supertest = require("supertest")

dotenv.config()

beforeEach(async (done) => {
    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser : true },
        () => done()
    )
})


afterEach((done) => {
    mongoose.connection.close(() => done())
})


const app = createServer()


// GET EVENTS

test("GET /EVENTS", async () => {
    const event = await Event.create({

        event_title : "Dinner with Oldboys",
        event_description : "Meeting up with the old boys of FUTO",
        location : "New york Times Square",
        event_type : "Hangout",
        participant_number : 26,
        start_date : "10/11/2022",
        end_date : "11/11/2022",
        host_prefered_time : "12:00 pm"

    })

    await supertest(app)
     .get("/api/v1/events")
     .expect(200)
     .then((response) => {

        // Check the response data

        expect(response.body[0]._id).toBe(event.id)
        expect(response.body[0].event_title).toBe(event.event_title)
        expect(response.body[0].event_description).toBe(event.event_description)
        expect(response.body[0].location).toBe(event.location)
        expect(response.body[0].participant_number).toBe(event.participant_number)

    })
})


// GET SINGLE EVENT

test("GET /api/v1/events/:id", async () => {
    const event = await Event.create({

        event_title : "Dinner with Oldboys",
        event_description : "Meeting up with the old boys of FUTO",
        location : "New york Times Square",
        event_type : "Hangout",
        participant_number : 26,
        start_date : "10/11/2022",
        end_date : "11/11/2022",
        host_prefered_time : "12:00 pm"

    })

    await supertest(app)
     .get("/api/v1/events" + event.id)
     .expect(200)
     .then((response) => {
        expect(response.body._id).toBe(event.id)
        expect(response.body.event_title).toBe(event.event_title)
        expect(response.body.event_description).toBe(event.event_description)
     })

})


// CREATE EVENT

test("POST /api/vi/events", async () => {
    const data = {

        event_title : "Dinner with Oldboys",
        event_description : "Meeting up with the old boys of FUTO",
        location : "New york Times Square",
        event_type : "Hangout",
        participant_number : 26,
        start_date : "10/11/2022",
        end_date : "11/11/2022",
        host_prefered_time : "12:00 pm"

    }

    await supertest(app)
     .post("/api/events")
     .send(data)
     .expect(200)
     .then(async (response) => {

        //Check the response

        expect(response.body._id).toBeTruthy()
        expect(response.body.event_title).toBe(data.event_title)
        expect(response.body.description).toBe(data.event_description)

        // Check in the database

        const event = await Event.findOne({_id: response.body.id})
        expect(event).toBeTruthy()
        expect(event.event_title).toBe(data.event_title)

     })
})


// UPDATE EVENT

test("PATCH /api/v1/events/:id", async () => {
    const event = await Event.create({

        event_title : "Dinner with Oldboys",
        event_description : "Meeting up with the old boys of FUTO",
        location : "New york Times Square",
        event_type : "Hangout",
        participant_number : 26,
        start_date : "10/11/2022",
        end_date : "11/11/2022",
        host_prefered_time : "12:00 pm"

    })

    const data = {
        event_title: "Lunch with Oldboys",
        event_description: "Having brunch with the OldBoys"
    }

    await supertest(app)
     .patch("/api/v1/events" + event.id)
     .send(data)
     .then(async (response) => {

        //Check the response

        expect(response.body._id).toBe(event.id)
        expect(response.body.event_title).toBe(data.event_title)
        expect(response.body.event_description).toBe(data.event_description)

        // Check If Event is in the database

        const newEvent = await Event.findOne({ _id: response.body._id })
        expect(newEvent).toBeTruthy()
        expect(newEvent.event_title).toBe(data.event_title)
        expect(newEvent.event_description).toBe(data.event_description)
     })
})


// DELETE EVENT

test("DELETE /api/v1/events/:id", async () => {
    const event = await Event.create({

        event_title : "Dinner with Oldboys",
        event_description : "Meeting up with the old boys of FUTO",
        location : "New york Times Square",
        event_type : "Hangout",
        participant_number : 26,
        start_date : "10/11/2022",
        end_date : "11/11/2022",
        host_prefered_time : "12:00 pm"

    })

    await supertest(app)
     .delete("/api/v1/events" + event.id)
     .expect(204)
     .then(async () => {
        expect(await Event.findOne({ _id: event.id })).toBeFalsy()
     })
})
