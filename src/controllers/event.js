const asyncHandler = require('express-async-handler');
const { Event, Participant, ParticipantCount, User } = require('../models');
const { createEventSchema } = require('../validators');
const services = require('../services');
const { AppError } = require('../utilities');


const processBatch = async (arr) => {
  const l_arr = []
  for(const item of arr){
    const tmp_ckeckId = await item['user_id'].toString()
    const tmp_host_info = await User.findById(tmp_ckeckId)
    l_arr.push({...item['_doc'], 'host_info': {...tmp_host_info['_doc']}});
  }
  return l_arr
}
// Get All Events Controller
// Get All Events Controller
const getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ user_id: req.user._id })
    .populate('host_info', 'name')
    .select('-password')
    .exec();
  const message = 'Successfully fetched events';
  return services.createSendData(events, 'success', message, res);
});

// Get Single Event Controller
const getSingleEvent = asyncHandler(async (req, res, next) => {
  const event_id = req.params.id;
  const event = await Event.findOne({ _id: event_id })
    .populate('host_info', 'name')
    .select('-password')
    .exec();
  if (!event) {
    return next(new AppError('No event with ID found', 404));
  }
  const message = 'Successfully fetched event';
  return services.createSendToken(event, 'success', message, res);
});

// get all User Event

const getUserEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.find({ user_id: req.user._id });
  return services.createSendToken(event, 'success', message, res);
});

// Get Single Event By Token
const getSingleEventByToken = asyncHandler(async (req, res, next) => {
  const event_id = services.protectEvent(req.params.id);

  const event = await Event.findOne({ _id: event_id })
    .populate('host_info', 'name')
    .select('-password')
    .exec();
  if (!event) {
    return next(new AppError('No event with ID found', 404));
  }
  const message = 'Successfully fetched event';
  return services.createSendToken(event, 'success', message, res);
});

// Delete Single Event Controller
const deleteEvent = asyncHandler(async (req, res, next) => {
  const event_id = req.params.id;
  const event = await Event.findByIdAndDelete(event_id);
  if (!event) {
    return next(new AppError('No event with ID found', 404));
  }
  const message = 'Successfully Deleted event';
  return services.createSendToken(null, 'success', message, res);
});

// Update Event Controller
const updateEvent = asyncHandler(async (req, res, next) => {
  const event_id = req.params.id;
  Event.find({ event_id, user_id: req.user._id }, req.body, 
    async(err, data) => {
    if (err) {
      return services.createSendToken({}, 'error', err, res);
    }
    
    const ckeckId = data['user_id'].toString()
    const host_info = await User.findById(ckeckId)
    const the_data = {...data['_doc'], 'host_info': {...host_info['_doc']}};

    const message = 'Successfully Updated event';
    return services.newEventToken(the_data, 'success', message, res);
  });
});

// Create One Controller
const addEvent = asyncHandler(async (req, res, next) => {
  const {
    end_date,
    start_date,
    event_title,
    event_description,
    location,
    event_type,
    participant_number,
    host_prefered_time,
  } = req.body;

  const validateUserInput = createEventSchema.validate({
    end_date,
    start_date,
    event_title,
    event_description,
    location,
    event_type,
    participant_number,
    host_prefered_time,
    user_id: req.user._id,
  });

  if (validateUserInput.error) {
    let message = '';
    if (
      validateUserInput.error.details[0].path[0] === 'end_date' ||
      validateUserInput.error.details[0].path[0] === 'start_date'
    )
      message = 'A date field is required';
    if (validateUserInput.error.details[0].path[0] === 'event_title')
      message =
        'Title has to start with a letter, can contain numbers and underscores, must be at least 3 characters.';
    return services.createSendToken(
      {},
      'error',
      validateUserInput.error.details[0],
      res
    );
  }

  const eventData = {
    end_date,
    start_date,
    event_title,
    event_description,
    location,
    event_type,
    participant_number,
    host_prefered_time,
    user_id: req.user._id,
  };
  const event = await new Event(eventData).save();
  const participantData = {
    event_id: event._id,
    email: req.user.email,
    preferred_date_time: host_prefered_time,
    fullname: req.user.name,
  };

  const participantCountData = {
    event_id: event._id,
    participant_count: 1,
  };

  
  const ckeckId = event['user_id'].toString()
  const host_info = await User.findById(ckeckId)
  const the_data = {event, 'host_info': {...host_info['_doc']}};

  await new Participant(participantData).save();
  await new ParticipantCount(participantCountData).save();
  const message = 'New Event created successfully';
  return services.newEventToken(the_data, 'success', message, res);
});

const getEventParticipants = asyncHandler(async (req, res, next) => {
  const event_id = req.params.id;
  const event = await Event.findById(event_id);
  if (!event) {
    return next(new AppError('No event with ID', 404));
  }

  const message = "Successfully fetched events participants"
  const eventParticipants = await Participant.find({ event_id: event_id });
  return services.createSendData(eventParticipants, 'success', message, res);
});

const cancelEvent = asyncHandler(async (req, res, next) => {
  const event_id = req.params.id;
  const event = await Event.findByIdAndUpdate(
    { _id: event_id },
    {
      published: 'cancelled',
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!event) {
    return next(new AppError('No event with ID', 404));
  }
  const message = 'Successfully cancelled event';
  return services.newEventToken(event, 'success', message, res);
});

module.exports = {
  getAllEvents,
  addEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  getSingleEventByToken,
  getEventParticipants,
  getUserEvent,
  cancelEvent,
};
