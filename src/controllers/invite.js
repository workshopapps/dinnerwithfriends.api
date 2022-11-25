const Invitation = require('../models/invitation');
const asyncHandler = require('express-async-handler');
const { generateJWTToken } = require('../services/auth');
const sendInvitationLink = require('../services/Mail/sendInvitationLink');
const { AppError } = require('../utilities');
const { Event } = require('../models');

module.exports.createInvite = asyncHandler(async (req, res, next) => {
  const { email_list, event_id } = req.body;

  // if (event_id.match(/^[0-9a-fA-F]{24}$/)) {
  //   const foundEvent = await Event.findOne({ _id: event_id });
  //   // Yes, it's a valid ObjectId, proceed with `findById` call.
  //   if (!foundEvent) {
  //     next(new AppError('Event not found', 404));
  //   }
  // }
  let memo = [];
  for (let i = 0; i < email_list.length; i++) {
    if (memo.includes(email_list[i].toLowerCase()) === false) {
      const eventToken = await generateJWTToken(
        event_id,
        process.env.INVITATION_TOKEN_SECRET,
        '1d'
      );

      const invitationLink =
        'https://catchup.hng.tech/participants/' + eventToken;
      const email = email_list[i];
      await sendInvitationLink(invitationLink, email);
      memo.push(email_list[i].toLowerCase());
    }
  }

  const invitationPayload = {
    email_list: memo,
    event_id,
    userId: req.user.id,
    active: true,
  };

  const newInvitation = await new Invitation(invitationPayload).save();

  return res.send({
    status: 'success',
    message: 'Invitations have been sent successfully',
    data: {
      newInvitation: newInvitation,
    },
  });
});

module.exports.updateInvite = asyncHandler(async (req, res, next) => {
  const { email_list, event_id } = req.body;
  const { id } = req.params;

  const newInvitation = await Invitation.findById(id);
  if (!newInvitation) {
    next(new AppError('Invitation not found', 404));
  }

  let memo = [];
  for (let i = 0; i < email_list.length; i++) {
    if (
      memo.includes(email_list[i].toLowerCase()) === false &&
      newInvitation.email_list.includes(email_list[i].toLowerCase()) === false
    ) {
      const eventToken = await generateJWTToken(
        event_id,
        process.env.INVITATION_TOKEN_SECRET,
        '1d'
      );

      const invitationLink =
        'https://catchup.hng.tech/participants/' + eventToken;
      const email = email_list[i];
      memo.push(email_list[i].toLowerCase());
      await sendInvitationLink(invitationLink, email);
    }
  }

  newInvitation.email_list = [...newInvitation.email_list, ...memo];
  newInvitation.save();
  return res.send({
    status: 'success',
    message: 'Invitations have been updated and send successfully',
    data: {
      newInvitation: newInvitation,
    },
  });
});

module.exports.deleteInvite = asyncHandler(async (req, res, next) => {});
