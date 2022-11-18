module.exports.verifyEmailToken = {
  body: require("./_/verifyEmailToken")
};

module.exports.welcome = {
  body: require("./_/welcome")
};

module.exports.l3Approval = {
  body: require("./_/l3Approval")
};

module.exports.newDevice = {
  body: require("./_/newDevice")
};

// module.exports.shibDistribution = {
//   body: require("./_/shibDistribution")
// };

// module.exports.pcMail1 = {
//   body: require("./_/pcMail1")
// };

// module.exports.pcMail2 = {
//   body: require("./_/pcMail2")
// };

// module.exports.pcMail3 = {
//   body: require("./_/pcMail3")
// };

// module.exports.pcMail4 = {
//   body: require("./_/pcMail4")
// };

// module.exports.pcMail5 = {
//   body: require("./_/pcMail5")
// };

// module.exports.pcMail6 = {
//   body: require("./_/pcMail6")
// };

// module.exports.pcMail7 = {
//   body: require("./_/pcMail7")
// };

// module.exports.pcMail8 = {
//   body: require("./_/pcMail8")
// };

// module.exports.pcMail9 = {
//   body: require("./_/pcMail9")
// };

// module.exports.pcMail11 = {
//   body: require("./_/pcMail11")
// };

// module.exports.pcMail12 = {
//   body: require("./_/pcMail12")
// };

// module.exports.pcMail13 = {
//   body: require("./_/pcMail13")
// };

// module.exports.pcMail14 = {
//   body: require("./_/pcMail14")
// };

// module.exports.pcMail15 = {
//   body: require("./_/pcMail15")
// };

// module.exports.pcMail16 = {
//   body: require("./_/pcMail16")
// };

// module.exports.pcMail17 = {
//   body: require("./_/pcMail17")
// };

// module.exports.pcMail18 = {
//   body: require("./_/pcMail18")
// };

// module.exports.pcMail19 = {
//   body: require("./_/pcMail19")
// };

// module.exports.pcMail20 = {
//   body: require("./_/pcMail20")
// };

// module.exports.CxMail1 = {
//   body: require("./_/CxMail1.js")
// };

// module.exports.CxMail2 = {
//   body: require("./_/CxMail2.js")
// };

// module.exports.CxMail3 = {
//   body: require("./_/CxMail3.js")
// };

// module.exports.CxMail4 = {
//   body: require("./_/CxMail4.js")
// };

// module.exports.CxMail5 = {
//   body: require("./_/CxMail5.js")
// };

// module.exports.CxMail6 = {
//   body: require("./_/CxMail6.js")
// };

// module.exports.CxMail7 = {
//   body: require("./_/CxMail7.js")
// };

// module.exports.CxMail8 = {
//   body: require("./_/CxMail8.js")
// };

// module.exports.CxMail9 = {
//   body: require("./_/CxMail9.js")
// };

module.exports.accountRecoveryToken = {
  body: require("./_/accountRecoveryToken")
};

module.exports.receiveCoins = {
  body: require("./_/receiveCoins")
};

module.exports.verificationToken = {
  body: `
        <h1>Verify Request</h1>
        <p>Hello</p>
        <p>{{ platform.name }} needs this number {{ code }} to verify that you are the one making this request. 
        Please enter the number to continue</p>
      `
};
