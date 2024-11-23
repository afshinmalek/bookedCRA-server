const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.SESSION_SECRET) {
  const secret = crypto.randomBytes(64).toString("hex");
  process.env.SESSION_SECRET = secret;
}

module.exports = process.env.SESSION_SECRET;
