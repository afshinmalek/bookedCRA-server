// why do i get cors policy error while i have included that in my code



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
      "http://localhost:3001/auth/google",
    ],
  })
);

app.options("*", cors());


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


//LoginButton.js


import axios from "axios";

import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

import * as dotenv from "dotenv";
dotenv.config();
let afshin = process.env.REACT_APP_AFSHIN;
let clientId = process.env.REACT_APP_CLIENT_ID;
console.log("****************************** clientID: ", clientId);
console.log("****************************** AFSHIN: ", afshin);

const LoginButton = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/google");
        if (response.data.authenticated) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAuthentication();
  }, []);

  const responseGoogle = (response) => {
    // Handle the response from the Google login button
    // You can make an API request to the backend to complete the authentication process
    console.log("Google login response:", response);
    // Redirect the user to the dashboard or any other desired page
    window.location.href = "http://localhost:3001/auth/google/callback";
  };

  return (
    <>
      {!authenticated && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </>
  );
};

export default LoginButton;


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

//auth.js


const { Router } = require("express");
const { OAuth2Client } = require("google-auth-library");

const dotenv = require("dotenv");
dotenv.config();

const router = Router();
const client = new OAuth2Client(process.env.CLIENT_ID);
console.log("**************************** client", client);

router.get("/auth/google", (req, res) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    redirect_uri: "http://localhost:3001/auth/google/callback", // Add this line to set the redirect_uri
  });
  console.log(
    "************************************** Authorization URL:",
    authUrl
  ); // Add this line for debugging

  res.redirect(authUrl);
});

router.get("/auth/google/callback", async (req, res, next) => {
  console.log("********************************* Query parameters:", req.query); // Add this line for debugging

  const code = req.query.code;
  console.log("************************************* Code:", code);

  try {
    const tokenResponse = await client.getToken(code);
    const { id_token } = tokenResponse.tokens;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // Process the user profile data or store it in your database
    // You can customize this code based on your app's requirements
    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      // Add other relevant user data if needed
    };
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("http://localhost:3000/dashboard");
    });
  } catch (error) {
    console.error("Error:", error);
    return;
    // Handle error and redirect the user to an appropriate page
    // return res.redirect("http://localhost:3000/error");
  }
});

module.exports = router;


//session.js
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.SESSION_SECRET) {
  const secret = crypto.randomBytes(64).toString("hex");
  process.env.SESSION_SECRET = secret;
}

module.exports = process.env.SESSION_SECRET;

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
