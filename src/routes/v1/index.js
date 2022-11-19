const baseRouter = require('./base');
const authRouter = require("./auth");
const { signupRouteDoc, loginRouteDoc } = require("./user.doc");

module.exports = {
  baseRouter,
  authRouter,
  loginRouteDoc,
  signupRouteDoc,
};
