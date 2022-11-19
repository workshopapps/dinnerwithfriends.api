/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { Participant } = require('../models');

// adding a participant
const addParticipant = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  Participant.find({ email: req.body.email })
    .then((part) => {
      if (part.length >= 1) {
        return res.status(409).json({ message: 'Account with this email already registered' });
      }
      const npart = new Participant({
        _id: new mongoose.Types.ObjectId(),
        fullname: req.body.fullname,
        email: req.body.email,
        prefered_date_time: req.body.preferred_date_time,
      });
      npart.save()
        .then((jpart) => {
          const token = jwt.sign({ email: jpart.email }, process.env.JWT_SECRET);
          res.status(201).json({ message: 'Participant created', token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    });
};

// deleting a participant
const deleteParticipant = (req, res, next) => {
  Participant.findByIdAndDelete({ _id: req.params.id }).exec().then((result) => {
    res.status(200).json({ message: 'Participant deleted' });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

// Updating a Participant
const updateParticipant = (req, res, next) => {
  Participant.updateOne({ fullname: req.body.fullname, email: req.body.email, prefered_date_time: req.body.prefered_date_time }).exec().then((result) => {
    res.status(200).json({ message: 'Partcipant updated' });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

module.exports = {
  addParticipant,
  deleteParticipant,
  updateParticipant,
};
