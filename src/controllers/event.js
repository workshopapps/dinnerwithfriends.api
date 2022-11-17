
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { update } = require('../db/model/event');
const Event = require('../db/model/event');

const createEvent = async (req, res) => {
  try {
        const {id} = req.params;
        const user_id = mongoose.Types.ObjectId(req.params)
        var created_event = await Event.create({ ...req.body, user_id: user_id});
        created_event = await Event.findByIdAndUpdate({_id: created_event.id}, {$push: {participant_count: id}}, {new: true})
      //  created_event = await Event. 

        const salt = await bcrypt.genSalt(10);
        const encryptedId = await bcrypt.hash(created_event.id, salt);

  return res.status(200).json({
    invitation_link: `http://localhost:8000/create-participant/${encryptedId}`,
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
            body: {title},
            params: { eid, pid },
        } = req;
        console.log(eid, pid);
        if (!pid) {
            res.status(401).json({
                messagse: 'You need to log in',
            });
        }
        var event = await Event.findById({_id: eid})
        console.log(event);
        if(event.participant_count.includes(pid)) {
            res.status(400).json({
                status: 'Failed !!!',
                message: 'You have confirmed this event already ...'
            })
        }
        else {
            var updated_event = await Event.findByIdAndUpdate({_id: eid}, { ...req.body, $push: { participant_count: pid }}, {new: true})
            res.status(200).json({
                status: 'Success ...',
                updated_event
        });
        }
        
    
      
    } catch (error) {
      res.status(500).json(
        //error.message
      );
    }
};

module.exports = {
    createEvent,
    updateEvent
};
