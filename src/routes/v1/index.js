const baseRouter = require('./base');
const authRouter = require("./auth");
const userRouteDoc = require("./user.doc");

module.exports = {
  baseRouter,
  authRouter,
  userRouteDoc,
};
