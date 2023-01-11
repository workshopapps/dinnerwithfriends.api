const mongoose = require('mongoose');

const participantCountSchema = new mongoose.Schema(
  {
    event_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        unique:true
      },
      participant_count:{
        type:Number,
        required:true
      }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ParticipantCount = mongoose.model("ParticiPantCount", participantCountSchema);
module.exports = ParticipantCount;