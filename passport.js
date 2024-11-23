const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Process the user profile data or store it in your database
      // You can customize this callback function based on your app's requirements
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        // Add other relevant user data if needed
      };
      return done(null, user);
    }
  )
);

// Serialize user data
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user data
passport.deserializeUser((user, done) => {
  done(null, user);
});
