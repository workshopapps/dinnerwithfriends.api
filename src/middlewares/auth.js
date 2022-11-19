const passport = require("passport");

const ensureAuthenticated = passport.authenticate("jwt", { session: false });

module.exports = ensureAuthenticated;
