const {Event} = require("./../models");
const {createEventSchema} = require("../validators")
const asyncHandler = require("express-async-handler")
const services = require("../services")

// Get All Events Controller
const getAllEvents = asyncHandler(async (req, res, next) => {
    Event.find(function(err, data) {
        if(err){
            return services.createSendToken({}, 'error', err, res);
        }
        else{
            const message = 'Successfully fetched events';
            return services.newEventToken(data, 'success', message, res);
        }
    });  
  });

// Get Single Event Controller
const getSingleEvent = asyncHandler(async (req, res, next) => {
    const {event_id} = req.body;
    Event.findOne({_id: event_id}, 
    function(err, data) {
        if(err){
            return services.createSendToken({}, 'error', err, res);
        }
        else{
            const message = 'Successfully fetched event';
            return services.newEventToken(data, 'success', message, res);
        }
    });    
  });

// Delete Single Event Controller
const deleteEvent = asyncHandler(async (req, res, next) => {
    const {event_id} = req.body;
    Event.findByIdAndDelete((event_id), 
    function(err, data) {
        if(err){
            return services.createSendToken({}, 'error', err, res);
        }
        else{
            const message = 'Successfully Deleted event';
            return services.newEventToken(data, 'success', message, res);
        }
    });  
  });

// Update Event Controller
const updateEvent = asyncHandler(async (req, res, next) => {
    const {event_id, new_data} = req.body;
    Event.findByIdAndUpdate(event_id, 
        new_data, function(err, data) {
            if(err){
                return services.createSendToken({}, 'error', err, res);
            }
            else{
                const message = 'Successfully Deleted event';
                return services.newEventToken(data, 'success', message, res);
            }
        });  
  });

// Create One Controller
const addEvent = asyncHandler(async (req, res, next) => {
    const {end_time, start_time, title, description, location, participant_id, time_slots, user_id} = req.body;

    const validateUserInput = createEventSchema.validate({ end_time, start_time, title });
  
    // if (validateUserInput.error) {
    //   let message = '';
    //   if (validateUserInput.error.details[0].path[0] === 'end_time' || validateUserInput.error.details[0].path[0] === 'start_time') message = 'A date field is required';
    //   if (validateUserInput.error.details[0].path[0] === 'title') message = 'Title has to start with a letter, can contain numbers and underscores, must be at least 3 characters.';
    //   return services.createSendToken({}, 'error', message, res);
    // }

    var eventData = {
            end_time,
            start_time,
            title,
            description,
            location,
            participant_id,
            time_slots,
            user_id
        }

        const event = await new Event(eventData).save();
        const message = 'New Event created successfully';
        return services.newEventToken(event, 'success', message, res);
  });

  

  module.exports = {
    getAllEvents,
    addEvent,
    getSingleEvent,
    deleteEvent,
    updateEvent
  }


