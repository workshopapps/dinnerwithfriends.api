const baseRouter = require('./base');
const authRouter = require("./auth");
const eventRouter = require("./event");;
const { signupRouteDoc, loginRouteDoc } = require("./user.doc");

module.exports = {
  baseRouter,
  authRouter,
  eventRouter,
  loginRouteDoc,
  signupRouteDoc,
};
