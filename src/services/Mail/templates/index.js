module.exports.verifyEmailToken = {
  body: require('./_/verifyEmailToken'),
};

module.exports.accountRecoveryToken = {
  body: require('./_/accountRecoveryToken'),
};

module.exports.verificationToken = {
  body: `
        <h1>Verify Request</h1>
        <p>Hello</p>
        <p>{{ platform.name }} needs this number {{ code }} to verify that you are the one making this request. 
        Please enter the number to continue</p>
      `,
};

module.exports.sendInvitationLink = {
  body: require('./_/sendInvitationLink'),
};

module.exports.sendCalendarMail= {
  body: require('./_/sendCalendarInvite'),
};

module.exports.sendEventScheduleDetails = {
  body: require("./_/sendEventDetails"),
}
