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
    res.redirect("/dashboard");
  }
);

module.exports = router;
