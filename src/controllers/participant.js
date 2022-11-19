const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const {createParticipantSchema} = require("../validators");
const {Participant} = require("../models");
const { validationResult } = require('express-validator');

// const addParticipant = asyncHandler(async (req, res, next) => {
//     const {fullname, email, participant_id, prefered_date_time} = req.body;

//     const validateUserInput = createParticipantSchema.validate({ fullname, email, prefered_date_time });

//     const participantData = {
//             fullname,
//             email,
//             participant_id,
//             prefered_date_time
//         }

//         const participant = await new Participant(participantData).save();
//         const message = 'Participant added successfully';
//         return services.newParticipantToken(participant, 'success', message, res);
//   });
const addParticipant = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({errors: errors.array()});
  } else {
    Participant.find({email: req.body.email})
    .then(part => {
      if (part.length >= 1) {
        return res.status(409).json({message: "Account with this email already registered"});
      } else {
            const npart = new Participant({
              _id: new mongoose.Types.ObjectId(),
              fullname: req.body.fullname,
              email: req.body.email,
              prefered_date_time: req.body.preferred_date_time,
            });
            npart.save()
            .then(part => {
              const token = jwt.sign({email: part.email}, process.env.JWT_SECRET)
              res.status(201).json({message: "Participant created", token});
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({error: err});
            });
          }
        });
      }
    };

  module.exports = {
    addParticipant
  }