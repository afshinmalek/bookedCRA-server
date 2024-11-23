// i modified the code #1 to code #2 , please answer the following question: 
// in the code #2 what should the url be since i dont have the "auth/check" route anymore
// i need to change this line :  const response = await axios.get("http://localhost:3001/auth/check");



// code #1
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
router.get("/auth/check", (req, res) => {
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




// code #2

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
        const response = await axios.get("http://localhost:3001/auth/check");
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
    console.log(
      "********************************** Google login response:",
      response
    );
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

