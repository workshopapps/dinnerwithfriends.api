const Invitation = require('../models/invitation');
const asyncHandler = require('express-async-handler');
const { generateJWTToken } = require('../services/auth');
const sendInvitationLink = require('../services/Mail/sendInvitationLink');
const { AppError } = require('../utilities');
const { Event } = require('../models');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../services/Mail/nodemailer/sendInvitationLink');

module.exports.createInvite = asyncHandler(async (req, res, next) => {
  const { email_list, event_id } = req.body;

  // if (event_id.match(/^[0-9a-fA-F]{24}$/)) {
  //   const foundEvent = await Event.findOne({ _id: event_id });
  //   // Yes, it's a valid ObjectId, proceed with `findById` call.
  //   if (!foundEvent) {
  //     next(new AppError('Event not found', 404));
  //   }
  // }

  const foundEvent = await Event.findOne({ _id: event_id });
  if (foundEvent.user_id.toString() !== req.user._id.toString()) {
    next(new AppError('You are not the host of this event', 401));
  }

  let memo = [];
  for (let i = 0; i < email_list.length; i++) {
    if (memo.includes(email_list[i].toLowerCase()) === false) {
      //find invitation where email and event_id match
      const foundInvitation = await Invitation.findOne({
        email: email_list[i].toLowerCase(),
        event_id,
      });

      if (!foundInvitation) {
        const email = email_list[i];
        const eventToken = await generateJWTToken(
          { event_id, email },
          process.env.INVITATION_TOKEN_SECRET,
          '90d'
        );
        const invitationLink =
          'https://catchup.hng.tech/event_invite/' + eventToken;

        await sendMail(invitationLink, email);
        memo.push(email_list[i].toLowerCase());
        const invitationPayload = {
          email: email_list[i],
          event_id,
          user_id:req.user.id
        };

        const newInvitation = await new Invitation(invitationPayload).save();
      }
    }
  }

  return res.json({
    status: 'success',
    message: 'Invitations have been processed',
  });
});

// module.exports.updateInvite = asyncHandler(async (req, res, next) => {
//   const { email_list, event_id } = req.body;
//   const { id } = req.params;

//   const newInvitation = await Invitation.findById(id);
//   if (!newInvitation) {
//     next(new AppError('Invitation not found', 404));
//   }

//   let memo = [];
//   for (let i = 0; i < email_list.length; i++) {
//     if (
//       memo.includes(email_list[i].toLowerCase()) === false &&
//       newInvitation.email_list.includes(email_list[i].toLowerCase()) === false
//     ) {
//       const eventToken = await generateJWTToken(
//         event_id,
//         process.env.INVITATION_TOKEN_SECRET,
//         '1d'
//       );

//       const invitationLink =
//         'https://catchup.hng.tech/participants/' + eventToken;
//       const email = email_list[i];
//       memo.push(email_list[i].toLowerCase());
//       await sendInvitationLink(invitationLink, email);
//     }
//   }

//   newInvitation.email_list = [...newInvitation.email_list, ...memo];
//   newInvitation.save();
//   return res.send({
//     status: 'success',
//     message: 'Invitations have been updated and send successfully',
//     data: {
//       newInvitation: newInvitation,
//     },
//   });
// });

module.exports.deleteInvite = asyncHandler(async (req, res, next) => {
  const { email, event_id } = req.body;
  const { id } = req.params;
  await Invitation.deleteMany({});
  // const newInvitation = await Invitation.findByIdAndUpdate(id, {
  //   $pull: { email_list: email },
  // });
  return res.send({
    status: 'success',
    message: 'Invited email deleted successfully',
    // data: {
    //   newInvitation: newInvitation,
    // },
  });
});

module.exports.getAllInvites = asyncHandler(async (req, res, next) => {
  const invites = await Invitation.find().sort({
    createdAt: 'desc',
  });
  return res.send({
    status: 'success',
    message: 'Invites retrieved successfully',
    data: {
      invites,
    },
  });
});

module.exports.getDecodedEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payload = await jwt.verify(id, process.env.INVITATION_TOKEN_SECRET);
  const { event_id, email } = payload;

  const foundEvent = await Event.findOne({ _id: event_id }).populate('host_info', 'name')
  .select('-password')
  .exec();
  if (!foundEvent) {
    return next(new AppError('Event not found', 404));
  }
  return res.status(200).json({ email, event: foundEvent });
});

module.exports.getEventInvites = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const invites = await Invitation.find({ event_id: id }).sort({
    createdAt: 'desc',
  });
  return res.send({
    status: 'success',
    message: 'Invites retrieved successfully',
    data: {
      invites,
    },
  });
});
