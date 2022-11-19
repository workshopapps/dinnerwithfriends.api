module.exports.verifyEmailToken = {
  body: require("./_/verifyEmailToken")
};



module.exports.accountRecoveryToken = {
  body: require("./_/accountRecoveryToken")
};



module.exports.verificationToken = {
  body: `
        <h1>Verify Request</h1>
        <p>Hello</p>
        <p>{{ platform.name }} needs this number {{ code }} to verify that you are the one making this request. 
        Please enter the number to continue</p>
      `
};
