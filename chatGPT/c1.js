/*help me change the following codebase so it uses 
import { GoogleLogin } from "react-google-login";
in my code : 
*/
// index.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./database");
const authRoutes = require("./hanlders/auth");
const passport = require("passport");
const session = require("express-session");
const sessionSecret = require("./session");

require("./passport");

const getDataHandler = require("./hanlders/getDataHandler");
const submitFormHandler = require("./hanlders/submitFormHandler");
const cancelHandler = require("./hanlders/cancelHandler");
const submitEmailHandler = require("./hanlders/submitEmailHandler");
const getDateHandler = require("./hanlders/getDateHandler");
const emailOpenSpotsHandler = require("./hanlders/emailOpenSpotsHandler");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://book-it.herokuapp.com",
      "https://book-it-backend.herokuapp.com/",
      "http://localhost:3000",
    ],
  })
);

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRoutes);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();

// Define the route handler for the form submission

app.post("/submit-form", submitFormHandler);
app.post("/email-open-spots", emailOpenSpotsHandler);
app.get("/data", getDataHandler);
app.get("/data/:date", getDateHandler);
app.get("/cancel", cancelHandler);
app.get("/submit-email/:email/:name/:date/:time", submitEmailHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);


  //session.js
  const crypto = require("crypto");
  const dotenv = require("dotenv");

  dotenv.config();

  if (!process.env.SESSION_SECRET) {
    const secret = crypto.randomBytes(64).toString("hex");
    process.env.SESSION_SECRET = secret;
  }

  module.exports = process.env.SESSION_SECRET;


//auth.js

const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google OAuth2 login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth2 callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // Redirect or return response to the frontend as needed
    console.log("User: ", req.user);
    res.redirect("http://localhost:3000/dashboard");
  }
);

// Route to check if the user is authenticated
router.get("/auth/check", passport.authenticate("google"), (req, res) => {
  if (req.user) {
    // User is authenticated, send a success response
    res.json({ authenticated: true, user: req.user });
  } else {
    // User is not authenticated, send a failure response
    console.log(
      "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreq: ",
      req,
      "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrres: ",
      res
    );

    res.json({ authenticated: false });
  }
});

module.exports = router;


//passport.js

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
      done(null, profile);
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

// and in my front end i have these files

//LoginButton.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginButton = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/check");
        console.log("############################# 0: ", response.data);
        console.log("############################# 01: ", response);

        if (response.data.authenticated) {
          console.log("############################# 1: ", response.data);
          console.log(
            "############################# 2: ",
            response.data.authenticated
          );

          // User is already authenticated
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <>
      {!authenticated && (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </>
  );
};

export default LoginButton;

//GoogleAuthCallback.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the Google authentication callback logic here
    // You can perform any necessary actions or redirect the user
    // For example, you can make an API request to the backend to complete the authentication process
    // After that, you can navigate the user to the dashboard or any other desired page
    // You can access the query parameters sent by the Google OAuth callback using the "location" object
    // For example, if you need the "code" parameter: const code = new URLSearchParams(location.search).get("code");
    // 1
    // Redirect the user to the dashboard or any other desired page
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div>
      <h1>Processing Google Authentication...</h1>
    </div>
  );
};

export default GoogleAuthCallback;

