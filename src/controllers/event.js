
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { update } = require('../db/model/event');
const Event = require('../db/model/event');

const createEvent = async (req, res) => {
  try {
        const {
            user: {id}
            } = req;

        let created_event = await Event.create({ ...req.body, user_id: _id});
        
        const salt = await bcrypt.genSalt(10);
        const encryptedId = await bcrypt.hash(created_event.id, salt);

  return res.status(200).json({
    invitation_link: `http://localhost:8000/create-participant/:${encryptedId}`,
    created_event
  });
  
  } catch (error) {
    res.status(500).json({
        message: 'Internal Server error',
        error,
    });
  }
};

const updateEvent = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;

        let event = await Event.findByIdAndUpdate({_id: id}, { ...req.body }, {new: true})
        if(event) {
            res.status(200).json({
                status: 'Success ...',
                updated_event})
            
        }
        return res.status(500).json({
            status: 'Failed !!!',
            message: 'Error updating your data'
        })

    } catch (error) {
      res.status(500).json({
        message: error.message
    });
    }
};

module.exports = {
    createEvent,
    updateEvent
};
