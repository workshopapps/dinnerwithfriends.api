/* eslint-disable linebreak-style */
const {Event,ParticipantCount} = require("./index")
const mongoose = require('mongoose');
const { generateFinalEventDate, notifyEventParticipants } = require("../services/generateFinalEventDate");

const participantSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'fullname can\'t be less than 3 characters'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email field must be specified !!!'],
    lowercase: true,
  },
  event_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  preferred_date_time: {
    type: String,
    required: true,
    trim: true,
  },

},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

participantSchema.post("save", async function (doc){
  let db = mongoose.connection;
  const event = await db.collection("events").find({_id: doc.event_id}).toArray()
  const participantCount = await db.collection("participantcounts").find({event_id: doc.event_id}).toArray()
  let finalEventDate
  if (participantCount.length > 0 && participantCount[0].participant_count === event[0].participant_number && event.length > 0 && event[0].final_event_date === null){
  finalEventDate = await generateFinalEventDate(Participant, doc.event_id);
    await db.collection("events").updateOne({_id:doc.event_id},{$set: {final_event_date:finalEventDate, published:"decided"}});
    setTimeout(async () => {
      await notifyEventParticipants(event[0])
    }, 30000);
  }
})



const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant
