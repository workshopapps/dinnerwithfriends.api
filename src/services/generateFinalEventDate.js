const { Event, ParticipantCount, Participant } = require('../models');

const convertIsoToMiliseconds = (string) => {
  let myDate = new Date(string).getTime();
  return myDate && myDate.toString();
};

const generateFinalEventDate = async (model, id) => {
  const modelData = await model.find({ event_id: id });
  const dateFrequency = {};
  for (let data of modelData) {
    const convertedData = convertIsoToMiliseconds(data.preferred_date_time);
    if (convertedData in dateFrequency) {
      dateFrequency[convertedData] += 1;
    } else {
      dateFrequency[convertedData] = 1;
    }
  }
  const milliseconds = Object.keys(dateFrequency).reduce((a, b) =>
    dateFrequency[a] > dateFrequency[b] ? a : b
  );
  
  const isoDate =new Date(Number(milliseconds)).toISOString();
  return isoDate
};

const generateFinalEventsDates = async () => {
  const events = await Event.find();
  for (let event of events) {
    const participantCount = await ParticipantCount.findOne({
      event_id: event._id,
    });
    console.log(  participantCount.participant_count === event.participant_number &&
      event.published === 'not-decided' &&
      event.final_event_date === null)
    if (
      participantCount.participant_count === event.participant_number &&
      event.published === 'not-decided' &&
      event.final_event_date === null
    ) {
      const finalDate = await generateFinalEventDate(Participant, event._id);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const eventFinalDate = new Date(finalDate);
      console.log(todayDate > eventFinalDate)
      await Event.findByIdAndUpdate(
        { _id: event._id },
        {
          published: `${todayDate > eventFinalDate ? 'ended' : 'decided'}`,
          final_event_date: finalDate,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  }
  return;
};

// const updateEventEndStatus = async ()=>{
//   const events = await Event.find();
//   for (let event of events) {
//     const todayDate = new Date();
//     todayDate.setHours(0,0,0,0);
//     const eventFinalDate = new Date(event.final_event_date)
//     if (todayDate > eventFinalDate){
//       await Event.findByIdAndUpdate(
//         { _id: event._id },
//         {
//           published: "ended",
//           final_event_date: finalDate,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     }
//   }
// }

module.exports = {
  generateFinalEventDate,
  generateFinalEventsDates,
};
