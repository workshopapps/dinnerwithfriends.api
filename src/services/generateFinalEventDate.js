const { Event, ParticipantCount, Participant } = require('../models');

const convertIsoToMiliseconds = (string) => {
  const myDate = new Date(string).getTime();
  return myDate;
};

const generateFinalEventDate = async (model, id) => {
  const modelData = await model.find({ event_id: id });
  const dateFrequency = {};
  for (let data in modelData) {
    const convertedData = convertIsoToMiliseconds(data).toString();
    if (convertedData in dateFrequency) {
      dateFrequency[convertedData] += 1;
    } else {
      dateFrequency[convertedData] = 1;
    }
  }
  const milliseconds = Object.keys(dateFrequency).reduce((a, b) =>
    dateFrequency[a] > dateFrequency[b] ? a : b
  );
  return new Date(Number(milliseconds)).toISOString();
};

const generateFinalEventsDates = async () => {
  const events = await Event.find();
  for (let event of events) {
    const participantCount = await ParticipantCount.findOne({
      event_id: event._id,
    });
    if (participantCount.participant_count === event.participant_number) {
      const finalDate = await generateFinalEventDate(Participant, event._id);
      await Event.findByIdAndUpdate(
        { _id: event._id },
        {
          published: true,
          final_event_date: finalDate,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  }
  return events;
};

module.exports = {
  generateFinalEventDate,
  generateFinalEventsDates,
};
