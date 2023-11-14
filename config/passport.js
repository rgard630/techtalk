const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;

