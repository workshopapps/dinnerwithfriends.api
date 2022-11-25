const Invitation = require('../models/invitation');
const asyncHandler = require('express-async-handler');
const { generateJWTToken } = require('../services/auth');
const sendInvitationLink = require('../services/Mail/sendInvitationLink');

module.exports.createInvite = asyncHandler(async (req, res, next) => {
  const { email_list, event_id } = req.body;

  for (let i = 0; i < email_list.length; i++) {
    const eventToken = await generateJWTToken(
      event_id,
      process.env.INVITATION_TOKEN_SECRET,
      '1d'
    );
    const invitationLink =
      'https://catchup.hng.tech/participants/' + eventToken;
    const email = email_list[i];
    await sendInvitationLink(invitationLink, email);
  }

  const invitationPayload = {
    email_list,
    event_id,
    user_id: req.user.id,
    active: true,
  };

  const newInvitationawait = new Invitation(invitationPayload);
});

module.exports.updateInvite = asyncHandler(async (req, res, next) => {
  const { email_list, event_id } = req.body;

  const invitation = await Invitation.findOne({ event_id: event_id });

  for (let i = 0; i < email_list.length; i++) {
    if (invitation.email_list.includes(email_list[i] === false)) {
      const eventToken = await generateJWTToken(
        event_id,
        process.env.INVITATION_TOKEN_SECRET,
        '1d'
      );
      const invitationLink =
        'https://catchup.hng.tech/participants/' + eventToken;
      const email = email_list[i];
      await sendInvitationLink(invitationLink, email);
    }
  }

  const invitationPayload = {
    email_list,
    event_id,
    user_id: req.user.id,
    active: true,
  };

  const newInvitationawait = new Invitation(invitation);
});
